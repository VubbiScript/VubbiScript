/**
 * Vector blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityVector');

goog.require('Blockly.Blocks');

// make
Blockly.Blocks['unityVector_make'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_X_TITLE);
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Y_TITLE);
    this.appendValueInput("Z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Z_TITLE);
    this.setOutput(true, "Vector3");
    this.setInputsInline(true);
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// get
Blockly.Blocks['unityVector_get'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.UNITY_VECTOR_CREATE_X_TITLE, 'X'],
          [Blockly.Msg.UNITY_VECTOR_CREATE_Y_TITLE, 'Y'],
          [Blockly.Msg.UNITY_VECTOR_CREATE_Z_TITLE, 'Z']
        ]), 'OPT')
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_TITLE_1);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// Deprecated
Blockly.Blocks['unityVector_x'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_X_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
    
    this.setWarningText(Blockly.Msg.DEPRECATEDBLOCK);
  }
};

// Deprecated
Blockly.Blocks['unityVector_y'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_Y_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
    
    this.setWarningText(Blockly.Msg.DEPRECATEDBLOCK);
  }
};

// Deprecated
Blockly.Blocks['unityVector_z'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_FETCH_Z_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
    
    this.setWarningText(Blockly.Msg.DEPRECATEDBLOCK);
  }
};

Blockly.Blocks['unityVector_length'] = {
  init: function() {
    this.appendValueInput("VECT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_LENGTH_TITLE);
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

// NOT IMPLEMENTED
Blockly.Blocks['unityVector_angle'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Vector3")
        .appendField("hoek tussen");
    this.appendValueInput("TO")
        .setCheck("Vector3")
        .appendField("en");
    this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_pick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_UP, "up"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_DOWN, "down"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_LEFT, "left"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_RIGHT, "right"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_FORWARD, "forward"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_BACK, "back"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_ZERO, "zero"], 
          [Blockly.Msg.UNITY_VECTOR_PICK_OPT_ONE, "one"]
        ]), "OPTION");
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_tosize'] = {
  init: function() {
    this.appendValueInput("VECTOR")
        .setCheck("Vector3");
    this.appendValueInput("TOLENGTH")
        .setCheck("Number")
        .appendField(Blockly.Msg.UNITY_VECTOR_TOSIZE_TITLE);
    this.setInputsInline(true);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityVector_multiply'] = {
  init: function() {
    this.appendValueInput("FACTOR")
        .setCheck("Number");
    this.appendValueInput("VECTOR")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_MULTIPLY_TITLE);
    this.setInputsInline(true);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};



Blockly.Blocks['unityVector_math'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": "Vector3"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
             [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
             [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY']]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": "Vector3"
        }
      ],
      "inputsInline": true,
      "output": "Vector3",
      "colour": Blockly.CAT_VECTOR_RGB//,
      //"helpUrl": Blockly.Msg.MATH_ARITHMETIC_HELPURL
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.UNITY_VECTOR_MATH_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.UNITY_VECTOR_MATH_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.UNITY_VECTOR_MATH_TOOLTIP_MULTIPLY
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['unityVector_product'] = {
  init: function() {
    var typedropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.UNITY_VECTOR_PRODUCT_OPTION_DOT, "DOT"],
            [Blockly.Msg.UNITY_VECTOR_PRODUCT_OPTION_CROSS, "CROSS"]
        ], undefined, goog.bind(function(newvalue){
            if(newvalue === "DOT") {
              this.setOutput(true, "Number");
            } else {
              this.setOutput(true, "Vector3");
            }
        }, this));
    this.appendValueInput("A")
        .setCheck("Vector3")
        .appendField(typedropdown, "PRODUCTTYPE")
        .appendField(Blockly.Msg.UNITY_VECTOR_PRODUCT_TITLE_1);
    this.appendValueInput("B")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_PRODUCT_TITLE_2);
    this.setInputsInline(true);
    //this.setOutput(true, "Number");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityvector_transformpoint_tolocal'] = {
  init: function() {
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_VECTOR_TRANSFORMPOINT_TOLOCAL_TITLE_1);
    this.appendValueInput("POINT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_TRANSFORMPOINT_TOLOCAL_TITLE_2);
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_VECTOR_TRANSFORMPOINT_TOLOCAL_TITLE_3);
    this.setInputsInline(true);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['unityvector_transformpoint_toworld'] = {
  init: function() {
    this.appendValueInput("POINT")
        .setCheck("Vector3")
        .appendField(Blockly.Msg.UNITY_VECTOR_TRANSFORMPOINT_TOWORLD_TITLE_1);
    this.appendValueInput("WHO")
        .setCheck("GameObject")
        .appendField(Blockly.Msg.UNITY_VECTOR_TRANSFORMPOINT_TOWORLD_TITLE_2);
    this.setInputsInline(true);
    this.setOutput(true, "Vector3");
    this.setColour(Blockly.CAT_VECTOR_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};