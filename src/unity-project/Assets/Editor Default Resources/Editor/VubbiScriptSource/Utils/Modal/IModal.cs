
// SOURCE: https://forum.unity3d.com/threads/editor-modal-window.222018/

namespace vubbiscript
{

	/// <summary>
	/// This EditorWindow can recieve and send Modal inputs.
	/// </summary>
	public interface IModal
	{
		/// <summary>
		/// Called when the associated modal is closed.
		/// </summary>
		void ModalClosed(ModalWindow window);
	}

}