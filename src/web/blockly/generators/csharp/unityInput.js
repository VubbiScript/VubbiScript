/**
 * @fileoverview Generating CSharp for unity input blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityInput');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityInput_key'] = function(block) {
  var buttonType = block.getFieldValue("KEY");
  var pressedType = block.getFieldValue('PRESSED');
  var callMap = {
    'Down':'GetKeyDown',
    'Up':'GetKeyUp',
    '':'GetKey'
  };
  return ['Input.'+callMap[pressedType]+'(KeyCode.'+buttonType+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_BOOLEAN];
};