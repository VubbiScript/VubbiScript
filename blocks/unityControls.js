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
        this.setColour(Blockly.CAT_ACTIVITY_RGB);
        this.appendDummyInput().
             appendField("geheugen");// JEPE TODO Translate // Blockly.Msg.START_PROGRAM
        this.declare_ = false;
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setDeletable(false);
        this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityControls_classConfig' ]));// JEPE TODO MutatorPlus does not seem to care about it's first arg
        this.setTooltip("Het geheugen van dit script.");// JEPE TODO Translate // Blockly.Msg.START_TOOLTIP
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
     * Update the shape according, if declarations exists.
     * 
     * @param {Number}
     *            number 1 add a variable declaration, -1 remove a variable
     *            declaration.
     * @this Blockly.Block
     */
    updateShape_ : function(num) {
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
            var value = vd.getInput('VALUE');
            var block = this.workspace.newBlock('math_number');
            block.initSvg();
            block.render();  
            value.connection.connect(block.outputConnection);
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