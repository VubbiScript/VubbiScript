using System;
using System.Xml;
using System.Collections.Generic;
using System.IO;
using System.Threading;

using UnityEditor;

namespace vubbiscript
{

	/// <summary>
	/// Vubbi API. Contains all kinds of calls that could be called from the application.
	/// </summary>
	public class VubbiApi
	{

		// Some settings
		private string scriptOutputDir;

		// Constructor... Getting settings...
		public VubbiApi () {
			scriptOutputDir = UnityEngine.Application.dataPath;
		}

		private struct SaveEntry {
			public string filename;
			public string content;
			public string code;
		}

		private class LoadEntry {
			public string filename;
			public string content;
			public WaitHandle waitHandle;
		}

		// -- Warning THREADSAFETY: accessed from multiple threads! Use locking!
		private System.Object lockThis = new System.Object();
		private List<SaveEntry> specificAssetsToSave = new List<SaveEntry> ();
		private List<LoadEntry> specificAssetsToLoad = new List<LoadEntry> ();
		// --

		/// <summary>
		/// Called every update call of Unity
		///
		/// THREADSAFETY -> In this thread we can do stuff with Unity!
		/// </summary>
		public void OnUpdate() {
			// 
			lock(lockThis) {
				string origin = UnityEngine.Application.dataPath.Replace("\\","/");


				// SAVE Asset & Script (in the Unity Thread)
				try{
					foreach(SaveEntry assetToSave in specificAssetsToSave) {
						string path = assetToSave.filename;
						string content = assetToSave.content;
						string codecontent = assetToSave.code;

						// Update Vubbi file
						VubbiFileHandler.UpdateVubbiScriptContent (path, content);

						// Save the generated code
						string fullpathcs = path + ".cs";
						using (StreamWriter sw = new StreamWriter(fullpathcs))
						{
							sw.Write(codecontent);
						}

						AssetDatabase.ImportAsset (path+".cs");
					}
				} finally {
					specificAssetsToSave.Clear ();
				}

				// LOAD Asset & Script (in the Unity Thread)
				try{
					foreach (LoadEntry assetToLoad in specificAssetsToLoad) {
						assetToLoad.content = VubbiFileHandler.GetVubbiScriptContent (assetToLoad.filename);
						((AutoResetEvent)assetToLoad.waitHandle).Set ();
					}
				} finally {
					specificAssetsToLoad.Clear ();
				}
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
			string codecontent = data ["code"];

			ServerLog.Log ("Saving \"" + filename+"\"");

			string fullpath = Path.Combine (scriptOutputDir, filename);
			string directory = Path.GetDirectoryName (fullpath);

			// Save the file
			Directory.CreateDirectory(directory);

			SaveEntry entry = new SaveEntry ();
			entry.filename = "Assets/"+filename;
			entry.content = content;
			entry.code = VubbiFileHandler.GenerateHeader() + codecontent;

			lock (lockThis) {
				specificAssetsToSave.Add (entry);
			}

			// Note: if the save throws an error we will never know (we are in a different thread and we are not waiting for the save)
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

			LoadEntry loadEntry = new LoadEntry ();
			loadEntry.filename = "Assets/" + filename;
			loadEntry.waitHandle = new AutoResetEvent (false);

			lock (lockThis) {
				specificAssetsToLoad.Add (loadEntry);
			}

			// Load is done in another thread -> wait for it
			loadEntry.waitHandle.WaitOne (10000);

			return loadEntry.content;
		}
	}
}

