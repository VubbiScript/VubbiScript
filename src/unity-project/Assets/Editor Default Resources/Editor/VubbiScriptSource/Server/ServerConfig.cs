using System;
using System.IO;
using System.Collections.Generic;
using System.Net;

namespace vubbiscript
{
	public class ServerConfig
	{
		public ServerConfig ()
		{
			Port = 80;
			DefaultFileNames = new List<string> () { "index.html" };
			HostDirectory = @"C:\server\";
			MimeTypes = new Dictionary<string, string> ();
			MimeTypes.Add ("html", "text/html");
			MimeTypes.Add ("htm", "text/html");
			MimeTypes.Add ("gif", "image/gif");
			MimeTypes.Add ("bmp", "image/bmp");
			MimeTypes.Add ("png", "image/png");
			MimeTypes.Add ("jpg", "image/jpeg");
			MimeTypes.Add ("svg", "image/svg+xml");
			MimeTypes.Add ("css", "text/css");
			MimeTypes.Add ("ttf", "application/x-font-truetype");
			MimeTypes.Add ("woff", "application/font-woff");
			MimeTypes.Add ("woff2", "application/font-woff2");
			MimeTypes.Add ("js", "text/javascript");
			DefaultMime = "text/html";

			IP = IPAddress.Loopback;
		}

		public IPAddress IP { get; set; }

		/// <summary>
		/// Gets or sets the port.
		/// </summary>
		/// <value>The port.</value>
		public int Port { get; set; }

		/// <summary>
		/// Gets or sets the default file names.
		/// </summary>
		/// <value>The default file names.</value>
		public List<String> DefaultFileNames { get; set;}

		/// <summary>
		/// Gets or sets the host directory.
		/// </summary>
		/// <value>The host directory.</value>
		public String HostDirectory { get; set; }

		/// <summary>
		/// Gets or sets the MIME types.
		/// </summary>
		/// <value>The MIME types.</value>
		public Dictionary<String, String> MimeTypes { get; set; }

		/// <summary>
		/// Gets or sets the default MIME.
		/// </summary>
		/// <value>The default MIME.</value>
		public String DefaultMime { get; set; }


		// Util methods...

		/// <summary>
		/// Gets the default file in folder.
		/// </summary>
		/// <returns>The default file in folder.</returns>
		/// <param name="localDirectory">Local directory.</param>
		public string GetDefaultFileInFolder(string localDirectory)
		{
			foreach (String defaultfilename in DefaultFileNames) {
				// Security Vulnerability, ".." is interpreted as parent directory here!
				String defaultFile = Path.Combine (localDirectory, defaultfilename);
				if (File.Exists (defaultFile)) {
					return defaultfilename;
				}
			}
			return null;
		}

		/// <summary>
		/// Gets the physical path.
		/// </summary>
		/// <returns>The physical path.</returns>
		/// <param name="path">Path.</param>
		public string GetPhysicalPath(string path)
		{
			// Security Vulnerability, ".." is interpreted as parent directory here!
			if (!HostDirectory.EndsWith ("/")) {
				HostDirectory = HostDirectory + "/";
			}
			return HostDirectory + path;
		}

		/// <summary>
		/// Gets the MIME type.
		/// </summary>
		/// <returns>The MIME type.</returns>
		/// <param name="requestedFile">Requested file.</param>
		public string GetMimeType(string requestedFile)
		{
			int lastDot = requestedFile.LastIndexOf (".");
			String extension = null;
			if (lastDot >= 0) {
				extension = requestedFile.Substring (lastDot + 1);
			}

			String mime = null;
			if (extension != null && MimeTypes.ContainsKey(extension)) {
				mime = MimeTypes [extension];
			}
			if (mime == null) {
				return DefaultMime;
			} else {
				return mime;
			}
		}
	}
}

