/**
 * @fileoverview Generating CSharp for unity general blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityGeneral');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityUI_text'] = function(block) {
  var text = Blockly.CSharp.valueToCode(block, 'TEXT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_STRING);
  return 'GetComponent<UnityEngine.UI.Text>().text = '+text+';\n';
};

Blockly.CSharp['unityGeneral_log'] = function(block) {
  var toprint = Blockly.CSharp.valueToCode(block, 'WHAT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_ANY) || '""';
  return 'print('+toprint+');\n';
};

Blockly.CSharp['unityScene_toscene'] = function(block) {
  var scene = Blockly.CSharp.valueToCode(block, 'SCENE', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_STRING);
  return 'UnityEngine.SceneManagement.SceneManager.LoadScene('+scene+');\n';
};