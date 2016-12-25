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
 * @fileoverview Generating CSharp for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CSharp.texts');

goog.require('Blockly.CSharp');


Blockly.CSharp['text'] = function(block) {
  // Text value.
  var code = Blockly.CSharp.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_STRING];
};

Blockly.CSharp['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code = [];
  var textentries = [];
  for (var n = 0; n < block.itemCount_; n++) {
    var entry = Blockly.CSharp.valueToCode(block, 'ADD' + n,
        Blockly.CSharp.ORDER_ADDITIVE, Blockly.CSharp.DATATYPE_STRING) || '""';
    if(entry !== '""') {
      code.push([entry, 'ADD' + n]);
      textentries.push(entry);
    }
  }
  if(code.length===1) {
    var tuple = Blockly.CSharp.valueToCodeTuple(block, code[0][1],
        Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_STRING);
    if(tuple[0]) {
      return tuple;
    } else {
      return ['""', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_STRING];
    }
  }
  if(code.length===0) {
    return ['""', Blockly.CSharp.ORDER_ATOMIC, Blockly.CSharp.DATATYPE_STRING];
  }
  return [textentries.join(' + '), Blockly.CSharp.ORDER_ADDITIVE, Blockly.CSharp.DATATYPE_STRING];
};

Blockly.CSharp['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_ADDITIVE, Blockly.CSharp.DATATYPE_STRING) || '""';
  return varName + ' = ' + varName + ' + ' + argument0 + ';\n';
};

Blockly.CSharp['text_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_STRING) || '""';
  return [argument0 + '.Length', Blockly.CSharp.ORDER_PRIMARY];
};

Blockly.CSharp['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER, Blockly.CSharp.DATATYPE_STRING) || '""';
  return ['String.IsNullOrEmpty(' + argument0 + ')', Blockly.CSharp.ORDER_PRIMARY];
};

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.CSharp.valueToCode(block, 'FIND',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.CSharp.ORDER_MEMBER];
};*/

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.CSharp.valueToCode(block, 'AT',
      Blockly.CSharp.ORDER_UNARY_NEGATION) || '1';
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var code = text + '.slice(-' + at + ').charAt(0)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.CSharp.provideFunction_(
          'text_random_letter',
          [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
            '  var x = Math.floor(Math.random() * text.length);',
            '  return text[x];',
            '}']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};*/

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.CSharp.valueToCode(block, 'STRING',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.CSharp.valueToCode(block, 'AT1',
      Blockly.CSharp.ORDER_NONE) || '1';
  var at2 = Blockly.CSharp.valueToCode(block, 'AT2',
      Blockly.CSharp.ORDER_NONE) || '1';
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else {
    var functionName = Blockly.CSharp.provideFunction_(
        'text_get_substring',
        [ 'function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
            '(text, where1, at1, where2, at2) {',
          '  function getAt(where, at) {',
          '    if (where == \'FROM_START\') {',
          '      at--;',
          '    } else if (where == \'FROM_END\') {',
          '      at = text.length - at;',
          '    } else if (where == \'FIRST\') {',
          '      at = 0;',
          '    } else if (where == \'LAST\') {',
          '      at = text.length - 1;',
          '    } else {',
          '      throw \'Unhandled option (text_getSubstring).\';',
          '    }',
          '    return at;',
          '  }',
          '  at1 = getAt(where1, at1);',
          '  at2 = getAt(where2, at2) + 1;',
          '  return text.slice(at1, at2);',
          '}']);
    var code = functionName + '(' + text + ', \'' +
        where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};*/

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var code;
  if (operator) {
    // Upper and lower case are functions built into CSharp.
    var argument0 = Blockly.CSharp.valueToCode(block, 'TEXT',
        Blockly.CSharp.ORDER_MEMBER) || '\'\'';
    code = argument0 + operator;
  } else {
    // Title case is not a native CSharp function.  Define one.
    var functionName = Blockly.CSharp.provideFunction_(
        'text_toTitleCase',
        [ 'function ' +
            Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ + '(str) {',
          '  return str.replace(/\\S+/g,',
          '      function(txt) {return txt[0].toUpperCase() + ' +
              'txt.substring(1).toLowerCase();});',
          '}']);
    var argument0 = Blockly.CSharp.valueToCode(block, 'TEXT',
        Blockly.CSharp.ORDER_NONE) || '\'\'';
    code = functionName + '(' + argument0 + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};*/

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
    'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var argument0 = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  return [argument0 + operator, Blockly.CSharp.ORDER_FUNCTION_CALL];
};*/

// NOT IMPLEMENTED YET
/*Blockly.CSharp['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};*/

// NOT IMPLEMENTED YET
/*
Blockly.CSharp['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.CSharp.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.CSharp.valueToCode(block, 'TEXT',
        Blockly.CSharp.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};
*/

// NOT IMPLEMENTED YET
/*
Blockly.CSharp['text_prompt'] = Blockly.CSharp['text_prompt_ext'];
*/


Blockly.CSharp['unityText_join'] = Blockly.CSharp['text_join'];

Blockly.CSharp['unityText_append'] = function(block) {
  var hasVariable = !!block.getFieldValue('VAR');
  var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = Blockly.CSharp.valueToCode(block, 'TEXT', Blockly.CSharp.ORDER_ASSIGNMENT, Blockly.CSharp.DATATYPE_STRING);
  if(hasVariable) {
    return varName + ' += '+text+';\n';
  } else {
    return '// ??? += '+text+';\n';
  }
};