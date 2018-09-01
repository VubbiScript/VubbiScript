({
    baseUrl: "../src/web/js",
    paths: {
      "jquery": "lib/jquery-2.2.3.min",
      "bootstrap": "../bootstrap/js/bootstrap.min",
      "underscore": "lib/underscore-min",
      "highlight": "lib/highlight.pack",
      "blockly": "../blockly/blockly_compressed",
      "blocks": "../blockly/blocks_compressed",
      "csharp": "../blockly/csharp_compressed",
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
          deps: ['ace/ace', 'ace/mode/csharp', 'ace/theme/xcode'],
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
    name: "app/Main",
    out: "./temp/app.min.js"
})