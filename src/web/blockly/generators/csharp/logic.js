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
 * @fileoverview Generating CSharp for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.CSharp.logic');

goog.require('Blockly.CSharp');


Blockly.CSharp['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.CSharp.valueToCode(block, 'IF' + n,
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_BOOLEAN) || 'false';
  var branch = Blockly.CSharp.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.CSharp.valueToCode(block, 'IF' + n,
        Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_BOOLEAN) || 'false';
    branch = Blockly.CSharp.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.CSharp.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.CSharp['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.CSharp.ORDER_EQUALITY : Blockly.CSharp.ORDER_RELATIONAL;
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order, Blockly.CSharp.DATATYPE_ANY) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order, Blockly.CSharp.DATATYPE_ANY) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order, Blockly.CSharp.DATATYPE_BOOLEAN];
};

Blockly.CSharp['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.CSharp.ORDER_LOGICAL_AND :
      Blockly.CSharp.ORDER_LOGICAL_OR;
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order, Blockly.CSharp.DATATYPE_BOOLEAN);
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order, Blockly.CSharp.DATATYPE_BOOLEAN);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order, Blockly.CSharp.DATATYPE_BOOLEAN];
};

Blockly.CSharp['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.CSharp.ORDER_UNARY;
  var argument0 = Blockly.CSharp.valueToCode(block, 'BOOL', order, Blockly.CSharp.DATATYPE_BOOLEAN) ||
      'true';
  var code = '!' + argument0;
  return [code, order, Blockly.CSharp.DATATYPE_BOOLEAN];
};

Blockly.CSharp['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_BOOLEAN];
};

Blockly.CSharp['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_ANY];
};

Blockly.CSharp['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.CSharp.valueToCode(block, 'IF',
      Blockly.CSharp.ORDER_CONDITIONAL, Blockly.CSharp.DATATYPE_BOOLEAN) || 'false';
  var value_then = Blockly.CSharp.valueToCode(block, 'THEN',
      Blockly.CSharp.ORDER_CONDITIONAL, Blockly.CSharp.DATATYPE_ANY) || 'null';
  var value_else = Blockly.CSharp.valueToCode(block, 'ELSE',
      Blockly.CSharp.ORDER_CONDITIONAL, Blockly.CSharp.DATATYPE_ANY) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.CSharp.ORDER_CONDITIONAL, Blockly.CSharp.DATATYPE_ANY];
};

Blockly.CSharp['unityControls_ifElse'] = Blockly.CSharp['controls_if'];
Blockly.CSharp['unityControls_if'] = Blockly.CSharp['controls_if'];