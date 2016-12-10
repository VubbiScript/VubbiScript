// Generic
using System.Collections.Generic;

// C# Parser & AST
using ICSharpCode.NRefactory;
using ICSharpCode.NRefactory.Visitors;
using ICSharpCode.NRefactory.Parser;
using ICSharpCode.NRefactory.PrettyPrinter;
using Ast = ICSharpCode.NRefactory.Ast;

using Easy = ICSharpCode.EasyCodeDom.Easy;

// Writing Files
using System.IO;

// Processing Blockly output
using System.Xml;

// For conversion to camelcase etc
using System.Text.RegularExpressions;

namespace scratchity
{
	public class CodeGen {

		//private List<string> reservedKeywords = new List<string>() {};
		//private List<string> reservedIdentifiers = new List<string> (){ "List", "Input", "MonoBehavior" };
		// string, String, boolean, GameObject, ref, return, float, Vector3, Sprite, List, global...

		private Ast.TypeDeclaration myClass = null;
		private Dictionary<string, string> variableMap = null;

		public CodeGen(){
			variableMap = new Dictionary<string, string> ();
		}

		private string GetActualVariableName (string originalName) {
			if (variableMap.ContainsKey (originalName)) {
				return variableMap [originalName];
			}
			string newName = originalName;

			newName = Regex.Replace(newName, "[^A-Z-a-z0-9]", " ");
			newName = Regex.Replace(newName, "\\s.", delegate(Match match) {
				return match.Value.ToUpper();
			});
			newName = Regex.Replace (newName, "\\s", "");
			newName = Regex.Replace (newName, "^.", delegate(Match match) {
				return match.Value.ToLower();
			});
			newName = Regex.Replace (newName, "^[0-9]", delegate(Match match) {
				return "_"+match.Value;
			});
			if (newName.Length == 0) {
				newName = "var";
			}

			string newNameWithNumber = newName;
			int number = 0;
			while (variableMap.ContainsValue (newNameWithNumber)) {
				number++;
				newNameWithNumber = newName + number;
			}

			variableMap.Add (originalName, newNameWithNumber);

			return newName;
		}

		private string GetMessageName(string originalName) {
			string newName = originalName;

			newName = Regex.Replace(newName, "[^A-Z-a-z0-9]", " ");
			newName = Regex.Replace(newName, "\\s.", delegate(Match match) {
				return match.Value.ToUpper();
			});
			newName = Regex.Replace (newName, "\\s", "");
			newName = Regex.Replace (newName, "^.", delegate(Match match) {
				return match.Value.ToUpper();
			});
			newName = Regex.Replace (newName, "^[0-9]", delegate(Match match) {
				return "Msg"+match.Value;
			});
			if (newName.Length == 0) {
				newName = "Msg";
			}
			return newName;
		}

		private Ast.TypeReference GetTypeByName (string name) {
			if ("String".Equals (name)) {
				return new Ast.TypeReference ("string", true);
			} else if ("Boolean".Equals (name)) {
				return new Ast.TypeReference ("bool", true);
			} else if ("Number".Equals (name)) {
				return new Ast.TypeReference ("float", true);
			} else if ("GameObject".Equals (name)) {
				// requires import of UnityEngine
				return new Ast.TypeReference ("GameObject");
			} else if ("Vector3".Equals (name)) {
				// requires import of UnityEngine
				return new Ast.TypeReference ("Vector3");
			} else if ("Sprite".Equals (name)) {
				// requires import of UnityEngine
				return new Ast.TypeReference ("Sprite");
			} else if ("List_Number".Equals (name)) {
				// requires import of System.Collections.Generic
				return new Ast.TypeReference ("List", new List<Ast.TypeReference> () { new Ast.TypeReference ("float", true) });
			} else if ("List_String".Equals (name)) {
				// requires import of System.Collections.Generic
				return new Ast.TypeReference ("List", new List<Ast.TypeReference> () { new Ast.TypeReference ("string", true) });
			} else {
				throw new System.NotSupportedException ("Unknown type");
			}
		}

