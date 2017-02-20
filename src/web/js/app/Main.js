define([
    // import all dependencies
    "jquery",
    "underscore",
    "bootstrap",
    "blockly",
    "blocks",
    "blockly_lang_nl",
    
    // load some other objects used in this application
    "./Workspace",
    "./Connection",
    "./Notifications",
    
    "ace/ace"
    ], function(
        $,
        _,
        bootstrap,
        Blockly,
        Blocks,
        lang,
        Workspace,
        Connection,
        Notifications,
        ace
){
    // store ace in a global (accessed that way from blockly => field_code.js)
    // (? Can we load ace using closure ???)
    window.ace = ace;
    // Also preload ace theme & mode
    ace.require(["ace/theme/xcode", "ace/mode/csharp"]);
    
    // Enable asserts in Blockly
    if(window.SCRATCHITYDEBUGMODE) {
        goog.asserts.ENABLE_ASSERTS = true;
    }
    
    /**
     * Util function - convert a name entered by the user to camelcase. (for cs file naming)
     */
    var toCamelCase = function(str) {
        return str
            .replace(/[^A-Za-z0-9]/g, " ")
            .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1) { return $1.toUpperCase(); })
            .replace(/^([0-9])/, function($1) { return "_"+$1; });
    }
    
    /**
     * Constructor of the main object which initializes all the functionality on the page.
     * 
     * @constructor
     */
    var Main = function() {
        this.cs = new Connection();
        
        this.ws = new Workspace($(".pagecontainer")[0]);
        
        this._filename = null;
        this._updateFilename();
        
        // Load toolbox
        this.cs.loadToolbox(_.bind(function(xml) {
            this.ws.setToolbox(xml);
            
            // Toolbox is loaded... Continue initialization
            this.ws.init();

            this._initButtons();
            
            this.ws.onChange(_.bind(function() {
                this.setConfigurationSaved(false);
                this.updateCodePreview();
            }, this));
            
            this.updateCodePreview();
            
            // Initialize file open functionality
            window.onhashchange = _.bind(this._onUpdateHash, this);
          
            // Open file
            this._onUpdateHash();
            
        }, this), _.bind(function(){
            Notifications.notifyError("Kan toolbox niet laden.");
        }, this));
      
        // Code preview area
        this.codepreviewpre = $(".generatedcodepre");
    };
    
    /**
     * @private
     * Attach click listeners to the save & new buttons
     */
    Main.prototype._initButtons = function() {
        $("#button_save").click(_.bind(this.save, this));
        $(".showhidecodetoggle").click(_.bind(this.toggleCodeArea, this));
    };
    
    /**
     * @private
     * Put the current file name in the header
     */
    Main.prototype._updateFilename = function() {
        if(!this._filename) {
            $("#filenamedisplay").text("no file opened !?");
        }else{
            $("#filenamedisplay").text(this._filename);
        }
    };
  
    Main.prototype._onUpdateHash = function() {
      var filename = location.hash.substr(1);
      this.load(filename);
    };
  
    Main.prototype._getClassName = function() {
      if(this._filename !== null) {
        var pieces = this._filename.split(/[\\/]/);
        return pieces[pieces.length-1];
      } else {
        return "???";
      }
    };
  
    /**
     * Update the code in the preview...
     */
    Main.prototype.updateCodePreview = function() {
        try{
          var code = this.ws.generateCode(this._getClassName());
        } catch (e) {
          this.codepreviewpre.text("ERROR");
          throw e;
        }
        this.codepreviewpre.text(code);
    };
    
    /**
     * Called when the save button is clicked
     */
    Main.prototype.save = function() {
        if(!this._filename) {
            var userinput = prompt("Gelieve een naam in te geven.", "test");
            this._filename = toCamelCase(userinput);
            this._updateFilename();
        }
        if(!this._filename) {
            return;
        }
        Notifications.buzy("Opslaan...");
        this.cs.save(this._filename, this.ws.getProgram(), this.ws.generateCode(this._getClassName()), _.bind(function(){
            Notifications.done();
        }, this), _.bind(function(){
            Notifications.done();
            Notifications.notifyError("Oh! Er is iets mis gegaan tijdens het opslaan van het bestand...");
        }, this));
    };
  
    /**
     * Show whether the configuration is saved
     */
    Main.prototype.setConfigurationSaved = function(isSaved) {
        // TODO
      
    };
    
    /**
     * Function which will execute the continueCallback if the current file is saved.
     * If not, this function might ask whether you want to save the file. (and call the callback later)
     */
    Main.prototype.checkSaved = function(continuecallback) {
        // TODO
        
        // Always continue
        continuecallback();
    };
    
    /**
     * Called when the user wants to load a different file
     *
     * @param {String} file - the name of the file to load
     */
    Main.prototype.load = function(file) {
        this.checkSaved(_.bind(function(){
            Notifications.buzy("Laden...");
            this.cs.load(file, _.bind(function(data) {
                Notifications.done();
                this._filename = file;
                this._updateFilename();
                this.ws.initProgram(data);
                this.updateCodePreview();
                //Notifications.notifySuccess("Bestand geladen!");
            }, this), _.bind(function() {
                Notifications.done();
                Notifications.notifyError("Oh! Er is iets mis gegaan tijdens het laden van het bestand...");
            }, this));
        }, this));
    };
  
    /**
     * Toggle the code area section
     */
    Main.prototype.toggleCodeArea = function() {
        $(".codecontainer").toggleClass("open");
    };
    
    //
    // When loading this file, remove the buzy indicator and immediatelly start the "Main" code!
    //
    Notifications.done();
    new Main();
});