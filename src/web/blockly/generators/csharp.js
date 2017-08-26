/**
 * @fileoverview Helper functions for generating CSharp for blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp');

goog.require('Blockly.Generator');


/**
 * CSharp code generator.
 * @type {!Blockly.Generator}
 */
Blockly.CSharp = new Blockly.Generator('CSharp');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.CSharp.addReservedWords(
    // http://timtrott.co.uk/keywords-and-reserved-words/
    'abstract,as,base,bool,break,byte,case,catch,char,checked,class,const,continue,decimal,default,delegate,do,double,else,enum,event,explicit,extern,finally,fixed,float,for,foreach,goto,if,implicit,in,int,interface,internal,is,lock,long,namespace,new,null,object,operator,out,override,params,private,,public,readonly,ref,return,sbyte,sealed,short,sizeof,stackalloc,static,string,struct,switch,this,throw,try,typeof,unit,ulong,unchecked,unsafe,ushort,using,virtual,void,volatile,while,FALSE,TRUE,yield,by,descending,from,group,into,orderby,select,var,where,'+
    
    // source: C:\Program Files\Unity\Editor\Data\Managed\UnityEngine.xml
    'AccelerationEvent,AddComponentMenu,Analytics,AnchoredJoint2D,AndroidActivityIndicatorStyle,AndroidInput,AndroidJavaClass,AndroidJavaObject,AndroidJavaProxy,AndroidJavaRunnable,AndroidJNIHelper,AnimationBlendMode,AnimationClipPair,AnimationCullingType,AnimationCurve,AnimationEvent,AnimationInfo,AnimationState,AnimatorClipInfo,AnimatorControllerParameterType,AnimatorCullingMode,AnimatorOverrideController,AnimatorRecorderMode,AnimatorStateInfo,AnimatorTransitionInfo,AnimatorUpdateMode,AnimatorUtility,AnisotropicFiltering,Apple,ApplicationInstallMode,ApplicationSandboxType,AreaEffector2D,AssemblyIsEditorAssembly,Assertions,AssetBundleCreateRequest,AssetBundleManifest,AssetBundleRequest,AsyncOperation,AudioChorusFilter,AudioClipLoadType,AudioCompressionFormat,AudioConfiguration,AudioDataLoadState,AudioDistortionFilter,AudioEchoFilter,AudioHighPassFilter,AudioListener,AudioLowPassFilter,AudioReverbFilter,AudioReverbPreset,AudioReverbZone,AudioRolloffMode,AudioSettings,AudioSourceCurveType,AudioSpeakerMode,AudioType,AudioVelocityUpdateMode,AvatarBuilder,AvatarIKGoal,AvatarIKHint,AvatarTarget,'+
    'Behaviour,BillboardAsset,BillboardRenderer,BitStream,BlendWeights,BoneWeight,BoundingSphere,Bounds,BoxCollider2D,BuoyancyEffector2D,'+
    'Caching,CameraClearFlags,CameraType,CanvasGroup,CanvasRenderer,CapsuleCollider,CharacterController,CharacterInfo,CharacterJoint,CircleCollider2D,ClothSkinningCoefficient,ClothSphereColliderPair,ClusterInputType,ClusterNetwork,Collider2D,Collision2D,CollisionDetectionMode2D,CollisionFlags,Color32,ColorSpace,ColorUsageAttribute,ColorUtility,CombineInstance,Compass,Component,ComputeBufferType,ComputeShader,ConfigurableJointMotion,ConnectionTesterStatus,ConstantForce2D,ContactPoint2D,ContextMenuItemAttribute,ControllerColliderHit,Coroutine,CrashReport,CreateAssetMenuAttribute,CubemapFace,CullingGroupEvent,CursorLockMode,CursorMode,CustomYieldInstruction,'+
    'Debug,DelayedAttribute,DepthTextureMode,DetailPrototype,DetailRenderMode,DeviceOrientation,DeviceType,Diagnostics,DisallowMultipleComponent,Display,DistanceJoint2D,DrivenRectTransformTracker,DrivenTransformProperties,DynamicGI,'+
    'EdgeCollider2D,Effector2D,EffectorForceMode2D,EffectorSelection2D,EllipsoidParticleEmitter,EventModifiers,Events,EventType,ExecuteInEditMode,Experimental,'+
    'FFTWindow,FilterMode,FixedJoint2D,FlareLayer,FocusType,FogMode,FontStyle,ForceMode2D,FrictionJoint2D,FullScreenMovieControlMode,FullScreenMovieScalingMode,'+
    'GameObject,GeometryUtility,Gizmos,GL,GradientAlphaKey,GradientColorKey,Graphics,GUIContent,GUIElement,GUILayer,GUILayoutOption,GUILayoutUtility,GUISettings,GUISkin,GUIStyleState,GUITargetAttribute,GUITexture,GUIUtility,Gyroscope,'+
    'Handheld,Hash128,HeaderAttribute,HelpURLAttribute,HideFlags,HideInInspector,HingeJoint2D,HorizontalWrapMode,HostData,HumanBodyBones,HumanBone,HumanDescription,HumanLimit,HumanPoseHandler,HumanTrait,'+
    'ICanvasRaycastFilter,ILogger,ILogHandler,ImageEffectAllowedInSceneView,ImageEffectOpaque,ImageEffectTransformsToLDR,ImagePosition,IMECompositionMode,Input,iOS,ISerializationCallbackReceiver,'+
    'Joint2D,JointAngleLimits2D,JointDriveMode,JointLimits,JointLimitState2D,JointMotor2D,JointProjectionMode,JointSpring,JointSuspension2D,JointTranslationLimits2D,JsonUtility,'+
    'KeyCode,Keyframe,'+
    'LayerMask,LensFlare,LightmapData,LightmapSettings,LightmapsModeLegacy,LightProbeGroup,LightProbeProxyVolume,LightProbes,LightRenderMode,LightShadowResolution,LightShadows,LightType,LineRenderer,LocationInfo,LocationServiceStatus,LODFadeMode,LODGroup,Logger,LogType,'+
    'MasterServerEvent,MatchTargetWeightMask,MaterialGlobalIlluminationFlags,MaterialPropertyBlock,Mathf,Matrix4x4,MeshCollider,MeshFilter,MeshParticleEmitter,MeshRenderer,MeshTopology,Microphone,MonoBehaviour,Motion,MovieTexture,MultilineAttribute,'+
    'NavMeshAgent,NavMeshHit,NavMeshObstacleShape,NavMeshPathStatus,NavMeshTriangulation,NetworkConnectionError,NetworkDisconnection,Networking,NetworkLogLevel,NetworkMessageInfo,NetworkPeerType,NetworkPlayer,NetworkReachability,NetworkStateSynchronization,NetworkViewID,NPOTSupport,'+
    'Object,ObstacleAvoidanceType,OcclusionArea,OcclusionPortal,OffMeshLinkData,OffMeshLinkType,'+
    'ParticleAnimator,ParticleCollisionEvent,ParticleEmitter,ParticlePhysicsExtensions,ParticleRenderer,ParticleRenderMode,ParticleSystemAnimationType,ParticleSystemCollisionMode,ParticleSystemCollisionQuality,ParticleSystemCollisionType,ParticleSystemCurveMode,ParticleSystemEmissionType,ParticleSystemGradientMode,ParticleSystemInheritVelocityMode,ParticleSystemMeshShapeType,ParticleSystemOverlapAction,ParticleSystemRenderer,ParticleSystemRenderMode,ParticleSystemRenderSpace,ParticleSystemScalingMode,ParticleSystemShapeType,ParticleSystemSimulationSpace,ParticleSystemSortMode,ParticleSystemTriggerEventType,PhysicMaterialCombine,Physics2D,PhysicsMaterial2D,PhysicsUpdateBehaviour2D,Ping,Plane,PlatformEffector2D,PlayerPrefsException,PlayMode,PointEffector2D,PolygonCollider2D,PrimitiveType,ProceduralCacheSize,ProceduralLoadingBehavior,ProceduralMaterial,ProceduralOutputType,ProceduralProcessorUsage,ProceduralPropertyDescription,ProceduralPropertyType,ProceduralTexture,Profiler,Projector,PropertyAttribute,'+
    'QualitySettings,Quaternion,QueryTriggerInteraction,QueueMode,'+
    'Random,RangeAttribute,Ray2D,RaycastHit2D,RectOffset,RectTransformUtility,ReflectionProbe,RelativeJoint2D,RenderBuffer,Renderer,RenderingPath,RenderMode,RenderSettings,RenderTargetSetup,RenderTextureFormat,RenderTextureReadWrite,RequireComponent,Resolution,ResourceRequest,Resources,Rigidbody2D,RigidbodyConstraints2D,RigidbodyInterpolation2D,RigidbodySleepMode2D,RotationDriveMode,RPCMode,RuntimeAnimatorController,RuntimeInitializeLoadType,RuntimeInitializeOnLoadMethodAttribute,RuntimePlatform,'+
    'SamsungTV,ScaleMode,SceneManagement,ScreenOrientation,ScriptableObject,Scripting,Security,SelectionBaseAttribute,SendMessageOptions,Serialization,SerializeField,ShaderVariantCollection,ShadowProjection,ShadowResolution,SharedBetweenAnimatorsAttribute,SkeletonBone,SkinnedMeshRenderer,SkinQuality,Skybox,SleepTimeout,SliderJoint2D,SocialPlatforms,SoftJointLimitSpring,SortingLayer,SpaceAttribute,SparseTexture,SphereCollider,SplatPrototype,SpringJoint2D,SpriteAlignment,SpriteMeshType,SpritePackingMode,SpritePackingRotation,SpriteRenderer,Sprites,StackTraceLogType,StateMachineBehaviour,StaticBatchingUtility,StereoTargetEyeMask,SurfaceEffector2D,SystemInfo,SystemLanguage,'+
    'TargetJoint2D,TerrainCollider,TerrainData,TerrainRenderFlags,TextAlignment,TextAnchor,TextAreaAttribute,TextAsset,TextClipping,TextGenerationSettings,TextGenerator,TextMesh,Texture2DArray,Texture3D,TextureCompressionQuality,TextureFormat,TextureWrapMode,ThreadPriority,Time,Tizen,TooltipAttribute,TouchPhase,TouchScreenKeyboardType,TouchType,TrailRenderer,Transform,TransparencySortMode,TreeInstance,TreePrototype,'+
    'UICharInfo,UILineInfo,UIVertex,UnityAPICompatibilityVersionAttribute,UserAuthorization,UVChannelFlags,'+
    'Vector2,Vector3,Vector4,VerticalWrapMode,VR,'+
    'WaitForEndOfFrame,WaitForFixedUpdate,WaitForSecondsRealtime,WaitUntil,WaitWhile,WebCamDevice,WebCamTexture,WheelCollider,WheelFrictionCurve,WheelHit,WheelJoint2D,Windows,WindZoneMode,WrapMode,WSA,WWWForm,'+
    'YieldInstruction,'+
    
    // source: https://msdn.microsoft.com/en-us/library/system.collections.generic(v=vs.110).aspx
    'Comparer,Dictionary,EqualityComparer,HashSet,Dictionary,SortedDictionary,KeyedByTypeCollection,KeyNotFoundException,LinkedList,LinkedListNode,List,Queue,SortedDictionary,SortedList,SortedSet,Stack,SynchronizedCollection,SynchronizedKeyedCollection,SynchronizedReadOnlyCollection,Dictionary,SortedDictionary,Dictionary,Dictionary,Dictionary,HashSet,LinkedList,List,Queue,SortedDictionary,SortedDictionary,SortedDictionary,SortedSet,Stack,KeyValuePair,ICollection,IComparer,IDictionary,IEnumerable,IEnumerator,IEqualityComparer,IList,IReadOnlyCollection,IReadOnlyDictionary,IReadOnlyList,ISet,' +
  
    // prevent the user from "hiding" fields in the MonoBehavior:
    // source: https://docs.unity3d.com/ScriptReference/MonoBehaviour.html
    'runInEditMode,useGUILayout,CancelInvoke,Invoke,InvokeRepeating,IsInvoking,StartCoroutine,StopAllCoroutines,StopCoroutine,print,Awake,FixedUpdate,LateUpdate,OnAnimatorIK,OnAnimatorMove,OnApplicationFocus,OnApplicationPause,OnApplicationQuit,OnAudioFilterRead,OnBecameInvisible,OnBecameVisible,OnCollisionEnter,OnCollisionEnter2D,OnCollisionExit,OnCollisionExit2D,OnCollisionStay,OnCollisionStay2D,OnConnectedToServer,OnControllerColliderHit,OnDestroy,OnDisable,OnDisconnectedFromServer,OnDrawGizmos,OnDrawGizmosSelected,OnEnable,OnFailedToConnect,OnFailedToConnectToMasterServer,OnGUI,OnJointBreak,OnJointBreak2D,OnMasterServerEvent,OnMouseDown,OnMouseDrag,OnMouseEnter,OnMouseExit,OnMouseOver,OnMouseUp,OnMouseUpAsButton,OnNetworkInstantiate,OnParticleCollision,OnParticleTrigger,OnPlayerConnected,OnPlayerDisconnected,OnPostRender,OnPreCull,OnPreRender,OnRenderImage,OnRenderObject,OnSerializeNetworkView,OnServerInitialized,OnTransformChildrenChanged,OnTransformParentChanged,OnTriggerEnter,OnTriggerEnter2D,OnTriggerExit,OnTriggerExit2D,OnTriggerStay,OnTriggerStay2D,OnValidate,OnWillRenderObject,Reset,Start,Update,enabled,isActiveAndEnabled,gameObject,tag,transform,hideFlags,name,BroadcastMessage,CompareTag,GetComponent,GetComponentInChildren,GetComponentInParent,GetComponents,GetComponentsInChildren,GetComponentsInParent,SendMessage,SendMessageUpwards,GetInstanceID,ToString,Destroy,DestroyImmediate,DontDestroyOnLoad,FindObjectOfType,FindObjectsOfType,Instantiate,' +
    
    // other things we use:
    'System'
    );

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/CSharp/Reference/Operators/Operator_Precedence
 */
