/**
 * Rotation blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityRotate');

goog.require('Blockly.Blocks');



Blockly.Blocks['unityrotate_identity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_IDENTITY_TITLE);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_angleaxis2d'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_ANGLEAXIS2D_TITLE);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_angleaxis'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("Number");
    this.appendValueInput("AXIS")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_QUATERNION_ANGLEAXIS_TITLE_1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_ANGLEAXIS_TITLE_2);
    this.setInputsInline(true);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_set_rotation'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_QUATERNION_SET_ROTATION_TITLE_1);
    this.appendValueInput("QUATERNION")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_SET_ROTATION_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_rotate'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_QUATERNION_ROTATE_TITLE);
    this.appendValueInput("QUATERNION")
        .setCheck("Quaternion");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_get_rotation'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ROTATION_TITLE);
    this.setInputsInline(true);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_apply_vector'] = {
  init: function() {
    this.appendValueInput("VECTOR")
        .setCheck("Vector3");
    this.appendValueInput("QUATERION")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_APPLY_VECTOR_TITLE);
    this.setInputsInline(true);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_combine'] = {
  init: function() {
    this.appendValueInput("QUATERION1")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_COMBINE_TITLE_1);
    this.appendValueInput("QUATERION2")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_COMBINE_TITLE_2);
    this.setInputsInline(true);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_get_angle'] = {
  init: function() {
    this.appendValueInput("QUATERION1")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ANGLE_TITLE_1);
    this.appendValueInput("QUATERION2")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ANGLE_TITLE_2);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ANGLE_TITLE_3);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_get_angle_2d'] = {
  init: function() {
    this.appendValueInput("QUATERION")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ANGLE_2D_TITLE_1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_GET_ANGLE_2D_TITLE_2);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_looktowards'] = {
  init: function() {
    this.appendValueInput("POINTWHAT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_TITLE_1);
    this.appendValueInput("TOWARDS")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_TITLE_2);
    this.appendValueInput("STAYWHAT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_TITLE_3);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_TITLE_4);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_looktowards_2d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_TITLE_1)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_OPT_XAXIS_POS, "X"], 
            [Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_OPT_XAXIS_NEG, "-X"], 
            [Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_OPT_YAXIS_POS, "Y"], 
            [Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_OPT_YAXIS_NEG, "-Y"]]), "POINTWHAT");
    this.appendValueInput("TOWARDS")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_TITLE_2);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_QUATERNION_LOOKTOWARDS_2D_TITLE_3);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityrotate_inverse'] = {
  init: function() {
    this.appendValueInput("QUATERNION")
        .setCheck("Quaternion")
        .appendField(Blockly.Msg.UNITY_QUATERNION_INVERSE_TITLE);
    this.setOutput(true, "Quaternion");
    this.setColour(Blockly.CAT_ROTATE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};