		private Ast.Expression GetTypeEmptyValueByName (string name) {
			if ("String".Equals (name) || "GameObject".Equals (name) || "Sprite".Equals (name)) {
				return new Ast.PrimitiveExpression (null);
			} else if ("Boolean".Equals (name)) {
				return new Ast.PrimitiveExpression (false);
			} else if ("Number".Equals (name)) {
				return new Ast.PrimitiveExpression (0f);
			} else if ("Vector3".Equals (name)) {
				return new Ast.PrimitiveExpression (null);// TODO JEPE FIX - use Vector3.zero
			} else if (name!=null && name.StartsWith("List_")) {
				return new Ast.PrimitiveExpression (null);
			} else {
				throw new System.NotSupportedException ("Unknown type");
			}
		}

		private string GetField(XmlNode node, string nameOfField) {
			if (node == null)
				return null;
			return node.SelectSingleNode ("field[@name='"+nameOfField+"']").InnerText;
		}

		private XmlNode GetFieldExpressionBlock(XmlNode node, string nameOfField) {
			if (node == null)
				return null;
			return node.SelectSingleNode ("value[@name='"+nameOfField+"']/block");
		}

		private XmlNodeList GetFieldStatements(XmlNode node, string nameOfField) {
			return node.SelectNodes ("statement[@name='" + nameOfField + "']/block");
		}

		public string GenerateCode (string writedir, string classname, XmlDocument blocklydoc) {
			// Build class
			Ast.CompilationUnit codeast = new Ast.CompilationUnit();
			// Imports...
			List<Ast.Using> usings = new List<Ast.Using>();
			usings.Add (new Ast.Using ("UnityEngine"));
			usings.Add (new Ast.Using ("System.Collections.Generic"));
			codeast.AddChild (new Ast.UsingDeclaration (usings));

			// Class
			Ast.Modifiers classMod = Ast.Modifiers.Public;
			myClass = new Ast.TypeDeclaration (classMod, new List<Ast.AttributeSection> ());
			myClass.Name = classname;
			myClass.Type = Ast.ClassType.Class;
			myClass.BaseTypes.Add (new Ast.TypeReference ("MonoBehaviour"));
			codeast.AddChild (myClass);

			Dictionary<string, Ast.MethodDeclaration> methodsByIdentifier = new Dictionary<string, Ast.MethodDeclaration> ();

			//
			// Run through xml
			//
			XmlNodeList instances = blocklydoc.SelectNodes("/block_set/instance");
			foreach (XmlNode node in instances) {
				//
				// We have a collection of blocks...
				//
				XmlNodeList blocks = node.SelectNodes("block");
				string firstType = blocks [0].Attributes ["type"].Value;

				if (firstType.Equals ("unityControls_classConfig")) {
					ProcessGlobalVariables (blocks [0]);
				} else if (firstType.Equals ("unityEvents_update")) {
					Ast.MethodDeclaration meth = new Ast.MethodDeclaration ();
					meth.Name = "Update";
					meth.TypeReference = new Ast.TypeReference ("void", true);
					meth.Body = new Ast.BlockStatement ();
					string MUID = "unityEvents_update"+"_"+meth.Name;
					if (methodsByIdentifier.ContainsKey (MUID)) {
						meth = methodsByIdentifier [MUID];
					} else {
						methodsByIdentifier.Add (MUID, meth);
						myClass.AddChild (meth);
					}
					ProcessStatements (meth.Body, true, blocks);
				} else if (firstType.Equals ("unityEvents_start")) {
					Ast.MethodDeclaration meth = new Ast.MethodDeclaration ();
					meth.Name = "Start";
					meth.TypeReference = new Ast.TypeReference ("void", true);
					meth.Body = new Ast.BlockStatement ();
					string MUID = "unityEvents_start"+"_"+meth.Name;
					if (methodsByIdentifier.ContainsKey (MUID)) {
						meth = methodsByIdentifier [MUID];
					} else {
						methodsByIdentifier.Add (MUID, meth);
						myClass.AddChild (meth);
					}
					ProcessStatements (meth.Body, true, blocks);
				} else if (firstType.Equals ("unityEvents_collision")) {
					Ast.MethodDeclaration meth = new Ast.MethodDeclaration ();
					string mode = GetField (blocks [0], "HIT");
					meth.Name = "OnCollision" + mode + "2D";
					meth.TypeReference = new Ast.TypeReference ("void", true);
					meth.Parameters.Add (new Ast.ParameterDeclarationExpression (new Ast.TypeReference ("Collision2D"), "coll"));// name of var = coll => used elsewhere in this file also
					meth.Body = new Ast.BlockStatement ();
					string MUID = "unityEvents_collision"+"_"+meth.Name;
					if (methodsByIdentifier.ContainsKey (MUID)) {
						meth = methodsByIdentifier [MUID];
					} else {
						methodsByIdentifier.Add (MUID, meth);
						myClass.AddChild (meth);
					}
					ProcessStatements (meth.Body, true, blocks);
				} else if (firstType.Equals ("unityGeneral_msgReceive")) {
					Ast.MethodDeclaration meth = new Ast.MethodDeclaration ();
					meth.Name = GetMessageName (GetField (blocks [0], "EVENT"));
					meth.TypeReference = new Ast.TypeReference ("void", true);
					meth.Body = new Ast.BlockStatement ();
					string MUID = "unityGeneral_msgReceive"+"_"+meth.Name;
					if (methodsByIdentifier.ContainsKey (MUID)) {
						meth = methodsByIdentifier [MUID];
					} else {
						methodsByIdentifier.Add (MUID, meth);
						myClass.AddChild (meth);
					}
					ProcessStatements (meth.Body, true, blocks);
				} else if (firstType.Equals ("unityEvents_mouse")) {
					Ast.MethodDeclaration meth = new Ast.MethodDeclaration ();
					meth.Name = "OnMouse"+GetField (blocks [0], "HOVER");
					meth.TypeReference = new Ast.TypeReference ("void", true);
					meth.Body = new Ast.BlockStatement ();
					string MUID = "unityEvents_mouse"+"_"+meth.Name;
					if (methodsByIdentifier.ContainsKey (MUID)) {
						meth = methodsByIdentifier [MUID];
					} else {
						methodsByIdentifier.Add (MUID, meth);
						myClass.AddChild (meth);
					}
					ProcessStatements (meth.Body, true, blocks);
				}


			}

			// Write new file
			IOutputAstVisitor output = new CSharpOutputVisitor();
			// TODO, parenthesis:
			//ICSharpCode.NRefactory.CSharp.InsertParenthesesVisitor x = null;
			// See https://github.com/icsharpcode/NRefactory/blob/master/ICSharpCode.NRefactory.CSharp/OutputVisitor/InsertParenthesesVisitor.cs
			codeast.AcceptVisitor(output, null);
			return output.Text;
		}

