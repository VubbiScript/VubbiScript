/**
 * Event blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityEvents');

goog.require('Blockly.Blocks');


Blockly.Blocks['unityEvents_start'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_START_TITLE);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_update'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_UPDATE_TITLE);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_mouse'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_MOUSEHOVER_TITLE_1)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.UNITY_EVENTS_MOUSEHOVER_OPT_ENTER, "Enter"], 
            [Blockly.Msg.UNITY_EVENTS_MOUSEHOVER_OPT_STAY, "Stay"], 
            [Blockly.Msg.UNITY_EVENTS_MOUSEHOVER_OPT_EXIT, "Exit"]
        ]), "HOVER")
        .appendField(Blockly.Msg.UNITY_EVENTS_MOUSEHOVER_TITLE_2);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_mouse_click'] = {
  init: function() {
    this.PROPERTY_VALID_ROOT = true;
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_EVENTS_MOUSECLICK_TITLE_1)
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.UNITY_EVENTS_MOUSECLICK_OPT_DOWN, "Down"], 
            [Blockly.Msg.UNITY_EVENTS_MOUSECLICK_OPT_STAY, "Drag"], 
            [Blockly.Msg.UNITY_EVENTS_MOUSECLICK_OPT_UP, "Up"]
        ]), "STATE")
        .appendField(Blockly.Msg.UNITY_EVENTS_MOUSECLICK_TITLE_2);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityEvents_collision_param'] = Blockly.OutputMutatingBlock.createParamBlock(
    "unityEvents_collision",
    function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    },
    function() {
        return [
            {label:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_OBJ, val:"coll_other", type:"GameObject", proposedname:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_OBJ_DEFNAME}, 
            {label:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_SPEED, val:"coll_speed", type:"Number", proposedname:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_SPEED_DEFNAME}, 
            {label:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_VECTOR, val:"coll_dirspeed", type:"Vector3", proposedname:Blockly.Msg.UNITY_EVENTS_COLLIDE_PARAM_VECTOR_DEFNAME}
        ];
    }
);

Blockly.Blocks['unityEvents_collision'] = Blockly.OutputMutatingBlock.createBlock (
    'unityEvents_collision_param',
    function() {
        this.PROPERTY_VALID_ROOT = true;
        this.appendDummyInput()
            .appendField(Blockly.Msg.UNITY_EVENTS_COLLIDE_TITLE_1)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.UNITY_EVENTS_COLLIDE_OPT_ENTER, "Enter"], 
                [Blockly.Msg.UNITY_EVENTS_COLLIDE_OPT_STAY, "Stay"], 
                [Blockly.Msg.UNITY_EVENTS_COLLIDE_OPT_EXIT, "Exit"]
            ]), "STATE")
            .appendField(Blockly.Msg.UNITY_EVENTS_COLLIDE_TITLE_2)
            .appendField(Blockly.PhysicsToggle.makeToggleField(), "PHYSICS");
        this.setNextStatement(true, null);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityEvents_collision' ]));
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    }
);

Blockly.Blocks['unityEvents_jointbreaks_param'] = Blockly.OutputMutatingBlock.createParamBlock(
    "unityEvents_jointbreaks",
    function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    },
    function() {
        return [
            {label:Blockly.Msg.UNITY_EVENTS_JOINTBREAKS_PARAM_OBJ, val:"joint_other", type:"GameObject", proposedname:Blockly.Msg.UNITY_EVENTS_JOINTBREAKS_PARAM_OBJ_DEFNAME}
        ];
    }
);

Blockly.Blocks['unityEvents_jointbreaks'] = Blockly.OutputMutatingBlock.createBlock (
    'unityEvents_jointbreaks_param',
    function() {
        this.PROPERTY_VALID_ROOT = true;
        this.appendDummyInput()
            .appendField(Blockly.Msg.UNITY_EVENTS_JOINTBREAKS_TITLE)
            .appendField(Blockly.PhysicsToggle.makeToggleField(), "PHYSICS");
        this.setNextStatement(true, null);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityEvents_jointbreaks' ]));
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    }
);

Blockly.Blocks['unityEvents_trigger_param'] = Blockly.OutputMutatingBlock.createParamBlock(
    "unityEvents_trigger",
    function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    },
    function() {
        return [
            {label:Blockly.Msg.UNITY_EVENTS_TRIGGER_PARAM_OBJ, val:"trigger_other", type:"GameObject", proposedname:Blockly.Msg.UNITY_EVENTS_TRIGGER_PARAM_OBJ_DEFNAME}
        ];
    }
);

Blockly.Blocks['unityEvents_trigger'] = Blockly.OutputMutatingBlock.createBlock (
    'unityEvents_trigger_param',
    function() {
        this.PROPERTY_VALID_ROOT = true;
        this.appendDummyInput()
            .appendField(Blockly.Msg.UNITY_EVENTS_TRIGGER_TITLE_1)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.UNITY_EVENTS_TRIGGER_OPT_ENTER, "Enter"], 
                [Blockly.Msg.UNITY_EVENTS_TRIGGER_OPT_STAY, "Stay"], 
                [Blockly.Msg.UNITY_EVENTS_TRIGGER_OPT_EXIT, "Exit"]
            ]), "STATE")
            .appendField(Blockly.Msg.UNITY_EVENTS_TRIGGER_TITLE_2)
            .appendField(Blockly.PhysicsToggle.makeToggleField(), "PHYSICS");
        this.setNextStatement(true, null);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityEvents_jointbreaks' ]));
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    }
);