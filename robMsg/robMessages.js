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
 * @fileoverview English strings.
 * @author Beate.Jost@iais.fraunhofer.de (Beate Jost)
 *
 * After modifying this file, either run "build.py" from the parent directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');


/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/**
 * Tip: Generate URLs for read-only blocks by creating the blocks in the Code app,
 * then evaluating this in the console:
 * 'http://blockly-demo.appspot.com/static/apps/code/readonly.html?lang=en&xml=' + encodeURIComponent(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)).slice(5, -6))
 */


// Tooltips for the robot blocks
/// Rob Actions tooltips
Blockly.Msg.MOTOR_ON_TOOLTIP = 'Turns motor on with specific power.';
Blockly.Msg.MOTOR_ON_FOR_TOOLTIP = 'Turns motor on and stops motor after execution of rotations/degrees.';
Blockly.Msg.MOTOR_GETPOWER_TOOLTIP = 'Gets current power of this motor.';
Blockly.Msg.MOTOR_SETPOWER_TOOLTIP = 'Sets power of this motor.';
Blockly.Msg.MOTOR_STOP_TOOLTIP = 'Stops this motor.';
Blockly.Msg.MOTORDIFF_ON_TOOLTIP = 'Starts the robot with specific speed.';
Blockly.Msg.MOTORDIFF_ON_FOR_TOOLTIP = 'Starts the robot with specific speed and stops after specific distance.';
Blockly.Msg.MOTORDIFF_STOP_TOOLTIP = 'Stops the robot.';
Blockly.Msg.MOTORDIFF_TURN_TOOLTIP = 'Turns the robot.';
Blockly.Msg.MOTORDIFF_TURN_FOR_TOOLTIP = 'Turns the robot for number of degrees.';
Blockly.Msg.DISPLAY_PICTURE_TOOLTIP = 'Displays a picture on the screen.';
Blockly.Msg.DISPLAY_TEXT_TOOLTIP = 'Displays a text on the screen.';
Blockly.Msg.DISPLAY_CLEAR_TOOLTIP = 'Clears the display.';
Blockly.Msg.PLAY_TONE_TOOLTIP = 'Plays a tone.';
Blockly.Msg.PLAY_FILE_TOOLTIP = 'Plays a sound file.';
Blockly.Msg.PLAY_SETVOLUME_TOOLTIP = 'Sets volume.';
Blockly.Msg.PLAY_GETVOLUME_TOOLTIP = 'Gets current volume.';
Blockly.Msg.BRICKLIGHT_ON_TOOLTIP = 'Turns bricklight on.';
Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP = 'Turns bricklight off.';
Blockly.Msg.BRICKLIGHT_RESET_TOOLTIP = 'Resets bricklight. Sets the default bricklight: green and blinking.';
/// Rob Controls tooltips
Blockly.Msg.START_TOOLTIP = 'The starting point for the main program.';
Blockly.Msg.ACTIVITY_TOOLTIP = 'Marker for an additional activity.';
Blockly.Msg.START_ACTIVITY_TOOLTIP = 'Starts additional activity.';
Blockly.Msg.WAIT_TOOLTIP = 'Waits for a condition becoming true.';
Blockly.Msg.WAIT_FOR_TOOLTIP = 'Waits for sensor values.';
Blockly.Msg.LOOPFOREVER_TOOLTIP = 'Repeats indefinitely an action.';
Blockly.Msg.IFELSE_TOOLTIP = 'Checks the condition in "if". If the condition is true, executes the "do" action; otherwise executes the "else" action';
Blockly.Msg.IF_TOOLTIP = 'Checks the condition in "if". If the condition is true, executes the "do" action.';
/// Rob Sensors tooltips
Blockly.Msg.GETSAMPLE_TOOLTIP = 'Gets the current reading from choosen sensor.';
Blockly.Msg.TOUCH_ISPRESSED_TOOLTIP = 'Is the touch sensor pressed?';
Blockly.Msg.KEY_ISPRESSED_TOOLTIP = 'Is the selected button pressed?';
Blockly.Msg.KEY_ISPRESSEDANDRELEASED_TOOLTIP = 'Is the specific button pressed and released?';
Blockly.Msg.ULTRASONIC_GETSAMPLE_TOOLTIP = 'Gets the current reading from the ultrasonic sensor.';
Blockly.Msg.COLOUR_GETSAMPLE_TOOLTIP = 'Gets the current reading from the colour sensor.';
Blockly.Msg.INFRARED_GETSAMPLE_TOOLTIP = 'Gets the current reading from the infrared sensor.';
Blockly.Msg.ENCODER_RESET_TOOLTIP = 'Resets the motor encoder.';
Blockly.Msg.ENCODER_GETSAMPLE_TOOLTIP = 'Gets the current reading from the motor encoder.';
Blockly.Msg.GYRO_RESET_TOOLTIP = 'Resets the gyro sensor.';
Blockly.Msg.GYRO_GETSAMPLE_TOOLTIP = 'Gets the current reading from the gyro sensor.';
Blockly.Msg.TIMER_RESET_TOOLTIP = 'Resets the timer.';
Blockly.Msg.TIMER_GETSAMPLE_TOOLTIP = 'Gets the current reading from the timer.';
Blockly.Msg.BATTERY_GETSAMPLE_TOOLTIP = 'Gets the current voltage from the battery.';
/// Rob Brick tooltips
Blockly.Msg.ULTRASONIC_TOOLTIP = 'Represents an ultrasonic sensor.';
Blockly.Msg.COLOUR_TOOLTIP = 'Represents a colour sensor.';
Blockly.Msg.INFRARED_TOOLTIP = 'Represents an infrared sensor.';
Blockly.Msg.TOUCH_TOOLTIP = 'Is the touch sensor pressed?';
Blockly.Msg.GYRO_TOOLTIP = 'Represents a gyro sensor.';
Blockly.Msg.MOTOR_BIG_TOOLTIP = 'Represents a big motor.';
Blockly.Msg.MOTOR_MIDDLE_TOOLTIP = 'Represents a middle motor.';
Blockly.Msg.ACTOR_TOOLTIP = 'Represents any actor.';
///
Blockly.Msg.LISTS_CREATE_TITLE = 'list';
/// Variables Blocks.
Blockly.Msg.VARIABLES_TITLE = 'variable';
Blockly.Msg.VARIABLES_CREATE_TITLE = 'Create';
Blockly.Msg.VARIABLES_CREATE_WITH = 'with';
/// block text - This precedes the name of a variable when getting its values.  In most (all?) languages, it should be the empty string.  If unsure, ask yourself if any word should go before "x" in the expression "x + 1".
Blockly.Msg.VARIABLES_GET_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.VARIABLES_GLOBAL_DECLARE_TOOLTIP = 'Declares a global variable.';
Blockly.Msg.VARIABLES_LOCAL_DECLARE_TOOLTIP = 'Declares a local variable.';
Blockly.Msg.VARIABLES_TYPE_NUMBER = 'Number';
Blockly.Msg.VARIABLES_TYPE_BOOLEAN = 'Boolean';
Blockly.Msg.VARIABLES_TYPE_STRING = 'String';
Blockly.Msg.VARIABLES_TYPE_COLOUR = 'Colour';
Blockly.Msg.VARIABLES_TYPE_CONNECTION = 'Connection';
Blockly.Msg.VARIABLES_TYPE_ARRAY_NUMBER = 'List Number';
Blockly.Msg.VARIABLES_TYPE_ARRAY_STRING = 'List String';
Blockly.Msg.VARIABLES_TYPE_ARRAY_BOOLEAN = 'List Boolean';
Blockly.Msg.VARIABLES_TYPE_ARRAY_COLOUR = 'List Colour';
Blockly.Msg.VARIABLES_TYPE_ARRAY_CONNECTION = 'List Connection';
Blockly.Msg.PROCEDURES_VARIABLES_ERROR = 'Error: This block may be used only within the "';
Blockly.Msg.PROCEDURES_VARIABLES_LOOP_ERROR = 'Error: This block may be used only within a loop which declares ';
Blockly.Msg.PROCEDURES_TITLE = '" procedure';
Blockly.Msg.YES = 'yes';
Blockly.Msg.NO = 'no';
Blockly.Msg.ON = 'on';
Blockly.Msg.OFF = 'off';
Blockly.Msg.FOR = 'for';
Blockly.Msg.GET = 'get';
Blockly.Msg.SET = 'set';
Blockly.Msg.BRICK_WHEEL_DIAMETER = 'wheel diameter';
Blockly.Msg.BRICK_TRACK_WIDTH = 'track width';
Blockly.Msg.MOTOR = 'motor';
Blockly.Msg.MOTOR_MIDDLE = 'middle';
Blockly.Msg.MOTOR_BIG = 'big';
Blockly.Msg.MOTOR_NONE = 'none';
Blockly.Msg.MOTOR_REGULATION = 'regulation';
Blockly.Msg.MOTOR_OTHER = 'other power consumer';
Blockly.Msg.MOTOR_SIDE = 'side';
Blockly.Msg.MOTOR_ROTATION_REVERSE = 'direction of rotation';
Blockly.Msg.MOTOR_SPEED = 'speed';
Blockly.Msg.MOTOR_DISTANCE = 'distance cm';
Blockly.Msg.MOTOR_DEGREE = 'degree';
Blockly.Msg.MOTOR_ROTATION = 'rotation';
Blockly.Msg.MOTOR_FOREWARD = 'forwards';
Blockly.Msg.MOTOR_BACKWARD = 'backwards';
Blockly.Msg.MOTOR_DRIVE = 'drive';
Blockly.Msg.MOTOR_RIGHT = 'right';
Blockly.Msg.MOTOR_LEFT = 'left';
Blockly.Msg.MOTOR_TURN = 'turn';
Blockly.Msg.MOTOR_PORT = 'motor port';
Blockly.Msg.MOTOR_STOP = 'stop';
Blockly.Msg.MOTOR_FLOAT = 'float';
Blockly.Msg.MOTOR_BRAKE = 'brake';
Blockly.Msg.DISPLAY_SHOW = 'show';
Blockly.Msg.DISPLAY_COL = 'in column';
Blockly.Msg.DISPLAY_ROW = 'in row';
Blockly.Msg.DISPLAY_CLEAR = 'clear display';
Blockly.Msg.DISPLAY_PICTURE = 'picture';
Blockly.Msg.DISPLAY_PICTURE_GLASSES = 'glasses';
Blockly.Msg.DISPLAY_PICTURE_EYES_OPEN = 'eyes open';
Blockly.Msg.DISPLAY_PICTURE_EYES_CLOSED = 'eyes closed';
Blockly.Msg.DISPLAY_PICTURE_FLOWERS = 'flowers';
Blockly.Msg.DISPLAY_PICTURE_TACHO = 'tacho';
Blockly.Msg.DISPLAY_TEXT = 'text';
Blockly.Msg.PLAY = 'play';
Blockly.Msg.PLAY_TONE = 'tone';
Blockly.Msg.PLAY_FREQUENZ = 'frequency Hz';
Blockly.Msg.PLAY_DURATION = 'duration ms';
Blockly.Msg.PLAY_VOLUME = 'volume';
Blockly.Msg.PLAY_FILE = 'file';
Blockly.Msg.BRICKLIGHT_ON = 'on';
Blockly.Msg.BRICKLIGHT_FLASH = 'flashing';
Blockly.Msg.BRICKLIGHT_DOUBLE_FLASH = 'double flashing';
Blockly.Msg.BRICKLIGHT = 'brick light';
Blockly.Msg.BRICKLIGHT_COLOR = 'colour';
Blockly.Msg.BRICKLIGHT_GREEN = 'green';
Blockly.Msg.BRICKLIGHT_ORANGE = 'orange';
Blockly.Msg.BRICKLIGHT_RED = 'red';
Blockly.Msg.BRICKLIGHT_BLUE = 'blue';
Blockly.Msg.WAIT = 'wait ms';
Blockly.Msg.WAIT_FOREVER = 'indefinitely';
Blockly.Msg.WAIT_OR = 'or wait for';
Blockly.Msg.SENSOR_ULTRASONIC = 'ultrasonic sensor';
Blockly.Msg.SENSOR_TOUCH = 'touch sensor';
Blockly.Msg.SENSOR_TIME = 'time';
Blockly.Msg.SENSOR_MS_TIMER = 'in ms';
Blockly.Msg.SENSOR_TIMER = 'timer';
Blockly.Msg.SENSOR_COLOUR = 'colour sensor';
Blockly.Msg.SENSOR_INFRARED = 'infrared sensor';
Blockly.Msg.SENSOR_ENCODER = 'encoder';
Blockly.Msg.SENSOR_GYRO = 'gyroscope';
Blockly.Msg.SENSOR_BATTERY = 'voltage in V';
Blockly.Msg.SENSOR_KEY = 'button';
Blockly.Msg.SENSOR_KEY_ENTER = 'enter';
Blockly.Msg.SENSOR_KEY_UP = 'up';
Blockly.Msg.SENSOR_KEY_DOWN = 'down';
Blockly.Msg.SENSOR_KEY_LEFT = 'left';
Blockly.Msg.SENSOR_KEY_RIGHT = 'right';
Blockly.Msg.SENSOR_KEY_ESCAPE = 'escape';
Blockly.Msg.SENSOR_KEY_ANY = 'any';
Blockly.Msg.SENSOR_RESET = 'reset';
Blockly.Msg.SENSOR_RESET_II = '';
Blockly.Msg.SENSOR_SET_MODE = 'set mode';
Blockly.Msg.SENSOR_GET_MODE = 'get mode';
Blockly.Msg.SENSOR_GET_SAMPLE = 'get value';
Blockly.Msg.SENSOR_IS_PRESSED = 'pressed?';
Blockly.Msg.SENSOR_PRESSED = ' (pressed)';
Blockly.Msg.WAIT_UNTIL = 'wait until';
Blockly.Msg.SENSOR_WAIT_PRESSED = 'pressed';
Blockly.Msg.SENSOR_WAIT_PRESSED_RELEASED = 'pressed or released';
Blockly.Msg.START = 'start';
Blockly.Msg.START_ACTIVITY = 'activity';
Blockly.Msg.START_PROGRAM_DEBUG = 'show sensor data';
Blockly.Msg.MODE = 'mode';
Blockly.Msg.MODE_DISTANCE = 'distance';
Blockly.Msg.MODE_PRESENCE = 'presence';
Blockly.Msg.MODE_STATE = 'state';
Blockly.Msg.MODE_COLOUR = 'colour';
Blockly.Msg.MODE_LIGHT = 'light';
Blockly.Msg.MODE_RGB = 'RGB';
Blockly.Msg.MODE_AMBIENTLIGHT = 'ambient light';
Blockly.Msg.MODE_ROTATION = 'rotation';
Blockly.Msg.MODE_DEGREE = 'degree';
Blockly.Msg.MODE_ANGLE = 'angle';
Blockly.Msg.MODE_RATE = 'rate';
Blockly.Msg.LOOP_COUNT = 'number';
Blockly.Msg.LOOP = 'repeat until';
Blockly.Msg.LOOP_FOREVER = 'repeat indefinitely';
Blockly.Msg.CONNECTION_SEND_DATA = 'send message';
Blockly.Msg.CONNECTION_TO_ROBOT = 'to robot';
Blockly.Msg.CONNECTION_FROM_ROBOT = 'from robot';
Blockly.Msg.CONNECTION_TO_CONNECTION = 'to connection';
Blockly.Msg.CONNECTION_OVER_CHANNEL = 'over channel';
Blockly.Msg.CONNECTION_USED_CONNECTION = 'via connection';
Blockly.Msg.CONNECTION_RECEIVED_DATA = 'receive message';
Blockly.Msg.CONNECTION_CONNECT = 'connect to robot name';
Blockly.Msg.CONNECTION_WAIT_FOR_CONNECTION = 'wait for connection';
Blockly.Msg.CONNECTION_START_TOOLTIP = 'Tries to make a connection to another robot via bluetooth.';
Blockly.Msg.CONNECTION_WAIT_TOOLTIP = 'Waits for a connection via bluetooth.';
Blockly.Msg.CONNECTION_RECEIVE_TOOLTIP = 'Waits for a message from the robot which you declare in the connection.';
Blockly.Msg.CONNECTION_SEND_TOOLTIP = 'Sends a message to another robot.';
Blockly.Msg.CONNECTION_TOOLTIP = 'A robot"s connection';
Blockly.Msg.CONNECTION_CHECK = 'connection to robot %1 active?';
Blockly.Msg.CONNECTION_CHECK_TOOLTIP = 'check if the connection to the robot is active.';
Blockly.Msg.TOOLBOX_ACTION = 'Action';
Blockly.Msg.TOOLBOX_COMMUNICATION = 'Messages';
Blockly.Msg.TOOLBOX_SENSOR = 'Sensors';
Blockly.Msg.TOOLBOX_CONTROL = 'Control';
Blockly.Msg.TOOLBOX_LOGIC = 'Logic';
Blockly.Msg.TOOLBOX_MATH = 'Math';
Blockly.Msg.TOOLBOX_TEXT = 'Text';
Blockly.Msg.TOOLBOX_LIST = 'Lists';
Blockly.Msg.TOOLBOX_COLOUR = 'Colours';
Blockly.Msg.TOOLBOX_VARIABLE = 'Variables';
Blockly.Msg.TOOLBOX_PROCEDURE = 'Functions';
Blockly.Msg.TOOLBOX_WAIT = 'Wait';
Blockly.Msg.TOOLBOX_LOOP = 'Loops';
Blockly.Msg.TOOLBOX_DECISION = 'Decisions';
Blockly.Msg.TOOLBOX_LIGHT = 'Lights';
Blockly.Msg.TOOLBOX_SOUND = 'Sounds';
Blockly.Msg.TOOLBOX_DISPLAY = 'Display';
Blockly.Msg.TOOLBOX_DRIVE = 'Drive';
Blockly.Msg.TOOLBOX_WALK = 'Walk';
Blockly.Msg.TOOLBOX_MOVE = 'Move';
Blockly.Msg.TOOLBOX_GLOBAL_VARIABLE = 'Global Variables';
Blockly.Msg.TOOLBOX_LOOP_VARIABLE = 'Loop Variables';
//
/// These texts are used outside of Blockly, but are placed in the Blockly namespace
Blockly.Msg.MENU_EDIT = 'edit';
Blockly.Msg.MENU_ROBOT = 'robot';
Blockly.Msg.MENU_HELP = 'help';
Blockly.Msg.MENU_USER = 'login';
Blockly.Msg.MENU_START_BRICK = 'run on brick';
Blockly.Msg.MENU_START_SIM = 'run in simulation';
Blockly.Msg.MENU_EXPORT_PROG = 'export program';
Blockly.Msg.MENU_IMPORT_PROG = 'import program';
Blockly.Msg.MENU_CHECK = 'check';
Blockly.Msg.MENU_NEW = 'new ...';
Blockly.Msg.MENU_LIST = 'list ...';
Blockly.Msg.MENU_SAVE = 'save';
Blockly.Msg.MENU_SAVE_AS = 'save as ...';
Blockly.Msg.MENU_ATTACH = 'attach ...';
Blockly.Msg.MENU_PROPERTIES = 'properties';
Blockly.Msg.MENU_TOOLBOX = 'NEPO-Blocks';
Blockly.Msg.MENU_BEGINNER = 'beginner';
Blockly.Msg.MENU_EXPERT = 'expert';
Blockly.Msg.MENU_TOOLBOX_BEGINNER = 'NEPO-Blocks beginner';
Blockly.Msg.MENU_TOOLBOX_EXPERT = 'NEPO-Blocks expert';
Blockly.Msg.MENU_CONNECT = 'connect ...';
Blockly.Msg.MENU_UPDATE_FIRMWARE = 'update firmware';
Blockly.Msg.MENU_LOGGING = 'logging';
Blockly.Msg.MENU_EV3 = 'Robot preparation';
Blockly.Msg.MENU_PROGRAMMING = 'programming with NEPO';
Blockly.Msg.MENU_FAQ = 'FAQ';
Blockly.Msg.MENU_GENERAL = 'general help'
Blockly.Msg.MENU_SHOW_AGAIN = 'show welcome note again'
Blockly.Msg.MENU_ROBOT_STATE_INFO = 'info';
Blockly.Msg.MENU_STATE_INFO = 'state information';
Blockly.Msg.MENU_ABOUT = 'about';
Blockly.Msg.MENU_BUILDING_INSTRUCTIONS = 'building instructions';
Blockly.Msg.MENU_LOG_IN = 'login ...';
Blockly.Msg.MENU_LOG_OUT = 'logout';
Blockly.Msg.MENU_CHANGE = 'change ...';
Blockly.Msg.MENU_DELETE_USER = 'delete user ...';
Blockly.Msg.MENU_EDIT_TOOLTIP = 'edit';
Blockly.Msg.MENU_ROBOT_TOOLTIP = 'robots';
Blockly.Msg.MENU_HELP_TOOLTIP = 'help';
Blockly.Msg.MENU_USER_TOOLTIP = 'user';
Blockly.Msg.MENU_USER_STATE_TOOLTIP = 'user info';
Blockly.Msg.MENU_ROBOT_STATE_TOOLTIP = 'robot info';
Blockly.Msg.MENU_SHOW_CODE = 'show code';
Blockly.Msg.MENU_SIM_SIMPLE = 'Simple Scene';
Blockly.Msg.MENU_SIM_DRAW = 'Drawing Scene';
Blockly.Msg.MENU_SIM_ROBERTA = 'Roberta Scene';
Blockly.Msg.MENU_SIM_RESCUE = 'Rescue Scene';
Blockly.Msg.MENU_SIM_MATH = 'Math Scene';
Blockly.Msg.MENU_SIM_INFO = 'Info';
Blockly.Msg.MENU_SIM_START_PAUSE = 'Start/Pause';
Blockly.Msg.MENU_SIM_STEP = 'Step';
Blockly.Msg.MENU_SIM_STOP = 'Stop';
Blockly.Msg.MENU_SIM_BACK = 'Back';
Blockly.Msg.MENU_ZOOM = 'zoom';
Blockly.Msg.MENU_ZOOM_IN = 'zoom in';
Blockly.Msg.MENU_ZOOM_RESET = 'reset zoom';
Blockly.Msg.MENU_ZOOM_OUT = 'zoom out';
Blockly.Msg.MENU_SIM_BACK_TOOLTIP = 'back to programming editor';
Blockly.Msg.MENU_SIM_SCENE_TOOLTIP = 'change the scene';
Blockly.Msg.MENU_SIM_ROBOT_TOOLTIP = 'open/close the robot"s view';
Blockly.Msg.TAB_PROGRAM = 'Program';
Blockly.Msg.TAB_CONFIGURATION = 'Robot configuration';
Blockly.Msg.TAB_SIMULATION = 'Simulation';
Blockly.Msg.POPUP_ABOUT_TEXT = 'The Open Roberta Lab is a cloud-based integrated programming environment that enables children and adolescents to program easily different robot systems. This platform is completely open source so taking part is desirable! Both the software and the open source developer tools are available via Fraunhofer servers.';
Blockly.Msg.POPUP_ABOUT_TEXT_DEV = 'The Open Roberta Lab is an open-source programming platform developed by Fraunhofer IAIS within the initiative <a href="http://www.roberta-home.de/">»Roberta – Learning with Robots«</a>';
Blockly.Msg.POPUP_ABOUT_TEXT_GOOG = 'Open Roberta was initiated in collaboration with Google Germany to reduce the hurdles for students, teachers and schools programming educational robots. Open Roberta is financed by Google.org (2014 - 2015) with 1Mio Euro.</a>';
Blockly.Msg.POPUP_STARTUP_START = 'Choose your system!';
Blockly.Msg.POPUP_ABOUT_JOIN = 'I want to help';
Blockly.Msg.POPUP_USERNAME = 'Username';
Blockly.Msg.POPUP_USERNAME_LOGOFF = 'You are not logged in.';
Blockly.Msg.POPUP_PASSWORD = 'Password';
Blockly.Msg.POPUP_NAME = 'Name';
Blockly.Msg.POPUP_EMAIL = 'E-Mail';
Blockly.Msg.POPUP_SHARE_WITH = 'Share with ...';
Blockly.Msg.POPUP_SHARE_READ = 'READ';
Blockly.Msg.POPUP_SHARE_WRITE = 'WRITE';
Blockly.Msg.POPUP_ATTENTION = 'Attention';
Blockly.Msg.POPUP_VALUE = 'Value';
Blockly.Msg.POPUP_STARTUP_NEW = 'What"s new?';
Blockly.Msg.POPUP_STARTUP_HELP = 'Do you need help?';
Blockly.Msg.POPUP_STARTUP_HIDE = 'Okay, don"t show this window again and remember my choice.';
Blockly.Msg.POPUP_STARTUP_COOKIES = 'We use cookies to personalise content and to analyse our traffic.';
Blockly.Msg.POPUP_CANCEL = 'Cancel';
Blockly.Msg.POPUP_ROBOT_NAME = 'Name';
Blockly.Msg.POPUP_ROBOT_STATE = 'State';
Blockly.Msg.POPUP_ROBOT_STATE_WAIT = 'wait';
Blockly.Msg.POPUP_ROBOT_STATE_DISCONNECTED = 'disconnected';
Blockly.Msg.POPUP_ROBOT_STATE_BUSY = 'busy';
Blockly.Msg.POPUP_ROBOT_BATTERY = 'Voltage';
Blockly.Msg.POPUP_ROBOT_WAIT = 'Waiting time';
Blockly.Msg.POPUP_ROBOT_NOT_CONNECTED = 'You have to make a connection to your robot first.';
Blockly.Msg.POPUP_CONFIRM_DELETE_PROGRAM = 'Do you really want to delete the program ?';
Blockly.Msg.POPUP_CONFIRM_DELETE_CONFIGURATION = 'Do you really want to delete the configuration ?';
Blockly.Msg.BUTTON_STOP = 'Stop';
Blockly.Msg.BUTTON_START = 'Try it';
Blockly.Msg.BUTTON_MORE = 'more';
Blockly.Msg.POPUP_BEFOREUNLOAD = 'You have unsaved changes in your program or configuration. Sign in and save your program or configuration.';
Blockly.Msg.POPUP_BEFOREUNLOAD_LOGGEDIN = 'You have unsaved changes in your program or configuration.';
Blockly.Msg.POPUP_CONFIRM_UPDATE_FIRMWARE = 'There is a new firmware version for your robot available. You can try to run programs with the old version, but best bet is to update your robot now! You just have to click >>Update now<<.';
Blockly.Msg.POPUP_DO_UPDATE_FIRMWARE = 'Update now';
Blockly.Msg.POPUP_EMAIL_SEND = 'Send now';
Blockly.Msg.POPUP_REGISTER_USER = 'Register now';
Blockly.Msg.POPUP_PASSWORD_RECOVERY = 'reset password ...'
Blockly.Msg.POPUP_NEW_PASSWORD = 'New Password';
Blockly.Msg.POPUP_OLD_PASSWORD = 'Old Password';
Blockly.Msg.POPUP_REPEAT_PASSWORD = 'Repeat password';
Blockly.Msg.POPUP_CHANGE_PASSWORD = 'change password ...';
Blockly.Msg.POPUP_STARTUP_TITLE = 'Welcome';
Blockly.Msg.POPUP_CONTINUE = 'continue anyway';
Blockly.Msg.POPUP_ROBOT_SYSTEM = 'System';
Blockly.Msg.BUTTON_FINISH = 'Finish';
Blockly.Msg.BUTTON_LOAD = 'Load';
Blockly.Msg.BUTTON_DO_DELETE = 'Delete';
Blockly.Msg.BUTTON_DO_SHARE = 'Share';
Blockly.Msg.BUTTON_REFRESH = 'Refresh';
Blockly.Msg.BUTTON_EMPTY_LIST = 'Empty list';
Blockly.Msg.MESSAGE_PASSWORD_ERROR = 'Password does not match the confirm password.';
Blockly.Msg.MESSAGE_NOT_AVAILABLE = 'Not available.';
Blockly.Msg.MESSAGE_INVALID_NAME = 'Please fill in a correct name. A correct name begins with a letter and can only contain letters or numbers.';
Blockly.Msg.MESSAGE_EDIT_START = 'Your program $ will run in a moment!';
Blockly.Msg.MESSAGE_EDIT_CHECK = 'Your program is now checked!';
Blockly.Msg.MESSAGE_EDIT_SAVE_PROGRAM = 'Your program has been saved';
Blockly.Msg.MESSAGE_EDIT_SAVE_PROGRAM_AS = 'Your program has been saved as "$"';
Blockly.Msg.MESSAGE_EDIT_SAVE_CONFIGURATION = 'Your configuration has been saved';
Blockly.Msg.MESSAGE_EDIT_SAVE_CONFIGURATION_AS = 'Your configuration has been saved as "$"';
Blockly.Msg.MESSAGE_ROBOT_CONNECTED = 'Your robot "$" is connected';
Blockly.Msg.MESSAGE_ROBOT_FIRMWARE_UPDATE = 'Your robot runs now version "$"';
Blockly.Msg.MESSAGE_USER_LOGIN = 'Hello "$"';
Blockly.Msg.MESSAGE_USER_LOGOUT = 'You are logged out';
Blockly.Msg.MESSAGE_USER_NEW = 'Hello "$"';
Blockly.Msg.MESSAGE_USER_DELETED = 'User deleted';
Blockly.Msg.MESSAGE_PROGRAM_DELETED = 'Program "$" was deleted';
Blockly.Msg.MESSAGE_RELATION_DELETED = 'A relation of Program "$" was deleted';
Blockly.Msg.MESSAGE_CONFIGURATION_DELETED = 'Configuration "$" was deleted';
Blockly.Msg.MESSAGE_RESTART_ROBOT = 'Please reconnect the robot to the Open Roberta Lab.';
Blockly.Msg.MESSAGE_FIRMWARE_ERROR = 'There is a conflict with the firmware version of your robot and the Open Roberta Lab. Please contact us.';
Blockly.Msg.ORA_TOKEN_SET_SUCCESS = 'Token set';
Blockly.Msg.ORA_TOKEN_SET_ERROR_NO_ROBOT_WAITING = 'Check if your robot is switched on and connected to the server. <br />If you have problems to do this, please have a look at our help pages.';
Blockly.Msg.ORA_TOOLBOX_LOAD_SUCCESS = 'Toolbox loaded';
Blockly.Msg.ORA_TOOLBOX_LOAD_ERROR_NOT_FOUND = 'The selected NEPO-Blocks could not be found in the database.';
Blockly.Msg.ORA_TOOLBOX_ERROR_ID_INVALID = 'Toolbox name is not a valid identifier.';
Blockly.Msg.ORA_TOOLBOX_GET_ONE_ERROR_NOT_FOUND = 'The toolbox could not be found in the database.';
Blockly.Msg.ORA_TOOLBOX_GET_ONE_SUCCESS = 'Toolbox loaded';
Blockly.Msg.ORA_TOOLBOX_SAVE_ERROR = 'An error has occurred while saving the toolbox.';
Blockly.Msg.ORA_TOOLBOX_SAVE_SUCCESS = 'Toolbox saved';
Blockly.Msg.ORA_TOOLBOX_GET_ALL_SUCCESS = 'Toolbox loaded';
Blockly.Msg.ORA_TOOLBOX_DELETE_SUCCESS = 'Toolbox deleted';
Blockly.Msg.ORA_TOOLBOX_DELETE_ERROR = 'An error has occurred while deleting the toolbox, please try it again!';
Blockly.Msg.ORA_TOOLBOX_TRANSFORM_ERROR = 'Transformation error?';
Blockly.Msg.ORA_TOOLBOX_SAVE_ERROR_NOT_SAVED_TO_DB = 'An error error has occurred while saving the configuration in the database.';
Blockly.Msg.ORA_COMMAND_INVALID = 'Invalid Javascript-command';
Blockly.Msg.ORA_CONFIGURATION_ERROR_ID_INVALID = 'Configuration name is not a valid identifier.';
Blockly.Msg.ORA_CONFIGURATION_GET_ONE_ERROR_NOT_FOUND = 'The robot configuration could not be found in the database.';
Blockly.Msg.ORA_CONFIGURATION_GET_ONE_SUCCESS = 'Configuration loaded';
Blockly.Msg.ORA_CONFIGURATION_SAVE_SUCCESS = 'Configuration saved';
Blockly.Msg.ORA_CONFIGURATION_SAVE_ERROR_NOT_SAVED_TO_DB = 'An error error has occurred while saving the configuration in the database.';
Blockly.Msg.ORA_CONFIGURATION_SAVE_ERROR = 'An error has occurred while saving the robot configuration.';
Blockly.Msg.ORA_CONFIGURATION_GET_ALL_SUCCESS = 'Configuration loaded';
Blockly.Msg.ORA_CONFIGURATION_DELETE_SUCCESS = 'Configuration deleted';
Blockly.Msg.ORA_CONFIGURATION_DELETE_ERROR = 'An error has occurred while deleting the robot configuration, please try it again!';
Blockly.Msg.ORA_PROGRAM_CONFIGURATION_NOT_COMPATIBLE = 'Program is not compatible with the configuration';
Blockly.Msg.ORA_PROGRAM_ERROR_ID_INVALID = 'The name of your  program is already used by the system. Please choose another name and try it again!';
Blockly.Msg.ORA_PROGRAM_GET_ONE_ERROR_NOT_FOUND = 'Program not found.';
Blockly.Msg.ORA_PROGRAM_GET_ONE_ERROR_NOT_LOGGED_IN = 'You are not logged in, please log in with your username and password or create a new user.';
Blockly.Msg.ORA_PROGRAM_GET_ONE_SUCCESS = 'Program loaded';
Blockly.Msg.ORA_PROGRAM_SAVE_SUCCESS = 'Program saved';
Blockly.Msg.ORA_PROGRAM_SAVE_ERROR_NOT_SAVED_TO_DB = 'An error has occurred while saving the program.';
Blockly.Msg.ORA_PROGRAM_SAVE_AS_ERROR_PROGRAM_EXISTS = 'This program already exists.';
Blockly.Msg.ORA_PROGRAM_SAVE_ERROR_PROGRAM_TO_UPDATE_NOT_FOUND = 'The program could not be found, so it is impossible to update it.';
Blockly.Msg.ORA_PROGRAM_SAVE_ERROR_NO_WRITE_PERMISSION = 'You don"t have the permission to modify this program!';
Blockly.Msg.ORA_PROGRAM_SAVE_ERROR_OPTIMISTIC_TIMESTAMP_LOCKING = 'This program has been changed recently by someone else. You can save your changes in a new program, choose >save as< !';
Blockly.Msg.ORA_PROGRAM_GET_ALL_SUCCESS = 'Programs loaded';
Blockly.Msg.ORA_PROGRAM_DELETE_SUCCESS = 'Program deleted';
Blockly.Msg.ORA_PROGRAM_DELETE_ERROR = 'An error error has occurred while deleting the configuration. Please try it again!';
Blockly.Msg.ORA_PROGRAM_IMPORT_ERROR = 'This program is not a valid NEPO program and cannot be uploaded!';
Blockly.Msg.ORA_USER_GET_ONE_SUCCESS = 'Login successfull';
Blockly.Msg.ORA_USER_GET_ONE_ERROR_ID_OR_PASSWORD_WRONG = 'You have entered wrong user name or password. Please try again!';
Blockly.Msg.ORA_USER_CREATE_SUCCESS = 'The user was successfully created';
Blockly.Msg.ORA_USER_CREATE_ERROR_NOT_SAVED_TO_DB = 'The given user name already exists in the database, please choose another user name.';
Blockly.Msg.ORA_USER_DELETE_SUCCESS = 'The user was successfully deleted';
Blockly.Msg.ORA_USER_DELETE_ERROR_NOT_DELETED_IN_DB = 'Error while deleting user in database.';
Blockly.Msg.ORA_USER_DELETE_ERROR_ID_NOT_FOUND = 'Error while deleting user.';
Blockly.Msg.ORA_USER_GET_ALL_SUCCESS = 'Users loaded';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_PROGRAM_NOT_FOUND = 'The program could not be transformed into the robots programming language.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_CONFIGURATION_NOT_FOUND = 'The robot configuration could not be found on the server.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_PROGRAM_TRANSFORM_FAILED = 'The program could not be transformed into the robots programming language.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_CONFIGURATION_TRANSFORM_FAILED = 'The robot configuration could not be transformed into the robots programming language.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_PROGRAM_STORE_FAILED = 'The program could not be saved because of an internal error.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_PROGRAM_COMPILE_FAILED = 'The program could not be transformed into machine code.';
Blockly.Msg.ORA_COMPILERWORKFLOW_ERROR_PROGRAM_GENERATION_FAILED = 'The program could not be generated.';
Blockly.Msg.ORA_ROBOT_NOT_WAITING = 'The robot does not wait for a run command.';
Blockly.Msg.ORA_ROBOT_PUSH_RUN = 'Robot waited and now the jar is pushed to the robot';
Blockly.Msg.ORA_ROBOT_FIRMWAREUPDATE_POSSIBLE = 'The firmware was updated';
Blockly.Msg.ORA_ROBOT_FIRMWAREUPDATE_IMPOSSIBLE = 'An error has occurred while updating the new firmware on your robot.';
Blockly.Msg.ORA_ROBOT_NOT_CONNECTED = 'There is no robot connected. Check if your robot is switched on, connect it to the server and type in the robots password under robot - connect in the menu. <br /> If you have problems to do this, please have a look at our help pages.';
Blockly.Msg.ORA_OWNER_DOES_NOT_EXIST = 'The owner does not exist.';
Blockly.Msg.ORA_PROGRAM_TO_SHARE_DOES_NOT_EXIST = 'The program that you would like to share does not exist.';
Blockly.Msg.ORA_USER_TO_SHARE_DOES_NOT_EXIST = 'The user with which you would like to share the program does not exist. <br />Try it again!';
Blockly.Msg.ORA_USER_TO_SHARE_SAME_AS_LOGIN_USER = 'You cannot share any programs with yourself.';
Blockly.Msg.ORA_USER_CREATE_ERROR_MISSING_REQ_FIELDS = 'Check all required input fields have been filled out.';
Blockly.Msg.ORA_USER_EMAIL_ONE_ERROR_USER_NOT_EXISTS_WITH_THIS_EMAIL = 'This email address is unknown, maybe you have spelled it wrong!';
Blockly.Msg.ORA_SERVER_ERROR = 'Server-Error';

