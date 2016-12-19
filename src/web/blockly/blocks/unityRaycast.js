/**
 * Raycast blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityRaycast');

goog.require('Blockly.Blocks');


Blockly.Blocks['unityRaycast_raycast_param'] = Blockly.OutputMutatingBlock.createParamBlock(
    "unityRaycast_raycast",
    function() {
        this.setColour(Blockly.CAT_DETECT_RGB);
        this.setTooltip("");
        //this.setHelpUrl('http://www.example.com/');
    },
    [
        {label:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_OBJ, val:"other", type:"GameObject", proposedname:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_OBJ_DEFNAME},
        {label:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_DIST, val:"dist", type:"Number", proposedname:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_DIST_DEFNAME},
        {label:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_POINT, val:"point", type:"Vector3", proposedname:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_POINT_DEFNAME},
        {label:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_NORMAL, val:"normal", type:"Vector3", proposedname:Blockly.Msg.UNITY_RAYCAST_RAYCAST_PARAM_NORMAL_DEFNAME}
    ]
);

Blockly.Blocks['unityRaycast_raycast'] = Blockly.OutputMutatingBlock.createBlock (
    'unityRaycast_raycast_param',
    function() {
      this.appendValueInput("ORIGIN")
          .setCheck("Vector3")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.UNITY_RAYCAST_RAYCAST_TITLE_1);
      this.appendValueInput("DIRECTION")
          .setCheck("Vector3")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.UNITY_RAYCAST_RAYCAST_TITLE_2);
      this.appendDummyInput()
          .appendField(Blockly.Msg.UNITY_RAYCAST_RAYCAST_TITLE_3);
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(false);
      this.setColour(Blockly.CAT_DETECT_RGB);
      this.setMutatorPlus(new Blockly.MutatorPlus([ 'unityRaycast_raycast' ]));
      this.setTooltip('');
      //this.setHelpUrl('http://www.example.com/');
    }, "STATEMENTS"
);

// Raycast
Blockly.Blocks['unityRaycast_circlecast'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("raak ik iets als ik een cirkel schiet");
    this.appendValueInput("ORIGIN")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("van positie");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met een straal");
    this.appendValueInput("DIRECTION")
        .setCheck("Vector3")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in richting");
    this.appendValueInput("MAXDIST")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("met maximale afstand");
    this.appendStatementInput("STATEMENTS")
        .setCheck(null)
        .appendField("dan");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.CAT_DETECT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};