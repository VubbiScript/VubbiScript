/**
 * @fileoverview Generating CSharp for unity render blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityRender');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityRender_setLook'] = function(block) {
  var spriterenderer = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_SPRITERENDERER);
  var sprite = Blockly.CSharp.valueToCode(block, 'SPRITE', Blockly.CSharp.ORDER_ASSIGNMENT, Blockly.CSharp.DATATYPE_SPRITE) || 'null';
  return spriterenderer+'.sprite = '+sprite+';\n';
};