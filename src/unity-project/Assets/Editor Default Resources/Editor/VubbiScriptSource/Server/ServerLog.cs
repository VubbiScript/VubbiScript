using System;
using UnityEngine;

namespace vubbiscript
{
	/// <summary>
	/// All logging calls go through this object.
	/// 
	/// The idea is that we write them to a log file when running in RELEASE mode
	/// </summary>
	public class ServerLog
	{
		private ServerLog (){}

		public static void Log(string msg){
			System.DateTime now = System.DateTime.UtcNow;
			String time = now.ToLongTimeString ()+":"+now.Millisecond;
			#if UNITY_EDITOR
			// Development mode!
			Debug.Log(time+" ~ "+msg);
			#else
			// Release mode!
			// TODO: What to do with the logging info?
			#endif
		}

		public static void Log(Exception e){
			#if UNITY_EDITOR
			Debug.LogException (e);
			#else
			// Release mode!
			// TODO: What to do with the logging info?
			#endif
		}

		public static void LogInfo(string msg){
			Log(msg);
		}
	}
}