Blockly.CSharp.ORDER_ATOMIC = 0;          // 0 "" ...
Blockly.CSharp.ORDER_PRIMARY = 1;         // x.y  f(x)  a[x]  x++  x--  new  typeof  checked  unchecked
Blockly.CSharp.ORDER_UNARY = 2;           // +  -  !  ~  ++x  --x  (T)x
Blockly.CSharp.ORDER_MULTIPLICATIVE = 3;  // *  /  %
Blockly.CSharp.ORDER_MULTIPLICATIVE_RIGHT = 4;  // left-associative...
Blockly.CSharp.ORDER_ADDITIVE = 4;        // +  -
Blockly.CSharp.ORDER_ADDITIVE_RIGHT = 5;  // left-associative...
Blockly.CSharp.ORDER_BITWISE_SHIFT = 5;   // <<  >>
Blockly.CSharp.ORDER_RELATIONAL = 6;      // <  >  <=  >= 
Blockly.CSharp.ORDER_TYPE_TESTING = 6;    // is  as
Blockly.CSharp.ORDER_EQUALITY = 7;        // ==  !=
Blockly.CSharp.ORDER_BITWISE_AND = 8;     // &
Blockly.CSharp.ORDER_BITWISE_XOR = 9;     // ^
Blockly.CSharp.ORDER_BITWISE_OR = 10;      // |
Blockly.CSharp.ORDER_LOGICAL_AND = 11;     // &&
Blockly.CSharp.ORDER_LOGICAL_OR = 12;      // ||
Blockly.CSharp.ORDER_CONDITIONAL = 13;     // ?:
Blockly.CSharp.ORDER_ASSIGNMENT = 14;      // =  *=  /=  %=  +=  -=  <<=  >>=  &=  ^=  |=
Blockly.CSharp.ORDER_NONE = 99;           // (...)

