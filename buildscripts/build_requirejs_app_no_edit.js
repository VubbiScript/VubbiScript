({
    baseUrl: "../src/web/js",
    paths: {
      "jquery": "lib/jquery-2.2.3.min",
      "bootstrap": "../bootstrap/js/bootstrap.min",
      "underscore": "lib/underscore-min",
      "blockly": "../blockly/blockly_compressed",
      "blocks": "../blockly/blocks_compressed",
      "csharp": "../blockly/csharp_compressed"
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
          exports: 'Blockly'
      },
      'csharp': {
          deps: ['blockly'],
          exports: null
      },
      'blocks': {
          deps: ['blockly', 'csharp'],
          exports: 'Blocks'
      }
    },
    name: "app_no_edit/Main",
    out: "./temp/app_no_edit.min.js"
})