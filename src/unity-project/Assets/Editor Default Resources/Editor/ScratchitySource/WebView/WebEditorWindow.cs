using UnityEngine;
using UnityEditor;
using System;
using System.Reflection;

// Source:
// https://gist.github.com/cofruben/26882cf1a800c93eb24c7cbe15cbb7fa
// and
// https://gist.github.com/drawcode/4596778

// See also decompiled code of the AssetStoreWindow: 
// https://github.com/MattRix/UnityDecompiled/blob/master/UnityEditor/UnityEditor/AssetStoreWindow.cs

/// <summary>
/// Web editor window.
/// </summary>
public class WebEditorWindow : EditorWindow, IHasCustomMenu{
	// The webview
	internal UnityEngine.Object m_WebView;

	// Error Handling
	int initErrorLevel = 0;
	bool errorLogged = false;

	// See AssetStoreWindow
	private bool m_IsDocked;
	private bool m_SyncingFocus;

	private WebEditorContext m_ContextScriptObject;

	// Things looked up by reflection
	private Type webViewType;
	private Type guiClipType;
	private MethodInfo setSizeAndPositionMethod;
	private MethodInfo loadURLMethod;
	private MethodInfo dockedGetterMethod;
	private MethodInfo unclipMethod;

	/// <summary>
	/// The url on which Scratchity is hosted!
	/// </summary>
	string urlText = "http://localhost:8040";


	[MenuItem ("Window/Scratchity Code Editor %#w")]
	/// <summary>
	/// Open the Scratchity Unity Window
	/// </summary>
	static void Load() {
		WebEditorWindow window = (WebEditorWindow)WebEditorWindow.GetWindow(typeof(WebEditorWindow));
		window.Init();
		window.CreateContextObject();
		window.Show ();
		window.titleContent = new GUIContent("Scratchity Code Editor");
	}

	public static void OpenFileId(string fileid) {
		Load ();
		WebEditorWindow window = (WebEditorWindow)WebEditorWindow.GetWindow(typeof(WebEditorWindow));
		// TODO: open the correct file??
		Debug.Log("Open fileid: "+fileid);
		window.Focus ();
	}

	public WebEditorWindow() {
		position = new Rect(100,100,800,600);
	}

	/**
	 * Called whenever an issue occurs with loading (or reflection)
	 */
	private void ShowCouldNotLoadError(string actualCause, Type logMethodsType) {
		if (errorLogged) {
			return;
		}
		initErrorLevel++;
		Debug.LogError ("Error Initializing Scratchity Code Editor Window. "+actualCause);
		if (logMethodsType != null) {
			DebugLogMethods (logMethodsType);
		}
		Close ();errorLogged = true;
	}

	// Init the window
	void Init() {
		initErrorLevel = 1;
		errorLogged = false;

		//Get docked property getter MethodInfo
		dockedGetterMethod = typeof(EditorWindow).GetProperty("docked", fullBinding).GetGetMethod(true);
		if (dockedGetterMethod == null) {
			ShowCouldNotLoadError ("Could not find \"docked\" getter in EditorWindow.", typeof(EditorWindow));
			initErrorLevel++;
		}
		initErrorLevel--;
	}

	public virtual void AddItemsToMenu(GenericMenu menu)
	{
		menu.AddItem(new GUIContent("Reload"), false, new GenericMenu.MenuFunction(this.Reload));
	}

	public void Reload()
	{
		this.m_IsDocked = BaseDocked;
		ReflWebViewType.GetMethod ("Reload").Invoke (m_WebView, new object[]{});
	}

	public void OnLoadError(string url)
	{
		if (this.m_WebView != null)
		{
			return;
		}
		// Loading page failed...
	}

	public void OnInitScripting()
	{
		this.SetContextObject();
	}

	public void OnOpenExternalLink(string url)
	{
		Debug.Log ("Uh?");
		/*if (url.StartsWith("http://") || url.StartsWith("https://"))
		{
			this.m_ContextScriptObject.OpenBrowser(url);
		}*/
	}

	void OnGUI() {
		if(unclipMethod==null) {
			guiClipType = GetTypeFromAllAssemblies ("GUIClip");
			if (guiClipType == null) {
				ShowCouldNotLoadError ("Could not find GUIClip.", null);
				initErrorLevel++;
				return;
			}
			unclipMethod = guiClipType.GetMethod ("Unclip", new Type[]{typeof(Rect)});
		}

		Rect webViewRect = (Rect)unclipMethod.Invoke(null, new object[]{new Rect(0f, 0f, base.position.width, base.position.height)});
		if (this.m_WebView == null)
		{
			this.InitWebView(webViewRect);
		}
		if (Event.current.type == EventType.Layout)
		{
			if (setSizeAndPositionMethod == null) {
				setSizeAndPositionMethod = ReflWebViewType.GetMethod ("SetSizeAndPosition");
				if (setSizeAndPositionMethod == null) {
					ShowCouldNotLoadError ("Cannot find all required methods... Found:", ReflWebViewType);
					return;
				}
			}

			setSizeAndPositionMethod.Invoke(m_WebView, new object[] {(int)webViewRect.x, (int)webViewRect.y, (int)webViewRect.width,(int)webViewRect.height});
			this.UpdateDockStatusIfNeeded();
		}
	}

	public void UpdateDockStatusIfNeeded()
	{
		if (this.m_IsDocked != BaseDocked)
		{
			this.m_IsDocked = BaseDocked;
			if (this.m_ContextScriptObject != null)
			{
				this.m_ContextScriptObject.docked = BaseDocked;
				//this.InvokeJSMethod("document.AssetStore", "updateDockStatus", new object[0]);
			}
		}
	}

