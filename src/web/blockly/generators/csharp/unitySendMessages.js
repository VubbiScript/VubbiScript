/**
 * @fileoverview Generating CSharp for unity message blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityMessages');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityGeneral_msgSend'] = function(block) {
  var gameObject = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_GAMEOBJECT);
  var name = Blockly.CSharp.variableDB_.getName('msg '+block.getFieldValue('MESSAGE'), 'MESSAGES'/* TODO: MAKE CONSTANT */);
  var requireReceiver = block.getFieldValue('NEEDRECEIVE') === 'TRUE';
  return gameObject+'.SendMessage("'+name+'"'+(!requireReceiver?', SendMessageOptions.DontRequireReceiver':'')+');\n';
};

Blockly.CSharp['unityGeneral_msgReceive'] = function(block) {
  var name = Blockly.CSharp.variableDB_.getName('msg '+block.getFieldValue('EVENT'), 'MESSAGES'/* TODO: MAKE CONSTANT */);
  Blockly.CSharp.pushEventBlock(block, 'void '+name+'()');
  return null;
};