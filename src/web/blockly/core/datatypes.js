'use strict';

goog.provide('Blockly.DataTypes');

/**
 * Get the basic data types (used in dropdowns and such)
 * 
 * @param {Blockly.Workspace} workspace - the workspace
 */
Blockly.DataTypes.getTypes = function(workspace) {
    return [
        [Blockly.Msg.VARIABLES_TYPE_NUMBER, 'Number'],
        [Blockly.Msg.VARIABLES_TYPE_BOOLEAN, 'Boolean'],
        [Blockly.Msg.VARIABLES_TYPE_STRING, 'String'],
        [Blockly.Msg.VARIABLES_TYPE_GAMEOBJECT, 'GameObject'],
        [Blockly.Msg.VARIABLES_TYPE_VECTOR3, 'Vector3'],
        [Blockly.Msg.VARIABLES_TYPE_QUATERNION, 'Quaternion'],
        [Blockly.Msg.VARIABLES_TYPE_SPRITE, 'Sprite'],
      //[Blockly.Msg.VARIABLES_TYPE_ARRAY_NUMBER, 'List_Number'],
      //[Blockly.Msg.VARIABLES_TYPE_ARRAY_BOOLEAN, 'List_Boolean'],
      //[Blockly.Msg.VARIABLES_TYPE_ARRAY_STRING, 'List_String'],
      //["List GameObject", 'List_GameObject'],
      //["List Vector3", 'List_Vector3'],
      //["List Sprite", 'List_Sprite']
        ]
};

/**
 * Get a default block for a certain datatype
 * 
 * @param {Blockly.Workspace} workspace - the workspace
 * @param {string} option - the selected option
 * 
 * @return {Blockly.Block|null} the created block
 */
Blockly.DataTypes.getDefaultBlock = function(workspace, option) {
    var block = null;
    if (option === 'Number') {
        block = workspace.newBlock('math_number');
    } else if (option === 'String') {
        block = workspace.newBlock('text');
    } else if (option === 'Boolean') {
        block = workspace.newBlock('logic_boolean');
    } else if (option === 'Vector3') {
        block = workspace.newBlock('unityVector_make');
        block.PROPERTY_FIX_CHILDREN_DECLARE = true;
        block.initSvg();
        block.render();
        var inputs = ['X', 'Y', 'Z'];
        for(var i=0;i<3;i++) {
            var xInp = block.getInput(inputs[i]);
            var xBlock = workspace.newBlock('math_number');
            xBlock.initSvg();
            xBlock.render();
            xInp.connection.connect(xBlock.outputConnection);
        }
    } else if (option.substr(0, 5) === 'List_') {
        block = workspace.newBlock('unityLists_create_with');
        block.setFieldValue(option.substr(5), 'LIST_TYPE');
    } else if (option === 'GameObject' || option === 'Sprite') {
        block = workspace.newBlock('logic_null');
    } else if (option === 'Quaternion') {
        block = workspace.newBlock('unityrotate_identity');
    }
    return block;
}

Blockly.DataTypes.getDataTypeColour = function(option) {
    if(option === 'Number') {
        return Blockly.CAT_MATH_RGB;
    } else if (option === 'String') {
        return Blockly.CAT_TEXT_RGB;
    } else if (option === 'Boolean') {
        return Blockly.CAT_CONTROL_RGB;
    } else if (option === 'Vector3') {
        return Blockly.CAT_VECTOR_RGB;
    } else if (option === 'GameObject') {
        return Blockly.CAT_OBJECTS_RGB;
    } else if (option === 'Sprite') {
        return Blockly.CAT_SPRITE_RGB;
    } else if (option === 'Quaternion') {
        return Blockly.CAT_ROTATE_RGB;
    } else {
        return Blockly.CAT_VARIABLE_RGB;
    }
};

/**
 * Import the inputs inside the variable block from another block...
 * 
 * Used during migration...
 */
