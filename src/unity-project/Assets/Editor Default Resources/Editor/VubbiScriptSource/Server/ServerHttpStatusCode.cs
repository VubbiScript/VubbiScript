using System;

namespace vubbiscript
{
	/// <summary>
	/// 
	/// Small class used by the VubbiServer
	/// 
	/// </summary>
	public class ServerHttpStatusCode
	{
		
		static ServerHttpStatusCode () {
			OK = new ServerHttpStatusCode("200 OK");
			ERR_404_FILENOTFOUND = new ServerHttpStatusCode("404 File not found");
		}

		public static ServerHttpStatusCode OK {get; private set;}
		public static ServerHttpStatusCode ERR_404_FILENOTFOUND {get; private set; }

		private String stringRepresentation;
		private ServerHttpStatusCode(string stringRepresentation) {
			this.stringRepresentation = stringRepresentation;
		}

		public override String ToString(){
			return stringRepresentation;
		}
	}
}

