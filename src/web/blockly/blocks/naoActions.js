/**
 * @fileoverview Action blocks for NAO.
 * @requires Blockly.Blocks
 * @author Janis
 */
'use strict';

goog.provide('Blockly.Blocks.naoActions');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

//Move

Blockly.Blocks['naoActions_standUp'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STANDUP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STANDUP_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_sitDown'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_SITDOWN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SITDOWN_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_taiChi'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_TAICHI);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_TAICHI_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_wave'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_WAVE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WAVE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_wipeForehead'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_WIPEFOREHEAD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WIPEFOREHEAD_TOOLTIP);
    }
};


Blockly.Blocks['naoActions_applyPosture'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_POSTURE_STAND, 'STAND'],
            [Blockly.Msg.NAO_POSTURE_STANDINIT, 'STANDINIT'],
            [Blockly.Msg.NAO_POSTURE_STANDZERO, 'STANDZERO']
        ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.NAO_APPLYPOSTURE).appendField(dropdown, 'DIRECTION');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_APPLYPOSTURE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_pointAt'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_FRAME_TORSO, '0'],
            [Blockly.Msg.NAO_FRAME_WORLD, '1'],
            [Blockly.Msg.NAO_FRAME_ROBOT, '2']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_POINTAT);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_FRAME).appendField(dropdown, 'DIRECTION');
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x");
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y");
        this.appendValueInput('Z').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("z");
        this.appendValueInput('Speed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("speed");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_POINTAT_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_lookAt'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_FRAME_TORSO, '0'],
            [Blockly.Msg.NAO_FRAME_WORLD, '1'],
            [Blockly.Msg.NAO_FRAME_ROBOT, '2']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_LOOKAT);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_FRAME).appendField(dropdown, 'DIRECTION');
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x");
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y");
        this.appendValueInput('Z').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("z");
        this.setPreviousStatement(true);
        this.appendValueInput('Speed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("speed");
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LOOKAT_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_stiffnessOn'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STIFFNESSON);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STIFFNESSON_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_stiffnessOff'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STIFFNESSOFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STIFFNESSOFF_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_partialStiffnessOn'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_BODY_ARM, 'ARM'],
            [Blockly.Msg.NAO_BODY_LARM, 'LARM'],
            [Blockly.Msg.NAO_BODY_RARM, 'RARM']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_PARTIALSTIFFNESS).appendField(dropdown, 'DIRECTION').appendField(' on');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_PARTIALSTIFFNESSON_TOOLTIP);
    }
};


Blockly.Blocks['naoActions_partialStiffnessOff'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_BODY_ARM, 'ARM'],
            [Blockly.Msg.NAO_BODY_LARM, 'LARM'],
            [Blockly.Msg.NAO_BODY_RARM, 'RARM']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_PARTIALSTIFFNESS).appendField(dropdown, 'DIRECTION').appendField(' off');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_PARTIALSTIFFNESSOFF_TOOLTIP);
    }
};



//Walk

Blockly.Blocks['naoActions_walk'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD'],
            [Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD']
        ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.NAO_WALK).appendField(dropdown, 'DIRECTION').appendField(Blockly.Msg.NAO_WALK_DISTANCE).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WALK_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_turn'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_TURN_LEFT, 'LEFT'],
            [Blockly.Msg.NAO_TURN_RIGHT, 'RIGHT']
        ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.NAO_TURN).appendField(dropdown, 'DIRECTION').appendField(Blockly.Msg.TURN_DEGREES).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_TURN_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_walkTo'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_WALKTO)
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x");
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y");
        this.appendValueInput('Theta').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("theta");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WALKTO_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_stop'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STOP_TOOLTIP);
    }
};



//Sounds

Blockly.Blocks['naoActions_setVolume'] = {
    /**
     * Set volume.
     *
     * @constructs naoActions_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME 0-100, default 50
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VOLUME').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETVOLUME_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_getVolume'] = {
    /**
     * Get current volume
     *
     * @constructs naoActions_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     * @see {@link naoActions_setVolume}
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_GETVOLUME_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_getLanguage'] = {
    /**
     * Block to get the currently active language.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_GETLANGUAGE);
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.NAO_GETLANGUAGE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_setLanguage'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_LANGUAGE_GERMAN, 'GERMAN'],
            [Blockly.Msg.NAO_LANGUAGE_ENGLISH, 'ENGLISH'],
            [Blockly.Msg.NAO_LANGUAGE_FRENCH, 'FRENCH']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_SETLANGUAGE).appendField(dropdown, 'LANGUAGE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETLANGUAGE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_sayText'] = {
    /**
     * Say a text.
     *
     * @constructs naoActions_sayText
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to say
     * @returns immediately
     * @memberof Block
     */
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.NAO_SAY + ' ' + Blockly.Msg.DISPLAY_TEXT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SAYTEXT_TOOLTIP);
    }
};

//Lights

Blockly.Blocks['naoActions_setEyeColor'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.NAO_COLOR_GREEN, 'GREEN'],
            [Blockly.Msg.NAO_COLOR_BLUE, 'BLUE'],
            [Blockly.Msg.NAO_COLOR_RED, 'RED']
        ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_SETEYECOLOR).appendField(dropdown, 'COLOR');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETEYECOLOR_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_setEarIntensity'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('INTENSITY').appendField(Blockly.Msg.NAO_SETEARINTENSITY).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETEARINTENSITY_TOOLTIP);
    }
};


Blockly.Blocks['naoActions_blink'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_BLINK);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_BLINK_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_ledOff'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_LEDOFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LEDOFF_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_ledReset'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_LEDRESET);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LEDRESET_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_randomEyes'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('DURATION').appendField(Blockly.Msg.NAO_RANDOMEYES + ' ' + Blockly.Msg.NAO_DURATION).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_RANDOMEYES_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_rasta'] = {
    init: function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('DURATION').appendField(Blockly.Msg.NAO_RASTA + ' ' + Blockly.Msg.NAO_DURATION).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_RASTA_TOOLTIP);
    }
};
