/**
 * @fileoverview C# code edit blocks for Unity
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.Blocks.unityCode');

goog.require('Blockly.Blocks');


Blockly.Blocks['unityCode_define'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.PROPERTY_IS_EDITABLECODEBLOCK = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_CODE_BLOCK_TITLE).appendField(new Blockly.FieldTextInput(Blockly.Msg.UNITY_CODE_BLOCK_DEFAULT_NAME), 'NAME');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCodeInput(Blockly.Msg.UNITY_CODE_BLOCK_DEFAULT_CODE.replace(/\{NEWLINE\}/g, "\n").replace(/\{QUOTE\}/g, "\"")), 'CODE');
    this.setColour(Blockly.CAT_MORE_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  },
  getCodeBlockCallingName: function() {
    return this.getFieldValue('NAME');
  }
};

Blockly.Blocks['unityCode_use'] = {
  init: function() {
    this.blockToCall_ = '';
    this.appendDummyInput().appendField(new Blockly.FieldLabel(this.blockToCall_), "NAME");
    this.setColour(Blockly.CAT_MORE_RGB);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  },
  /**
   * Get the name of the function that this item calls
   */
  getCallFunctionName : function() {
    return this.blockToCall;
  },
  /**
   * Set the name of the function to call
   */
  setCallFunctionInfo : function(name) {
    this.blockToCall_ = name || '';
    this.setFieldValue(this.blockToCall_, 'NAME');
  },
  /**
   * Create XML to represent with the name of the method to call
   * 
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom : function() {
    if (this.blockToCall_ === undefined) {
      return '';
    }
    var container = document.createElement('mutation');
    container.setAttribute('tocall', this.blockToCall_);
    return container;
  },

  /**
   * Parse XML to restore the name of the item to call.
   * 
   * @param {!Element}
   *            xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation : function(xmlElement) {
    this.blockToCall_ = xmlElement.getAttribute('tocall') || '';
    this.setFieldValue(this.blockToCall_, 'NAME');
  }
}