/**
 * Vector blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityVector');

goog.require('Blockly.Blocks');

// make
Blockly.Blocks['unityVector_make'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_X_TITLE);
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Y_TITLE);
    this.appendValueInput("Z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Z_TITLE);
    this.setOutput(true, "Vector3");
    this.setInputsInline(true);
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// get
Blockly.Blocks['unityVector_x'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_X_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_y'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_Y_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_z'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_Z_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_length'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_LENGTH_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_angle'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Vector3")
        .appendField("hoek tussen");
    this.appendValueInput("TO")
        .setCheck("Vector3")
        .appendField("en");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_pick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Vector3")
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_UP, "up"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_DOWN, "down"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_LEFT, "left"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_RIGHT, "right"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_FORWARD, "forward"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_BACK, "back"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_ZERO, "zero"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_ONE, "one"]
        ]), "OPTION");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};