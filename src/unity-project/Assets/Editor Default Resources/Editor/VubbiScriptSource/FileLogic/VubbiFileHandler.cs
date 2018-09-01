using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Reflection;
using System.IO;
using System.Text.RegularExpressions;
using UnityEditor.Callbacks;

namespace vubbiscript
{
	public class VubbiFileHandler
	{
		private VubbiFileHandler () {}

		/// <summary>
		/// Generates the header of the Vubbi file.
		/// </summary>
		/// <param name="id">Identifier.</param>
		public static string GenerateHeader () {
			return 
@"/* 
 * This script was created with Vubbi.
 * 
 * WATCH OUT: Changes to this file will be lost when you resaved from Vubbi.
 */

";
		}

		/// <summary>
		/// Configures the Vubbi icon for a file.
		/// </summary>
		public static void InitVubbiIcon () {
			// Make a new object of the type
			UnityEngine.Object obj = ScriptableObject.CreateInstance<VisualBlockScript> ();

			// Find the texture
			// Note: this texture might be rescaled. 
			// If we don't want this, we might want to take a look at:
			// https://github.com/MattRix/UnityDecompiled/blob/master/UnityEditor/UnityEditor/IconSelector.cs
			// => See if we can modify the internal arrays it has there
			// (But that is even more hacky)
			Texture2D icon = AssetDatabase.LoadAssetAtPath("Assets/Editor Default Resources/Editor/VubbiScript/VubbiFileIcon.png", typeof(Texture2D)) as Texture2D;
			if (icon == null) {
				Debug.Log ("Cannot load Vubbi icon.");
				return;
			}

			// Set the icon
			var editorGUIUtilityType = typeof(EditorGUIUtility);
			var bindingFlags = BindingFlags.InvokeMethod | BindingFlags.Static | BindingFlags.NonPublic;
			var args = new object[] { obj, icon };
			editorGUIUtilityType.InvokeMember("SetIconForObject", bindingFlags, null, null, args);
			// Not sure if this is needed:
			//var editorUtilityType = typeof(EditorUtility);
			//editorUtilityType.InvokeMember("ForceReloadInspectors", bindingFlags, null, null, null);

			// Clean up the object again
			ScriptableObject.DestroyImmediate (obj);
		}

		/// <summary>
		/// Makes a new Vubbi Script.
		/// </summary>
		/// <param name="path">Path. Starting with Assets/... without filename!</param>
		/// <param name="name">Name. Filename without extension OR full path starting with Assets/... in case path is null. If null, a default name is chosen.</param>
		/// <param name="openEditor">If set to <c>true</c> opens the Vubbi editor after creation.</param>
		public static VisualBlockScript CreateAsset (string path, string name, bool openEditor)
		{
			VisualBlockScript asset = ScriptableObject.CreateInstance<VisualBlockScript> ();

			name = name!=null ? name : "NewVubbiScript";

			// TODO: DOES NOT WORK CORRECTLY - add spaces in the name => which is not allowed for scripts
			string assetPathAndName = AssetDatabase.GenerateUniqueAssetPath ((path!=null?path + "/":"") + name + ".asset");

			AssetDatabase.CreateAsset (asset, assetPathAndName);

			AssetDatabase.SaveAssets ();
			AssetDatabase.Refresh();
			EditorUtility.FocusProjectWindow ();
			Selection.activeObject = asset;

			// TODO: write the C# file already also?

			if (openEditor) {
				// Open the file in the editor!
				OpenAssetFile (assetPathAndName);
			}

			return asset;
		}

		/// <summary>
		/// Updates the content of the Vubbi script.
		/// </summary>
		/// <param name="path">Path. Starting with Assets/... without extension.</param>
		/// <param name="content">Content.</param>
		public static void UpdateVubbiScriptContent (string path, string content) {
			VisualBlockScript script = AssetDatabase.LoadAssetAtPath<VisualBlockScript> (path + ".asset");
			if (script == null) {
				CreateAsset (null, path, false);
				script = AssetDatabase.LoadAssetAtPath<VisualBlockScript> (path + ".asset");
			}
			script.data = content;
			EditorUtility.SetDirty (script);
			AssetDatabase.SaveAssets ();
			AssetDatabase.Refresh ();
			EditorUtility.FocusProjectWindow ();
			Selection.activeObject = script;
		}

		/// <summary>
		/// Gets the content of the Vubbi script.
		/// </summary>
		/// <returns>The blocknity script content.</returns>
		/// <param name="path">Path. Starting with Assets/... without extension.</param>
		public static string GetVubbiScriptContent (string path) {
			VisualBlockScript script = AssetDatabase.LoadAssetAtPath<VisualBlockScript> (path + ".asset");
			if (script == null) {
				return "";
			} else {
				return script.data;
			}
		}

		/// <summary>
		/// Utility to get the current path in the Unity Editor (where the file should be placed).
		/// </summary>
		/// <returns>The current path.</returns>
		private static string GetCurrentPath () {
			string path = AssetDatabase.GetAssetPath (Selection.activeObject);
			if (path == "") 
			{
				path = "Assets";
			} 
			else if (Path.GetExtension (path) != "") 
			{
				path = path.Replace (Path.GetFileName (AssetDatabase.GetAssetPath (Selection.activeObject)), "");
			}
			return path;
		}

