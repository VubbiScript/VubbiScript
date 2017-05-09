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
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_delta'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_DELTA_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_waitframe'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_WAITFRAME_TITLE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_waittime'] = {
  init: function() {
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField(Blockly.Msg.UNITY_TIME_WAITTIME_TITLE_1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_WAITTIME_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_repeat_while'] = {
  init: function() {
    this.appendValueInput("WHILE")
        .setCheck("Boolean")
        .appendField(Blockly.Msg.UNITY_TIME_REPEAT_TILL_TITLE);
    this.appendStatementInput("STATEMENTS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_REPEAT_TITLE);
    this.appendStatementInput("STATEMENTS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTime_looptime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_TIME_LOOP_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_TIME_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};