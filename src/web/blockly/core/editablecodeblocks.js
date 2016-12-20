/**
 * @fileoverview Utility functions for handling "editable code blocks".
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.EditableCodeBlocks');

goog.require('Blockly.Workspace');
goog.require('goog.string');


/**
 * Category to separate generated flyout sections.
 */
Blockly.EditableCodeBlocks.NAME_TYPE = 'CODEBLOCKS';


/**
 * Find all user-created global code block names.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.EditableCodeBlocks.allCodeBlockNames = function(root) {
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var callingnameslist = [];
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].PROPERTY_IS_EDITABLECODEBLOCK) {
      var callingname = blocks[x].getCodeBlockCallingName();
      if(callingname) {
        callingnameslist.push(callingname);
      }
    }
  }
  return callingnameslist;
};

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.EditableCodeBlocks.flyoutCategory = function(workspace) {
  var codeNameList = Blockly.EditableCodeBlocks.allCodeBlockNames(workspace);
  
  //
  // Build blocks...
  //
  var xmlList = [];
  
  if (Blockly.Blocks['unityCode_define']) {
    // <block type="unityCode_define"/>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'unityCode_define');
    xmlList.push(block);
  }
  
  for (var i = 0; i < codeNameList.length; i++) {
    if (Blockly.Blocks['unityCode_use']) {
      // <block type="unityCode_use">
      //   <mutation name="item"/>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'unityCode_use');
      block.setAttribute('gap', '8');
      var mutation = goog.dom.createDom('mutation');
      mutation.setAttribute('tocall', codeNameList[i]);
      block.appendChild(mutation);
      xmlList.push(block);
    }
  }
  return xmlList;
};