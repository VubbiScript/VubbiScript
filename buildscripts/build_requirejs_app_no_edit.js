({
    baseUrl: "../src/web/js",
    paths: {
      "jquery": "lib/jquery-2.2.3.min",
      "bootstrap": "../bootstrap/js/bootstrap.min",
      "underscore": "lib/underscore-min",
      "blockly": "../blockly/blockly_compressed",
      "blocks": "../blockly/blocks_compressed",
      "csharp": "../blockly/csharp_compressed",
      "blockly_lang_en": "../blockly/msg/js/en",
      "blockly_lang_nl": "../blockly/msg/js/nl"
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
      'blockly_lang_en': {
          deps: ['blockly'],
          exports: null
      },
      'blockly_lang_nl': {
          deps: ['blockly'],
          exports: null
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