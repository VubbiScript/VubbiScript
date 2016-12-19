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
 * NOTE: Based on code in "Open Roberta labs".
 */

'use strict';

goog.provide('Blockly.Blocks.unityControls');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['unityControls_classConfig'] = {
    /**
     * The variables belonging to the class we are editing. This block is not deletable and
     * it should not be available in any toolbox. This is also the block where
     * variable declaration can be instantiated via the plus mutator. For new
     * task see {@link Block.robControls_activity}.
     * 
     * @constructs robControls_start
     * @this.Blockly.Block
     * @returns immediately
     * @see {@link robControls_activity}
     * @memberof Block
     */

    init : function() {
        this.PROPERTY_NOHAT = true;
        this.PROPERTY_GROUPS_GLOBAL_VARS = true;
        this.PROPERTY_VALID_ROOT = true;
        this.setColour(Blockly.CAT_ACTIVITY_RGB);
        this.appendDummyInput().
             appendField(Blockly.Msg.UNITY_MEMORY_TITLE);
        this.declare_ = false;
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setDeletable(false);
        this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityControls_classConfig' ]));
        this.setTooltip(Blockly.Msg.UNITY_MEMORY_TOOLTIP);
    },
    /**
     * Create XML to represent whether a statement list of variable declarations
     * should be present.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        if (!this.declare_ === undefined) {
            return false;
        }
        var container = document.createElement('mutation');
        container.setAttribute('declare', (this.declare_ == true));
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
        this.declare_ = (xmlElement.getAttribute('declare') != 'false');
        if (this.declare_) {
            this.appendStatementInput('ST');
            this.getInput('ST').connection.setCheck('declaration_only');
        }
    },
    /**
     * Add a new typed global => called from other places!!
     */
    addNewGlobal : function(name, type) {
      this.updateShape_(1, name, type);
    },
    /**
     * Update the shape according, if declarations exists.
     * 
     * @param {Number}
     *            number 1 add a variable declaration, -1 remove a variable
     *            declaration.
     * @this Blockly.Block
     */
    updateShape_ : function(num, opt_name, opt_type) {
        if (num == 1) {
            if (!this.declare_) {
                this.appendStatementInput('ST');
                // making sure only declarations can connect to the statement list
                this.getInput('ST').connection.setCheck('declaration_only');
                this.declare_ = true;
            }
            var vd = this.workspace.newBlock('unityGlobalVariables_declare');
            vd.initSvg();
            vd.render();
            // Set the type correctly... (including default block)
            if(opt_type) {
              vd.changeVariableType(opt_type);
            }
            // Change the initial variable name (note: assumes this variable name is not used yet!)
            if(opt_name) {
              vd.setFieldValue(opt_name, 'VAR');
            }
            
            // Add the block at the end
            var connection;
            if (this.getInput('ST').connection.targetConnection) {
                var block = this.getInput('ST').connection.targetConnection.sourceBlock_;
                if (block) {
                    // look for the last variable declaration block in the sequence
                    while (block.getNextBlock()) {
                        block = block.getNextBlock();
                    }
                }
                block.setNext(true);
                connection = block.nextConnection;
            } else {
                connection = this.getInput('ST').connection;
            }
            connection.connect(vd.previousConnection);
        } else if (num == -1) {
            // if the last declaration in the stack has been removed, remove the declaration statement
            this.removeInput('ST');
            this.declare_ = false;
        }
    }
};