Blockly.DataTypes.importInputFromBlock = function(workspace, destinationblock, sourceblock, option) {
  if (!sourceblock) {return;}
  if (option === 'Number') {
      if(sourceblock.type === 'math_number') {
        destinationblock.setFieldValue(sourceblock.getFieldValue("NUM"), "NUM");
      }
  } else if (option === 'String') {
      if(sourceblock.type === 'text') {
          destinationblock.setFieldValue(sourceblock.getFieldValue("TEXT"), "TEXT");
      }
  } else if (option === 'Boolean') {
      if(sourceblock.type === 'logic_boolean') {
          destinationblock.setFieldValue(sourceblock.getFieldValue("BOOL"), "BOOL");
      }
  } else if (option === 'Vector3') {
      if(sourceblock.type === 'unityVector_make') {
          var xblock = sourceblock.getInputTargetBlock("X");
          var yblock = sourceblock.getInputTargetBlock("Y");
          var zblock = sourceblock.getInputTargetBlock("Z");
          if(xblock && xblock.type === 'math_number') {
              destinationblock.setFieldValue(xblock.getFieldValue("NUM"), "X");
          }
          if(yblock && yblock.type === 'math_number') {
              destinationblock.setFieldValue(yblock.getFieldValue("NUM"), "Y");
          }
          if(zblock && zblock.type === 'math_number') {
              destinationblock.setFieldValue(zblock.getFieldValue("NUM"), "Z");
          }
      }
  //} else if (option.substr(0, 5) === 'List_') {
      // No migration...
  //} else if (option === 'GameObject' || option === 'Sprite') {
      // No migration...
  //} else if (option === 'Quaternion') {
      // No migration...
  }
};

/**
 * Add the inputs for a certain datatype
 * 
 * @param {Blockly.Workspace} workspace - the workspace
 * @param {Blockly.Input} input - the input to add to
 * @param {string} option - the selected option
 */
Blockly.DataTypes.addDataTypeInputBlock = function(workspace, input, option, witharrow) {
  if(witharrow) {
      input.appendField(Blockly.RTL ? '\u2192' : '\u2190', "arrow");
  }
  if (option === 'Number') {
      input.appendField(new Blockly.FieldNumber("0",
        Blockly.FieldTextInput.numberValidator), "NUM");
  } else if (option === 'String') {
      input
        .appendField(Blockly.DataTypes.newQuote_(true === workspace.RTL), 'TEXTQ1')
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(Blockly.DataTypes.newQuote_(false === workspace.RTL), 'TEXTQ2');
  } else if (option === 'Boolean') {
      input
        .appendField(new Blockly.FieldDropdown(
            [[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]]), "BOOL");
  } else if (option === 'Vector3') {
      input.appendField(Blockly.Msg.UNITY_VECTOR_CREATE_X_TITLE, "Xlabel");
      input.appendField(new Blockly.FieldNumber("0"), "X");
      input.appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Y_TITLE, "Ylabel");
      input.appendField(new Blockly.FieldNumber("0"), "Y");
      input.appendField(Blockly.Msg.UNITY_VECTOR_CREATE_Z_TITLE, "Zlabel");
      input.appendField(new Blockly.FieldNumber("0"), "Z");
  } else if (option.substr(0, 5) === 'List_') {
      // Nothing
  } else if (option === 'GameObject' || option === 'Sprite') {
      // Label only
      input.appendField(Blockly.Msg.LOGIC_NULL, "label");
  } else if (option === 'Quaternion') {
      // Label only
      input.appendField(Blockly.Msg.UNITY_QUATERNION_IDENTITY_TITLE, "label");
  }
};

/**
 * Remove the inputs for a certain datatype
 * 
 * @param {Blockly.Workspace} workspace - the workspace
 * @param {Blockly.Input} input - the input to add to
 * @param {string} option - the selected option
 */
Blockly.DataTypes.removeDataTypeInputBlock = function(workspace, input, option, witharrow) {
  if(witharrow) {
      input.removeField("arrow");
  }
  if (option === 'Number') {
      input.removeField("NUM");
  } else if (option === 'String') {
      input.removeField('TEXTQ1');
      input.removeField('TEXT');
      input.removeField('TEXTQ2');
  } else if (option === 'Boolean') {
      input.removeField("BOOL");
  } else if (option === 'Vector3') {
      input.removeField("Xlabel");
      input.removeField("X");
      input.removeField("Ylabel");
      input.removeField("Y");
      input.removeField("Zlabel");
      input.removeField("Z");
  } else if (option.substr(0, 5) === 'List_') {
      // Nothing
  } else if (option === 'GameObject' || option === 'Sprite') {
      // Label only
      input.removeField("label");
  } else if (option === 'Quaternion') {
      // Label only
      input.removeField("label");
  }
};

  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
Blockly.DataTypes.newQuote_ = function(open) {
    if (open) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
};