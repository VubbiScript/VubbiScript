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
            robControls:true// JEPE NOTE: I should probably rename this to something else?
        });
        
        this.initProgram();
    };
    
    /**
     * Will be called when the code changes
     */
    Workspace.prototype.onChange = function(callback) {
        this._changeCallbacks.push(callback);
    };
    
    /**
     * Loads an empty OR existing Scratchity program
     * 
     * Based on "https://github.com/OpenRoberta/robertalab/blob/master/OpenRobertaServer/staticResources/js/app/roberta/roberta.program.js" > "initProgramEnvironment"
     * @param {String} opt_programBlocks - an existing Scratchity program (if not passed, an empty program is loaded)
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