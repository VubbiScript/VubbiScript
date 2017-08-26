/**
 * @fileoverview Generating CSharp for unity event blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityEvents');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityEvents_start'] = function(block) {
  Blockly.CSharp.pushEventBlock(block, 'void Start()', 'Start');
  return null;
};

Blockly.CSharp['unityEvents_update'] = function(block) {
  Blockly.CSharp.pushEventBlock(block, 'void Update()', 'Update');
  return null;
};

Blockly.CSharp['unityEvents_mouse'] = function(block) {
  var blockType = block.getFieldValue('HOVER');
  var callMap = {
    'Enter':'OnMouseEnter',
    'Stay':'OnMouseOver',
    'Exit':'OnMouseExit',
  };
  if(callMap.hasOwnProperty(blockType)) {
    Blockly.CSharp.pushEventBlock(block, 'void '+callMap[blockType]+'()', callMap[blockType]);
  }
  return null;
};

Blockly.CSharp['unityEvents_mouse_click'] = function(block) {
  var blockType = block.getFieldValue('STATE');
  var callMap = {
    'Down':'OnMouseDown',
    'Drag':'OnMouseDrag',
    'Up':'OnMouseUp'
  };
  if(callMap.hasOwnProperty(blockType)) {
    Blockly.CSharp.pushEventBlock(block, 'void '+callMap[blockType]+'()', callMap[blockType]);
  }
  return null;
};

Blockly.CSharp['unityEvents_collision'] = function(block) {
  var argumentName = Blockly.Variables.findLegalName("coll", null);
  var exportMap = {
    'coll_other':argumentName+'.gameObject',
    'coll_speed':argumentName+'.relativeVelocity.magnitude',
    'coll_dirspeed':argumentName+'.relativeVelocity'
  };
  var outputCode = Blockly.CSharp.generateOutputMutationCode(block, exportMap);
  var physicsMode = (block.getFieldValue('PHYSICS') || '2D') === '2D'?'2D':'';
  var blockType = block.getFieldValue('STATE');
  var callMap = {
    'Enter':'OnCollisionEnter'+physicsMode,
    'Stay':'OnCollisionStay'+physicsMode,
    'Exit':'OnCollisionExit'+physicsMode
  };
  
  if(callMap.hasOwnProperty(blockType)) {
    Blockly.CSharp.pushEventBlock(block, 'void '+callMap[blockType]+'(Collision'+physicsMode+' '+argumentName+')', callMap[blockType], outputCode);
  }
  return null;
};

Blockly.CSharp['unityEvents_jointbreaks'] = function(block) {
  var argumentName = Blockly.Variables.findLegalName("brokenJoint", null);
  var exportMap = {
    'joint_other':argumentName+'.gameObject'
  };
  var outputCode = Blockly.CSharp.generateOutputMutationCode(block, exportMap);
  var physicsMode = (block.getFieldValue('PHYSICS') || '2D') === '2D'?'2D':'';
  var blockType = block.getFieldValue('STATE');

  Blockly.CSharp.pushEventBlock(block, 'void OnJointBreak'+physicsMode+'(Joint'+physicsMode+' '+argumentName+')', 'OnJointBreak'+physicsMode, outputCode);
  return null;
};

Blockly.CSharp['unityEvents_trigger'] = function(block) {
  var argumentName = Blockly.Variables.findLegalName("otherCollider", null);
  var exportMap = {
    'trigger_other':argumentName+'.gameObject'
  };
  var outputCode = Blockly.CSharp.generateOutputMutationCode(block, exportMap);
  var physicsMode = (block.getFieldValue('PHYSICS') || '2D') === '2D'?'2D':'';
  var blockType = block.getFieldValue('STATE');
  var callMap = {
    'Enter':'OnTriggerEnter'+physicsMode,
    'Stay':'OnTriggerStay'+physicsMode,
    'Exit':'OnTriggerExit'+physicsMode
  };
  if(callMap.hasOwnProperty(blockType)) {
    Blockly.CSharp.pushEventBlock(block, 'void '+callMap[blockType]+'(Collider'+physicsMode+' '+argumentName+')', callMap[blockType], outputCode);
  }
  return null;
};