using System;
using System.Xml;
using System.Collections.Generic;
using System.IO;

using UnityEditor;

namespace scratchity
{

	/// <summary>
	/// Scratchity API. Contains all kinds of calls that could be called from the application.
	/// </summary>
	public class ScratchityApi
	{

		// Some settings
		private string scriptOutputDir;
		private string configDir;

		private const string FILEEXT = ".vcs.xml";

		// Constructor... Getting settings...
		public ScratchityApi () {
			scriptOutputDir = Path.Combine (UnityEngine.Application.dataPath, "Scripts");
			configDir = Path.Combine (UnityEngine.Application.dataPath, "../BlockScriptData");

		}

		// -- Warning THREADSAFETY: accessed from multiple threads! Use locking!
		private System.Object lockThis = new System.Object();
		private bool needsAssetReload = false;
		private List<String> specificAssetsToReload = new List<String>();
		private string openFileId = null;
		// --

		/// <summary>
		/// Called every update call of Unity
		///
		/// THREADSAFETY -> In this thread we can do stuff with Unity!
		/// </summary>
		public void OnUpdate() {
			// 
			lock(lockThis) {
				if(needsAssetReload) {
					needsAssetReload = false;
					AssetDatabase.Refresh ();
				}
				string origin = UnityEngine.Application.dataPath.Replace("\\","/");
				foreach(String assetToReload in specificAssetsToReload) {
					string assetToReloadLocal = assetToReload.Replace ("\\", "/");
					if (assetToReloadLocal.StartsWith (origin)) {
						assetToReloadLocal = assetToReloadLocal.Substring (origin.Length);
					}
					AssetDatabase.ImportAsset ("Assets/"+assetToReloadLocal);
				}
				specificAssetsToReload.Clear ();
			}
		}

		//
		// Methods...
		//

		/// <summary>
		/// Save a file (& generate C# code)
		/// 
		/// Called by an incoming http connection => 
		/// THREADSAFETY: Called from web server thread => do not call Unity code from this thread!
		/// </summary>
		/// <param name="data">Data.</param>
		public void Save(Dictionary<string, string> data) {
			string filename = data ["file"];
			string content = data ["content"];

			ServerLog.Log ("Writing file \"" + filename+"\"");

			// Save the file
			Directory.CreateDirectory(configDir);
			using (StreamWriter sw = new StreamWriter(Path.Combine(configDir, filename+FILEEXT)))
			{
				sw.Write(content);
			}

			XmlDocument doc = new XmlDocument ();
			doc.Load (new StringReader (content));

			// Generate the code...
			string codecontent = new CodeGen().GenerateCode (scriptOutputDir, filename, doc);
			string fullpath = Path.Combine (scriptOutputDir, filename + ".cs");
			Directory.CreateDirectory(scriptOutputDir);
			using (StreamWriter sw = new StreamWriter(fullpath))
			{
				sw.Write(codecontent);
			}

			lock (lockThis) {
				specificAssetsToReload.Add (fullpath);
			}
		}

		/// <summary>
		/// Load a file
		/// 
		/// Called by an incoming http connection => 
		/// THREADSAFETY: Called from web server thread => do not call Unity code from this thread!
		/// </summary>
		/// <param name="data">Data.</param>
		public string Load(Dictionary<string, string> data) {
			string filename = data ["file"];
			string fullfilepath = Path.Combine (configDir, filename + FILEEXT);
			if (File.Exists (fullfilepath)) {
				using (StreamReader sr = new StreamReader (fullfilepath)) {
					return sr.ReadToEnd ();
				}
			}
			return null;
		}

		/// <summary>
		/// Delete a file
		/// 
		/// Called by an incoming http connection => 
		/// THREADSAFETY: Called from web server thread => do not call Unity code from this thread!
		/// </summary>
		/// <param name="data">Data.</param>
		public void Delete(Dictionary<string, string> data) {
			string filename = data ["file"];
			File.Delete (Path.Combine (configDir, filename + FILEEXT));
			string fullpath = Path.Combine (scriptOutputDir, filename + ".cs");
			File.Delete (fullpath);

			lock (lockThis) {
				specificAssetsToReload.Add (fullpath);
			}
		}

		/// <summary>
		/// Get the list of all Script files
		/// 
		/// Called by an incoming http connection => 
		/// THREADSAFETY: Called from web server thread => do not call Unity code from this thread!
		/// </summary>
		/// <returns>The files.</returns>
		public List<string> ListFiles() {
			List<string> files = new List<string> ();
			if (Directory.Exists (configDir)) {
				string[] filesindir = Directory.GetFiles (configDir);
				foreach (string file in filesindir) {
					string filename = new FileInfo (file).Name;
					if (filename.EndsWith (FILEEXT)) {
						filename = filename.Substring (0, filename.Length - FILEEXT.Length);
						files.Add (filename);
					}
				}
			}
			return files;
		}

	}
}