Blockly.Msg.CONFIGURATION_ERROR_SENSOR_MISSING = 'This sensor is not set to the port!';
Blockly.Msg.CONFIGURATION_ERROR_SENSOR_WRONG = 'Connected wrong sensor to the given port!';
Blockly.Msg.CONFIGURATION_ERROR_MOTOR_LEFT_MISSING = 'Left motor missing in the configuration!';
Blockly.Msg.CONFIGURATION_ERROR_MOTOR_RIGHT_MISSING = 'Right motor missing in the configuration!';
Blockly.Msg.CONFIGURATION_ERROR_MOTOR_MISSING = 'Motor is missing on the given port!';
Blockly.Msg.CONFIGURATION_ERROR_MOTOR_LEFT_UNREGULATED = 'Left motor is not regulated!';
Blockly.Msg.CONFIGURATION_ERROR_MOTOR_RIGHT_UNREGULATED = 'Right motor is not regulated!';

Blockly.Msg.DATATABLE_PROGRAM_NAME = 'Program name';
Blockly.Msg.DATATABLE_CREATED_BY = 'Creator';
Blockly.Msg.DATATABLE_SHARED = 'Shared';
Blockly.Msg.DATATABLE_SHARED_WITH = 'Shared with';
Blockly.Msg.DATATABLE_BLOCKS = 'Blocks';
Blockly.Msg.DATATABLE_CREATED_ON = 'Creation date';
Blockly.Msg.DATATABLE_ACTUALIZATION = 'Actualization date';
Blockly.Msg.DATATABLE_CONFIGURATION_NAME = 'Configuration name';
Blockly.Msg.DATATABLE_SHOW = 'Show';
Blockly.Msg.DATATABLE_PROGRAMS = 'programs';
Blockly.Msg.DATATABLE_CONFIGURATIONS = 'configurations';
Blockly.Msg.DATATABLE_FIRST = '<< First';
Blockly.Msg.DATATABLE_PREVIOUS = '< Prev';
Blockly.Msg.DATATABLE_NEXT = 'Next >';
Blockly.Msg.DATATABLE_LAST = 'Last >>';
Blockly.Msg.DATATABLE_SHOWING = 'Showing';
Blockly.Msg.DATATABLE_TO = 'to';
Blockly.Msg.DATATABLE_OF = 'of';
Blockly.Msg.DATATABLE_ENTRIES = 'entries';
Blockly.Msg.DATATABLE_EMPTY_TABLE = 'There are no entries in this table';
Blockly.Msg.SEND_DATA = 'data to send';

