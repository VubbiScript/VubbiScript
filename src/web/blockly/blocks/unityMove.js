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
    var physicsToggle = Blockly.PhysicsToggle.makeToggleField(goog.bind(function(newValue){
        this.type_ = newValue==="2D"?"Number":"Vector3";
        this.setOutput(true, this.type_);
    }, this));
    this.appendDummyInput()
        .appendField(physicsToggle, "PHYSICS");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    this.type_ = "Number";
    //this.setHelpUrl('http://www.example.com/');
  },
    /**
     * Create XML to represent whether a statement list of variable declarations
     * should be present.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.type_);
        return container;
    },

    /**
     * Parse XML to restore the statement list.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        if(xmlElement.getAttribute('type')) {
          this.type_ = xmlElement.getAttribute('type');
          this.setOutput(true, this.type_);
        }
    }
};

Blockly.Blocks['unityPhysics_velocity'] = {
  init: function() {
    this.appendValueInput("WHO")
        .appendField(Blockly.Msg.UNITY_PHYSICS_VELOCITY_TITLE);
    this.appendDummyInput()
        .appendField(Blockly.PhysicsToggle.makeToggleField(), "PHYSICS");
    this.setInputsInline(true);
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
    this.appendDummyInput()
        .appendField(Blockly.PhysicsToggle.makeToggleField(), "PHYSICS");
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
    var physicsToggle = Blockly.PhysicsToggle.makeToggleField(goog.bind(function(newValue){
        this.type_ = newValue==="2D"?"Number":"Vector3";
        this.getInput('TORQUE').connection.setCheck(this.type_);
    }, this));
    this.appendDummyInput()
        .appendField(physicsToggle, "PHYSICS");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_MOVE_RGB);
    this.setTooltip('');
    this.type_ = "Number";
    //this.setHelpUrl('http://www.example.com/');
  },
    /**
     * Create XML to represent whether a statement list of variable declarations
     * should be present.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.type_);
        return container;
    },

    /**
     * Parse XML to restore the statement list.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        if(xmlElement.getAttribute('type')) {
          this.type_ = xmlElement.getAttribute('type');
          this.getInput('TORQUE').connection.setCheck(this.type_);
        }
    }
};