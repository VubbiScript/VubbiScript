/**
 * Physics blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityMove');

goog.require('Blockly.Blocks');


//
// Transform
//
Blockly.Blocks['unityTransform_jumpto'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_TRANSFORM_JUMPTO_TITLE_1);
    this.appendValueInput("WHERE")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_TRANSFORM_JUMPTO_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['unityTransform_move'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_TRANSFORM_MOVE_TITLE_1);
    this.appendValueInput("DELTA")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_TRANSFORM_MOVE_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTransform_position'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_TRANSFORM_POSITION_TITLE);
    this.setOutput(true, "Vector3");
    this.setInputsInline(true);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

//
// Rigidbody
//
Blockly.Blocks['unityPhysics_angularSpeed'] = {
  init: function() {
    this.appendValueInput("WHO")
        .appendField(Blockly.Msg.UNITY_PHYSICS_ANGULARSPEED_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityPhysics_velocity'] = {
  init: function() {
    this.appendValueInput("WHO")
        .appendField(Blockly.Msg.UNITY_PHYSICS_VELOCITY_TITLE);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityPhysics_push'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_PHYSICS_PUSH_TITLE_1);
    this.appendValueInput("DIRECTION")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_PHYSICS_PUSH_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityPhysics_torque'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_PHYSICS_TORQUE_TITLE_1);
    this.appendValueInput("TORQUE")
        .setCheck("Number")
        .appendField(Blockly.Msg.UNITY_PHYSICS_TORQUE_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};