// These messages are used for validation of forms (please use short messages)
Blockly.Msg.VALIDATION_FIELD_REQUIRED = 'This field cannot be empty!';
Blockly.Msg.VALIDATION_PASSWORD_MIN_LENGTH = 'Password min length is 6!';
Blockly.Msg.VALIDATION_TOKEN_LENGTH = 'Token length is 8 characters!';
Blockly.Msg.VALIDATION_SECOND_PASSWORD_EQUAL = 'The two passwords must be equal!';
Blockly.Msg.VALIDATION_VALID_EMAIL_ADDRESS = 'Please enter a valid email address!';

Blockly.Msg.SIM_BLOCK_NOT_SUPPORTED = 'Unfortunately you can not use this block in the simulation!';
Blockly.Msg.SIM_CONFIGURATION_WARNING_SENSOR_MISSING = 'This sensor is not in the configuration! The behavior of the program on the real robot will be different than expected!';
Blockly.Msg.SIM_CONFIGURATION_WARNING_WRONG_SENSOR_PORT = 'In this block you have used a wrong sensor port! The behavior of the program on the real robot will be different than expected, please check the robot configuration!';
Blockly.Msg.SIM_CONFIGURATION_WARNING_WRONG_INFRARED_SENSOR_PORT = 'The infrared sensor is not connected in the configuration! The behavior of the program on the real robot will be different than expected, please check the robot configuration!';
Blockly.Msg.SERVER_NOT_AVAILABLE = 'The Open Roberta Lab is currently not available. </br> Please check your internet connection and try to reload this website. If the problem persists, please don"t hesitate to contact us via mail:</br>roberta-zentrale@iais.fraunhofer.de';
Blockly.Msg.MENU_MESSAGE_DOWNLOAD = 'Your program has been successfully downloaded.';
Blockly.Msg.POPUP_PROGRAM_TERMINATED_UNEXPECTED = 'The execution of the program on the robot has terminated unexpectedly!';
Blockly.Msg.TOUR1_DESCRIPTION00 = 'next';
Blockly.Msg.TOUR1_DESCRIPTION01 = 'Welcome,<br>click on  »next« and start a tour through the Open Roberta Lab.<br>I"ll show you how you can program your robot with NEPO.<br>You can end this tour all the time with a click on »X« in the right upper corner.';
Blockly.Msg.TOUR1_DESCRIPTION02 = 'The menu ;-)';
Blockly.Msg.TOUR1_DESCRIPTION03 = 'Here you can find everything you need to program the robot!<br><span class="typcn typcn-document-text"></span> Save and load programs<br><span class="typcn typcn-Roberta"></span> Connect your robot to the Open Roberta Lab<br><span class="typcn typcn-lightbulb"></span> Help for all kinds of problems<br><span class="typcn typcn-user"></span>Everything about user accounts, e.g. login or logoff';
Blockly.Msg.TOUR1_DESCRIPTION04 = 'Click here and switch to the robot configuration';
Blockly.Msg.TOUR1_DESCRIPTION05 = 'You can adapt the robot configuration later,<br>if you"ve constructed another robot.<br>If you don"t have a robot and want to test your program in the simulation <br>this configuration is applied.';
Blockly.Msg.TOUR1_DESCRIPTION06 = 'Click here and switch back to the programming area!';
Blockly.Msg.TOUR1_DESCRIPTION07 = 'The toolbox.<br>Here you can find all programming blocks.';
Blockly.Msg.TOUR1_DESCRIPTION08 = 'Each program starts with the program-start-block«.<br>Further programming blocks, which the robot should execute, should be attached to this block.<br>Just drag"n drop the desired block right under the start block.';
Blockly.Msg.TOUR1_DESCRIPTION09 = 'Here you find some shortcuts!<br>From left to right:<br><span class="typcn typcn-media-play"></span> Click here to execute the program on the real robot<br><span class="typcn typcn-media-play-outline"></span> Click here to start the robot in the simulation<br><span class="typcn typcn-cloud-storage"></span> Save your program, but before that you need to sign in<br><span class="typcn typcn-zoom"></span> Click here and zoom in on the blocks, if you want to<br><span class="typcn typcn-archive"></span> The trashcan! Just move blocks into the trashcan and they will be deleted.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Attention: You cannot recover blocks once they are deleted!<br>';
Blockly.Msg.TOUR1_DESCRIPTION10 = 'Click on »Action«';
Blockly.Msg.TOUR1_DESCRIPTION11 = 'Click and create the block in the workspace';
Blockly.Msg.TOUR1_DESCRIPTION12 = 'Now drag"n drop the new block just below the start-program-block so that they are connected';
Blockly.Msg.TOUR1_DESCRIPTION13 = 'Now test your program in the simulation!';
Blockly.Msg.TOUR1_DESCRIPTION14 = 'Just a moment!';
Blockly.Msg.TOUR1_DESCRIPTION15 = 'Perfect,<br>your robot is driving 20 cm forward,<br>this is what you have programmed!';
Blockly.Msg.TOUR1_DESCRIPTION16 = 'Bye and have fun trying out more!';

Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = 'doSomething';
Blockly.Msg.START_PROGRAM = 'start';
Blockly.Msg.MODE_SOUND = 'sound';
Blockly.Msg.MOTOR_STEER = 'steer';
Blockly.Msg.MODE_OBSTACLE = 'obstacle';
Blockly.Msg.SENSOR_LIGHT = 'light sensor';
Blockly.Msg.LIGHT_GETSAMPLE_TOOLTIP = 'Gets the current reading from the light sensor.';
Blockly.Msg.SENSOR_SOUND = 'sound sensor';
Blockly.Msg.SOUND_GETSAMPLE_TOOLTIP = 'Gets the current reading from the sound sensor.';
Blockly.Msg.MENU_LIST_PROG = 'my programs ...';
Blockly.Msg.MENU_LIST_CONF = 'my configurations ...';
Blockly.Msg.MENU_LIST_PROG_EXAMPLES = 'example programs ...';
Blockly.Msg.MENU_LANGUAGE_TOOLTIP = 'languages';
Blockly.Msg.MENU_LANGUAGE = 'languages';
Blockly.Msg.POPUP_TOUR = 'take a tour';

