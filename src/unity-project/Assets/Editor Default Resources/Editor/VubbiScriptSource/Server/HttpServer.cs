using System;
using System.Collections;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;

// offered to the public domain for any use with no restriction
// and also with no warranty of any kind, please enjoy. - David Jeske. 

// simple HTTP explanation
// http://www.jmarshall.com/easy/http/

// See also: http://www.codeproject.com/Articles/137979/Simple-HTTP-Server-in-C

namespace vubbiscript
{
	public class HttpProcessor {
		public TcpClient socket;        
		public HttpServer srv;

		private Stream inputStream;
		public StreamWriter outputStream;

		public String http_method;
		public String http_url;
		public String http_protocol_versionstring;
		public Hashtable httpHeaders = new Hashtable();


		private static int MAX_POST_SIZE = 10 * 1024 * 1024; // 10MB

		public HttpProcessor(TcpClient s, HttpServer srv) {
			this.socket = s;
			this.srv = srv;                   
		}

		private string streamReadLine() {
			int next_char;
			string data = "";
			while (true) {
				next_char = inputStream.ReadByte();
				if (next_char == '\n') { break; }
				if (next_char == '\r') { continue; }
				if (next_char == -1) { return null; };
				data += Convert.ToChar(next_char);
			}            
			return data;
		}

		public void process() {
			// we can't use a StreamReader for input, because it buffers up extra data on us inside it's
			// "processed" view of the world, and we want the data raw after the headers
			inputStream = new BufferedStream(socket.GetStream());

			// we probably shouldn't be using a streamwriter for all output from handlers either
			outputStream = new StreamWriter(new BufferedStream(socket.GetStream()));
			try {
				// Keep processing requests from the browser (keep alive)
				while(true) {
					parseRequest();
					readHeaders();
					if (http_method.Equals("GET")) {
						handleGETRequest();
					} else if (http_method.Equals("POST")) {
						handlePOSTRequest();
					}
					outputStream.Flush();
				}
			} catch (EndOfStreamException eose) {
				if (eose.Message == "EOS_BROWSER") {
					return;
				}
			} catch (Exception e) {
				ServerLog.Log ("Exception: " + e.ToString ());
				writeFailure();
				outputStream.Flush();
			} finally {
				// bs.Flush(); // flush any remaining output
				inputStream = null; outputStream = null; // bs = null;            
				socket.Close();
			}
		}

		public void parseRequest() {
			String request = streamReadLine();
			if (request == null) {
				// Connection closed by browser
				throw new EndOfStreamException("EOS_BROWSER");
			}
			string[] tokens = request.Split(' ');
			if (tokens.Length != 3) {
				throw new Exception("invalid http request line");
			}
			http_method = tokens[0].ToUpper();
			http_url = tokens[1];
			http_protocol_versionstring = tokens[2];

			ServerLog.LogInfo("starting: " + request);
		}

		public void readHeaders() {
			Console.WriteLine("readHeaders()");
			String line;
			while ((line = streamReadLine()) != null) {
				if (line.Equals("")) {
					ServerLog.LogInfo("got headers");
					return;
				}

				int separator = line.IndexOf(':');
				if (separator == -1) {
					throw new Exception("invalid http header line: " + line);
				}
				String name = line.Substring(0, separator);
				int pos = separator + 1;
				while ((pos < line.Length) && (line[pos] == ' ')) {
					pos++; // strip any spaces
				}

				string value = line.Substring(pos, line.Length - pos);
				ServerLog.LogInfo(String.Format("header: {0}:{1}",name,value));
				httpHeaders[name] = value;
			}
		}

		public void handleGETRequest() {
			srv.handleGETRequest(this);
		}

		private const int BUF_SIZE = 4096;
		public void handlePOSTRequest() {
			// this post data processing just reads everything into a memory stream.
			// this is fine for smallish things, but for large stuff we should really
			// hand an input stream to the request processor. However, the input stream 
			// we hand him needs to let him see the "end of the stream" at this content 
			// length, because otherwise he won't know when he's seen it all! 

			ServerLog.LogInfo("get post data start");
			int content_len = 0;
			MemoryStream ms = new MemoryStream();
			if (this.httpHeaders.ContainsKey("Content-Length")) {
				content_len = Convert.ToInt32(this.httpHeaders["Content-Length"]);
				if (content_len > MAX_POST_SIZE) {
					throw new Exception(
						String.Format("POST Content-Length({0}) too big for this simple server",
							content_len));
				}
				byte[] buf = new byte[BUF_SIZE];              
				int to_read = content_len;
				while (to_read > 0) {  
					ServerLog.LogInfo(String.Format("starting Read, to_read={0}",to_read));

					int numread = this.inputStream.Read(buf, 0, Math.Min(BUF_SIZE, to_read));
					ServerLog.LogInfo(String.Format("read finished, numread={0}", numread));
					if (numread == 0) {
						if (to_read == 0) {
							break;
						} else {
							throw new Exception("client disconnected during post");
						}
					}
					to_read -= numread;
					ms.Write(buf, 0, numread);
				}
				ms.Seek(0, SeekOrigin.Begin);
			}
			ServerLog.LogInfo("get post data end");
			srv.handlePOSTRequest(this, new StreamReader(ms));

		}

		public void writeSuccess(string content_type="text/html") {
			// this is the successful HTTP response line
			outputStream.WriteLine("HTTP/1.0 200 OK");  
			// these are the HTTP headers...          
			outputStream.WriteLine("Content-Type: " + content_type);
			outputStream.WriteLine("Connection: close");
			// ..add your own headers here if you like

			outputStream.WriteLine(""); // this terminates the HTTP headers.. everything after this is HTTP body..
		}

		public void writeFailure() {
			// this is an http 404 failure response
			outputStream.WriteLine("HTTP/1.0 404 File not found");
			// these are the HTTP headers
			outputStream.WriteLine("Connection: close");
			// ..add your own headers here

			outputStream.WriteLine(""); // this terminates the HTTP headers.
		}
	}

	public abstract class HttpServer {

		protected IPAddress address;
		protected int port;
		TcpListener listener;
		bool is_active = true;

		public HttpServer(IPAddress address, int port) {
			this.port = port;
			this.address = address;
		}

		public void listen() {
			try{
				listener = new TcpListener(address, port);
				listener.Start();
				while (is_active) {
					ServerLog.LogInfo ("Listening!");
					TcpClient s = listener.AcceptTcpClient();
					ServerLog.LogInfo ("Client accepted!");
					s.ReceiveTimeout = 1000;// After 1 seconds, time out the read operation!!!
					// Why? Because as long as the operation is waiting, this thread is in "native code" and Unity cannot go to "play" mode or reload the scripts!
					HttpProcessor processor = new HttpProcessor(s, this);
					Thread thread = new Thread(new ThreadStart(processor.process));
					thread.Start();
					Thread.Sleep(1);
				}
			} catch(Exception e) {
				ServerLog.Log ("Server Listening Exception!");
				ServerLog.Log (e);
			}
		}

		public abstract void handleGETRequest(HttpProcessor p);
		public abstract void handlePOSTRequest(HttpProcessor p, StreamReader inputData);
	}
}

