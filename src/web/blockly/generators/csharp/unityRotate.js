/**
 * @fileoverview Generating CSharp for unity move blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityRotate');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityrotate_identity'] = function(block) {
  return ['Quaternion.identity', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_angleaxis2d'] = function(block) {
  var angle = Blockly.CSharp.valueToCode(block, 'ANGLE', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  return ['Quaternion.AngleAxis('+angle+', Vector3.back)', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_angleaxis'] = function(block) {
  var angle = Blockly.CSharp.valueToCode(block, 'ANGLE', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var axis = Blockly.CSharp.valueToCode(block, 'AXIS', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.back';
  return ['Quaternion.AngleAxis('+angle+', '+axis+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_set_rotation'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var quaternion = Blockly.CSharp.valueToCode(block, 'QUATERNION', Blockly.CSharp.ORDER_ASSIGNMENT, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return transform+'.localRotation = '+quaternion+";\n";
};

Blockly.CSharp['unityrotate_rotate'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var quaternion = Blockly.CSharp.valueToCode(block, 'QUATERNION', Blockly.CSharp.ORDER_ASSIGNMENT, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return transform+'.localRotation *= '+quaternion+';\n';
};

Blockly.CSharp['unityrotate_get_rotation'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  return [transform+".localRotation", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_apply_vector'] = function(block) {
  var vector = Blockly.CSharp.valueToCode(block, 'VECTOR', Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var quaternion = Blockly.CSharp.valueToCode(block, 'QUATERNION', Blockly.CSharp.ORDER_MULTIPLICATIVE_RIGHT, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return [quaternion+" * "+vector, Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityrotate_combine'] = function(block) {
  var quaternion1 = Blockly.CSharp.valueToCode(block, 'QUATERNION1', Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  var quaternion2 = Blockly.CSharp.valueToCode(block, 'QUATERNION2', Blockly.CSharp.ORDER_MULTIPLICATIVE_RIGHT, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return [quaternion1+" * "+quaternion2, Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_get_angle'] = function(block) {
  var quaternion1 = Blockly.CSharp.valueToCode(block, 'QUATERNION1', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  var quaternion2 = Blockly.CSharp.valueToCode(block, 'QUATERNION2', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return ['Quaternion.Angle('+quaternion1+', '+quaternion2+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityrotate_get_angle_2d'] = function(block) {
  Blockly.CSharp.provideFunction_('UtilityGetAngle2D', 
    [
      'private float '+Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_+'(Quaternion rotation)',
      '{',
      '  Vector3 point2Dright = Vector3.ProjectOnPlane(rotation * Vector3.right, Vector3.back).normalized;',
      '  return Mathf.Atan2(point2Dright.y, point2Dright.x) * Mathf.Rad2Deg;',
      '}'
    ]
  );
  
  var quaternion = Blockly.CSharp.valueToCode(block, 'QUATERNION', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return ['UtilityGetAngle2D('+quaternion+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityrotate_looktowards'] = function(block) {
  Blockly.CSharp.provideFunction_('UtilityPointTowards', 
    [
      'private Quaternion '+Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_+'(Vector3 pointwhat, Vector3 direction, Vector3 staywhat)',
      '{',
      '  return Quaternion.LookRotation(direction, staywhat) * Quaternion.Inverse(Quaternion.LookRotation(pointwhat, staywhat));',
      '}'
    ]
  );
  
  var pointwhat = Blockly.CSharp.valueToCode(block, 'POINTWHAT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.right';
  var towards = Blockly.CSharp.valueToCode(block, 'TOWARDS', Blockly.CSharp.ORDER_ADDITIVE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var lookfrom = Blockly.CSharp.valueToCode(block, 'LOOKFROM', Blockly.CSharp.ORDER_ADDITIVE_RIGHT, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var staywhat = Blockly.CSharp.valueToCode(block, 'STAYWHAT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.back';
  var direction = '('+towards+' - '+lookfrom+').normalized';
  
  return ['UtilityPointTowards('+pointwhat+', '+direction+', '+staywhat+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_looktowards_2d'] = function(block) {
  
  Blockly.CSharp.provideFunction_('UtilityPointTowards2D', 
    [
      'private Quaternion '+Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_+'(Quaternion orientation, Vector3 direction)',
      '{',
      '  return Quaternion.LookRotation(Vector3.ProjectOnPlane(direction, Vector3.back).normalized, Vector3.back) * orientation;',
      '}'
    ]
  );
  
  var pointwhatoption = block.getFieldValue('POINTWHAT');
  var orientation = 'Quaternion.identity';
  if(pointwhatoption === 'X') {
    orientation = "new Quaternion(-0.5f, 0.5f, -0.5f, -0.5f)";// Precalculated: Quaternion.Inverse (Quaternion.LookRotation (Vector3.right, Vector3.back))
  } else if(pointwhatoption === '-X') {
    orientation = "new Quaternion(-0.5f, -0.5f, 0.5f, -0.5f)";// Precalculated: Quaternion.Inverse (Quaternion.LookRotation (Vector3.left, Vector3.back))
  } else if(pointwhatoption === 'Y') {
    orientation = "new Quaternion(0.7f, 0.0f, 0.0f, 0.7f)";// Precalculated: Quaternion.Inverse (Quaternion.LookRotation (Vector3.up, Vector3.back))
  } else if(pointwhatoption === '-Y') {
    orientation = "new Quaternion(0.0f, -0.7f, 0.7f, 0.0f)";// Precalculated: Quaternion.Inverse (Quaternion.LookRotation (Vector3.down, Vector3.back))
  }
  
  var towards = Blockly.CSharp.valueToCode(block, 'TOWARDS', Blockly.CSharp.ORDER_ADDITIVE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var lookfrom = Blockly.CSharp.valueToCode(block, 'LOOKFROM', Blockly.CSharp.ORDER_ADDITIVE_RIGHT, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  
  var direction = '('+towards+' - '+lookfrom+').normalized';
  
  return ['UtilityPointTowards2D('+orientation+', '+direction+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};

Blockly.CSharp['unityrotate_inverse'] = function(block) {
  var quaternion = Blockly.CSharp.valueToCode(block, 'QUATERNION', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_QUATERNION) || 'Quaternion.identity';
  return ["Quaternion.Inverse("+quaternion+")", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_QUATERNION];
};