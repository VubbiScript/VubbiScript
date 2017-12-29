define([
    // import all dependencies
    "jquery",
    "underscore",
    "bootstrap",
    "blockly",
    "blocks",
    "blockly_lang_nl"
    ], function(
        $,
        _,
        bootstrap,
        Blockly,
        Blocks,
        lang
){
    
    var makeWorkspace = function(div, program, id, pad) {
        // Make the Blockly workspace
        var blocklyWorkspace = Blockly.inject(div, {
            readOnly: true,
            variableDeclaration : true,
            checkInTask : true,
            media:"/app_no_edit/blockly/media/",
            robControls:false
        });
        
        var xml = Blockly.Xml.textToDom(program);
        Blockly.Xml.domToWorkspace(xml, blocklyWorkspace);
        
        // Find block to zoom into
        var block = blocklyWorkspace.getBlockById(id);
        if(block) {
            var rect = block.getBoundingRectangle();
            var x2 = rect.bottomRight.x+pad[1];
            var y2 = rect.bottomRight.y+pad[2];
            var x1 = rect.topLeft.x-pad[3];
            var y1 = rect.topLeft.y-pad[0];
            var w = x2-x1;
            var h = y2-y1;

            // Change size of surrounding div
            $(div).css({
              width: w+"px",
              height: h+"px"
            });
            
            // Translate & resize workspace
            blocklyWorkspace.translate(-x1, -y1);
        }
    }
    
    $(".vubbiblock").each(function(i, vubbiblock) {
      var scriptelem = $("script[type='text/vubbiscript']", vubbiblock);
      var content = scriptelem.html();
      scriptelem.detach();
      var id = $(vubbiblock).attr("data-block");
      var pad = $(vubbiblock).attr("data-pad");
      if(pad){
          pad = pad.split(";");
          for(var i=0;i<4;i++) {
              pad[i] = Number(pad[i]);
          }
      } else {
          pad = [0, 0, 0, 0];
      }
      makeWorkspace(vubbiblock, content, id, pad);
    });
});