/**
 * @fileoverview Generating CSharp for unity vector blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityVector');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityVector_make'] = function(block) {
  var x = Blockly.CSharp.valueToCode(block, 'X', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var y = Blockly.CSharp.valueToCode(block, 'Y', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var z = Blockly.CSharp.valueToCode(block, 'Z', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  return ['new Vector3('+x+', '+y+', '+z+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityVector_x'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.x', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_y'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.y', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_z'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.z', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_length'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.magnitude', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_pick'] = function(block) {
  var what = block.getFieldValue('OPTION') || 'zero';
  return ['Vector3.'+what, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};