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
        
        // id can be a space separated string of different ids => all ids should be visible!
        // FORMAT:
        // xxxxxxxx xxxxxxxx -S xxxxxxx -N xxxxxx
        // => will combine regions needed for first two ids, then remove south of third id and north of fourth.
        var idsplit = id.split(" ");
        
        // range to show
        var rx2 = 0;
        var ry2 = 0;
        var rx1 = 0;
        var ry1 = 0;
        
        // Find block to zoom into
        for(var i=0;i<idsplit.length;i++) {
            var op = "add";
            var curid = idsplit[i];
            
            if(curid === "-N" || curid === "-E" ||  curid === "-S" ||   curid === "-W") {
                op = curid;
                i++;
                curid = idsplit[i];
            }
            
            var block = blocklyWorkspace.getBlockById(curid);
            if(block) {
                var rect = block.getBoundingRectangle();
                var x2 = rect.bottomRight.x;
                var y2 = rect.bottomRight.y;
                var x1 = rect.topLeft.x;
                var y1 = rect.topLeft.y;
                
                if(op === "add") {
                    if(i === 0 || rx1>x1) {
                        rx1 = x1;
                    }
                    if(i === 0 || rx2<x2) {
                        rx2 = x2;
                    }
                    if(i === 0 || ry1>y1) {
                        ry1 = y1;
                    }
                    if(i === 0 || ry2<y2) {
                        ry2 = y2;
                    }
                } else if (op === "-N" && ry1<y2) {
                    ry1 = y2;
                } else if (op === "-S" && ry2>y1) {
                    ry2 = y1;
                } else if (op === "-W" && rx1<x2) {
                    rx1 = x2;
                } else if (op === "-E" && rx2>x1) {
                    rx2 = x1;
                }
            }
        }
        
        // Add padding...
        rx2 = rx2+pad[1];
        ry2 = ry2+pad[2];
        rx1 = rx1-pad[3];
        ry1 = ry1-pad[0];
        
        // Calculate width and height
        var w = rx2-rx1;
        var h = ry2-ry1;

        // Change size of surrounding div
        $(div).css({
            width: w+"px",
            height: h+"px"
        });
        
        // Translate & resize workspace
        blocklyWorkspace.translate(-rx1, -ry1);
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