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
 * @fileoverview Generating CSharp for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.CSharp.math');

goog.require('Blockly.CSharp');


Blockly.CSharp['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'))+"f";
  return [code, Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  
  // Two orders because left-associative 
  //  => because 2/(1*2) != 2/1*2
  var OPERATORS = {
    'ADD': [' + ', Blockly.CSharp.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.CSharp.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.CSharp.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.CSharp.ORDER_MULTIPLICATIVE],
    'POWER': [null, Blockly.CSharp.ORDER_NONE]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order, Blockly.CSharp.DATATYPE_ANY) || '0f';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order, Blockly.CSharp.DATATYPE_ANY) || '0f';
  var code;
  // Power in CSharp requires a special case since it has no operator.
  if (!operator) {
    code = 'Mathf.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
  }
  code = argument0 + operator + argument1;
  return [code, order, Blockly.CSharp.DATATYPE_ANY];
};

Blockly.CSharp['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.CSharp.valueToCode(block, 'NUM',
        Blockly.CSharp.ORDER_UNARY) || '0f';
    if (arg[0] == '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.CSharp.ORDER_UNARY, Blockly.CSharp.DATATYPE_ANY];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.CSharp.valueToCode(block, 'NUM',
        Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  } else {
    arg = Blockly.CSharp.valueToCode(block, 'NUM',
        Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Mathf.Abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Mathf.Sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Mathf.Log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Mathf.Exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Mathf.Pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Mathf.Round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Mathf.Ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Mathf.Floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Mathf.Sin(' + arg + ' / 180 * Mathf.PI)';
      break;
    case 'COS':
      code = 'Mathf.Cos(' + arg + ' / 180 * Mathf.PI)';
      break;
    case 'TAN':
      code = 'Mathf.Tan(' + arg + ' / 180 * Mathf.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + arg + ') / Math.log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.CSharp.ORDER_DIVISION, Blockly.CSharp.DATATYPE_NUMBER];
};

// NOT SUPPORTED YET
/*Blockly.CSharp['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['Mathf.PI', Blockly.CSharp.ORDER_MEMBER],
    'E': ['Math.E', Blockly.CSharp.ORDER_MEMBER],
    'GOLDEN_RATIO':
        ['(1 + Math.sqrt(5)) / 2', Blockly.CSharp.ORDER_DIVISION],
    'SQRT2': ['Math.SQRT2', Blockly.CSharp.ORDER_MEMBER],
    'SQRT1_2': ['Math.SQRT1_2', Blockly.CSharp.ORDER_MEMBER],
    'INFINITY': ['Infinity', Blockly.CSharp.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};*/

// NOT SUPPORTED YET
/*Blockly.CSharp['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.CSharp.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.CSharp.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    var functionName = Blockly.CSharp.provideFunction_(
        'math_isPrime',
        [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ + '(n) {',
          '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
          '  if (n == 2 || n == 3) {',
          '    return true;',
          '  }',
          '  // False if n is NaN, negative, is 1, or not whole.',
          '  // And false if n is divisible by 2 or 3.',
          '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
            ' n % 3 == 0) {',
          '    return false;',
          '  }',
          '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
          '  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {',
          '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
          '      return false;',
          '    }',
          '  }',
          '  return true;',
          '}']);
    code = functionName + '(' + number_to_check + ')';
    return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.CSharp.valueToCode(block, 'DIVISOR',
          Blockly.CSharp.ORDER_MODULUS) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.CSharp.ORDER_EQUALITY];
};*/

// NOT SUPPORTED YET
/*Blockly.CSharp['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.CSharp.valueToCode(block, 'DELTA',
      Blockly.CSharp.ORDER_ADDITION) || '0';
  var varName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};*/

// Rounding functions have a single operand.
Blockly.CSharp['math_round'] = Blockly.CSharp['math_single'];
// Trigonometry functions have a single operand.
Blockly.CSharp['math_trig'] = Blockly.CSharp['math_single'];

// NOT SUPPORTED YET
/*Blockly.CSharp['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_COMMA) || '[]';
      code = 'Math.min.apply(null, ' + list + ')';
      break;
    case 'MAX':
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_COMMA) || '[]';
      code = 'Math.max.apply(null, ' + list + ')';
      break;
    case 'AVERAGE':
      // math_median([null,null,1,3]) == 2.0.
      var functionName = Blockly.CSharp.provideFunction_(
          'math_mean',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;',
            '}']);
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MEDIAN':
      // math_median([null,null,1,3]) == 2.0.
      var functionName = Blockly.CSharp.provideFunction_(
          'math_median',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  var localList = myList.filter(function (x) ' +
              '{return typeof x == \'number\';});',
            '  if (!localList.length) return null;',
            '  localList.sort(function(a, b) {return b - a;});',
            '  if (localList.length % 2 == 0) {',
            '    return (localList[localList.length / 2 - 1] + ' +
              'localList[localList.length / 2]) / 2;',
            '  } else {',
            '    return localList[(localList.length - 1) / 2];',
            '  }',
            '}']);
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MODE':
      // As a list of numbers can contain more than one mode,
      // the returned result is provided as an array.
      // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
      var functionName = Blockly.CSharp.provideFunction_(
          'math_modes',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(values) {',
            '  var modes = [];',
            '  var counts = [];',
            '  var maxCount = 0;',
            '  for (var i = 0; i < values.length; i++) {',
            '    var value = values[i];',
            '    var found = false;',
            '    var thisCount;',
            '    for (var j = 0; j < counts.length; j++) {',
            '      if (counts[j][0] === value) {',
            '        thisCount = ++counts[j][1];',
            '        found = true;',
            '        break;',
            '      }',
            '    }',
            '    if (!found) {',
            '      counts.push([value, 1]);',
            '      thisCount = 1;',
            '    }',
            '    maxCount = Math.max(thisCount, maxCount);',
            '  }',
            '  for (var j = 0; j < counts.length; j++) {',
            '    if (counts[j][1] == maxCount) {',
            '        modes.push(counts[j][0]);',
            '    }',
            '  }',
            '  return modes;',
            '}']);
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'STD_DEV':
      var functionName = Blockly.CSharp.provideFunction_(
          'math_standard_deviation',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(numbers) {',
            '  var n = numbers.length;',
            '  if (!n) return null;',
            '  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;',
            '  var variance = 0;',
            '  for (var j = 0; j < n; j++) {',
            '    variance += Math.pow(numbers[j] - mean, 2);',
            '  }',
            '  variance = variance / n;',
            '  return Math.sqrt(variance);',
            '}']);
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'RANDOM':
      var functionName = Blockly.CSharp.provideFunction_(
          'math_random_list',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(list) {',
            '  var x = Math.floor(Math.random() * list.length);',
            '  return list[x];',
            '}']);
      list = Blockly.CSharp.valueToCode(block, 'LIST',
          Blockly.CSharp.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};*/

Blockly.CSharp['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.CSharp.valueToCode(block, 'DIVIDEND',
      Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var argument1 = Blockly.CSharp.valueToCode(block, 'DIVISOR',
      Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'LOW',
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || 'System.Single.NegativeInfinity';
  var argument2 = Blockly.CSharp.valueToCode(block, 'HIGH',
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || 'System.Single.PositiveInfinity';
  var code = 'Mathf.Clamp(' + argument0 + ', ' + argument1 + ', ' +
      argument2 + ')';
  return [code, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.CSharp.valueToCode(block, 'FROM',
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_INT) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'TO',
      Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_INT) || '0';
  var code = '(float)Random.Range(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.CSharp.ORDER_UNARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['Random.value', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};
