/*
 * Initializes the code when in development mode.
 * 
 * For a build, this file is completely ignored.
 * Instead, see "build_require.js" in the build directory for the require js configuration during a build
 */

var reqconfig = {
  baseUrl: "js",
  paths: {
    "jquery": "lib/jquery-2.2.3.min",
    "bootstrap": "../bootstrap/js/bootstrap",
    "underscore": "lib/underscore-min",
    "blockly": "../blockly/blockly_compressed",
    "blocks": "devblocks",
    "blockly_lang_en": "../blockly/msg/js/en",
    "blockly_lang_nl": "../blockly/msg/js/nl",
    "ace": "../ace/lib/ace"
  },
  shim: {
    'bootstrap': {
        deps: ['jquery'],
        exports: '$'
    },
    'underscore': {
        exports: '_'
    },
    'blockly': {
        deps: ['ace/ace'],
        exports: 'Blockly'
    },
    'blockly_lang_en': {
        deps: ['blockly'],
        exports: null
    },
    'blockly_lang_nl': {
        deps: ['blockly'],
        exports: null
    },
    'blocks': {
        deps: ['blockly'],
        exports: 'Blocks'
    }
  },
  waitSeconds: 15
};

window.SCRATCHITYDEBUGMODE = true;

require.config(reqconfig);
require(["app/Main"], function(){});