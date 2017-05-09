/**
 * @fileoverview Generating CSharp for unity time blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityTime');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityTime_levelload'] = function(block) {
  return ['Time.timeSinceLevelLoad', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityTime_delta'] = function(block) {
  return ['Time.deltaTime', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityTime_waitframe'] = function(block) {
  Blockly.CSharp.transformCurrentEventBlockToCoroutine();
  return 'yield return null;\n';
};

Blockly.CSharp['unityTime_waittime'] = function(block) {
  Blockly.CSharp.transformCurrentEventBlockToCoroutine();
  var time = Blockly.CSharp.valueToCode(block, 'TIME', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER);
  return 'yield return new WaitForSeconds('+time+');\n';
};

Blockly.CSharp['unityTime_repeat'] = function(block) {
  Blockly.CSharp.transformCurrentEventBlockToCoroutine();
  
  // Push a new time variable to the stack (in case multiple blocks are inside each other)
  var loopVar = Blockly.CSharp.pushLoopStackVariable("float", "loopStartTime");
  // Process the statements
  var code = Blockly.CSharp.statementToCode(block, 'STATEMENTS');
  // Pop the variable
  Blockly.CSharp.popLoopStackVariable("float", "loopStartTime");
  
  return loopVar+' = Time.time;\nwhile (true) {\n'+code+Blockly.CSharp.INDENT+'yield return null;\n}\n';
};

Blockly.CSharp['unityTime_repeat_while'] = function(block) {
  Blockly.CSharp.transformCurrentEventBlockToCoroutine();
  
  // Get end condition
  var whilecond = Blockly.CSharp.valueToCode(block, 'WHILE', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_BOOLEAN) || "true";

  // Push a new time variable to the stack (in case multiple blocks are inside each other)
  var loopVar = Blockly.CSharp.pushLoopStackVariable("float", "loopStartTime");
  // Process the statements
  var code = Blockly.CSharp.statementToCode(block, 'STATEMENTS');
  // Pop the variable
  Blockly.CSharp.popLoopStackVariable("float", "loopStartTime");
  
  return loopVar+' = Time.time;\nwhile ('+whilecond+') {\n'+code+Blockly.CSharp.INDENT+'yield return null;\n}\n';
};

Blockly.CSharp['unityTime_looptime'] = function(block) {
  var loopVar = Blockly.CSharp.getTopLoopStackVariable("float", "loopStartTime");
  // IF in loop context:
  if(loopVar) {
    return ['Time.time - '+loopVar, Blockly.CSharp.ORDER_UNARY, Blockly.CSharp.DATATYPE_NUMBER];
  } else {
    return ['0f', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_NUMBER];
  }
};