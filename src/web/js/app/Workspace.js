define([
    "jquery",
    "underscore",
    "blockly"
    ], function(
        $,
        _,
        Blockly
    ){
    
    /**
     * Constructs the object that controls the Blockly workspace!
     * 
     * @param {DOMElem} div - the workspace div
     */
    var Workspace = function(div) {
        this.div = div;
        this.$div = $(div);
    };
    
    /**
     * Configure the toolbox. 
     * To be called BEFORE init() - ... at least for now...
     *
     * @param {String} toolboxxmlstring - the blockly toolbox xml string
     */
    Workspace.prototype.setToolbox = function (toolboxxmlstring) {
        this.toolboxconfig = $(toolboxxmlstring).get(0);
        if(!this.blocklyWorkspace) {
            // Called before init()... Ok!
        }else{
            // Need to recreate to toolbox
            alert("Not implemented yet...");
        }
    };
    
    /**
     * Initializes the Blockly workspace
     */
    Workspace.prototype.init = function () {
        if(this.blocklyWorkspace){
            this.blocklyWorkspace.dispose();
            this.blocklyWorkspace = null;
        }
        this.listenToBlocklyEvents = false;
        this._changeCallbacks = [];
        
        // Make the Blockly workspace
        this.blocklyWorkspace = Blockly.inject(this.div, {
            toolbox: this.toolboxconfig,
            trashcan : true,
            scrollbars : true,
            zoom : {
                controls : true,
                wheel : true,
                startScale : 1.0,
                maxScale : 4,
                minScale : .25,
                scaleSpeed : 1.1
            },
            variableDeclaration : true,
            // Note: behavior changed! Now, this will look for a property "PROPERTY_VALID_ROOT" in the block.
            // (instead of having to provide a list of names)
            checkInTask : true,
            // New: function to allow custom toolbox header
            toolboxHeaderRenderFunc : _.bind(function(div) {
              var container = $("<div>", {"class":"vubbiscriptToolboxHeader"});
              var header = $("<div>", {"text":"Blokken", "class":"title"});
              container.append(header);
              // TODO JEPE => Add the global physics toggle!!
              //var togglePhysics = this.makePhysicsToggle_();
              //container.append(togglePhysics);
              div.appendChild(container[0]);
            }, this),
            media:"blockly/media/",
            robControls:true// JEPE NOTE: I should probably rename this to something else?
        });
        
        this.initProgram();
    };
  
    Workspace.prototype.makePhysicsToggle_ = function() {
      var togglePhysics = $("<div>", {"class":"dropdown physicsToggle"});
      var btn = $("<button>", {"class":"btn btn-default btn-xs dropdown-toggle", "type":"button", "data-toggle":"dropdown", "text":"Phy2D"});
      
      var menu = $("<ul>", {"class":"dropdown-menu"});
      menu.append(
        $("<li>").append(
          $("<a>", {text:"Gebruik 2D physics (RigidBody2D, BoxCollider2D)", "data-shortlabel":"2D", "data-value":"2D"})
          .click(_.bind(this.updatePhysicsToggle_, this, '2D'))
        )
      );
      menu.append(
        $("<li>").append(
          $("<a>", {text:"Gebruik 3D physics (RigidBody, BoxCollider)", "data-shortlabel":"3D", "data-value":"3D"})
          .click(_.bind(this.updatePhysicsToggle_, this, '3D'))
        )
      );
      
      togglePhysics.on("show.bs.dropdown", function () {
        var rect = togglePhysics[0].getBoundingClientRect(true);
        menu.css({
          position:"absolute",
          display: "block",
          left: rect.left,
          top: rect.bottom
        });
        $("body").append(menu);
      });
      
      togglePhysics.on("hide.bs.dropdown", function () {
        menu.css({
          position:"",
          display: "",
          left: 0,
          top: 0
        });
        $(togglePhysics).append(menu);
      });
      
      togglePhysics.append(btn).append(menu);
      this._togglePhysics = togglePhysics;
      this._togglePhysicsMenu = menu;
      
      this.updatePhysicsToggleLabel_("2D");
      
      return togglePhysics;
    };
  
    Workspace.prototype.updatePhysicsToggle_ = function(val) {
      // TODO: update workspace somehow and save/load the value
      
      
      this.updatePhysicsToggleLabel_(val);
    };
  
    Workspace.prototype.updatePhysicsToggleLabel_ = function(val) {
      var label = $("a[data-value='"+val+"']", this._togglePhysicsMenu).attr("data-shortlabel");
      $(".btn", this._togglePhysics).text("").append($("<img>", {"src":"/blockly/media/toggle_"+label+".png"}).css({"width":"16px", "height":"16px"}), " ").append($("<span>", {"class":"caret"}));
    };
    
    /**
     * Will be called when the code changes
     */
    Workspace.prototype.onChange = function(callback) {
        this._changeCallbacks.push(callback);
    };
    
    /**
     * Loads an empty OR existing Vubbi program
     * 
     * Based on "https://github.com/OpenRoberta/robertalab/blob/master/OpenRobertaServer/staticResources/js/app/roberta/roberta.program.js" > "initProgramEnvironment"
     * @param {String} opt_programBlocks - an existing Vubbi program (if not passed, an empty program is loaded)
     */
    Workspace.prototype.initProgram = function(opt_programBlocks) {
        this.blocklyWorkspace.clear();
        var x, y, ystart, yupdate;
        if ($(window).width() < 768) {
            x = $(window).width() / 50;
            y = 25;
            ystart = 145;//+120
            yupdate = 265;
        } else {
            x = $(window).width() / 5;
            y = 50;
            ystart = 170;//+120
            yupdate = 290;
        }
        var id = Blockly.genUid();
        var id_startblock = Blockly.genUid();
        var id_updateblock = Blockly.genUid();
        var text = "<block_set>" +
            "<instance x='0' y='0'>" + 
            "<block id='" + id + "' type='unityControls_classConfig'></block>"+
            "</instance>"+
            "<instance x='0' y='0'>"+
            "<block id='" + id_startblock + "' type='unityEvents_start'></block>"+
            "</instance>"+
            "<instance x='0' y='0'>"+
            "<block id='" + id_updateblock + "' type='unityEvents_update'></block>"+
            "</instance>"+
            "</block_set>";
        
        var program = opt_programBlocks || text;
        var xml = Blockly.Xml.textToDom(program);
        Blockly.Xml.domToWorkspace(xml, this.blocklyWorkspace);
        var block = this.blocklyWorkspace.getBlockById(id);
        var blockstart = this.blocklyWorkspace.getBlockById(id_startblock);
        var blockupdate = this.blocklyWorkspace.getBlockById(id_updateblock);
        if (block) {
            block.moveBy(x, y);
            blockstart.moveBy(x, ystart);
            blockupdate.moveBy(x, yupdate);
        }
        
        Blockly.svgResize(this.blocklyWorkspace);
        
        // Add change listeners.
        this.blocklyWorkspace.addChangeListener(_.bind(function(event) {
            if (this.listenToBlocklyEvents && event.type != Blockly.Events.UI) {
                _.each(this._changeCallbacks, _.bind(function(c) {
                    c();
                }, this));
            }
        }, this));
      
        setTimeout(_.bind(function() {
            this.listenToBlocklyEvents = true;
        }, this), 500);
        
        // Fix - Blockly can open the context menu inside the blockly context menu...
        // This happens because "mousedown" opens the blockly context menu and "mouseup" opens the browser context menu (so no preventDefault)
        // Furthermore, Blockly does not prevent opening the menu since it is not part of the svg...
        // Supress the browser's context menu.
        $("div.blocklyWidgetDiv").on("contextmenu", ">.blocklyContextMenu", function(e){e.preventDefault();});
    };
    
    /**
     * Get the xml string for the current program in the editor
     */
    Workspace.prototype.getProgram = function(){
        var xml = Blockly.Xml.workspaceToDom(this.blocklyWorkspace);
        return Blockly.Xml.domToText(xml);
    };
    
    /**
     * Get the C# code for the workspace
     */
    Workspace.prototype.generateCode = function(filename) {
        return Blockly.CSharp.workspaceToCode(this.blocklyWorkspace, filename);
    };
  
    // returns the constructor
    return Workspace;
});