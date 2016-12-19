/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldTypedVariable');

goog.require('Blockly.FieldVariable');
goog.require('Blockly.Msg');
goog.require('Blockly.Variables');
goog.require('goog.string');


/**
 * Class for a variable's dropdown field.
 * @param {string} type The type of the variable
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldVariable}
 * @constructor
 */
Blockly.FieldTypedVariable = function(type, opt_validator, opt_proposedname) {
    this.requiredType_ = type;
    this.proposedName_ = opt_proposedname || '';
    // Skip the constructor of FieldVariable! (it passed the wrong dropdownCreate)
    Blockly.FieldDropdown.prototype.constructor.call(this, this.dropdownCreate, opt_validator);
    this.setValue('');
};
goog.inherits(Blockly.FieldTypedVariable, Blockly.FieldVariable);

/**
 * Sets a new change handler for angle field.
 * @param {Function} handler New change handler, or null.
 */
Blockly.FieldTypedVariable.prototype.setValidator = function(handler) {
  var wrappedHandler;
  var self = this;
  if (handler) {
    // Wrap the user's change handler together with the variable rename handler.
    wrappedHandler = function(value) {
      var v1 = handler.call(this, value);
      if (v1 === null) {
        var v2 = v1;
      } else {
        if (v1 === undefined) {
          v1 = value;
        }
        var v2 = Blockly.FieldTypedVariable.dropdownChange.call(self, v1);
        if (v2 === undefined) {
          v2 = v1;
        }
      }
      return v2 === value ? undefined : v2;
    };
  } else {
    wrappedHandler = goog.bind(Blockly.FieldTypedVariable.dropdownChange, this);
  }
  Blockly.FieldDropdown.prototype.setValidator.call(this, wrappedHandler);
};

/**
 * Install this dropdown on a block.
 */
Blockly.FieldTypedVariable.prototype.init = function() {
  if (this.fieldGroup_) {
    // Dropdown has already been initialized once.
    return;
  }
  // Note: skip FieldVariable init! (because it generates a default name)
  Blockly.FieldDropdown.prototype.init.call(this);
};

/**
 * Set the new data type. This will clear the value!
 */
Blockly.FieldTypedVariable.prototype.setRequiredType = function(type, opt_proposedname) {
    if(this.requiredType_ !== type) {
        this.requiredType_ = type;
        this.proposedName_ = opt_proposedname || '';
        this.setValue('');
    }
}

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {!Blockly.FieldTypedVariable}
 */
Blockly.FieldTypedVariable.prototype.dropdownCreate = function() {
    var variableList = [];
    if (this.sourceBlock_ && this.sourceBlock_.workspace) {
        var variableListWithType = Blockly.Variables.allGlobalVariablesWithType(this.sourceBlock_.workspace);
        for(var i=0;i < variableListWithType.length; i++) {
            var varInfo = variableListWithType[i];
            if(varInfo[1] === this.requiredType_) {
                variableList.push(varInfo[0]);
            }
        }
    }
    variableList.sort(goog.string.caseInsensitiveCompare);
    
    // Variables are not language-specific, use the name as both the user-facing
    // text and the internal representation.
    var options = [];
    for (var x = 0; x < variableList.length; x++) {
        options[x] = [variableList[x], variableList[x]];
    }
    
    // Add "New variable" option
    options.push([Blockly.Msg.NEW_VARIABLE_TYPED.replace('%1', this.requiredType_), '   new']);
    return options;
};

/**
 * Event handler for a change in variable name.
 * Special case the 'New variable...' and 'Rename variable...' options.
 * In both of these special cases, prompt the user for a new name.
 * @param {string} text The selected dropdown menu option.
 * @return {null|undefined|string} An acceptable new variable name, or null if
 *     change is to be either aborted (cancel button) or has been already
 *     handled (rename), or undefined if an existing variable was chosen.
 * @this {!Blockly.FieldTypedVariable}
 */
Blockly.FieldTypedVariable.dropdownChange = function (text) {
    function promptName(promptText, defaultText) {
        Blockly.hideChaff();
        var newVar = window.prompt(promptText, defaultText);
        // Merge runs of whitespace.  Strip leading and trailing whitespace.
        // Beyond this, all names are legal.
        if (newVar) {
            newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        }
        return newVar;
    }
    var workspace = this.workspace;

    if (text == '   new') {// note the space (makes it an inpossible variable name)
        text = Blockly.Variables.findLegalName(this.proposedName_, this.sourceBlock_);
        text = promptName(Blockly.Msg.NEW_VARIABLE_TITLE, text);
        // Since variables are case-insensitive, ensure that if the new variable
        // matches with an existing variable, the new case prevails throughout.
        if (text) {
            this.setValue(text);
            // will do rename:
            Blockly.Variables.addNewTypedGlobalVariable(text, this.requiredType_);
            return null;
        }
        return null;
    }
    return undefined;
};
