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
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.CAT_VARIABLE_RGB);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    this.dataType_ = null;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  setType: function(name, type) {
    if (type !== this.dataType_) {
      this.dataType_ = type;
      this.setOutput(true, this.dataType_);
    }
  },
  mutationToDom: function() {
    if (!this.dataType_) {
      return null;
    }
    var container = document.createElement('mutation');
      if (this.dataType_) {
        container.setAttribute('datatype', this.dataType_);
      }
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var dataType = xmlElement.getAttribute('datatype') || 
                   Blockly.Variables.getType(this.getFieldValue('VAR'));
    if (dataType && this.workspace.variableDeclaration) {
      this.dataType_ = dataType;
      this.setOutput(true, this.dataType_);
    }
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  /**
   * Called whenever this block changes. Add error if this block is not
   * nested in its declaration procedure - for local variables only
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace || !Blockly.getMainWorkspace().variableDeclaration) {
      // Block has been deleted.
      return;
    }
    var name = this.getFieldValue('VAR');
    var procedure = Blockly.Variables.getProcedureName(name);
    if (procedure) {
      var legal = false;
      var block = this;
      do {
        if (block.type == 'unityProcedures_defnoreturn' || block.type == 'unityProcedures_defreturn') {
          if (block.getFieldValue('NAME') == procedure) {
            legal = true;
            break;
          }
        }
        // for loops only
        if (block.id === procedure) {
          legal = true;
          break;
        }
        if (procedure === 'global') {
          legal = true;
          break;
        }
        block = block.getSurroundParent();
      } while (block);
      if (legal) {
        this.setErrorText(null);
      } else {
        if (!procedure.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)){
          this.setErrorText(Blockly.Msg.PROCEDURES_VARIABLES_LOOP_ERROR + this.getFieldValue('VAR'));
        } else {
          this.setErrorText(Blockly.Msg.PROCEDURES_VARIABLES_ERROR + procedure + Blockly.Msg.PROCEDURES_TITLE);
        }
      }
    }
  },
  contextMenuType_: 'variables_set',
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    xmlBlock.setAttribute('intask',false);
    var mutation = goog.dom.createDom('mutation');
    xmlBlock.appendChild(mutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Blocks['variables_set'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.VARIABLES_SET,
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.CAT_VARIABLE_RGB,
      "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
      "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
    });
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  setType: function(name, type) {
    this.dataType_ = type;
    this.getInput('VALUE').setCheck(this.dataType_);
  },
  mutationToDom: function() {
    if (!this.dataType_) {
      return null;
    }
    var container = document.createElement('mutation');
      if (this.dataType_) {
        container.setAttribute('datatype', this.dataType_);
      }
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var dataType = xmlElement.getAttribute('datatype') || 
                   Blockly.Variables.getType(this.getFieldValue('VAR'));
    if (dataType && this.workspace.variableDeclaration) {
      this.dataType_ = dataType;
      this.getInput('VALUE').setCheck(this.dataType_);
    }
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  onchange: Blockly.Blocks['variables_get'].onchange,
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};

Blockly.Blocks['unityGlobalVariables_declare'] = {
  /**
   * Block for variable decaration.
   * @this Blockly.Block
   */
  init: function() {
    this.PROPERTY_DECLARES_GLOBAL_VAR = true;
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(Blockly.CAT_ACTIVITY_RGB);
    var declType = new Blockly.FieldDropdown(Blockly.DataTypes.getTypes(this.workspace), goog.bind(function(option) {
        if (option && this.getFieldValue('TYPE') !== option) {
            this.updateType(option);
            this.updateShape_(0, option);
        }
    }, this));
      
    var name = Blockly.Variables.findLegalName(Blockly.Msg.VARIABLES_DEFAULT_NAME, this);
    this.nameOld = name;
    var nameField = new Blockly.FieldTextInput(name, this.validateName);
    this.appendDummyInput("ENTRY").
         appendField(new Blockly.FieldToggleIcon("PUBLIC", "PUBLIC", "PRIVATE", Blockly.FieldToggleIcon.ICON_EYE_VISIBLE, Blockly.FieldToggleIcon.ICON_EYE_HIDDEN), "VISIBILITY").
         appendField(Blockly.Msg.VARIABLES_TITLE).
         appendField(nameField, 'VAR').appendField(':').
         appendField(declType, 'TYPE');
    this.setPreviousStatement(true, 'declaration_only');
    //this.setTooltip(Blockly.Msg.VARIABLES_GLOBAL_DECLARE_TOOLTIP);
    this.setMutatorMinus(new Blockly.MutatorMinus(['unityGlobalVariables_declare']));
    this.setMovable(false);
    this.setDeletable(false);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenudeclarationType_ = 'variables_get';
    this.declarationType_ = 'Number';
    this.nextStatement_ = false;
    this.setNextStatement(false);
    //this.setHelp(new Blockly.Help(Blockly.Msg.VARIABLE_GLOBAL_HELP));
    this.displayedDeclarationType_ = null;
  },
  /**
   * Call to make sure the initial block is displayed correctly
   */
  initDefaultBlock: function() {
    this.updateShape_(0, 'Number');
  },
  /**
   * Will be called when during the import of the xml, we are missing a value with a certain name.
   * => The block that was in there will be passed to this call.
   */
  migrateMissingInput: function(inputname, block) {
    if(inputname === 'VALUE') {
      // We used to have an input called "VALUE"
      // Import the values in this block...
      Blockly.DataTypes.importInputFromBlock(this.workspace, this, block, this.displayedDeclarationType_);
    }
  },
  /**
   * Change the required variable type
   */
  changeVariableType: function(option) {
    if (option && this.getFieldValue('TYPE') !== option) {
        this.setFieldValue(option, 'TYPE');
        this.updateType(option);
        this.updateShape_(0, option);
    }
  },
  /**
   * Initialization of the block has completed, clean up anything that may be
   * inconsistent as a result of the XML loading.
   * @this Blockly.Block
   */
  validate: function () {
    var name = Blockly.Variables.findLegalName(
        this.getFieldValue('VAR'), this);
    this.setFieldValue(name, 'VAR');
  },
  /**
   * Obtain a valid name for the variable.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Check for basic naming conventions and doubles
   * @param {string} name User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified or is invalid
   * @private
   * @this Blockly.Block
   */
  validateName: function (name) {
    var block = this.sourceBlock_;
    name = name.replace(/[\s\xa0]+/g, '').replace(/^ | $/g, '');
    // no name set -> invalid
    if (name === '')
      return null;
    if (!name.match(/^[a-zA-Z][a-zA-Z_$0-9]*$/))
      return null;
    // Ensure two identically-named variables don't exist.
    name = Blockly.Variables.findLegalName(name, block);
    Blockly.Variables.renameVariable (block.nameOld, name, Blockly.getMainWorkspace());
    block.nameOld = name;
    return name;
  },
  /**
   * Create XML to represent variable declaration insides.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (this.nextStatement_ === undefined || this.declarationType_ === undefined) {
      return false;
    }
    var container = document.createElement('mutation');
    container.setAttribute('next', this.nextStatement_);
    container.setAttribute('declaration_type', this.declarationType_);
    return container;
  },
  /**
   * Parse XML to restore variable declarations.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.nextStatement_ = xmlElement.getAttribute('next') == 'true';
    if (this.nextStatement_) {
      this.setNext(this.nextStatement_);
    }
    this.declarationType_ = xmlElement.getAttribute('declaration_type');
    this.updateShape_(0, this.declarationType_);
  },
  setNext: function(next) {
    this.nextStatement_ = next;
    this.setNextStatement(next, 'declaration_only');
  },
  getType: function() {
    return this.declarationType_;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVarDecl: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Update the shape, if minus is pressed or if type has changed.
   * @param {Number} number -1 delete block, 0 type change.
   * @param {string} option data type.
   * @this Blockly.Block
   */
  updateShape_: function(num, option) {
    if (num == -1) {
      // remove declaration
      var parent = this.getParent();
      var nextBlock = this.getNextBlock();
      this.unplug(true, true);
      if (!!parent && parent.type == 'unityControls_classConfig' && !nextBlock) {
        parent.updateShape_(num);
      } else if (!!parent && !nextBlock) {
        parent.setNext(false);
      }
      Blockly.Variables.deleteAll(this.getFieldValue('VAR'));
      this.dispose();
    } else if (num == 0) {
      // changes in dropdown field TYPE -> change initial value
      var input = this.getInput("ENTRY");
      if(this.displayedDeclarationType_) {
        Blockly.DataTypes.removeDataTypeInputBlock(this.workspace, input, this.displayedDeclarationType_, true);
      }
      Blockly.DataTypes.addDataTypeInputBlock(this.workspace, input, option, true);
      this.displayedDeclarationType_ = option;
      this.setColour(Blockly.DataTypes.getDataTypeColour(option));
    }
  },
  updateType: function(option) {
    this.declarationType_ = option;
    Blockly.Variables.updateType(this.getFieldValue('VAR'), this.declarationType_);
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};

Blockly.Blocks['unityLocalVariables_declare'] = {
  /**
   * Block for variable decaration.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(Blockly.CAT_PROCEDURE_RGB);
    var declType = new Blockly.FieldDropdown(Blockly.DataTypes.getTypes(this.workspace), function(option) {
        if (option && this.sourceBlock_.getFieldValue('TYPE') !== option) {
            this.sourceBlock_.updateType(option);
        }
    });
    var name = Blockly.Variables.findLegalName('x', this);
    this.nameOld = name;
    var nameField = new Blockly.FieldTextInput(name, this.validateName);
    this.appendDummyInput().
         appendField(Blockly.Msg.VARIABLES_TITLE).
         appendField(nameField, 'VAR').
         appendField(':').
         appendField(declType, 'TYPE');
    this.setPreviousStatement(true, 'declaration_only');
    this.setTooltip(Blockly.Msg.VARIABLES_LOCAL_DECLARE_TOOLTIP);
    this.setMutatorMinus(new Blockly.MutatorMinus(this));
    this.setMovable(false);
    this.setDeletable(false);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenudeclarationType_ = 'variables_get';
    this.nextStatement_ = false;
    this.declarationType_ = 'Number';
  },
  /**
   * Initialization of the block has completed, clean up anything that may be
   * inconsistent as a result of the XML loading.
   * @this Blockly.Block
   */
  validate: Blockly.Blocks['unityGlobalVariables_declare'].validate,
  /**
   * Obtain a valid name for the variable.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Check for basic naming conventions and doubles
   * @param {string} name User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified or is invalid
   * @private
   * @this Blockly.Block
   */
  validateName: Blockly.Blocks['unityGlobalVariables_declare'].validateName,
  /**
   * Create XML to represent variable declaration insides.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: Blockly.Blocks['unityGlobalVariables_declare'].mutationToDom,
  /**
   * Parse XML to restore variable declarations.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.nextStatement_ = xmlElement.getAttribute('next') == 'true';
    if (this.nextStatement_) {
      this.setNext(this.nextStatement_);
    }
    this.declarationType_ = xmlElement.getAttribute('declaration_type');
  },
  /**
   * Create XML to represent the number of wait counts.
   * @param {Element} XML storage element.
   * @this Blockly.Block
   */
  setNext: Blockly.Blocks['unityGlobalVariables_declare'].setNext,
  getType: function() {
    return this.declarationType_;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVarDecl: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Update the shape, if minus is pressed or if type has changed..
   * @param {Number} number -1 delete block, 0 type change.
   * @param {string} option data type.
   * @this Blockly.Block
   */
  updateShape_: function(num, option) {
    if (num == -1) {
      // delete getter and setter
      Blockly.Variables.deleteAll(this.getFieldValue('VAR'));
      // update caller
      Blockly.Procedures.updateCallers(this.getFieldValue('VAR'), this.declarationType_, this.workspace, num);
      var parent = this.getParent();
      var nextBlock = this.getNextBlock();
      this.unplug(true, true);
      if (!!parent && (parent.type == 'unityProcedures_defnoreturn' || parent.type == 'unityProcedures_defreturn') && !nextBlock) {
        parent.updateShape_(num);
      } else if (!!parent && !nextBlock) {
        parent.setNextStatement(false);
      }
      this.dispose();
    }
  },
  /**
   * Update the type of a parameter..
   * @param {string} option data Type
   * @this Blockly.Block
   */
  updateType: function(option) {
    this.declarationType_ = option;
    Blockly.Variables.updateType(this.getFieldValue('VAR'), option);
    Blockly.Procedures.updateCallers(this.getFieldValue('VAR'), option, Blockly.mainWorkspace, 0);
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};