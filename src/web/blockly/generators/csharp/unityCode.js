/**
 * @fileoverview Generating CSharp for unity code blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityCode');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityCode_define'] = function(block) {
  // Note: prefix name with "block" to not have an issue with naming conflicts with message blocks...
  // => Those we cannot really change the name to avoid conflicts
  var name = Blockly.CSharp.variableDB_.getName('block '+block.getFieldValue('NAME'), Blockly.EditableCodeBlocks.NAME_TYPE);
  var innerCode = Blockly.CSharp.prefixLines(block.getFieldValue('CODE'), Blockly.CSharp.INDENT);
  return 'void '+name+'()\n{\n'+innerCode+'\n}\n';
};

Blockly.CSharp['unityCode_use'] = function(block) {
  // Note: prefix name with "block" to not have an issue with naming conflicts with message blocks...
  // => Those we cannot really change the name to avoid conflicts
  var name = Blockly.CSharp.variableDB_.getName('block '+block.getFieldValue('NAME'), Blockly.EditableCodeBlocks.NAME_TYPE);
  return name+'();\n';
};