Blockly.Msg.CONFIGURATION_ERROR_MOTORS_ROTATION_DIRECTION = 'The direction of rotation of the left and right motor is different!';
Blockly.Msg.CONFIGURATION_ERROR_MULTIPLE_RIGHT_MOTORS = 'You have multiple right motors assigned to your configuration!';
Blockly.Msg.CONFIGURATION_ERROR_MULTIPLE_LEFT_MOTORS = 'You have multiple left motors assigned to your configuration!';
Blockly.Msg.WAIT_TIME_TOOLTIP = 'Waits for a certain time in milliseconds.';
Blockly.Msg.POPUP_RELEASE = 'Version beta 1.4 <ul class="NonIcon"><li>Create one program for the real robot <strong>and</strong> for the simulated robot</li><li>Update blockly for better performance and zoom function</li></ul>';
Blockly.Msg.POPUP_NEW_RELEASE = 'Version beta 2.0 <ul class="NonIcon"><li>NXT - create programs for LEGO Mindstorms NXT</li><li>Bot"n Roll - create programs for the educational robotic kit botnroll.com®compatible with Arduino™</li><li>Start programming with the new welcome tour</li><li>Improved Open Roberta Lab performance</ul>';
Blockly.Msg.ORA_TOKEN_SET_ERROR_WRONG_ROBOTTYPE = 'You are trying to connect a robot of a different type as selected in the menu. <br> Please switch the robot type in the robot"s menu and try to connect again!';
Blockly.Msg.ORA_USER_ERROR_EMAIL_USED = 'There is already an account with this email address registered. Please enter another email adress!';
Blockly.Msg.ORA_USER_PASSWORD_RECOVERY_EXPIRED_URL = 'The link is not valid anymore. Please ask for resetting your password again, if you still cannot remember it!';
Blockly.Msg.ORA_USER_PASSWORD_RECOVERY_SENT_MAIL_FAIL = 'Sorry, we cannot send a mail to you, please contact »roberta-zentrale@iais.fraunhofer.de«';
Blockly.Msg.ORA_USER_PASSWORD_RECOVERY_SENT_MAIL_SUCCESS = 'We send a mail to you, please check your mailbox!';
Blockly.Msg.ORA_USER_UPDATE_SUCCESS = 'Your password has been successfully changed!';
Blockly.Msg.LIGHT_TOOLTIP = 'Represents a light sensor.';
Blockly.Msg.LIGHT_ARDU_TOOLTIP = 'Represents 8 light sensors.';
Blockly.Msg.CENTER = 'center';
Blockly.Msg.MOTOR_PAN = 'pan';
Blockly.Msg.MOTOR_TILT = 'tilt';
Blockly.Msg.SENSOR_SONAR = 'sonar';
Blockly.Msg.SENSOR_COMPASS = 'compass sensor';
Blockly.Msg.COMPASS_TOOLTIP = 'Represents a compass sensor.';
Blockly.Msg.SOUND_TOOLTIP = 'Represents a sound sensor.';
Blockly.Msg.MOTOR_ARDU_TOOLTIP = 'Represents a Bot"n Roll chassis motor.';
Blockly.Msg.NXTBRICK_TOOLTIP = 'Represents the NXT brick with connected actors and sensors. There are also inbuild actors and sensors available, e.g. buttons, display ...';
Blockly.Msg.ARDUBRICK_TOOLTIP = 'Represents the Bot"n Roll board with connected actors and sensors. There are also inbuild actors and sensors available, e.g. pushbuttons, display ...';
Blockly.Msg.EV3BRICK_TOOLTIP = 'Represents the EV3 brick with connected actors and sensors. There are also inbuild actors and sensors available, e.g. buttons, display ...';
Blockly.Msg.BOTH = 'both';

