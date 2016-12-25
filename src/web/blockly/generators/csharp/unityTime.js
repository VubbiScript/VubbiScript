/**
 * @fileoverview Generating CSharp for unity time blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityTime');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityTime_levelload'] = function(block) {
  return ['Time.timeSinceLevelLoad', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityTime_delta'] = function(block) {
  return ['Time.deltaTime', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};