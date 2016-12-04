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
        .appendField("Schrijf naar console");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// SendMessage
Blockly.Blocks['unityGeneral_msgSend'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Zend bericht")
        .appendField(new Blockly.FieldTextInput("doe iets"), "MESSAGE")
        .appendField("naar");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NEEDRECEIVE")
        .appendField("eis ontvanger");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// SendMessage
Blockly.Blocks['unityGeneral_msgSendWithArg'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Zend bericht")
        .appendField(new Blockly.FieldTextInput("doe iets"), "MESSAGE")
        .appendField("naar");
    this.appendValueInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met informatie");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NEEDRECEIVE")
        .appendField("eis ontvanger");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Receive Message
Blockly.Blocks['unityGeneral_msgReceive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer uit als ik bericht")
        .appendField(new Blockly.FieldTextInput("doe iets"), "EVENT")
        .appendField("ontvang");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Receive Message
Blockly.Blocks['unityGeneral_msgReceiveWithArg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer uit als ik bericht")
        .appendField(new Blockly.FieldTextInput("doe iets"), "EVENT")
        .appendField("ontvang met informatie")
        .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.VARIABLES_TYPE_NUMBER, 'Number'],
              [Blockly.Msg.VARIABLES_TYPE_BOOLEAN, 'Boolean'],
              [Blockly.Msg.VARIABLES_TYPE_STRING, 'String'],
              ["GameObject", 'GameObject'],// TODO JEPE vertaal
              ["Vector3", 'Vector3']]
            ), "TYPE")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("var"), "VARNAME");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Destroy
Blockly.Blocks['unityGeneral_destroy'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Vernietig");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Create
Blockly.Blocks['unityGeneral_create'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Maak kopie van");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityGeneral_createGet'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Maak kopie van");
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Myself
Blockly.Blocks['unity_me'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mijzelf");
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Myself
Blockly.Blocks['unityUI_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("Zet UI tekst op");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_TEXT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};