Blockly.Msg.ORA_PROGRAM_IMPORT_ERROR_WRONG_ROBOT_TYPE = 'You are trying to import a program for a robot of a different type as selected in the menu. <br> Please switch the robot type in the robot"s menu and try to import again!';
Blockly.Msg.DISPLAY_IMAGE = 'image';
Blockly.Msg.DISPLAY_ANIMATION = 'animation';
Blockly.Msg.PLAY_NOTE = 'note';
Blockly.Msg.PLAY_WHOLE = 'whole note';
Blockly.Msg.PLAY_HALF = 'half note';
Blockly.Msg.PLAY_QUARTER = 'quarter note';
Blockly.Msg.PLAY_EIGHTH = 'eighth note';
Blockly.Msg.PLAY_SIXTEENTH = 'sixteenth note';
Blockly.Msg.LED_ON = 'turn LED on';
Blockly.Msg.LED_OFF = 'turn LED off';
Blockly.Msg.SENSOR_GESTURE = 'gesture';
Blockly.Msg.SENSOR_GESTURE_UP = 'upright';
Blockly.Msg.SENSOR_GESTURE_DOWN = 'upside down';
Blockly.Msg.SENSOR_GESTURE_FACE_UP = 'at the back';
Blockly.Msg.SENSOR_GESTURE_FACE_DOWN = 'at the front side';
Blockly.Msg.SENSOR_GESTURE_SHAKE = 'shaking';
Blockly.Msg.SENSOR_GESTURE_FREEFALL = 'freely falling';
Blockly.Msg.SENSOR_GESTURE_ACTIVE = 'active?';
Blockly.Msg.SENSOR_TEMPERATURE = 'temperature sensor';
Blockly.Msg.TOOLBOX_IMAGE = 'Images';

