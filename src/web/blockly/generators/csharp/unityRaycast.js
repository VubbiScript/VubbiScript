/**
 * @fileoverview Generating CSharp for unity raycast blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityRaycast');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityRaycast_raycast'] = function(block) {
  var originValue = Blockly.CSharp.valueToCode(block, 'ORIGIN', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_BOOLEAN) || 'Vector2.zero';
  var directionValue = Blockly.CSharp.valueToCode(block, 'DIRECTION', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_BOOLEAN) || 'Vector2.down';
  
  var variableName = Blockly.CSharp.declareLocalTempVar('RaycastHit2D', 'rayHit');
  
  var outputMutationCode = Blockly.CSharp.generateOutputMutationCode(block, {
    'other':variableName+'.transform.gameObject',
    'dist':variableName+'.distance',
    'point':variableName+'.point',
    'normal':variableName+'.normal'
  });
  
  var statementCode = Blockly.CSharp.statementToCode(block, 'STATEMENTS');
  
  var blockCode = variableName+' = Physics2D.Raycast('+originValue+', '+directionValue+');\n'+
      'if ('+variableName+'.collider!=null) {\n'+outputMutationCode+statementCode+'}\n';
  
  return blockCode;
};