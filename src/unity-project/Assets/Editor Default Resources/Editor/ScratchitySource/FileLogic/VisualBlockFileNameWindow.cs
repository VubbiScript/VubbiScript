using UnityEngine;
using UnityEditor;

namespace scratchity {

	/// <summary>
	/// BASED ON: https://forum.unity3d.com/threads/editor-modal-window.222018/
	/// The rename popup is a generic popup that allow the user to input a name or to rename an existing one.
	/// You can pass a delegate to valide the currently input string.
	/// 
	/// => Changed to simple filename popup
	/// </summary>
	public class VisualBlockFileNameWindow : ModalWindow
	{
		public const float BUTTONS_HEIGHT = 30;

		public const float FIELD_HEIGHT = 20;

		public const float HEIGHT = 56;
		public const float WIDTH = 250;

		private string[] labels;

		private string[] texts;

		public string[] Texts
		{
			get { return texts; }
		}

		public static VisualBlockFileNameWindow Create(IModal owner, string title, string[] labels, string[] texts, Vector2 position)
		{
			VisualBlockFileNameWindow rename = VisualBlockFileNameWindow.CreateInstance<VisualBlockFileNameWindow>();

			rename.owner = owner;
			rename.titleContent = new GUIContent(title);
			rename.labels = labels;
			rename.texts = texts;

			float halfWidth = WIDTH / 2;

			float x = position.x - halfWidth;
			float y = position.y;

			float height = HEIGHT + (labels.Length * FIELD_HEIGHT);

			Rect rect = new Rect(x, y, 0, 0);
			rename.position = rect;
			rename.ShowAsDropDown(rect, new Vector2(WIDTH, height));

			return rename;
		}

		protected override void Draw(Rect region)
		{
			int state = -1;

			if (Event.current.type == EventType.KeyDown)
			{
				if (Event.current.keyCode == KeyCode.Return)
					state = 1;

				if (Event.current.keyCode == KeyCode.Escape)
					state = 0;
			}

			GUILayout.BeginArea(region);

			GUILayout.Space(5);

			for (int i = 0; i < texts.Length; i++)
			{
				GUILayout.BeginHorizontal();

				GUI.color = Color.white;
				texts[i] = EditorGUILayout.TextField(texts[i]);

				GUILayout.EndHorizontal();
			}

			GUILayout.Space(5);

			GUILayout.BeginHorizontal();

			//GUI.enabled = valid;

			if (GUILayout.Button("Ok"))
				state = 1;

			GUI.enabled = true;

			if (GUILayout.Button ("Cancel"))
				state = 0;

			GUILayout.EndHorizontal();
			GUILayout.EndArea();

			if (state > -1) {
				if (state == 0) {
					Cancel ();
				} else {
					Ok ();
				}
			}
		}
	}

}