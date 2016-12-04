/**
 * Event blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityEvents');

goog.require('Blockly.Blocks');


Blockly.Blocks['unityEvents_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer elke frame opnieuw uit");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer eerste frame uit");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_collision'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer uit")
        .appendField(new Blockly.FieldDropdown([["als ik net iets raak", "Enter"], ["als ik nog steeds iets raak", "Stay"], ["als ik niets meer raak", "Exit"]]), "HIT");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip("");
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_mouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Voer uit als de muis zich")
        .appendField(new Blockly.FieldDropdown([["net", "Enter"], ["nog steeds", "Stay"], ["net niet meer", "Exit"]]), "HOVER")
        .appendField(" over mij bevindt");
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};