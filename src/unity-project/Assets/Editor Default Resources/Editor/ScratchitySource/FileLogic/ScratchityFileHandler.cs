using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Reflection;
using System.IO;
using System.Text.RegularExpressions;
using UnityEditor.Callbacks;

namespace scratchity
{
	public class ScratchityFileHandler
	{
		private ScratchityFileHandler () {}

		/// <summary>
		/// Generates the header of the Scratchity file.
		/// </summary>
		/// <param name="id">Identifier.</param>
		public static string GenerateHeader () {
			return 
@"/* 
 * Dit script was gemaakt met Scratchity.
 * 
 * PAS OP: Aanpassingen aan deze code zullen verloren gaan als je opnieuw opslaat vanuit Scratchity.
 */

";
		}

		/// <summary>
		/// Configures the scratchity icon for a file.
		/// </summary>
		public static void InitScratchityIcon () {
			// Make a new object of the type
			UnityEngine.Object obj = ScriptableObject.CreateInstance<VisualBlockScript> ();

			// Find the texture
			// Note: this texture might be rescaled. 
			// If we don't want this, we might want to take a look at:
			// https://github.com/MattRix/UnityDecompiled/blob/master/UnityEditor/UnityEditor/IconSelector.cs
			// => See if we can modify the internal arrays it has there
			// (But that is even more hacky)
			Texture2D icon = AssetDatabase.LoadAssetAtPath("Assets/Editor Default Resources/Editor/Scratchity/ScratchityIcon.png", typeof(Texture2D)) as Texture2D;
			if (icon == null) {
				Debug.Log ("Cannot load Scratchity icon.");
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
		/// Makes a new Scratchity Script.
		/// </summary>
		/// <param name="path">Path. Starting with Assets/... without filename!</param>
		/// <param name="name">Name. Filename without extension OR full path starting with Assets/... in case path is null. If null, a default name is chosen.</param>
		/// <param name="openEditor">If set to <c>true</c> opens the Scratchity editor after creation.</param>
		public static VisualBlockScript CreateAsset (string path, string name, bool openEditor)
		{
			VisualBlockScript asset = ScriptableObject.CreateInstance<VisualBlockScript> ();

			name = name!=null ? name : "NewScratchityScript";

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
		/// Updates the content of the Scratchity script.
		/// </summary>
		/// <param name="path">Path. Starting with Assets/... without extension.</param>
		/// <param name="content">Content.</param>
		public static void UpdateScratchityScriptContent (string path, string content) {
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
		/// Gets the content of the Scratchity script.
		/// </summary>
		/// <returns>The blocknity script content.</returns>
		/// <param name="path">Path. Starting with Assets/... without extension.</param>
		public static string GetScratchityScriptContent (string path) {
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
		/// Starts the UI to create a Scratchity script file.
		/// </summary>
		[MenuItem("Assets/Create/Scratchity Script", false, 50)]
		public static void CreateScratchityScript ()
		{
			string path = GetCurrentPath ();
			MakeFileRequest request = new MakeFileRequest (path);

			VisualBlockFileNameWindow.Create(request, "Enter a name for the script", new string[] { "Text: " },
				new string[] { "MyScript" }, GUIUtility.GUIToScreenPoint(new Vector2(Screen.width/2f, Screen.height/2f)));//Event.current.mousePosition
		}

		/// <summary>
		/// Handles double clicking on a Scratchity script file
		/// </summary>
		/// <returns><c>true</c>, if we clicked on a Scratchity file.</returns>
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
		/// Creates a new Scratchity asset at a certain path with a certain name (name still processed) and opens the editor.
		/// </summary>
		/// <param name="path">Path.</param>
		/// <param name="name">Name.</param>
		public static void CreateNewAssetWithName(string path, string name) 
		{
			// So, we know the name now... Create it
			CreateAsset (path, GenerateCamelCaseFileName(name), true);
		}

		/// <summary>
		/// Opens the Scratchity asset file in the editor.
		/// </summary>
		/// <param name="assetPathAndName">Path to the asset (Starts with Asset/ ) INCLUDING ".asset" extension!</param>
		public static void OpenAssetFile(string assetPathAndName) {
			OpenFile (assetPathAndName.Substring("Assets/".Length).Replace(".asset", ""));
		}

		/// <summary>
		/// Opens the Scratchity asset file in the editor.
		/// </summary>
		/// <param name="file">File. WITHOUT Asset/ WITHOUT extension</param>
		public static void OpenFile(string file){
			WebEditorWindow.OpenFile (file);
		}

		//
		// Data migration v2 -> v3
		//
		[MenuItem("Help/Migrate Scratchity Data", false, 500)]
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
						VisualBlockScript dataObj = ScratchityFileHandler.CreateAsset ("Assets/Scripts", actualname, false);
						dataObj.data = filecontent;
						AssetDatabase.SaveAssets ();
						AssetDatabase.Refresh ();
					}
				}
				Directory.Delete (oldDataDir, true);
			}
		}
	}

	/// <summary>
	/// Handles the request to create a new Scratchity file. (Keeps track of the information while the user is entering the name)
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

			ScratchityFileHandler.CreateNewAssetWithName (usePath, filename);
		}
	}
}