Blockly.Msg.TEMPERATURE_GETSAMPLE_TOOLTIP = 'Gets the current reading from the temperatur sensor.';
Blockly.Msg.COMPASS_GETSAMPLE_TOOLTIP = 'Gets the current reading from the compass sensor.';
Blockly.Msg.CALLIOPEBRICK_TOOLTIP = 'Represents Calliope, a pocket-sized codeable computer. There are also inbuild actors and sensors available, e.g. buttons, display ...';
Blockly.Msg.MICROBITBRICK_TOOLTIP = 'Represents micro:bit, a pocket-sized codeable computer. There are also inbuild actors and sensors available, e.g. buttons, display ...';
Blockly.Msg.PLAY_NOTE_TOOLTIP = 'Plays a music note';
Blockly.Msg.LED_ON_TOOLTIP = 'Turns the LED on and changes the color.';
Blockly.Msg.COLOUR_RGB_TOOLTIP = 'Creates a color with the given red, green, and blue values. Values should be between 0 and 255.';
Blockly.Msg.IMAGE_TOOLTIP = 'Creates an image for the display.';
Blockly.Msg.IMAGE_GET_TOOLTIP = 'Returns the choosen image.';
Blockly.Msg.IMAGE_INVERT_TOOLTIP = 'Inverts the image. Each pixel with value 0 or none will be set to # or 9 and pixels with value # or 9 will be set to 0 or none.';
Blockly.Msg.IMAGE_SHIFT_TOOLTIP = 'Shifts the image in the given direction by the given number';
Blockly.Msg.VARIABLES_TYPE_ARRAY_IMAGE = 'List Image';
Blockly.Msg.VARIABLES_TYPE_IMAGE = 'Image';
Blockly.Msg.IMAGE_GET_TOOLTIP_HEART = 'heart';
Blockly.Msg.IMAGE_GET_TOOLTIP_HEART_SMALL = 'small heart';
Blockly.Msg.IMAGE_GET_TOOLTIP_SMILE = 'smile';
Blockly.Msg.IMAGE_GET_TOOLTIP_CONFUSED = 'confused';
Blockly.Msg.IMAGE_GET_TOOLTIP_ANGRY = 'angry';
Blockly.Msg.IMAGE_GET_TOOLTIP_ASLEEP = 'asleep';
Blockly.Msg.IMAGE_GET_TOOLTIP_SILLY = 'silly';
Blockly.Msg.IMAGE_GET_TOOLTIP_MEH = 'meh!';
Blockly.Msg.IMAGE_GET_TOOLTIP_FABULOUS = 'fabulous';
Blockly.Msg.IMAGE_GET_TOOLTIP_YES = 'yes';
Blockly.Msg.IMAGE_GET_TOOLTIP_NO = 'no';
Blockly.Msg.IMAGE_GET_TOOLTIP_TRIANGLE = 'triangle';
Blockly.Msg.IMAGE_GET_TOOLTIP_TRIANGLE_LEFT = 'triangle left';
Blockly.Msg.IMAGE_GET_TOOLTIP_CHESSBOARD = 'chessboard';
Blockly.Msg.IMAGE_GET_TOOLTIP_DIAMOND = 'diamond';
Blockly.Msg.IMAGE_GET_TOOLTIP_DIAMOND_SMALL = 'small diamond';
Blockly.Msg.IMAGE_GET_TOOLTIP_SQUARE = 'square';
Blockly.Msg.IMAGE_GET_TOOLTIP_SQUARE_SMALL = 'small square';
Blockly.Msg.IMAGE_GET_TOOLTIP_RABBIT = 'rabbit';
Blockly.Msg.IMAGE_GET_TOOLTIP_COW = 'cow';
Blockly.Msg.IMAGE_GET_TOOLTIP_MUSIC_CROTCHET = 'music crotchet';
Blockly.Msg.IMAGE_GET_TOOLTIP_MUSIC_QUAVER = 'music quaver';
Blockly.Msg.IMAGE_GET_TOOLTIP_MUSIC_QUAVERS = 'music quavers';
Blockly.Msg.IMAGE_GET_TOOLTIP_PITCHFORK = 'pitchfork';
Blockly.Msg.IMAGE_GET_TOOLTIP_XMAS = 'xmas';
Blockly.Msg.IMAGE_GET_TOOLTIP_PACMAN = 'pacman';
Blockly.Msg.IMAGE_GET_TOOLTIP_TARGET = 'target';
Blockly.Msg.IMAGE_GET_TOOLTIP_TSHIRT = 'T-shirt';
Blockly.Msg.IMAGE_GET_TOOLTIP_ROLLERSKATE = 'rollerskate';
Blockly.Msg.IMAGE_GET_TOOLTIP_DUCK = 'duck';
Blockly.Msg.IMAGE_GET_TOOLTIP_HOUSE = 'house';
Blockly.Msg.IMAGE_GET_TOOLTIP_TORTOISE = 'tortoise';
Blockly.Msg.IMAGE_GET_TOOLTIP_BUTTERFLY = 'butterfly';
Blockly.Msg.IMAGE_GET_TOOLTIP_STICKFIGURE = 'stickfigure';
Blockly.Msg.IMAGE_GET_TOOLTIP_GHOST = 'ghost';
Blockly.Msg.IMAGE_GET_TOOLTIP_SWORD = 'sword';
Blockly.Msg.IMAGE_GET_TOOLTIP_GIRAFFE = 'giraffe';
Blockly.Msg.IMAGE_GET_TOOLTIP_SKULL = 'skull';
Blockly.Msg.IMAGE_GET_TOOLTIP_UMBRELLA = 'umbrella';
Blockly.Msg.IMAGE_GET_TOOLTIP_SNAKE = 'snake';
Blockly.Msg.IMAGE_GET_TOOLTIP_SAD = 'sad';

