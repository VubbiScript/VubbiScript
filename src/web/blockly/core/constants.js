/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Blockly constants.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.constants');


/**
 * Number of pixels the mouse must move before a drag starts.
 */
Blockly.DRAG_RADIUS = 5;

/**
 * Maximum misalignment between connections for them to snap together.
 */
Blockly.SNAP_RADIUS = 20;

/**
 * Delay in ms between trigger and bumping unconnected block out of alignment.
 */
Blockly.BUMP_DELAY = 250;

/**
 * Number of characters to truncate a collapsed block to.
 */
Blockly.COLLAPSE_CHARS = 30;

/**
 * Length in ms for a touch to become a long press.
 */
Blockly.LONGPRESS = 750;

/**
 * The richness of block colours, regardless of the hue.
 * Must be in the range of 0 (inclusive) to 1 (exclusive).
 */
Blockly.HSV_SATURATION = 0.45;

/**
 * The intensity of block colours, regardless of the hue.
 * Must be in the range of 0 (inclusive) to 1 (exclusive).
 */
Blockly.HSV_VALUE = 0.65;

/**
 * The rgb value for block colours in logic category.
 */
Blockly.CAT_LOGIC_RGB = "#33B8CA";
Blockly.CAT_MOVE_RGB = "#33B8CA";
/**
 * The rgb value for block colours in vector3 category.
 */
Blockly.CAT_VECTOR3_RGB = "#EBC300";
Blockly.CAT_VECTOR_RGB = "#EBC300";
/**
 * The rgb value for block colours in lists category.
 */
Blockly.CAT_LIST_RGB = "#39378B";
/**
 * The rgb value for block colours in math category.
 */
Blockly.CAT_MATH_RGB = "#005A94";
/**
 * The rgb value for block colours in procedures category.
 */
Blockly.CAT_PROCEDURE_RGB = "#179C7D";
/**
 * The rgb value for block colours in actions category.
 */
Blockly.CAT_ACTION_RGB = "#F29400";
Blockly.CAT_EVENTS_RGB = "#F29400";// color for TOOLBOX_EVENTS
/**
 * The rgb value for block colours in activity category.
 */
Blockly.CAT_ACTIVITY_RGB = "#E2001A";// JEPE: Available color!
/**
 * The rgb value for block colours in controls category.
 */
Blockly.CAT_CONTROL_RGB = "#EB6A0A";
/**
 * The rgb value for block colours in sensors category.
 */
Blockly.CAT_SENSOR_RGB = "#8FA402";
Blockly.CAT_UNITY_RGB = "#8FA402";
Blockly.CAT_OBJECTS_RGB = "#8FA402";
/**
 * The rgb value for block colours in text category.
 */
Blockly.CAT_TEXT_RGB = "#BACC1E";
/**
 * The rgb value for block colours in variables category.
 */
Blockly.CAT_VARIABLE_RGB = "#9085BA";
/**
 * The rgb value for block colours in communication category.
 */
Blockly.CAT_COMMUNICATION_RGB = "#FF69B4";
Blockly.CAT_DETECT_RGB = "#FF69B4";
/**
 * The rgb value for block colours in communication category.
 */
Blockly.CAT_IMAGE_RGB = "#DF01D7";
Blockly.CAT_ROTATE_RGB = "#DF01D7";



Blockly.CAT_MORE_RGB = "#68bce8";

/**
 * Lookup table for icon - categories.
 * @const
 */
Blockly.CAT_ICON = [];
Blockly.CAT_ICON['TOOLBOX_EVENTS'] = 'glyphicon glyphicon-flash';
Blockly.CAT_ICON['TOOLBOX_VARIABLE'] = 'glyphicon glyphicon-tasks';
Blockly.CAT_ICON['TOOLBOX_CONTROL'] = 'glyphicon glyphicon-random';
Blockly.CAT_ICON['TOOLBOX_DETECT'] = 'glyphicon glyphicon-eye-open';
Blockly.CAT_ICON['TOOLBOX_MOVE'] = 'glyphicon glyphicon-move';
Blockly.CAT_ICON['TOOLBOX_VECTOR'] = 'glyphicon glyphicon-screenshot';
Blockly.CAT_ICON['TOOLBOX_MATH'] = 'glyphicon glyphicon-plus';
Blockly.CAT_ICON['TOOLBOX_OBJECTS'] = 'glyphicon glyphicon-certificate';
Blockly.CAT_ICON['TOOLBOX_TEXT'] = 'glyphicon glyphicon-text-color';
Blockly.CAT_ICON['TOOLBOX_OTHER'] = 'glyphicon glyphicon-option-horizontal';
Blockly.CAT_ICON['TOOLBOX_MORE'] = 'glyphicon glyphicon-console';

