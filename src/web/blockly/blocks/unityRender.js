/**
 * Time blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityRender');

goog.require('Blockly.Blocks');


// Set sprite
Blockly.Blocks['unityRender_setLook'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_RENDER_SETSPRITE_TITLE_1);
    this.appendValueInput("SPRITE")
        .setCheck("Sprite")
        .appendField(Blockly.Msg.UNITY_RENDER_SETSPRITE_TITLE_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};