Blockly.Msg.POPUP_DOWNLOAD = 'Download your program to »$«';
Blockly.Msg.POPUP_DOWNLOAD_STEP_A = 'Right click on your program link below and';
Blockly.Msg.POPUP_DOWNLOAD_STEP_B = 'choose »Save link as ...«, then';
Blockly.Msg.POPUP_DOWNLOAD_STEP_C = 'click on your connected »$« in the left column,';
Blockly.Msg.POPUP_DOWNLOAD_STEP_D = 'now click on the »Save« button on the bottom right.<br><span style="font-size: 14px;">If your program doesn"t start automatically press the reset button after a while.</span>';
Blockly.Msg.POPUP_DOWNLOAD_CHECK = 'Okay, I"ve changed the download folder of my browser permanently. Don"t show this popup again and download my programs directly.';
Blockly.Msg.POPUP_DOWNLOAD_SAVE_AS = 'Save link as ...';
Blockly.Msg.POPUP_DOWNLOAD_SAVE = 'Save';
Blockly.Msg.POPUP_2_0_1 = 'Version 2.0.1 <ul class="NonIcon"><li>Calliope - create programs for Calliope</li><li>micro:bit - create Programs for micro:bit©</li><li>New languages: Portuguese, Russian, Polish</li></ul>';
Blockly.Msg.POPUP_ROBOT_SIM = 'Open Roberta Sim';

