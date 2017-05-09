/**
 * @fileoverview Generating CSharp for unity vector blocks.
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.CSharp.unityVector');

goog.require('Blockly.CSharp');

Blockly.CSharp['unityVector_make'] = function(block) {
  var x = Blockly.CSharp.valueToCode(block, 'X', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var y = Blockly.CSharp.valueToCode(block, 'Y', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  var z = Blockly.CSharp.valueToCode(block, 'Z', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_NUMBER) || '0f';
  return ['new Vector3('+x+', '+y+', '+z+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityVector_get'] = function(block) {
  var what = block.getFieldValue('OPT') || 'X';
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.'+what.toLowerCase(), Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_x'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.x', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_y'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.y', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_z'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.z', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_length'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECT', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  return [vect+'.magnitude', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
};

Blockly.CSharp['unityVector_pick'] = function(block) {
  var what = block.getFieldValue('OPTION') || 'zero';
  return ['Vector3.'+what, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
};

Blockly.CSharp['unityVector_tosize'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECTOR', Blockly.CSharp.ORDER_MULTIPLICATIVE_RIGHT, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var tolength = Blockly.CSharp.valueToCode(block, 'TOLENGTH', Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER) || '1f';
  if(tolength !== '1f') {
    return [tolength+" * "+vect+".normalized", Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_VECTOR];
  } else {
    vect = Blockly.CSharp.valueToCode(block, 'VECTOR', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';;
    return [vect+".normalized", Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
  }
};

Blockly.CSharp['unityVector_multiply'] = function(block) {
  var vect = Blockly.CSharp.valueToCode(block, 'VECTOR', Blockly.CSharp.ORDER_MULTIPLICATIVE_RIGHT, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';
  var factor = Blockly.CSharp.valueToCode(block, 'FACTOR', Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_NUMBER) || '1f';
  if(factor !== '1f') {
    return [factor+" * "+vect, Blockly.CSharp.ORDER_MULTIPLICATIVE, Blockly.CSharp.DATATYPE_VECTOR];
  } else {
    vect = Blockly.CSharp.valueToCode(block, 'VECTOR', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR) || 'Vector3.zero';;
    return [vect, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR];
  }
};

Blockly.CSharp['unityVector_math'] = function(block) {
  var OPERATORS = {
    'ADD': [' + ', Blockly.CSharp.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.CSharp.ORDER_ADDITIVE],
    'MULTIPLY': [null, Blockly.CSharp.ORDER_NONE]  // Handle multiply separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  var code;
  if (!operator) {
    code = 'Vector3.Scale(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
  }
  code = argument0 + operator + argument1;
  return [code, order, Blockly.CSharp.DATATYPE_VECTOR3];
};

Blockly.CSharp['unityVector_product'] = function(block) {
  var type = block.getFieldValue('PRODUCTTYPE') || 'DOT';
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  if(type === "DOT") {
    return ['Vector3.Dot('+argument0+', '+argument1+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_NUMBER];
  } else if (type === "CROSS") {
    return ['Vector3.Cross('+argument0+', '+argument1+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
  }
};

Blockly.CSharp['unityvector_transformpoint_tolocal'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var point = Blockly.CSharp.valueToCode(block, 'POINT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  return [transform+'.InverseTransformPoint('+point+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};

Blockly.CSharp['unityvector_transformpoint_toworld'] = function(block) {
  var transform = Blockly.CSharp.valueToCode(block, 'WHO', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_TRANSFORM);
  var point = Blockly.CSharp.valueToCode(block, 'POINT', Blockly.CSharp.ORDER_NONE, Blockly.CSharp.DATATYPE_VECTOR3) || 'Vector3.zero';
  return [transform+'.TransformPoint('+point+')', Blockly.CSharp.ORDER_PRIMARY, Blockly.CSharp.DATATYPE_VECTOR3];
};