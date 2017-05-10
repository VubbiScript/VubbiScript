using System;
using UnityEngine;

/// <summary>
/// Some object needed by the WebEditorWindow.
/// </summary>
public class WebEditorContext : ScriptableObject
{
	public bool docked;
	public WebEditorWindow window;

	public WebEditorContext ()
	{
	}
}
