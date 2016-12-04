/**
 * Physics blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityPhysics');

goog.require('Blockly.Blocks');


//
// Transform
//
Blockly.Blocks['unityTransform_jumpto'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("verspring");
    this.appendValueInput("WHERE")
        .setCheck("Vector3")
        .appendField("naar");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['unityTransform_move'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("verspring");
    this.appendValueInput("DELTA")
        .setCheck("Vector3")
        .appendField("meer naar");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityTransform_position'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("positie van");
    this.setOutput(true, "Vector3");
    this.setInputsInline(true);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

//
// Vector3
//

// make
Blockly.Blocks['unityVector_make'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Vector3")
        .appendField("x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendValueInput("Z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("z");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// get
Blockly.Blocks['unityVector_x'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField("x van");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_y'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField("y van");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_z'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField("z van");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_length'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField("lengte van");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_angle'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Vector3")
        .appendField("hoek tussen");
    this.appendValueInput("TO")
        .setCheck("Vector3")
        .appendField("en");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR3_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

//
// Collision
//


// Collision object
Blockly.Blocks['unityPhysics_collOther'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("GameObject waarmee je gebotst bent");
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Collision direction
Blockly.Blocks['unityPhysics_collDirection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("gerichte snelheid van botsing");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Collision speed
Blockly.Blocks['unityPhysics_collSpeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("snelheid van botsing");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Raycast
Blockly.Blocks['unityRaycast_raycast'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("raak ik iets als ik een laser schiet");
    this.appendValueInput("ORIGIN")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("van positie");
    this.appendValueInput("DIRECTION")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in richting");
    this.appendValueInput("MAXDIST")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met maximale afstand");
    this.appendStatementInput("STATEMENTS")
        .setCheck(null)
        .appendField("dan");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Raycast
Blockly.Blocks['unityRaycast_circlecast'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("raak ik iets als ik een cirkel schiet");
    this.appendValueInput("ORIGIN")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("van positie");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met een straal");
    this.appendValueInput("DIRECTION")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in richting");
    this.appendValueInput("MAXDIST")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met maximale afstand");
    this.appendStatementInput("STATEMENTS")
        .setCheck(null)
        .appendField("dan");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};


// Raycast object
Blockly.Blocks['unityRaycast_gameobject'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("GameObject dat je zou raken");
    this.setOutput(true, "GameObject");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Raycast distance
Blockly.Blocks['unityRaycast_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("afstand to waar je zou raken");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Raycast point
Blockly.Blocks['unityRaycast_point'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("punt waar je zou raken");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_ACTION_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Raycast point
Blockly.Blocks['unityRaycast_normal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("\"normaal vector\" waar je zou raken");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_ACTION_RGB);
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
        .appendField("Draaisnelheid (°/s) van");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityPhysics_velocity'] = {
  init: function() {
    this.appendValueInput("WHO")
        .appendField("Snelheid (eenheid/s) van");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// TODO:
// Blockly.Blocks['unityPhysics_toggleOnOff'] = {}

// IsTouchingLayers
// Sleep
// WakeUp

Blockly.Blocks['unityPhysics_push'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Geef");
    this.appendValueInput("DIRECTION")
        .setCheck("Vector3")
        .appendField("duw in richting");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityPhysics_torque'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField("Geef");
    this.appendValueInput("TORQUE")
        .setCheck("Number")
        .appendField("draaikracht");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_UNITY_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};