// Names for the nao blocks
/// NAO names
Blockly.Msg.NAO_BRICK_IPADDRESS = 'Ip Address';
Blockly.Msg.NAO_BRICK_PORT = 'Port number';
Blockly.Msg.NAO_BRICK_USERNAME = 'Username';
Blockly.Msg.NAO_BRICK_PASSWORD = 'Password';
Blockly.Msg.NAO_STANDUP = 'stand up';
Blockly.Msg.NAO_SITDOWN = 'sit down';
Blockly.Msg.NAO_TAICHI = 'tai chi';
Blockly.Msg.NAO_WAVE = 'wave';
Blockly.Msg.NAO_WIPEFOREHEAD = 'wipe forehead';
Blockly.Msg.NAO_APPLYPOSTURE = 'apply posture';
Blockly.Msg.NAO_POINTAT = 'point at';
Blockly.Msg.NAO_LOOKAT = 'look at';
Blockly.Msg.NAO_STIFFNESSON = 'stiffness on';
Blockly.Msg.NAO_STIFFNESSOFF = 'stiffness off';
Blockly.Msg.NAO_PARTIALSTIFFNESS = 'stiffness of';
Blockly.Msg.NAO_WALK = 'walk';
Blockly.Msg.NAO_TURN = 'turn';
Blockly.Msg.NAO_WALKTO = 'walk to';
Blockly.Msg.NAO_STOP = 'stop';
Blockly.Msg.NAO_SETVOLUME = 'set volume.';
Blockly.Msg.NAO_GETVOLUME = 'get volume.';
Blockly.Msg.NAO_GETLANGUAGE = 'get language';
Blockly.Msg.NAO_SETLANGUAGE = 'set language';
Blockly.Msg.NAO_SAY = 'say';
Blockly.Msg.NAO_SETEYECOLOR = 'set eye color';
Blockly.Msg.NAO_SETEARINTENSITY = 'set ear LED intensity';
Blockly.Msg.NAO_BLINK = 'blink';
Blockly.Msg.NAO_LEDOFF = 'LED off';
Blockly.Msg.NAO_LEDRESET = 'LED reset';
Blockly.Msg.NAO_RANDOMEYES = 'random eyes';
Blockly.Msg.NAO_RASTA = 'rasta';
Blockly.Msg.NAO_GYROMETER = 'get gyrometer';
Blockly.Msg.NAO_ACCELEROMETER = 'get accelerometer';
Blockly.Msg.NAO_HEADSENSOR = 'headsensor';
Blockly.Msg.NAO_TOUCHSENSOR = 'touchsensor';
Blockly.Msg.NAO_SONAR = 'sonar';
Blockly.Msg.NAO_NAOMARK = 'detect NAO mark';
Blockly.Msg.NAO_SELECTCAMERA = 'select camera';
Blockly.Msg.NAO_TAKEPICTURE = 'take picture';
Blockly.Msg.NAO_RECORDVIDEO = 'record video';
Blockly.Msg.NAO_FSR = 'get force sensitive resistor';

// Parameters for the nao blocks
/// NAO parameters
Blockly.Msg.NAO_WALK_DISTANCE = 'distance m';
Blockly.Msg.NAO_POSTURE_STAND = 'Stand';
Blockly.Msg.NAO_POSTURE_STANDINIT = 'StandInit';
Blockly.Msg.NAO_POSTURE_STANDZERO = 'StandZero';
Blockly.Msg.NAO_FRAME_TORSO = 'torso';
Blockly.Msg.NAO_FRAME_WORLD = 'world';
Blockly.Msg.NAO_FRAME_ROBOT = 'robot';
Blockly.Msg.NAO_BODY_ARM = 'arms';
Blockly.Msg.NAO_BODY_LARM = 'left arm';
Blockly.Msg.NAO_BODY_RARM = 'right arm';
Blockly.Msg.NAO_TURN_RIGHT = 'right';
Blockly.Msg.NAO_TURN_LEFT = 'left';
Blockly.Msg.NAO_TURN_DEGREES = 'degrees';
Blockly.Msg.NAO_LANGUAGE_GERMAN = 'German';
Blockly.Msg.NAO_LANGUAGE_ENGLISH = 'English';
Blockly.Msg.NAO_LANGUAGE_FRENCH = 'French';
Blockly.Msg.NAO_COLOR_GREEN = 'Green';
Blockly.Msg.NAO_COLOR_RED = 'Red';
Blockly.Msg.NAO_COLOR_BLUE = 'Blue';
Blockly.Msg.NAO_DURATION = 'duration';
Blockly.Msg.NAO_TOUCH_FRONT = 'Front';
Blockly.Msg.NAO_TOUCH_MIDDLE = 'Middle';
Blockly.Msg.NAO_TOUCH_REAR = 'Rear';
Blockly.Msg.NAO_TOUCHED = 'touched?';
Blockly.Msg.NAO_TOUCH_HAND = 'Hand';
Blockly.Msg.NAO_TOUCH_BUMPER = 'Bumper';
Blockly.Msg.NAO_TOUCH_RIGHT = 'right';
Blockly.Msg.NAO_TOUCH_LEFT = 'left';
Blockly.Msg.NAO_CAMERA_TOP = 'Top';
Blockly.Msg.NAO_CAMERA_BOTTOM = 'Bottom';
Blockly.Msg.NAO_QQVGA = '160*120';
Blockly.Msg.NAO_QVGA = '320*240';
Blockly.Msg.NAO_VGA = '640*480';
Blockly.Msg.NAO_CAMERA = 'camera';
Blockly.Msg.NAO_RESOLUTION = 'resolution';
Blockly.Msg.NAO_FRAME = 'frame';

// Tooltips for the nao blocks
/// NAO tooltips
Blockly.Msg.NAOBRICK_TOOLTIP = 'Represents the NAO configuration. Enter the information about your NAO to be able to establish a connection.';
Blockly.Msg.NAO_STANDUP_TOOLTIP = 'NAO stands up.';
Blockly.Msg.NAO_SITDOWN_TOOLTIP = 'NAO sits down.';
Blockly.Msg.NAO_TAICHI_TOOLTIP = 'NAO performs Tai Chi.'
Blockly.Msg.NAO_WAVE_TOOLTIP = 'NAO waves.';
Blockly.Msg.NAO_WIPEFOREHEAD_TOOLTIP = 'NAO wipes his forehead.';
Blockly.Msg.NAO_APPLYPOSTURE_TOOLTIP = 'NAO goes into the posture.';
Blockly.Msg.NAO_POINTAT_TOOLTIP = 'NAO points at a given position';
Blockly.Msg.NAO_LOOKAT_TOOLTIP = 'NAO looks to a given position';
Blockly.Msg.NAO_STIFFNESSON_TOOLTIP = 'The stiffness of the whole body is turned on';
Blockly.Msg.NAO_STIFFNESSOFF_TOOLTIP = 'The stiffness of the whole body is turned off';
Blockly.Msg.NAO_PARTIALSTIFFNESSON_TOOLTIP = 'The stiffness of the given body part is turned on';
Blockly.Msg.NAO_PARTIALSTIFFNESSOFF_TOOLTIP = 'The stiffness of the given body part is turned off';
Blockly.Msg.NAO_WALK_TOOLTIP = 'Makes the robot walk a distance.';
Blockly.Msg.NAO_TURN_TOOLTIP = 'Turns the robot for number of degrees';
Blockly.Msg.NAO_WALKTO_TOOLTIP = 'The robot walks to the give position.';
Blockly.Msg.NAO_STOP_TOOLTIP = 'The robot stops all movement.';
Blockly.Msg.NAO_SETVOLUME_TOOLTIP = 'Set the volume.';
Blockly.Msg.NAO_GETVOLUME_TOOLTIP = 'Get the volume.';
Blockly.Msg.NAO_GETLANGUAGE_TOOLTIP = 'Get the active language.';
Blockly.Msg.NAO_SETLANGUAGE_TOOLTIP = 'Set the language.'
Blockly.Msg.NAO_SETEYECOLOR_TOOLTIP = 'Set eye color';
Blockly.Msg.NAO_SETEARINTENSITY_TOOLTIP = 'Set the intensity of the LEDs in the robots ears.';
Blockly.Msg.NAO_BLINK_TOOLTIP = 'NAO blinks once.';
Blockly.Msg.NAO_LEDOFF_TOOLTIP = 'Turn the LEDs off.';
Blockly.Msg.NAO_LEDRESET_TOOLTIP = 'Reset the LEDs.';
Blockly.Msg.NAO_RANDOMEYES_TOOLTIP = 'The Color of the Eyes is changed randomly for a specified amount of time.';
Blockly.Msg.NAO_RASTA_TOOLTIP = 'The Color of the Eyes is changed between green, yellow and red for a specified amount of time.';
Blockly.Msg.NAO_GYROMETER_TOOLTIP = 'Get the current reading from the gyrometer in the given direction.';
Blockly.Msg.NAO_ACCELEROMETER_TOOLTIP = 'Get the current reading from the accelerometer in the given direction';
Blockly.Msg.NAO_HEADSENSOR_TOOLTIP = 'Is true if touchsensor on the robots head is touched.';
Blockly.Msg.NAO_TOUCHSENSOR_TOOLTIP = 'Is true if touchsensor on the robot is touched.';
Blockly.Msg.NAO_SONAR_TOOLTIP = 'Get the current reading from the ultrasonic sensor.';
Blockly.Msg.NAO_NAOMARK_TOOLTIP = 'Get the number of a detected Nao Mark.';
Blockly.Msg.NAO_SELECTCAMERA_TOOLTIP = 'Select the used camera';
Blockly.Msg.NAO_TAKEPICTURE_TOOLTIP = 'Take a picture and save it on the robot.';
Blockly.Msg.NAO_RECORDVIDEO_TOOLTIP = 'Record a video and save it on the robot.';
Blockly.Msg.NAO_FSR_TOOLTIP = 'Get the current reading from the force sensitive resistor under the feet of the robot.';