/**
 * Sprited icons and images.
 */
Blockly.SPRITE = {
  width: 96,
  height: 124,
  url: 'sprites.png'
};

// Constants below this point are not intended to be changed.

/**
 * Required name space for SVG elements.
 * @const
 */
Blockly.SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Required name space for HTML elements.
 * @const
 */
Blockly.HTML_NS = 'http://www.w3.org/1999/xhtml';

/**
 * ENUM for a right-facing value input.  E.g. 'set item to' or 'return'.
 * @const
 */
Blockly.INPUT_VALUE = 1;

/**
 * ENUM for a left-facing value output.  E.g. 'random fraction'.
 * @const
 */
Blockly.OUTPUT_VALUE = 2;

/**
 * ENUM for a down-facing block stack.  E.g. 'if-do' or 'else'.
 * @const
 */
Blockly.NEXT_STATEMENT = 3;

/**
 * ENUM for an up-facing block stack.  E.g. 'break out of loop'.
 * @const
 */
Blockly.PREVIOUS_STATEMENT = 4;

/**
 * ENUM for an dummy input.  Used to add field(s) with no input.
 * @const
 */
Blockly.DUMMY_INPUT = 5;

/**
 * ENUM for left alignment.
 * @const
 */
Blockly.ALIGN_LEFT = -1;

/**
 * ENUM for centre alignment.
 * @const
 */
Blockly.ALIGN_CENTRE = 0;

/**
 * ENUM for right alignment.
 * @const
 */
Blockly.ALIGN_RIGHT = 1;

/**
 * ENUM for no drag operation.
 * @const
 */
Blockly.DRAG_NONE = 0;

/**
 * ENUM for inside the sticky DRAG_RADIUS.
 * @const
 */
Blockly.DRAG_STICKY = 1;

/**
 * ENUM for freely draggable.
 * @const
 */
Blockly.DRAG_FREE = 2;

/**
 * Lookup table for determining the opposite type of a connection.
 * @const
 */
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;

/**
 * Lookup table for determining the color of a data type .
 * @const
 */
Blockly.DATA_TYPE = [];
Blockly.DATA_TYPE['Number'] = "#005A94";
Blockly.DATA_TYPE['String'] = "#BACC1E";
Blockly.DATA_TYPE['Boolean'] = "#EB6A0A";// was #33B8CA
Blockly.DATA_TYPE['Sprite'] = "#FF69B4";
Blockly.DATA_TYPE['GameObject'] = "#8FA402";
Blockly.DATA_TYPE['Vector3'] = "#EBC300";
Blockly.DATA_TYPE['Quaternion'] = "#DF01D7";
//Blockly.DATA_TYPE['Image'] = "#DF01D7";
//Blockly.DATA_TYPE['Actor'] = "#F29400";
Blockly.DATA_TYPE['List_Number'] = "#39378B";
Blockly.DATA_TYPE['List_String'] = "#39378B";

/**
 * ENUM for toolbox and flyout at top of screen.
 * @const
 */
Blockly.TOOLBOX_AT_TOP = 0;

/**
 * ENUM for toolbox and flyout at bottom of screen.
 * @const
 */
Blockly.TOOLBOX_AT_BOTTOM = 1;

/**
 * ENUM for toolbox and flyout at left of screen.
 * @const
 */
Blockly.TOOLBOX_AT_LEFT = 2;

/**
 * ENUM for toolbox and flyout at right of screen.
 * @const
 */
Blockly.TOOLBOX_AT_RIGHT = 3;
