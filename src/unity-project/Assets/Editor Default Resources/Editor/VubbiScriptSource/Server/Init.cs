using UnityEditor;

using System;
using System.Text;
using System.Collections;
using System.IO;

using ICSharpCode.SharpZipLib.Zip;
using ICSharpCode.SharpZipLib.Zip.Compression.Streams;

using System.Linq;

namespace vubbiscript
{
	[InitializeOnLoad]
	public class Init
	{

		/// <summary>
		/// 
		/// This code is called when the Unity Editor starts. It starts Vubbi (installation + web server).
		/// 
		/// </summary>
		static Init () {

			//
			// Check command line arguments...
			//
			string commandlinebuildkeyword = "+exportvubbiscriptunitypackage";
			if(System.Environment.GetCommandLineArgs().Contains(commandlinebuildkeyword)){
				// So, we need to do a build instead of running the code...
				string[] cargs = System.Environment.GetCommandLineArgs ();
				string outputdir = null;
				for (int i = 0; i < cargs.Length; i++) {
					if (cargs [i] == commandlinebuildkeyword) {
						outputdir = cargs [i + 1];
					}
				}
				AssetDatabase.ExportPackage("Assets/Editor Default Resources/Editor/VubbiScript", outputdir, ExportPackageOptions.Recurse);
				return;// DO NOT CONTINUE... Exit Unity now...
			}

			//
			// Set the icon for Vubbi files
			//
			VubbiFileHandler.InitVubbiIcon ();

			//
			// Server Configuration
			//
			ServerConfig config = new ServerConfig ();
			#if UNITY_EDITOR
			// When running in development mode => the "web" code can be found in the folder "web" next to the actual unity project folder
			config.HostDirectory = System.IO.Path.Combine (UnityEngine.Application.dataPath, "../../web");
			#else
			// When compiling for the release build, we do not define UNITY_EDITOR
			// For released code, the HTML & JavaScript can be found in:
			config.HostDirectory = System.IO.Path.Combine (UnityEngine.Application.dataPath, "../WebRoot");
			#endif
			config.Port = 8040;

			//
			// Update Web directory
			// This is part of the "installer"...
			// Right after importing the unity package, we will unzip the data file and put it in the main project folder.
			// => Resulting in a "WebRoot" folder
			//
			string dataFile = System.IO.Path.Combine (UnityEngine.Application.dataPath, "Editor Default Resources/Editor/VubbiScript/Vubbi.data");
			if (System.IO.File.Exists (dataFile)) {
				System.IO.Directory.CreateDirectory (config.HostDirectory + "/");
				UnzipDataDir (dataFile, config.HostDirectory+"/");
				System.IO.File.Delete (dataFile);
				AssetDatabase.Refresh ();
				ServerLog.Log ("Installation successful!");
			}

			//
			// Start Server
			//
			VubbiApi api = new VubbiApi ();

			new VubbiServer (config, api);

			//
			// Register update callback
			//
			EditorApplication.update += api.OnUpdate;
		}

		static void UnzipDataDir (string fromLoc, string toLoc) {
			// Clean first
			System.IO.DirectoryInfo di = new DirectoryInfo(toLoc);
			foreach (FileInfo file in di.GetFiles())
			{
				file.Delete(); 
			}
			foreach (DirectoryInfo dir in di.GetDirectories())
			{
				dir.Delete(true); 
			}

			// Unzip
			using (ZipInputStream s = new ZipInputStream(File.OpenRead(fromLoc))) {

				ZipEntry theEntry;
				while ((theEntry = s.GetNextEntry()) != null) {
					string fullPath = System.IO.Path.Combine (toLoc, theEntry.Name);
					string directoryName = Path.GetDirectoryName(fullPath);
					string fileName = Path.GetFileName (fullPath);

					// create directory
					if ( directoryName.Length > 0 ) {
						Directory.CreateDirectory(directoryName);
					}

					if (fileName != String.Empty) {
						using (FileStream streamWriter = File.Create(fullPath)) {

							int size = 2048;
							byte[] data = new byte[2048];
							while (true) {
								size = s.Read(data, 0, data.Length);
								if (size > 0) {
									streamWriter.Write(data, 0, size);
								} else {
									break;
								}
							}
						}
					}
				}
			}
		}
	}
}

