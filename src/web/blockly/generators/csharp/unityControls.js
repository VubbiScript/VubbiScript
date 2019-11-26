/**
 * @fileoverview Generating CSharp for unity controls blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityControls');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityControls_classConfig'] = function(block) {
  if(block.declare_) {
    var statementCode = Blockly.CSharp.statementToCode(block, 'ST');
    Blockly.CSharp.tempGlobalsCode_ += statementCode;
    return null;
  }
  return null;
};