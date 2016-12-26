'use strict';

goog.provide('Blockly.OutputMutatingBlock');

goog.require('Blockly.DataTypes');

/**
 * A parameter in an output mutating block...
 *
 * @param generateOptions - function generating an array of Objects {label, value, type, proposedname}
 */
Blockly.OutputMutatingBlock.createParamBlock = function(parenttype, init, generateOptions) {
    return {
        /**
         * Block for variable decaration.
         * @this Blockly.Block
         */
        init: function() {
            var options = generateOptions();
            var dropdownopts = [];
            var proposednames = {};
            var requiredtypes = {};
            for(var i=0;i<options.length;i++) {
                var opt = options[i];
                dropdownopts.push([opt.label+" ("+opt.type+")",opt.val]);
                proposednames[opt.val] = opt.proposedname;
                requiredtypes[opt.val] = opt.type;
            }
            
            this.varDropdown_ = new Blockly.FieldTypedVariable(options[0].type, undefined, options[0].proposedname);
            
            this.selectWhatOptions_ = goog.bind(function(option) {
                this.declarationType_ = requiredtypes[option];
                this.varDropdown_.setRequiredType(requiredtypes[option], proposednames[option]);
                this.updateShape_(0, option);
            }, this);
            
            this.whatDropdown_ = new Blockly.FieldDropdown(dropdownopts, undefined, this.selectWhatOptions_);

            this.appendDummyInput()
                .appendField(Blockly.Msg.UNITY_PARAMOUTPUT_TITLE_1)
                .appendField(this.whatDropdown_, "WHAT")
                .appendField(Blockly.Msg.UNITY_PARAMOUTPUT_TITLE_2)
                .appendField(this.varDropdown_, "VAR");
            this.setPreviousStatement(true, 'parameteroutput_only');
            //this.setTooltip(Blockly.Msg.VARIABLES_GLOBAL_DECLARE_TOOLTIP);
            this.setMutatorMinus(new Blockly.MutatorMinus(['parameterouput_declare']));
            this.setMovable(false);
            this.setDeletable(false);
            this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
            this.contextMenudeclarationType_ = 'variables_get';

            // We store these two things:
            this.declarationType_ = 'Number';
            this.nextStatement_ = false;
          
            this.selectWhatOptions_(this.getFieldValue('WHAT'));
        
            this.setNextStatement(false);
            //this.setHelp(new Blockly.Help(Blockly.Msg.VARIABLE_GLOBAL_HELP));
            
            init.call(this);
        },
        /**
         * Create XML to represent variable declaration insides.
         * @return {Element} XML storage element.
         * @this Blockly.Block
         */
        mutationToDom: function() {
            var container = document.createElement('mutation');
            if (this.nextStatement_ !== undefined) {
                container.setAttribute('next', this.nextStatement_);
            }
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
        },
        setNext: function(next) {
            this.nextStatement_ = next;
            this.setNextStatement(next, 'parameteroutput_only');
        },
        /*getType: function() {
            return this.declarationType_;
        },*/
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
                if (!!parent && parent.type == parenttype && !nextBlock) {
                    parent.updateShape_(num);
                } else if (!!parent && !nextBlock) {
                    parent.setNext(false);
                }
                this.dispose();
            }
        },
        /*
         * COPIED FROM variables.js !!
         */
        contextMenuType_: 'variables_get',
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
};

/**
 * This kind of block can show 
 */
Blockly.OutputMutatingBlock.createBlock = function(childtype, init, putBeforeInputName) {
    return {
        init: function() {
            init.call(this);
            this.declare_ = false;
        },
        mutationToDom : function(container) {
            if(!container) {
                container = document.createElement('mutation');
            }
            if (!this.declare_ === undefined) {
                return false;
            }

            container.setAttribute('declare', (this.declare_ == true));
            return container;
        },
        domToMutation : function(xmlElement) {
            this.declare_ = (xmlElement.getAttribute('declare') != 'false');
            if (this.declare_) {
                this.addOutputsArea_();
            }
        },
        addOutputsArea_ : function() {
            this.appendStatementInput('OUTPUTS');
            // making sure only declarations can connect to the statement list
            this.getInput('OUTPUTS').connection.setCheck('parameteroutput_only');
            this.appendDummyInput('EXECNOTE').appendField(Blockly.Msg.UNITY_PARAMOUTPUT_EXECUTE_TITLE);
            if(putBeforeInputName) {
                this.moveInputBefore('OUTPUTS', putBeforeInputName);
                this.moveInputBefore('EXECNOTE', putBeforeInputName);
            }
        },
        updateShape_ : function(num) {
            if (num == 1) {
                if (!this.declare_) {
                    this.addOutputsArea_();
                    this.declare_ = true;
                }
                var vd = this.workspace.newBlock(childtype);
                vd.initSvg();
                vd.render();
                var connection;
                if (this.getInput('OUTPUTS').connection.targetConnection) {
                    var block = this.getInput('OUTPUTS').connection.targetConnection.sourceBlock_;
                    if (block) {
                        // look for the last variable declaration block in the sequence
                        while (block.getNextBlock()) {
                            block = block.getNextBlock();
                        }
                    }
                    block.setNext(true);
                    connection = block.nextConnection;
                } else {
                    connection = this.getInput('OUTPUTS').connection;
                }
                connection.connect(vd.previousConnection);
            } else if (num == -1) {
                // if the last declaration in the stack has been removed, remove the declaration statement
                this.removeInput('OUTPUTS');
                this.removeInput('EXECNOTE');
                this.declare_ = false;
            }
        }
    };
};