/**
 * List of actual datatypes in Vubbi
 * !! Code generated by blocks should only return one of these!
 */
Blockly.CSharp.DATATYPE_STRING = 'String';
Blockly.CSharp.DATATYPE_NUMBER = 'Number';
Blockly.CSharp.DATATYPE_GAMEOBJECT = 'GameObject';
Blockly.CSharp.DATATYPE_SPRITE = 'Sprite';
Blockly.CSharp.DATATYPE_BOOLEAN = 'Boolean';
Blockly.CSharp.DATATYPE_VECTOR = 'Vector3';
Blockly.CSharp.DATATYPE_QUATERNION = 'Quaternion';
Blockly.CSharp.DATATYPE_ANY = null;// everything for which we are not sure...

/**
 * List of additional datatypes in the generated code
 */
Blockly.CSharp.DATATYPE_INT = 'int';
Blockly.CSharp.DATATYPE_TRANSFORM = 'Transform';
Blockly.CSharp.DATATYPE_RIGIDBODY2D = 'Rigidbody2D';
Blockly.CSharp.DATATYPE_RIGIDBODY = 'Rigidbody';
Blockly.CSharp.DATATYPE_SPRITERENDERER = 'SpriteRenderer';
Blockly.CSharp.DATATYPES_COMPONENTS = [
  Blockly.CSharp.DATATYPE_TRANSFORM,
  Blockly.CSharp.DATATYPE_RIGIDBODY2D,
  Blockly.CSharp.DATATYPE_RIGIDBODY,
  Blockly.CSharp.DATATYPE_SPRITERENDERER
];


