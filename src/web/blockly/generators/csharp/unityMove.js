/**
 * @fileoverview Generating CSharp for unity move blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityMove');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityTransform_jumpto'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var vector = Blockly.CSharp.valueToCode(block, 'WHERE', Blockly.CSharp.ORDER_ASSIGNMENT, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return transform+'.localPosition = '+vector+";\n";
};

Blockly.CSharp['unityTransform_move'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var vector = Blockly.CSharp.valueToCode(block, 'DELTA', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return transform+'.Translate('+vector+", Space.World);\n";
};

Blockly.CSharp['unityTransform_position'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  return [transform+".position", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityPhysics_angularSpeed'] = function(block) {
  var rigidbody = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_RIGIDBODY2D);
  return [rigidbody+".angularVelocity", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityPhysics_velocity'] = function(block) {
  var rigidbody = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_RIGIDBODY2D);
  return [rigidbody+".velocity", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityPhysics_push'] = function(block) {
  var rigidbody = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_RIGIDBODY2D);
  var vector = Blockly.CSharp.valueToCode(block, 'DIRECTION', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return rigidbody+'.AddForce('+vector+');\n';
};

Blockly.CSharp['unityPhysics_torque'] = function(block) {
  var rigidbody = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_RIGIDBODY2D);
  var value = Blockly.CSharp.valueToCode(block, 'TORQUE', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR) || '0f';
  return rigidbody+'.AddTorque('+value+');\n';
};