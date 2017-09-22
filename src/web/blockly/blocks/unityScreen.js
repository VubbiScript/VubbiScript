/**
 * @fileoverview blocks related to the Screen, Camera & Mouse
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.Blocks.unityScreen');

goog.require('Blockly.Blocks');

Blockly.Blocks['unityScreen_mouse_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_SCREEN_MOUSE_POSITION_TITLE);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_DETECT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_mouse_scene_position2D'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_SCREEN_MOUSE_SCENE_POSITION_2D_TITLE);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_DETECT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_camera_main'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_SCREEN_CAMERA_MAIN_TITLE);
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_OBJECTS_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_screen_to_scene'] = {
  init: function() {
    this.appendValueInput("POS")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_TITLE_1);
    this.appendValueInput("CAM")
        .setCheck("GameObject")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_TITLE_2);
    this.appendValueInput("PLANE_NORMAL")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_TITLE_3);
    this.appendValueInput("PLANE_POINT")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_TITLE_4);
    this.setInputsInline(false);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_scene_to_screen'] = {
  init: function() {
    this.appendValueInput("POS")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_SCREEN_SCENE_TO_SCREEN_TITLE_1);
    this.appendValueInput("CAM")
        .setCheck("GameObject")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCENE_TO_SCREEN_TITLE_2);
    this.setInputsInline(false);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_screen_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_SIZE_TITLE);
    this.setInputsInline(false);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_DETECT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityScreen_screen_to_scene_direction'] = {
  init: function() {
    this.appendValueInput("POS")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_DIR_TITLE_1);
    this.appendValueInput("CAM")
        .setCheck("GameObject")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_SCREEN_SCREEN_TO_SCENE_DIR_TITLE_2);
    this.setInputsInline(false);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};