		/// <summary>
		/// Generates the name of the camel case file. (SEE ALSO toCamelCase in Main.js)
		/// </summary>
		/// <returns>The camel case file name.</returns>
		/// <param name="str">String.</param>
		public static string GenerateCamelCaseFileName(string str) {
			str = Regex.Replace (str, "[^A-Za-z0-9]", " ");
			str = Regex.Replace (str, "\\s(.)", delegate(Match match) {
				return match.Groups[0].Value.ToUpper();
			});
			str = Regex.Replace (str, "\\s", "");
			str = Regex.Replace (str, "^(.)", delegate(Match match) {
				return match.Groups[0].Value.ToUpper();
			});
			str = Regex.Replace (str, "^([0-9])", delegate(Match match) {
				return "_"+match.Groups[0].Value;
			});
			return str;
		}

		/// <summary>
		/// Starts the UI to create a Vubbi script file.
		/// </summary>
		[MenuItem("Assets/Create/VubbiScript", false, 50)]
		public static void CreateVubbiScript ()
		{
			string path = GetCurrentPath ();
			MakeFileRequest request = new MakeFileRequest (path);

			VisualBlockFileNameWindow.Create(request, "Enter a name for the script", new string[] { "Text: " },
				new string[] { "MyScript" }, GUIUtility.GUIToScreenPoint(new Vector2(Screen.width/2f, Screen.height/2f)));//Event.current.mousePosition
		}

		/// <summary>
		/// Handles double clicking on a Vubbi script file
		/// </summary>
		/// <returns><c>true</c>, if we clicked on a Vubbi file.</returns>
		/// <param name="instanceID">Unity Asset Instance Id.</param>
		/// <param name="line">Line.</param>
		[OnOpenAssetAttribute(1)]
		public static bool OpenByClicking(int instanceID, int line) {
			UnityEngine.Object obj = EditorUtility.InstanceIDToObject(instanceID);
			if (obj is VisualBlockScript) {
				string assetPath = AssetDatabase.GetAssetPath (obj);
				OpenAssetFile (assetPath);
				return true;
			}
			return false;
		}

		/// <summary>
		/// Creates a new Vubbi asset at a certain path with a certain name (name still processed) and opens the editor.
		/// </summary>
		/// <param name="path">Path.</param>
		/// <param name="name">Name.</param>
		public static void CreateNewAssetWithName(string path, string name) 
		{
			// So, we know the name now... Create it
			CreateAsset (path, GenerateCamelCaseFileName(name), true);
		}

		/// <summary>
		/// Opens the Vubbi asset file in the editor.
		/// </summary>
		/// <param name="assetPathAndName">Path to the asset (Starts with Asset/ ) INCLUDING ".asset" extension!</param>
		public static void OpenAssetFile(string assetPathAndName) {
			OpenFile (assetPathAndName.Substring("Assets/".Length).Replace(".asset", ""));
		}

		/// <summary>
		/// Opens the Vubbi asset file in the editor.
		/// </summary>
		/// <param name="file">File. WITHOUT Asset/ WITHOUT extension</param>
		public static void OpenFile(string file){
			bool OPENINBROWSER = true;
			if (OPENINBROWSER) {
				Application.OpenURL ("http://localhost:8040/#"+file);
			} else {
				// DID NOT WORK SO WELL - still here in case we decide to use it again...
				// (Difficult to minimize and the window loses data when you start/stop a game)
				WebEditorWindow.OpenFile (file);
			}
		}

		//
		// Data migration v2 -> v3
		//
		// REMOVED FROM MENU!! => [MenuItem("Help/Migrate Scratchity v0.1 & v0.2 Data", false, 500)]
		public static void MigrationData() {
			string oldDataDir = Path.Combine (UnityEngine.Application.dataPath, "../BlockScriptData");
			string scriptDir = Path.Combine (UnityEngine.Application.dataPath, "Scripts");
			if (Directory.Exists (oldDataDir)) {
				string[] files = Directory.GetFiles (oldDataDir);
				foreach (string file in files) {
					if (".xml".Equals (Path.GetExtension (file)) && ".vcs".Equals (Path.GetExtension (Path.GetFileNameWithoutExtension (file)))) {
						UnityEngine.Debug.Log ("Migrating file: "+file);
						string actualname = Path.GetFileNameWithoutExtension (Path.GetFileNameWithoutExtension (file));
						string filecontent = File.ReadAllText (file);
						VisualBlockScript dataObj = VubbiFileHandler.CreateAsset ("Assets/Scripts", actualname, false);
						dataObj.data = filecontent;
						EditorUtility.SetDirty (dataObj);
						AssetDatabase.SaveAssets ();
						AssetDatabase.Refresh ();
					}
				}
				// For safety reasons, do NOT DELETE OLD DATA from before migration!
				// Directory.Delete (oldDataDir, true);
			}
		}
	}

	/// <summary>
	/// Handles the request to create a new Vubbi file. (Keeps track of the information while the user is entering the name)
	/// </summary>
	class MakeFileRequest : IModal 
	{
		private string usePath;

		public MakeFileRequest(string usePath) {
			this.usePath = usePath;
		}

		public void ModalClosed(ModalWindow window) {
			VisualBlockFileNameWindow rename = window as VisualBlockFileNameWindow;

			if (rename == null || window.Result != WindowResult.Ok)
				return;

			string filename = rename.Texts[0];

			VubbiFileHandler.CreateNewAssetWithName (usePath, filename);
		}
	}
}

