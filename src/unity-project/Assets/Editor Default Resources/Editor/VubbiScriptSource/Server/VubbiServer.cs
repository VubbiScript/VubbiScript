namespace vubbiscript 
{
	using System;
	using System.IO;
	using System.Net;
	using System.Net.Sockets;
	using System.Text;
	using System.Threading;

	// For processing the POST parameters
	using System.Xml;
	using System.Xml.Linq;
	using System.Collections.Generic;

	public class VubbiServer: HttpServer
	{
		private ServerConfig config;
		private VubbiApi api;

		/// <summary>
		/// Initializes a new instance of the <see cref="vubbiscript.VubbiServer"/> class.
		/// 
		/// This instance handles the incoming HTTP GET & POST requests with logic specific for Vubbi
		/// </summary>
		/// <param name="config">Config.</param>
		/// <param name="api">API.</param>
		public VubbiServer(ServerConfig config, VubbiApi api) : base(config.IP, config.Port) {
			this.config = config;
			this.api = api;

			try {
				Thread thread = new Thread(new ThreadStart(this.listen));
				thread.Start();
				ServerLog.Log("Server Running");
			} catch (Exception e) {
				ServerLog.Log ("Server Start Exception");
				ServerLog.Log (e);
			}
		}


		/// <summary>
		/// HTTP GET => Implement to load actual files from the server... Returns the html/js/css/... files.
		/// </summary>
		/// <param name="p">P.</param>
		public override void handleGETRequest(HttpProcessor p) {
			String requestedUrl = p.http_url;
			ServerLog.Log (String.Format("request: {0}", requestedUrl));

			if (requestedUrl.EndsWith ("/")) {
				// We are looking in a directory...
			}

			//Extract the requested file name
			String directory = requestedUrl.Substring (requestedUrl.IndexOf ("/"), requestedUrl.LastIndexOf ("/")-requestedUrl.IndexOf ("/"));
			String filename = requestedUrl.Substring (requestedUrl.LastIndexOf ("/") + 1);

			/////////////////////////////////////////////////////////////////////
			// Identify the Physical Directory
			/////////////////////////////////////////////////////////////////////
			String physicalDirectory = config.GetPhysicalPath(directory);

			// TODO: check if directory exists...

			/////////////////////////////////////////////////////////////////////
			// Identify the File Name
			/////////////////////////////////////////////////////////////////////

			//If The file name is not supplied then look in the default file list
			if (filename.Length == 0 )
			{
				// Get the default filename
				filename = config.GetDefaultFileInFolder(physicalDirectory);
			}

			// TODO: check if filename is no longer "" and check if file exists...

			String mimeHeader = config.GetMimeType (filename);

			String fullPath = Path.Combine(physicalDirectory, filename);

			ServerLog.LogInfo (" < " + fullPath);

			if (!File.Exists(fullPath)) {
				ServerLog.Log ("    [!]" + ServerHttpStatusCode.ERR_404_FILENOTFOUND);
				String errorMessage = "<H2>404 Error! File Does Not Exists...</H2>";
				SendHeader(config.DefaultMime, errorMessage.Length, ServerHttpStatusCode.ERR_404_FILENOTFOUND, p);
				p.outputStream.Write (errorMessage);
			} else {
				ServerLog.LogInfo ("    [+]" + HttpStatusCode.OK);
				FileInfo f = new FileInfo (fullPath);
				Stream filecontent = new BufferedStream(f.OpenRead());
				try{
					SendHeader(mimeHeader, f.Length, ServerHttpStatusCode.OK, p);
					p.outputStream.Flush ();
					CopyStream(filecontent, p.socket.GetStream());
				}finally{
					filecontent.Close ();
				}
			}
		}
		
		public static void CopyStream(Stream input, Stream output)
		{
			byte[] buffer = new byte[32768];
			int read;
			while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
			{
				output.Write (buffer, 0, read);
			}
		}

		/// <summary>
		/// HTTP POST => Implement to do API calls (saving/loading/deleting/listing Vubbi files)
		/// </summary>
		/// <param name="p">P.</param>
		/// <param name="inputData">Input data.</param>
		public override void handlePOSTRequest(HttpProcessor p, StreamReader inputData) {
			if (p.http_url.Equals ("/api/save")) {
				// Save the file...
				api.Save (ParseQuery(inputData));
				SendApiOk (p, "");
				return;
			}
			if (p.http_url.Equals ("/api/load")) {
				// Save the file...
				String content = api.Load (ParseQuery(inputData));
				SendApiOk (p, content);
				return;
			}
			if (p.http_url.Equals ("/api/lang")) {
				// Send back the language preference of the user...
				SendApiOk (p, api.GetLanguagePreference());
				return;
			}
			if (p.http_url.StartsWith ("/api/setlang/")) {
				// Send back the language preference of the user...
				api.SetLanguagePreference(p.http_url.Substring("/api/setlang/".Length));
				SendApiOk (p, "");
				return;
			}




			ServerLog.Log (p.http_url);
			String errorMessage = "<H2>Http Post not supported yet...</H2>";
			SendHeader(config.DefaultMime, errorMessage.Length, ServerHttpStatusCode.ERR_404_FILENOTFOUND, p);
			p.outputStream.Write (errorMessage);
		}

		/// <summary>
		/// Currently we pass parameters in an xml format... This parses such an xml.
		/// </summary>
		/// <returns>The query.</returns>
		/// <param name="inputData">Input data.</param>
		private Dictionary<string, string> ParseQuery(StreamReader inputData) {
			XmlDocument doc = new XmlDocument();
			doc.Load(inputData);
			Dictionary<string, string> paramdict = new Dictionary<string, string> ();
			foreach(XmlNode node in doc.DocumentElement.ChildNodes){
				paramdict.Add (node.Name, node.InnerText);
			}
			return paramdict;
		}

		/// <summary>
		/// Sends the API ok.
		/// </summary>
		/// <param name="p">P.</param>
		/// <param name="data">Data.</param>
		public void SendApiOk(HttpProcessor p, string data) {
			p.outputStream.Write("HTTP/1.1 " + ServerHttpStatusCode.OK.ToString()+"\r\n");
			p.outputStream.Write("Server: Vubbi Server\r\n");
			p.outputStream.Write("Accept-Ranges: bytes\r\n");
			p.outputStream.Write("Content-Length: "+p.outputStream.Encoding.GetByteCount (data)+"\r\n");
			p.outputStream.Write ("\r\n");
			p.outputStream.Write (data);
		}

		/// <summary>
		/// Sends the header.
		/// </summary>
		/// <param name="mimeHeader">MIME header.</param>
		/// <param name="totalBytes">Total bytes.</param>
		/// <param name="statusCode">Status code.</param>
		/// <param name="mySocket">My socket.</param>
		public void SendHeader(string mimeHeader, long totalBytes, ServerHttpStatusCode statusCode, HttpProcessor p) {
			p.outputStream.Write("HTTP/1.1 " + statusCode.ToString()+"\r\n");
			p.outputStream.Write("Server: Vubbi Server\r\n");
			p.outputStream.Write("Content-Type: " + mimeHeader+"\r\n");//+"; charset=ISO 8859-1");
			p.outputStream.Write("Accept-Ranges: bytes\r\n");
			p.outputStream.Write("Content-Length: " + totalBytes+"\r\n");
			p.outputStream.Write("\r\n");
		}
	}

}