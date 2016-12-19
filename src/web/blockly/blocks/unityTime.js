/**
 * Time blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityTime');

goog.require('Blockly.Blocks');


Blockly.Blocks['unityTime_levelload'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_LEVELLOAD_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_MATH_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_delta'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_DELTA_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_MATH_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};