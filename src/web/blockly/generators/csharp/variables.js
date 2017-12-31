/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating CSharp for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CSharp.variables');

goog.require('Blockly.CSharp');


Blockly.CSharp['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.CSharp.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_ASSIGNMENT);
  var varName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  if(argument0 === null || argument0 === undefined || argument0.length === 0) {
    return '';
  }
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.CSharp['unityGlobalVariables_declare'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var dataType = Blockly.CSharp.convertDataTypeName(type);
  var ispublic = true;
  var visibility = block.getFieldValue('VISIBILITY');
  if(visibility === 'PRIVATE') {
    ispublic = false;
  }
  var argument0;
  if (type === 'Number') {
    argument0 = parseFloat(block.getFieldValue('NUM'))+"f";
  } else if (type === 'String') {
    argument0 = Blockly.CSharp.quote_(block.getFieldValue('TEXT'))
  } else if (type === 'Boolean') {
    argument0 = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  } else if (type === 'Vector3') {
    var x = parseFloat(block.getFieldValue('X'))+"f" || '0f';
    var y = parseFloat(block.getFieldValue('Y'))+"f" || '0f';
    var z = parseFloat(block.getFieldValue('Z'))+"f" || '0f';
    argument0 = 'new Vector3('+x+', '+y+', '+z+')';
  } else if (type === 'Quaternion') {
    argument0 = 'Quaternion.identity';
    ispublic = false;
  } else {
    argument0 = "";
  }
  
  var varName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  
  return (ispublic?"public":"private")+" "+dataType+" "+varName+(argument0?" = "+argument0+";":";")+'\n';
};