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
    "highlight": "lib/highlight.pack",
    "blockly": "../blockly/blockly_compressed",
    "blocks": "devblocks",
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
    'highlight': {
        exports: 'hljs'
    },
    'blockly': {
        deps: ['ace/ace'],
        exports: 'Blockly'
    },
    'blocks': {
        deps: ['blockly'],
        exports: 'Blocks'
    }
  },
  waitSeconds: 30
};

window.SCRATCHITYDEBUGMODE = true;

require.config(reqconfig);
require(["app/Main"], function(){});