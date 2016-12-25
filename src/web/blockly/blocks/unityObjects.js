/**
 * Time blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityObjects');

goog.require('Blockly.Blocks');

// Myself
Blockly.Blocks['unity_me'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_THIS);
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Destroy
Blockly.Blocks['unityGeneral_destroy'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_OBJECTS_DESTROY_TITLE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Create
Blockly.Blocks['unityGeneral_create'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_OBJECTS_CREATE_TITLE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityGeneral_createGet'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_OBJECTS_CREATE_AND_GET_TITLE);
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityObjects_findTag'] = {
  init: function() {
    this.appendValueInput("TAG")
        .appendField(Blockly.Msg.UNITY_OBJECTS_FIND_TAG_TITLE);
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityObjects_tagof'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_OBJECTS_TAG_OF_TITLE);
    this.setOutput(true, "String");
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};