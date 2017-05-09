/**
 * @fileoverview Generating CSharp for unity objects blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityObjects');

goog.require('Blockly.CSharp');

Blockly.CSharp['unity_me'] = function(block) {
  return ['gameObject', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_GAMEOBJECT];
};

Blockly.CSharp['unityGeneral_destroy'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  return 'Object.Destroy('+gameObject+');\n';
};

Blockly.CSharp['unityGeneral_create'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  return 'Object.Instantiate('+gameObject+');\n';
};

Blockly.CSharp['unityGeneral_createGet'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  return ['Object.Instantiate('+gameObject+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_GAMEOBJECT];
};

Blockly.CSharp['unityObjects_findTag'] = function(block) {
  var tag = Blockly.CSharp.valueToCode(block, 'TAG', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_STRING);
  return ['GameObject.FindWithTag('+tag+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_GAMEOBJECT];
};

Blockly.CSharp['unityObjects_tagof'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  return [gameObject+'.tag', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_STRING];
};

Blockly.CSharp['unityObjects_tagcompare'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  var tag = Blockly.CSharp.valueToCode(block, 'TAG', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_STRING);
  return [gameObject+'.CompareTag('+tag+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_BOOLEAN];
};