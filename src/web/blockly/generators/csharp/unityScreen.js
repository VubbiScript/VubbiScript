/**
 * @fileoverview Generating CSharp for unity screen/mouse/... blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityScreen');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityScreen_mouse_position'] = function(block) {
  return ['Input.mousePosition', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};

Blockly.CSharp['unityScreen_screen_size'] = function(block) {
  return ['new Vector3(Screen.width, Screen.height, 0f)', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};

Blockly.CSharp['unityScreen_mouse_scene_position2D'] = function(block) {
  Blockly.CSharp.provideFunction_('UtilityScreenPositionToScenePlane', 
    [
      // Derived from http://answers.unity3d.com/questions/269760/ray-finding-out-x-and-z-coordinates-where-it-inter.html
      'private Vector3 '+Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_+'(Vector3 pixelposition, Camera cam, Vector3 normal, Vector3 through)',
      '{',
      '  Ray ray = cam.ScreenPointToRay(pixelposition);',
      '  Plane plane = new Plane(normal, through);',
      '  float distance = 0;',
      '  if (plane.Raycast(ray, out distance)){',
      '    return ray.GetPoint(distance);',
      '  } else {',
      '    return Vector3.zero;',
      '  }',
      '}'
    ]
  );
  
  return ['UtilityScreenPositionToScenePlane(Input.mousePosition, Camera.main, Vector3.back, Vector3.zero)', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3]
};

Blockly.CSharp['unityScreen_camera_main'] = function(block) {
  return ['Camera.main', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_CAMERA];
};

Blockly.CSharp['unityScreen_screen_to_scene'] = function(block) {
  Blockly.CSharp.provideFunction_('UtilityScreenPositionToScenePlane', 
    [
      // Derived from http://answers.unity3d.com/questions/269760/ray-finding-out-x-and-z-coordinates-where-it-inter.html
      'private Vector3 '+Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_+'(Vector3 pixelposition, Camera cam, Vector3 normal, Vector3 through)',
      '{',
      '  Ray ray = cam.ScreenPointToRay(pixelposition);',
      '  Plane plane = new Plane(normal, through);',
      '  float distance = 0;',
      '  if (plane.Raycast(ray, out distance)){',
      '    return ray.GetPoint(distance);',
      '  } else {',
      '    return Vector3.zero;',
      '  }',
      '}'
    ]
  );
  
  var pos = Blockly.CSharp.valueToCode(block, 'POS', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var cam = Blockly.CSharp.valueToCode(block, 'CAM', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_CAMERA);
  var plane_normal = Blockly.CSharp.valueToCode(block, 'PLANE_NORMAL', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.back';
  var plane_point = Blockly.CSharp.valueToCode(block, 'PLANE_POINT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  
  return ['UtilityScreenPositionToScenePlane('+pos+', '+cam+', '+plane_normal+', '+plane_point+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3]
};

Blockly.CSharp['unityScreen_scene_to_screen'] = function(block) {
  var pos = Blockly.CSharp.valueToCode(block, 'POS', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var cam = Blockly.CSharp.valueToCode(block, 'CAM', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_CAMERA);
  return [cam+'.WorldToScreenPoint('+pos+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};

Blockly.CSharp['unityScreen_screen_to_scene_direction'] = function(block) {
  var pos = Blockly.CSharp.valueToCode(block, 'POS', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var cam = Blockly.CSharp.valueToCode(block, 'CAM', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_CAMERA);
  return [cam+'.ScreenPointToRay('+pos+').direction', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};