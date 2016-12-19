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
    }
    return block;
}