/**
 * Utility method, convert a safe name (only letters numbers and underscore - does not start with underscore) => to camelcasing
 */
Blockly.CSharp.ConvertSafeNameToCamelCaseSmall = function (safeName) {
  var startsWithUnderscore = !!safeName.match(/^_+/);
  safeName = safeName.replace(/^_+/, '');
  return (startsWithUnderscore?'_':'')+safeName.replace(/_([a-z])/g, function(all, match) { return match.toUpperCase(); });
};

/**
 * Utility method, convert a safe name (only letters numbers and underscore - does not start with underscore) => to camelcasing
 */
Blockly.CSharp.ConvertSafeNameToCamelCaseBig = function (safeName) {
  var startsWithUnderscore = !!safeName.match(/^_+/);
  safeName = safeName.replace(/^_+/, '');
  return (startsWithUnderscore?'_':'')+('_'+safeName).replace(/_([a-z])/g, function(all, match) { return match.toUpperCase(); });
};


//
// -- Actual code
//

Blockly.CSharp.workspaceToCode = function(workspace, classname) {
  this.classname_ = classname?classname:'???';
  return Blockly.Generator.prototype.workspaceToCode.call(this, workspace);
};

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.CSharp.init = function(workspace) {
  Blockly.CSharp.INDENT = '\t';
  
  // We will put the code with the global variable definitions in here
  Blockly.CSharp.tempGlobalsCode_ = "";
  
  // We will put the temporary method-local variable definitions in here
  Blockly.CSharp.temporaryMethodVariables_ = null;
  Blockly.CSharp.temporaryMethodVariablesCoroutine_ = null;
  
  Blockly.CSharp.eventMethods_ = [];
  
  // Create a dictionary of definitions to be printed before the code.
  // Will be filled by calling "provideFunction_" in the generator
  Blockly.CSharp.definitions_ = Object.create(null);
  
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  // Will be filled by calling "provideFunction_" in the generator
  Blockly.CSharp.functionNames_ = Object.create(null);
  
  // Keep track of the temporary variables used throughout whole blocks of code...
  // These will be pushed on a stack (in case of multiple nested blocks that need the same variable)
  // One stack per requested variable (so different variable names or types = different stack)
  Blockly.CSharp.loopVariableStack_ = Object.create(null);

  if (!Blockly.CSharp.variableDB_) {
    var namingConventions = {};
    namingConventions[Blockly.Variables.NAME_TYPE] = Blockly.CSharp.ConvertSafeNameToCamelCaseSmall;
    namingConventions[Blockly.EditableCodeBlocks.NAME_TYPE] = Blockly.CSharp.ConvertSafeNameToCamelCaseBig;
    namingConventions['MESSAGES'] = Blockly.CSharp.ConvertSafeNameToCamelCaseBig;
    Blockly.CSharp.variableDB_ = new Blockly.Names(Blockly.CSharp.RESERVED_WORDS_, undefined, namingConventions);
  } else {
    Blockly.CSharp.variableDB_.reset();
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.CSharp.finish = function(code) {
  // NOTE: code will ONLY contain the "editable code block"-methods
  // => the other methods and variables are added to member variables instead.
  
  var usingStatements = 'using UnityEngine;\n'+'using System.Collections;\n'+'using System.Collections.Generic;';
  
  var classStart = 'public class '+this.classname_+' : MonoBehaviour\n{\n';
  var classEnd = '}';
  
  // Convert the "event methods" to code
  var eventMethodCode = "";
  goog.array.forEach(this.eventMethods_, goog.bind(function(eventMethod) {
    var declaredTempVars = "";
    goog.array.forEach(eventMethod.temporaryMethodVariables, function(item) {
      declaredTempVars+=item.type+" "+item.name+";\n";
    });
    if(declaredTempVars!=='') {
      declaredTempVars = this.prefixLines(declaredTempVars, this.INDENT);
    }
    
    eventMethodCode+=eventMethod.functionDescription+'\n{\n'+eventMethod.outputsCode+declaredTempVars+eventMethod.code+'}\n\n';
  }, this));
  if(eventMethodCode) {
    // strip last two newlines
    eventMethodCode = eventMethodCode.substr(0, eventMethodCode.length-2);
  }
  if(code) {
    // strip last newline
    code = code.substr(0, code.length-1);
  }
  
  code = eventMethodCode+(code && eventMethodCode?'\n\n':'')+code;
  
  // Convert the definitions dictionary into a list. (all utility functions)
  var definitions = [];
  for (var name in Blockly.CSharp.definitions_) {
    definitions.push(Blockly.CSharp.definitions_[name]);
  }
  var utilityMethods = definitions.join('\n\n');
  if(utilityMethods) {
    utilityMethods = '\n\n'+this.prefixLines('//\n// Utility functions\n//\n', this.INDENT)+'\n'+this.prefixLines(utilityMethods, this.INDENT);
  }
  
  var indentCode = Blockly.CSharp.prefixLines(code, Blockly.CSharp.INDENT);
  var classContent = Blockly.CSharp.tempGlobalsCode_+(Blockly.CSharp.tempGlobalsCode_?'\n':'')+indentCode+utilityMethods;
  
  
  
  // Clean up temporary data.
  delete Blockly.CSharp.tempGlobalsCode_;
  delete Blockly.CSharp.definitions_;
  delete Blockly.CSharp.functionNames_;
  delete Blockly.CSharp.eventMethods_;
  Blockly.CSharp.variableDB_.reset();
  return usingStatements+'\n\n'+classStart+classContent+'\n'+classEnd;
};

/**
 * Convert a string representing a datatype to the actual dataype in C#.
 */
Blockly.CSharp.convertDataTypeName = function(datatype) {
  if (!datatype) {
    return "System.Object";
  } else if (datatype === 'String') {
    return 'string';
  } else if(datatype === 'Number') {
    return 'float';
  } else if (datatype === 'Boolean') {
    return 'bool';
  } else if (goog.string.startsWith(datatype, "List_")) {
    return 'List<'+convertDataType(datatype.substr(datatype, 5))+'>';
  } else {
    // normal objects (GameObject, Sprite, Vector3, ...)
    return datatype;
  }
};

/**
 * Check whether the value represents a number primitive (converted to C#)
 */
Blockly.CSharp.isPrimitiveNumber = function(expression) {
  return !!expression && expression.match(/^[0-9]*\.?[0-9]*f$/);
};

/**
 * Check whether the code represents a primitive string
 */
Blockly.CSharp.isPrimitiveString = function(expression) {
  // trim
  expression = expression.trim();
  // remove all escaped quotes
  expression = expression.replace(/\\\\/g, '').replace(/\\"/g,'');
  // check if the string starts and ends with a quote
  if(expression.charAt(0) !== '"' || expression.charAt(expression.length - 1) !== '"') {
    return false;
  }
  // count the number of quotes in the string
  var quoteCounting = expression.match(/"/);
  if(!quoteCounting || quoteCounting.length !== 2) return false;
  return true;
};

/**
 * Convert the data type
 */
Blockly.CSharp.convertDataTypeValue = function(datatype, expecteddatatype, getValue) {
  var val = getValue(Blockly.CSharp.ORDER_NONE);
  if(expecteddatatype === Blockly.CSharp.DATATYPE_INT) {
    if(val === null || val === undefined || val === '') {
      return null;
    }
    if(Blockly.CSharp.isPrimitiveNumber(val)) {
      // remove the parts after the comma
      return [val.replace(/\..*$/, '').replace(/g/,''), null, Blockly.CSharp.DATATYPE_INT];
    } else {
      return ['(int)' + Blockly.CSharp.valueToCode(block, 'FROM',
        Blockly.CSharp.ORDER_UNARY), Blockly.CSharp.ORDER_UNARY, Blockly.CSharp.DATATYPE_INT];
    }
  } else if(expecteddatatype === Blockly.CSharp.DATATYPE_NUMBER) {
    // What would we convert to a float? No need for this.
    // No support for converting strings to floats...
    return null;
  } else if(expecteddatatype === Blockly.CSharp.DATATYPE_STRING) {
    if(val === null || val === undefined || val === '') {
      return ['""', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_STRING];
    }
    if(Blockly.CSharp.isPrimitiveString(val)) {
      // Already the correct type
      return null;
    }else if(datatype !== Blockly.CSharp.DATATYPE_STRING) {
      // It seems we need to do a conversion
      return ['System.Convert.ToString(' + getValue(Blockly.CSharp.ORDER_NONE) +')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_STRING];
    }
  } else if(expecteddatatype === Blockly.CSharp.DATATYPE_GAMEOBJECT) {
    if(val === null || val === undefined || val === '') {
      return ['(GameObject)null', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_STRING];
    } else {
      return null;
    }
  } else if(goog.array.contains(Blockly.CSharp.DATATYPES_COMPONENTS, expecteddatatype)) {
    var onWhat = (getValue(Blockly.CSharp.ORDER_PRIMARY) || 'gameObject');
    if(!val || val === 'gameObject') {
      onWhat = '';
    } else {
      onWhat += '.';
    }
    return [onWhat+'GetComponent<'+expecteddatatype+'>()', Blockly.CSharp.ORDER_PRIMARY, expecteddatatype];
  }
  // No conversion needed (or not implemented yet)
  return null;
};

Blockly.CSharp.generateOutputMutationCode = function(block, exportMap) {
  var code = '';
  var targetBlock = block.getInputTargetBlock('OUTPUTS');
  while(targetBlock) {
    var what = targetBlock.getFieldValue('WHAT');
    var varName = targetBlock.getFieldValue('VAR');
    if(varName) {
      var varName = Blockly.CSharp.variableDB_.getName(
        varName, Blockly.Variables.NAME_TYPE);
      if(exportMap.hasOwnProperty(what) && varName) {
        code += varName+' = '+exportMap[what]+';\n';
      }
    }
    targetBlock = targetBlock.getNextBlock();
  }
  if (code.length>0) {
    return this.prefixLines(code, this.INDENT);
  }
  return '';
};

Blockly.CSharp.pushEventBlock = function(block, functionDescription, functionName, outputsCode) {
  var eventMethodInfo = null;
  var eventMethodInfoIndex = -1;
  
  // Look whether there is already a method with this name => merge them
  goog.array.forEach(Blockly.CSharp.eventMethods_, function(methodInfo, index) {
    if(functionDescription === methodInfo.functionDescription) {
      // Same method => simply add the code at the end (and extend the declarations)
      eventMethodInfo = methodInfo;
      eventMethodInfoIndex = index;
    }
  });
  
  if(!eventMethodInfo) {
    eventMethodInfo = {
      functionName: functionName,
      functionDescription: functionDescription,
      code:"",
      temporaryMethodVariables:[],
      outputsCode:""
    };
    Blockly.CSharp.eventMethods_.push(eventMethodInfo);
    eventMethodInfoIndex = Blockly.CSharp.eventMethods_.length-1;
  }
  
  this.temporaryMethodVariables_= goog.array.clone(eventMethodInfo.temporaryMethodVariables);
  this.temporaryMethodVariablesCoroutine_ = [];
  this.shouldBeCoroutine_ = false;
  var code = Blockly.CSharp.eventStatementsToCode(block);
  var shouldBeCoroutine = this.shouldBeCoroutine_;
  if(shouldBeCoroutine) {
    var insertAfter = eventMethodInfoIndex;
    var suffix = 0;
    var prefix = "Coroutine"+functionName;
    while(insertAfter+1 < Blockly.CSharp.eventMethods_.length && 
          goog.string.startsWith(Blockly.CSharp.eventMethods_[insertAfter+1].functionName, prefix)) {
      insertAfter++;
      suffix++;
    }
    // Names...
    var coroutineFunctionName = prefix+(suffix>0?"_"+suffix:"");
    var coroutineVariableName = "running"+functionName+(suffix>0?"_"+suffix:"");
    // Declare new private variable...
    //
    // TODO: MAKING THE VARIABLE UNIQUE = NOT WORKING !!!!!!!!!!!!
    //
    var coroutineVariableName = Blockly.CSharp.variableDB_.getName(
      coroutineVariableName, Blockly.Variables.NAME_TYPE);
    var varDescription = this.INDENT+"private bool "+coroutineVariableName+' = false;\n';
    Blockly.CSharp.tempGlobalsCode_+=varDescription;
    
    // Try-catch code
    var innercode = this.INDENT+coroutineVariableName+" = true;\n"+code;
    var finallycode = this.INDENT+coroutineVariableName+" = false;\n";
    code = this.prefixLines("try {\n"+innercode+"} finally {\n"+finallycode+"}\n", this.INDENT);
    
    var newMethod = {
      functionName: coroutineFunctionName,
      functionDescription: "private IEnumerator "+coroutineFunctionName+"()",
      code:code,
      temporaryMethodVariables:this.temporaryMethodVariablesCoroutine_,
      outputsCode:""
    };
    Blockly.CSharp.eventMethods_.splice(insertAfter+1, 0, newMethod);
    
    // Add the method call
    eventMethodInfo.code+=this.prefixLines("if(!"+coroutineVariableName+") {\n"+this.INDENT+"StartCoroutine("+coroutineFunctionName+"());\n}\n", this.INDENT);
    
    // Add the private boolean to see whether it is started
  } else {
    eventMethodInfo.code += code;
    eventMethodInfo.temporaryMethodVariables = this.temporaryMethodVariables_;
  }
  this.temporaryMethodVariables_ = null;
  this.temporaryMethodVariablesCoroutine_ = null;
  
  if(outputsCode) {
    eventMethodInfo.outputsCode += outputsCode;
  }
};

/**
 * Convert the "current" event block to a coroutine. => Should only be executed while pushEventBlock is processing the code.
 */
Blockly.CSharp.transformCurrentEventBlockToCoroutine = function() {
  this.shouldBeCoroutine_ = true;
};

/**
 * Declares a variable which is used throughout a block of code.
 * We need a separate method for this because we cannot reuse the same variable
 * in the same block of code...
 */
Blockly.CSharp.pushLoopStackVariable = function(type, name) {
  this.loopVariableStack_[type+"~"+name] = this.loopVariableStack_[type+"~"+name] || [];
  var loopVariable = this.declareLocalTempVar(type, name, false);
  this.loopVariableStack_[type+"~"+name].push(loopVariable);
  return loopVariable;
};

/**
 * Get the name of the variable in the top loop/code block of the stack
 */
Blockly.CSharp.getTopLoopStackVariable = function(type, name) {
  var loopStack = this.loopVariableStack_[type+"~"+name];
  if(loopStack) {
    return loopStack[loopStack.length-1];
  }
};

/**
 * We are closing the code block/loop => release the variable
 */
Blockly.CSharp.popLoopStackVariable = function(type, name) {
  var loopStack = this.loopVariableStack_[type+"~"+name];
  var actualVarName = loopStack.pop();
  // Make the variable available for re-use now.
  goog.array.forEach(this.temporaryMethodVariables_, function(variable) {
    if(variable.name === actualVarName) {
      variable.availableforreuse = true;
    }
  });
};

/**
 * Declares a temporary variable on the method level and returns the name
 */
Blockly.CSharp.declareLocalTempVar = function(type, name, availableforreuse) {
  // Default, availableforreuse is true
  availableforreuse = availableforreuse !== false;
  
  var tempVarInfo = this.isLegalReusableBlockLocalTempVarName(type, name);
  while (!Blockly.Variables.isLegalName(name, null) || (tempVarInfo.isdeclared && (!tempVarInfo.iscorrecttype || !tempVarInfo.availableforreuse))) {
    // Collision with another variable.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
    tempVarInfo = this.isLegalReusableBlockLocalTempVarName(type, name);
  }
  
  if(!tempVarInfo.isdeclared) {
    // Declare the temporary variable on top of the method
    this.temporaryMethodVariables_.push({name:name, type:type, availableforreuse:availableforreuse});
  } else {
    // was already declared but we need it again => block for reuse
    if(!availableforreuse) {
      goog.array.forEach(this.temporaryMethodVariables_, function(variable) {
        if(variable.name === name) {
          variable.availableforreuse = false;
        }
      });
    }
  }
  var coroutineVarInfo = this.isLegalReusableBlockLocalTempVarName(type, name, true)
  if(!coroutineVarInfo.isdeclared) {
    this.temporaryMethodVariablesCoroutine_.push({name:name, type:type});
  }
  return name;
};

Blockly.CSharp.isLegalReusableBlockLocalTempVarName = function(type, name, coroutineVars) {
  var isdeclared = false;
  var iscorrecttype = false;
  var availableforreuse = false;
  goog.array.forEach((coroutineVars?this.temporaryMethodVariablesCoroutine_:this.temporaryMethodVariables_), function(variable) {
    if(variable.name === name) {
      isdeclared = true;
      if(variable.type === type) {
        iscorrecttype = true;
        availableforreuse = variable.availableforreuse;
      }
    }
  });
  return {isdeclared:isdeclared, iscorrecttype:iscorrecttype, availableforreuse:availableforreuse};
};

/**
 * Encode a string as a properly escaped CSharp string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} CSharp string.
 * @private
 */
Blockly.CSharp.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\n')
                 .replace(/"/g, '\\"');
  return "\"" + string + "\"";
};

/**
 * Common tasks for generating CSharp from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The CSharp code created for this block.
 * @return {string} CSharp code with comments and subsequent blocks added.
 * @private
 */
Blockly.CSharp.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.CSharp.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.CSharp.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.CSharp.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  if(!block.PROPERTY_VALID_ROOT) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.CSharp.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  } else {
    // Root block is itself responsible for adding the "next blocks"...
    return commentCode + code;
  }
};