		private void ProcessStatements (Ast.BlockStatement parent, bool skipFirst, XmlNodeList items) {
			foreach (XmlNode node in items) {
				if (skipFirst) {
					skipFirst = false;
					continue;
				}
				parent.AddChild (ProcessStatement (node));
			}
		}

		private Ast.Expression Parenthesized(Ast.Expression expr){
			return new Ast.ParenthesizedExpression (expr);
		}

		private Ast.Expression ProcessExpression(XmlNode exprNode, Ast.Expression emptyretval) {
			string type = exprNode.Attributes ["type"].Value;
			if (type.Equals ("math_number")) {
				return new Ast.PrimitiveExpression (float.Parse (GetField (exprNode, "NUM")));
			} else if (type.Equals ("logic_boolean")) {
				return new Ast.PrimitiveExpression ("TRUE".Equals (GetField (exprNode, "BOOL")));
			} else if (type.Equals ("text")) {
				return new Ast.PrimitiveExpression (GetField (exprNode, "TEXT"));
			} else if (type.Equals ("logic_operation")) {
				string typestr = GetField (exprNode, "OP");
				Ast.BinaryOperatorType bintype = "OR".Equals (typestr) ? Ast.BinaryOperatorType.LogicalOr : Ast.BinaryOperatorType.LogicalAnd;
				Ast.Expression leftexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "A"), new Ast.PrimitiveExpression (false));
				Ast.Expression rightexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "B"), new Ast.PrimitiveExpression (false));
				return Parenthesized (new Ast.BinaryOperatorExpression (leftexpr, bintype, rightexpr));
			} else if (type.Equals ("logic_negate")) {
				Ast.Expression val = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "BOOL"), new Ast.PrimitiveExpression (false));
				return Parenthesized (new Ast.UnaryOperatorExpression (val, Ast.UnaryOperatorType.Not));
			} else if (type.Equals ("logic_compare")) {
				Ast.BinaryOperatorType bintype = Ast.BinaryOperatorType.Equality;
				string typestr = GetField (exprNode, "OP");
				if ("EQ".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.Equality;
				} else if ("NEQ".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.InEquality;
				} else if ("LT".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.LessThan;
				} else if ("LTE".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.LessThanOrEqual;
				} else if ("GT".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.GreaterThan;
				} else if ("GTE".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.GreaterThanOrEqual;
				}
				Ast.Expression leftexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "A"), new Ast.PrimitiveExpression (false));
				Ast.Expression rightexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "B"), new Ast.PrimitiveExpression (false));
				return Parenthesized (new Ast.BinaryOperatorExpression (leftexpr, bintype, rightexpr));
			} else if (type.Equals ("logic_ternary")) {
				Ast.Expression condexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "IF"), new Ast.PrimitiveExpression (false));
				Ast.Expression trueexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "THEN"), emptyretval);
				Ast.Expression falseexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "ELSE"), emptyretval);
				return Parenthesized (new Ast.ConditionalExpression (condexpr, trueexpr, falseexpr));
			} else if (type.Equals ("math_arithmetic")) {
				Ast.Expression leftexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "A"), new Ast.PrimitiveExpression (0));
				Ast.Expression rightexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "B"), new Ast.PrimitiveExpression (0));

				Ast.BinaryOperatorType bintype = Ast.BinaryOperatorType.Add;
				string typestr = GetField (exprNode, "OP");
				if ("ADD".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.Add;
				} else if ("MINUS".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.Subtract;
				} else if ("MULTIPLY".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.Multiply;
				} else if ("DIVIDE".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.Divide;
				} else if ("POWER".Equals (typestr)) {
					// An exception...
					Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Mathf"), "Pow");
					return InvokeExpr (what, leftexpr, rightexpr);
				} else if ("GTE".Equals (typestr)) {
					bintype = Ast.BinaryOperatorType.GreaterThanOrEqual;
				}
				return Parenthesized (new Ast.BinaryOperatorExpression (leftexpr, bintype, rightexpr));
			} else if (type.Equals ("robMath_change")) {
				return new Ast.PrimitiveExpression (null);// TODO JEPE !!!
			} else if (type.Equals ("math_round")) {
				string typestr = GetField (exprNode, "OP");
				string methodtocall = "";
				if ("ROUND".Equals (typestr)) {
					// TODO: introduce int and round to it
					methodtocall = "Round";
				} else if ("ROUNDUP".Equals (typestr)) {
					methodtocall = "Ceil";
				} else if ("ROUNDDOWN".Equals (typestr)) {
					methodtocall = "Floor";
				}
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "NUM"), new Ast.PrimitiveExpression (0));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Mathf"), methodtocall);
				return InvokeExpr (what, expr);
			} else if (type.Equals ("math_modulo")) {
				Ast.Expression leftexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "DIVIDEND"), new Ast.PrimitiveExpression (0));
				Ast.Expression rightexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "DIVISOR"), new Ast.PrimitiveExpression (0));
				return Parenthesized (new Ast.BinaryOperatorExpression (leftexpr, Ast.BinaryOperatorType.Modulus, rightexpr));
			} else if (type.Equals ("math_constrain")) {
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "VALUE"), new Ast.PrimitiveExpression (0));
				Ast.Expression lowexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "LOW"), new Ast.PrimitiveExpression (0));
				Ast.Expression hightexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "HIGH"), new Ast.PrimitiveExpression (0));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Mathf"), "Clamp");
				return InvokeExpr (what, expr, lowexpr, hightexpr);
			} else if (type.Equals ("math_random_int")) {
				// TODO: introduce "int"!
				Ast.Expression fromexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "FROM"), new Ast.PrimitiveExpression (0));
				Ast.Expression toexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "TO"), new Ast.PrimitiveExpression (0));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Random"), "Range");
				return InvokeExpr (what, CastInt (fromexpr), CastInt (toexpr));
			} else if (type.Equals ("math_random_float")) {
				return new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Random"), "value");
			} else if (type.Equals ("unityText_join")) {
				int joins = 0;
				XmlNode joinmut = exprNode.SelectSingleNode ("mutation/@else");
				if (joinmut != null) {
					joins = int.Parse (joinmut.Value);
				}
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "ADD0"), new Ast.PrimitiveExpression (""));
				for (int i = 1; i < joins; i++) {
					Ast.Expression expr2 = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "ADD" + i), new Ast.PrimitiveExpression (""));
					expr = new Ast.BinaryOperatorExpression (expr, Ast.BinaryOperatorType.Concat, expr2);
				}
				return Parenthesized (expr);
			} else if (type.Equals ("variables_get")) {
				return new Ast.IdentifierExpression (GetField (exprNode, "VAR"));
			} else if (type.Equals ("logic_null")) {
				return new Ast.PrimitiveExpression (null);
			}


			//
			// Unity specific expression...
			//
			else if (type.Equals ("unity_me")) {
				return new Ast.IdentifierExpression ("gameObject");
			} else if (type.Equals ("unityInput_key")) {
				string mode = GetField (exprNode, "PRESSED");
				string keycode = GetField (exprNode, "KEY");
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Input"), "GetKey" + mode);
				Ast.Expression key = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("KeyCode"), keycode);
				return InvokeExpr (what, key);
			} else if (type.Equals ("unityVector_make")) {
				Ast.Expression xexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "X"), new Ast.PrimitiveExpression (0));
				Ast.Expression yexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "Y"), new Ast.PrimitiveExpression (0));
				Ast.Expression zexpr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "Z"), new Ast.PrimitiveExpression (0));
				return new Ast.ObjectCreateExpression (new Ast.TypeReference ("Vector3"), new List<Ast.Expression> () {
					xexpr,
					yexpr,
					zexpr
				});
			} else if (type.Equals ("unityVector_x")) {
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "VECT"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				return new Ast.MemberReferenceExpression (expr, "x");
			} else if (type.Equals ("unityVector_y")) {
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "VECT"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				return new Ast.MemberReferenceExpression (expr, "y");
			} else if (type.Equals ("unityVector_z")) {
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "VECT"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				return new Ast.MemberReferenceExpression (expr, "z");
			} else if (type.Equals ("unityVector_length")) {
				Ast.Expression expr = ProcessOptionalExpression (GetFieldExpressionBlock (exprNode, "VECT"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				return new Ast.MemberReferenceExpression (expr, "magnitude");
			} else if (type.Equals ("unityGeneral_createGet")) {
				Ast.Expression who = ProcessGameObjectExpression (GetFieldExpressionBlock (exprNode, "WHO"));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Object"), "Instantiate");
				return InvokeExpr (what, who);
			} else if (type.Equals ("unityTime_levelload")) {
				return new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Time"), "timeSinceLevelLoad");
			} else if (type.Equals ("unityTime_delta")) {
				return new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Time"), "deltaTime");
			} else if (type.Equals ("unityPhysics_collOther")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("coll");
				return new Ast.MemberReferenceExpression (coll, "gameObject");
			} else if (type.Equals ("unityPhysics_collDirection")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("coll");
				return new Ast.MemberReferenceExpression (coll, "relativeVelocity");
			} else if (type.Equals ("unityPhysics_collSpeed")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("coll");
				return new Ast.MemberReferenceExpression (new Ast.MemberReferenceExpression (coll, "relativeVelocity"), "magnitude");
			} else if (type.Equals ("unityRaycast_gameobject")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("rayhit");
				return new Ast.MemberReferenceExpression (new Ast.MemberReferenceExpression (coll, "transform"), "gameObject");
			} else if (type.Equals ("unityRaycast_distance")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("rayhit");
				return new Ast.MemberReferenceExpression (coll, "distance");
			} else if (type.Equals ("unityRaycast_point")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("rayhit");
				return new Ast.MemberReferenceExpression (coll, "point");
			} else if (type.Equals ("unityRaycast_normal")) {
				Ast.Expression coll = new Ast.IdentifierExpression ("rayhit");
				return new Ast.MemberReferenceExpression (coll, "normal");
			} else if (type.Equals ("unityPhysics_angularSpeed")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (exprNode, "WHO")), "Rigidbody2D");
				return new Ast.MemberReferenceExpression (who, "angularVelocity");
			} else if (type.Equals ("unityPhysics_velocity")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (exprNode, "WHO")), "Rigidbody2D");
				return new Ast.MemberReferenceExpression (who, "velocity");
			} else if (type.Equals ("unityTransform_position")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (exprNode, "WHO")), "Transform");
				return new Ast.MemberReferenceExpression (who, "position");
			}


			throw new System.NotSupportedException ("Some unsupported expression used... "+type);
		}

		private Ast.Expression CastInt(Ast.Expression val) {
			return new Ast.CastExpression (new Ast.TypeReference ("int", true), val, Ast.CastType.PrimitiveConversion);
		}

		private Ast.Expression InvokeExpr(Ast.Expression what, params Ast.Expression[] args) {
			return new Ast.InvocationExpression (what, new List<Ast.Expression>(args));
		}

		private Ast.Expression ProcessOptionalExpression(XmlNode exprNode, Ast.Expression alt) {
			if (exprNode != null) {
				return ProcessExpression (exprNode, alt);
			} else {
				ServerLog.Log ("pick alt");
				return alt;
			}
		}

		private Ast.Expression ProcessGameObjectExpression(XmlNode whoNode) {
			if (whoNode != null) {
				return ProcessExpression (whoNode, new Ast.PrimitiveExpression(null));
			} else {
				return new Ast.IdentifierExpression ("gameObject");
			}
		}

		private Ast.Statement ProcessStatement(XmlNode statNode) {
			string type = statNode.Attributes ["type"].Value;
			if (type.Equals ("unityControls_if") || type.Equals ("unityControls_ifElse")) {
				// Read mutation information
				int elseifs = 0;
				int elses = 0;
				XmlNode elsemut = statNode.SelectSingleNode ("mutation/@else");
				if (elsemut != null) {
					elses = int.Parse (elsemut.Value);
				}
				XmlNode elseifmut = statNode.SelectSingleNode ("mutation/@elseif");
				if (elseifmut != null) {
					elseifs = int.Parse (elseifmut.Value);
				}

				Ast.Expression expr0 = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "IF0"), new Ast.PrimitiveExpression (false));
				Ast.IfElseStatement ifelse = new Ast.IfElseStatement (expr0);
				Ast.BlockStatement blockif = new Ast.BlockStatement ();
				ProcessStatements (blockif, false, GetFieldStatements (statNode, "DO0"));
				ifelse.TrueStatement.Add (blockif);

				for (int i = 1; i <= elseifs; i++) {
					Ast.Expression expri = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "IF" + i), new Ast.PrimitiveExpression (false));
					Ast.BlockStatement blocki = new Ast.BlockStatement ();
					ProcessStatements (blocki, false, GetFieldStatements (statNode, "DO" + i));
					ifelse.ElseIfSections.Add (new Ast.ElseIfSection (expri, blocki));
				}
				if (elses == 1) {
					Ast.BlockStatement blockelse = new Ast.BlockStatement ();
					ProcessStatements (blockelse, false, GetFieldStatements (statNode, "ELSE"));
					ifelse.FalseStatement.Add (blockelse);
				}

				return ifelse;
			} else if (type.Equals ("unityText_append")) {
				Ast.Expression varexpr = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "VAR"), new Ast.IdentifierExpression ("zzzz"));
				Ast.Expression textexpr = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "TEXT"), new Ast.PrimitiveExpression (0));
				return new Ast.ExpressionStatement (new Ast.AssignmentExpression (varexpr, Ast.AssignmentOperatorType.ConcatString, textexpr));
			} else if (type.Equals ("variables_set")) {
				// Read mutation information
				string dataType = "obj";
				XmlNode datatypemut = statNode.SelectSingleNode ("mutation/@datatype");
				if (datatypemut != null) {
					dataType = datatypemut.Value;
				}
				Ast.Expression varexpr = new Ast.IdentifierExpression(GetField (statNode, "VAR"));
				Ast.Expression textexpr = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "VALUE"), GetTypeEmptyValueByName(dataType));
				return new Ast.ExpressionStatement (new Ast.AssignmentExpression (varexpr, Ast.AssignmentOperatorType.Assign, textexpr));
			}


			//
			// Unity specific statements...
			//
			else if (type.Equals ("unityRender_setLook")) {
				Ast.Expression who = ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO"));
				Ast.Expression whoRenderer = GetComponent (who, "SpriteRenderer");
				Ast.Expression sprite = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "SPRITE"), new Ast.PrimitiveExpression (null));
				Ast.Expression what = new Ast.MemberReferenceExpression (whoRenderer, "sprite");
				return new Ast.ExpressionStatement (new Ast.AssignmentExpression (what, Ast.AssignmentOperatorType.Assign, sprite));
			} else if (type.Equals ("unityGeneral_destroy")) {
				Ast.Expression who = ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO"));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Object"), "Destroy");
				return new Ast.ExpressionStatement (InvokeExpr (what, who));
			} else if (type.Equals ("unityGeneral_create")) {
				Ast.Expression who = ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO"));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Object"), "Instantiate");
				return new Ast.ExpressionStatement (InvokeExpr (what, who));
			} else if (type.Equals ("unityGeneral_log")) {
				Ast.Expression tolog = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "WHAT"), new Ast.PrimitiveExpression (null));
				Ast.Expression what = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Debug"), "Log");
				return new Ast.ExpressionStatement (InvokeExpr (what, tolog));
			} else if (type.Equals ("unityGeneral_msgSend")) {
				Ast.Expression who = ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO"));
				Ast.Expression what = new Ast.MemberReferenceExpression (who, "SendMessage");
				string callname = GetMessageName (GetField (statNode, "MESSAGE"));
				bool hastolisten = "TRUE".Equals (GetField (statNode, "NEEDRECEIVE"));
				Ast.Expression req = new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("SendMessageOptions"), "DontRequireReceiver");
				if (hastolisten) {
					return new Ast.ExpressionStatement (InvokeExpr (what, new Ast.PrimitiveExpression (callname)));
				} else {
					return new Ast.ExpressionStatement (InvokeExpr (what, new Ast.PrimitiveExpression (callname), new Ast.PrimitiveExpression (null), req));
				}
			} else if (type.Equals ("unityPhysics_push")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO")), "Rigidbody2D");
				Ast.Expression vect = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "DIRECTION"), new Ast.PrimitiveExpression (null));
				return new Ast.ExpressionStatement (InvokeExpr (new Ast.MemberReferenceExpression (who, "AddForce"), vect));
			} else if (type.Equals ("unityPhysics_torque")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO")), "Rigidbody2D");
				Ast.Expression torque = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "TORQUE"), new Ast.PrimitiveExpression (0f));
				return new Ast.ExpressionStatement (InvokeExpr (new Ast.MemberReferenceExpression (who, "AddTorque"), torque));
			} else if (type.Equals ("unityTransform_jumpto")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO")), "Transform");
				Ast.Expression where = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "WHERE"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				Ast.Expression what = new Ast.MemberReferenceExpression (who, "localPosition");
				return new Ast.ExpressionStatement (new Ast.AssignmentExpression (what, Ast.AssignmentOperatorType.Assign, where));
			} else if (type.Equals ("unityTransform_move")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (GetFieldExpressionBlock (statNode, "WHO")), "Transform");
				Ast.Expression delta = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "DELTA"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				return new Ast.ExpressionStatement (InvokeExpr (new Ast.MemberReferenceExpression (who, "Translate"), delta));
			} else if (type.Equals ("unityUI_text")) {
				Ast.Expression who = GetComponent(ProcessGameObjectExpression (null), "UnityEngine.UI.Text");
				Ast.Expression text = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "TEXT"), new Ast.PrimitiveExpression (""));
				Ast.Expression what = new Ast.MemberReferenceExpression (who, "text");
				return new Ast.ExpressionStatement (new Ast.AssignmentExpression (what, Ast.AssignmentOperatorType.Assign, text));
			} else if (type.Equals ("unityRaycast_raycast")) {
				Ast.Expression who = new Ast.IdentifierExpression ("Physics2D");
				Ast.Expression origin = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "ORIGIN"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				Ast.Expression direction = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "DIRECTION"), new Ast.MemberReferenceExpression (new Ast.IdentifierExpression ("Vector3"), "zero"));
				Ast.Expression maxdist = ProcessOptionalExpression (GetFieldExpressionBlock (statNode, "MAXDIST"), new Ast.PrimitiveExpression(0f));
				Ast.Expression what = new Ast.MemberReferenceExpression (who, "Raycast");
				Ast.Expression check = InvokeExpr (what, origin, direction, maxdist);

				Ast.BlockStatement block = new Ast.BlockStatement ();
				Ast.VariableDeclaration vardecl = new Ast.VariableDeclaration("rayhit");
				vardecl.TypeReference = new Ast.TypeReference ("RaycastHit2D");
				Ast.ExpressionStatement assignment = new Ast.ExpressionStatement (new Ast.AssignmentExpression (what, Ast.AssignmentOperatorType.Assign, check));
				block.AddChild (vardecl);
				block.AddChild(assignment);
				Ast.IfElseStatement ifelse = new Ast.IfElseStatement (new Ast.IdentifierExpression("rayhit.collider != null"));//HACK => got lazy
				Ast.BlockStatement blockif = new Ast.BlockStatement ();
				ProcessStatements (blockif, false, GetFieldStatements (statNode, "STATEMENTS"));
				ifelse.TrueStatement.Add (blockif);
				block.AddChild(ifelse);
				return block;
			}
			throw new System.NotSupportedException ("Unsupported Statement type found... "+type);
		}

		private Ast.Expression GetComponent(Ast.Expression who, string componentType){
			bool isme = false;// NOT USED YET...
			if (who is Ast.IdentifierExpression) {
				if ("gameObject".Equals (((Ast.IdentifierExpression)who).Identifier)) {
					isme = true;
				}
			}

			Ast.MemberReferenceExpression memberExpr = new Ast.MemberReferenceExpression (who, "GetComponent");
			memberExpr.TypeArguments.Add (new Ast.TypeReference (componentType));
			return new Ast.InvocationExpression (memberExpr);
		}

		/**
		 * Process the Class Config Block and the Global Variables Blocks inside...
		 */
		private void ProcessGlobalVariables(XmlNode classConfigNode) {
			XmlNodeList globalvarnodes = classConfigNode.SelectNodes("statement/block[@type='unityGlobalVariables_declare']");
			foreach (XmlNode globvar in globalvarnodes) {
				string name = GetField(globvar, "VAR");
				string type = GetField(globvar, "TYPE");
				XmlNode value = GetFieldExpressionBlock(globvar, "VALUE");
				string varname = name;//GetActualVariableName (name);
				ServerLog.Log ("var: " + varname);

				Ast.VariableDeclaration vardecl = new Ast.VariableDeclaration (varname);
				if (value != null) {
					vardecl.Initializer = ProcessExpression (value, GetTypeEmptyValueByName(type));
				}
				Ast.FieldDeclaration fielddecl = new Ast.FieldDeclaration (new List<Ast.AttributeSection> (0));
				fielddecl.Modifier = Ast.Modifiers.Public;
				fielddecl.Fields.Add (vardecl);
				fielddecl.TypeReference = GetTypeByName (type);
				myClass.AddChild (fielddecl);
			}
		}
	}
}
