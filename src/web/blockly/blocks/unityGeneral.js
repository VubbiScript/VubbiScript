/**
 * Time blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityGeneral');

goog.require('Blockly.Blocks');


// Debug.Log
Blockly.Blocks['unityGeneral_log'] = {
  init: function() {
    this.appendValueInput("WHAT")
        .setCheck(null)
        .appendField(Blockly.Msg.UNITY_LOG_TITLE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_OTHER_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Set UI text
Blockly.Blocks['unityUI_text'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_UI_SET_TEXT_TITLE_1);
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField(Blockly.Msg.UNITY_UI_SET_TEXT_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TEXT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Go to scene
Blockly.Blocks['unityScene_toscene'] = {
  init: function() {
    this.appendValueInput("SCENE")
        .setCheck("String")
        .appendField(Blockly.Msg.UNITY_SCENE_GOTO_TITLE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_OTHER_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};