/**
 * @fileoverview Sensor blocks for NAO.
 * @requires Blockly.Blocks
 * @author Janis
 */

'use strict';

goog.provide('Blockly.Blocks.naoSensors');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['naoSensors_headsensors'] = {
	    /**
	     * Get the current reading from one of the headsensors.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT' ], [ Blockly.Msg.NAO_TOUCH_MIDDLE, 'MIDDLE' ], [ Blockly.Msg.NAO_TOUCH_REAR, 'REAR' ] ]);
	        this.appendDummyInput().appendField('Is ' + Blockly.Msg.NAO_HEADSENSOR).appendField(dropdown, 'POSITION').appendField(Blockly.Msg.NAO_TOUCHED);
	        this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_HEADSENSOR_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_touchsensors'] = {
	    /**
	     * Get the current reading from one of the touchsensors.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var position = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], [ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ] ]);
	        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_LEFT, 'LEFT' ], [ Blockly.Msg.NAO_TOUCH_RIGHT, 'RIGHT' ] ]);
	        this.appendDummyInput().appendField('Is ' + Blockly.Msg.NAO_TOUCHSENSOR).appendField(position, 'POSITION').appendField(side, 'SIDE').appendField(Blockly.Msg.NAO_TOUCHED);
	        this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_TOUCHSENSOR_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_sonar'] = {
	    /**
	     * Get the current reading from the sonar.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_SONAR);
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_SONAR_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_selectCamera'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var camera = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_CAMERA_TOP, '0' ], [ Blockly.Msg.NAO_CAMERA_BOTTOM, '1' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_SELECTCAMERA).appendField(camera, 'CAMERA');
	        this.setTooltip(Blockly.Msg.NAO_SELECTCAMERA_TOOLTIP);
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	    }
};


Blockly.Blocks['naoSensors_naoMark'] = {
	    /**
	     * Get the number of a detected NAOMark.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_NAOMARK);
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_NAOMARK_TOOLTIP);
	    }
};


Blockly.Blocks['naoSensors_takePicture'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_TAKEPICTURE);
	        this.setTooltip(Blockly.Msg.NAO_TAKEPICTURE_TOOLTIP);
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	    }
};

Blockly.Blocks['naoSensors_recordVideo'] = {
	    /**
	     * Get the current reading from the accelerometer.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var resolution = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_QQVGA, '0' ], [ Blockly.Msg.NAO_QVGA, '1' ], [ Blockly.Msg.NAO_VGA, '2' ] ]);
	        var camera = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_CAMERA_TOP, '0' ], [ Blockly.Msg.NAO_CAMERA_BOTTOM, '1' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_RECORDVIDEO);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_RESOLUTION).appendField(resolution, 'RESOLUTION');
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_CAMERA).appendField(camera, 'CAMERA');
	        this.appendValueInput('DURATION').appendField(Blockly.Msg.NAO_DURATION).setCheck('Number');
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	        this.setTooltip(Blockly.Msg.NAO_RECORDVIDEO_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_gyrometer'] = {
	    /**
	     * Get the current reading from the gyro sensor.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_GYROMETER).appendField(dropdown, 'COORDINATE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_GYROMETER_TOOLTIP);
	    }
	};


Blockly.Blocks['naoSensors_accelerometer'] = {
	    /**
	     * Get the current reading from the accelerometer.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ], [ 'Z', 'Z' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_ACCELEROMETER).appendField(dropdown, 'COORDINATE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_ACCELEROMETER_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_fsr'] = {
	    /**
	     * Get the current reading from the accelerometer.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_LEFT, 'LEFT' ], [ Blockly.Msg.NAO_TOUCH_RIGHT, 'RIGHT' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_FSR).appendField(side, 'SIDE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_FSR_TOOLTIP);
	    }
	};