	public void OnFocus()
	{
		
		this.SetFocus(true);
	}
	public void OnLostFocus()
	{
		this.SetFocus(false);
	}

	public void OnBecameInvisible()
	{
		if (this.m_WebView==null)
		{
			return;
		}
		WebViewSetHostView(null);
	}

	public void OnDestroy()
	{
		UnityEngine.Object.DestroyImmediate(this.m_WebView);
		if (this.m_ContextScriptObject != null)
		{
			UnityEngine.Object.DestroyImmediate(this.m_ContextScriptObject);
		}
	}

	private void InitWebView(Rect pos) {
		this.m_IsDocked = BaseDocked;

		if (this.m_WebView == null) {

			var thisWindowGuiView = BaseMParent;
			if (thisWindowGuiView == null) {
				ShowCouldNotLoadError ("m_Parent property does not exit", typeof(EditorWindow));
				return;
			}

			m_WebView = ScriptableObject.CreateInstance (ReflWebViewType);
			ReflWebViewType.GetMethod ("InitWebView").Invoke (m_WebView, new object[] {
				thisWindowGuiView,
				(int)pos.x,
				(int)pos.y,
				(int)pos.width,
				(int)pos.height,
				true
			});

			// Set hide flags
			ReflWebViewType.GetProperty("hideFlags").SetValue(m_WebView, HideFlags.HideAndDontSave, null);

			if (BaseHasFocus) {
				this.SetFocus (true);
			}

			ReflWebViewType.GetMethod ("SetDelegateObject").Invoke (m_WebView, new object[] { this });

			loadURLMethod = ReflWebViewType.GetMethod ("LoadURL");
			loadURLMethod.Invoke (m_WebView, new object[] { urlText });

			this.wantsMouseMove = true;
		}
	}

	private void CreateContextObject()
	{
		if (this.m_ContextScriptObject != null)
		{
			return;
		}
		this.m_ContextScriptObject = ScriptableObject.CreateInstance<WebEditorContext>();
		this.m_ContextScriptObject.hideFlags = HideFlags.HideAndDontSave;
		this.m_ContextScriptObject.window = this;
	}
	private void SetContextObject()
	{
		this.CreateContextObject();
		this.m_ContextScriptObject.docked = BaseDocked;
		//this.m_WebView.DefineScriptObject("window.context", this.m_ContextScriptObject);
	}

	private void SetFocus(bool value)
	{
		if (this.m_SyncingFocus)
		{
			return;
		}
		this.m_SyncingFocus = true;
		if (this.m_WebView)
		{
			if (value)
			{
				WebViewSetHostView(BaseMParent);
				WebViewShow();
			}
			WebViewSetFocus(value);
		}
		this.m_SyncingFocus = false;
	}


	//
	//
	//
	// Private items from the window...
	//
	//
	//
	public Type ReflWebViewType {
		get {
			if (webViewType == null) {
				//Get WebView type
				webViewType = GetTypeFromAllAssemblies("WebView");
				if (webViewType == null) {
					ShowCouldNotLoadError ("Could not find WebView.", null);
					return null;
				}
			}
			return webViewType;
		}
	}

	public bool BaseDocked {
		get {return (bool)typeof(EditorWindow).GetProperty("docked", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(this, null);}
	}

	public bool BaseHasFocus {
		get {return (bool)typeof(EditorWindow).GetProperty("hasFocus", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(this, null);}
	}

	public object BaseMParent {
		get { return typeof(EditorWindow).GetField ("m_Parent", BindingFlags.Instance | BindingFlags.NonPublic).GetValue (this); }
	}

	public void WebViewSetHostView(object view){
		ReflWebViewType.GetMethod ("SetHostView").Invoke (this.m_WebView, new object[]{ view });
	}

	public void WebViewShow(){
		ReflWebViewType.GetMethod ("Show").Invoke (this.m_WebView, new object[]{ });
	}

	public void WebViewSetFocus(bool focus){
		ReflWebViewType.GetMethod ("SetFocus").Invoke (this.m_WebView, new object[]{ focus });
	}

	//
	//
	//
	// Tools for doing Reflection...
	//
	//
	//

	static BindingFlags fullBinding = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static;
	static StringComparison ignoreCase = StringComparison.CurrentCultureIgnoreCase;

	public static Type GetTypeFromAllAssemblies(string typeName) {
		Assembly[] assemblies = System.AppDomain.CurrentDomain.GetAssemblies();
		foreach(Assembly assembly in assemblies) {
			Type[] types = assembly.GetTypes();
			foreach(Type type in types) {
				if(type.Name.Equals(typeName, ignoreCase) || type.Name.Contains('+' + typeName)) //+ check for inline classes
					return type;
			}
		}
		return null;
	}

	void DebugLogMethods(Type t) {
		MethodInfo[] methods = t.GetMethods (fullBinding);
		string totalMsg = "";
		foreach (MethodInfo met in methods) {
			ParameterInfo[] param = met.GetParameters ();
			string pStr = "";
			foreach(ParameterInfo p in param) {
				if (pStr.Length > 0) {
					pStr += ", ";
				}
				pStr += p.ParameterType.FullName;
			}
			if (totalMsg.Length > 0) {
				totalMsg += "\n";
			}
			totalMsg += " - " + met.Name + " (" + pStr + ")";
		}
		PropertyInfo[] properties = t.GetProperties (fullBinding);
		foreach (PropertyInfo prop in properties) {
			
			totalMsg += " - " + prop.Name+":"+prop.DeclaringType;
		}
		FieldInfo[] fields = t.GetFields (fullBinding);
		foreach (FieldInfo field in fields) {
			totalMsg += "\n - " + field.Name+":"+field.DeclaringType;
		}
		Debug.Log (totalMsg);
	}
}