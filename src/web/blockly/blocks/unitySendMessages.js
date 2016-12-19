/**
 * Message Send blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unitySendMessages');

goog.require('Blockly.Blocks');

// SendMessage
Blockly.Blocks['unityGeneral_msgSend'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_TITLE_1)
        .appendField(new Blockly.FieldTextInput(Blockly.Msg.UNITY_EVENTS_MESSAGE_DEFAULT), "MESSAGE")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_TITLE_2);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NEEDRECEIVE")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_REQUIRE_RECEIVER);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// SendMessage
Blockly.Blocks['unityGeneral_msgSendWithArg'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_ARG_TITLE_1)
        .appendField(new Blockly.FieldTextInput(Blockly.Msg.UNITY_EVENTS_MESSAGE_DEFAULT), "MESSAGE")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_ARG_TITLE_2);
    this.appendValueInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_ARG_TITLE_3);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NEEDRECEIVE")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_SEND_REQUIRE_RECEIVER);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Receive Message
Blockly.Blocks['unityGeneral_msgReceive'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_RECEIVE_TITLE_1)
        .appendField(new Blockly.FieldTextInput(Blockly.Msg.UNITY_EVENTS_MESSAGE_DEFAULT), "EVENT")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_RECEIVE_TITLE_2);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Receive Message
Blockly.Blocks['unityGeneral_msgReceiveWithArg'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_RECEIVE_ARG_TITLE_1)
        .appendField(new Blockly.FieldTextInput(Blockly.Msg.UNITY_EVENTS_MESSAGE_DEFAULT), "EVENT")
        .appendField(Blockly.Msg.UNITY_EVENTS_MESSAGE_RECEIVE_ARG_TITLE_2)
        .appendField(new Blockly.FieldDropdown(Blockly.DataTypes.getTypes()), "TYPE")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("var"), "VARNAME");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};