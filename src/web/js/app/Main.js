define([
    // import all dependencies
    "jquery",
    "underscore",
    "highlight",
    "bootstrap",
    "blockly",
    "blocks",
    
    // load some other objects used in this application
    "./Workspace",
    "./Connection",
    "./Notifications",
    
    "ace/ace"
    ], function(
        $,
        _,
        highlight,
        bootstrap,
        Blockly,
        Blocks,
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
    
    // Configure highlight
    highlight.configure({
      tabReplace: '    '
    });
    
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
        
        // Load toolbox
        this.cs.loadToolbox(_.bind(function(xml) {
            this.toolboxxml_ = xml;
          
            var toolboxxml = this.getTranslatedToolboxXml_();
            this.ws.setToolbox(toolboxxml);
            
            // Toolbox is loaded... Continue initialization
            this.ws.init();
            this._updateFilename();

            this._initButtons();
            
            this.ws.onChange(_.bind(function() {
                this.setConfigurationSaved(false);
                this.updateCodePreview();
            }, this));
            
            $("body").removeClass("loading");
            
            this.updateCodePreview();
            
            // Initialize file open functionality
            window.onhashchange = _.bind(this._onUpdateHash, this);
          
            // Open file
            this._onUpdateHash();
            
        }, this), _.bind(function(){
            Notifications.notifyError("Failed to load toolbox.");
        }, this));
      
        // Code preview area
        this.codepreviewpre = $(".generatedcodepre");
    };
  
    Main.prototype.getTranslatedToolboxXml_ = function() {
      var xml = $(this.toolboxxml_).get(0);
          
      // Translation in the toolbox!
      var fields = xml.getElementsByTagName("field");
      for (var i = 0; i < fields.length; i++) {
        var fieldtext = fields[i].getAttribute("i18n");
        if(fieldtext) {
          fields[i].removeChild(fields[i].firstChild);
          fields[i].insertBefore(document.createTextNode(Blockly.Msg[fieldtext]), fields[i].firstChild);
        }
      }
      
      return xml;
    };
  
    /**
     * Called when the language changes. We should reload the view.
     */
    Main.prototype.reload = function() {
      this.ws.initProgram(this.ws.getProgram());
      var toolboxxml = this.getTranslatedToolboxXml_();
      this.ws.setToolbox(toolboxxml);
    };
    
    /**
     * @private
     * Attach click listeners to the save & new buttons
     */
    Main.prototype._initButtons = function() {
        $("#saveProgram").click(_.bind(this.save, this));
        $(".showhidecodetoggle").click(_.bind(this.toggleCodeArea, this));
    };
    
    /**
     * @private
     * Put the current file name in the header
     */
    Main.prototype._updateFilename = function() {
        if(!this._filename) {
            $("#filenamedisplay")[0].textContent = Blockly.Msg.UI_UNNAMED_FILE;
        }else{
            var filenamesplit = this._filename.split(/[/\\]/);
            $("#filenamedisplay")[0].textContent = filenamesplit[filenamesplit.length-1];
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
          // KNOWN BUG in developer mode (does not happen in a build) 
          // -> you get an error here because some code generation files got loaded in the wrong order...
          // Just refresh the page and try again. ;)
          // (I am too lazy too fix it - and I am currently the only developer)
          throw e;
        }
        this.codepreviewpre.text(code);
        highlight.highlightBlock(this.codepreviewpre[0]);
    };
    
    /**
     * Called when the save button is clicked
     */
    Main.prototype.save = function() {
        if(!this._filename) {
            var userinput = prompt(Blockly.Msg.UI_NAME_FILE_MSG, "Scripts/HelloWorld");
            if(!userinput) {
                return;
            }
            var pieces = userinput.split(/[\\/]/);
            var path = pieces.slice(0, -1).join("/");
            this._filename = (path.length>0?path+"/":"")+toCamelCase(pieces[pieces.length-1]);
            this._updateFilename();
        }
        Notifications.buzy(Blockly.Msg.UI_SAVE);
        this.cs.save(this._filename, this.ws.getProgram(), this.ws.generateCode(this._getClassName()), _.bind(function(){
            Notifications.done();
        }, this), _.bind(function(){
            Notifications.done();
            Notifications.notifyError(Blockly.Msg.UI_SAVE_FAILURE);
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
            Notifications.buzy(Blockly.Msg.UI_LOAD);
            this.cs.load(file, _.bind(function(data) {
                Notifications.done();
                this._filename = file;
                this.ws.initProgram(data);
                this._updateFilename();
                this.updateCodePreview();
                //Notifications.notifySuccess("Bestand geladen!");
            }, this), _.bind(function() {
                Notifications.done();
                Notifications.notifyError(Blockly.Msg.UI_LOAD_FAILURE);
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
    // Load the language!
    //
    var loadLanguage = function (lang, next) {
      if(lang !== curLanguage) {
        $.ajax({
          dataType : "script",
          cache : true,
          url : "../blockly/msg/js/"+lang+".js"
        }).then(function() {
          // set the new language preference
          $.ajax("/api/setlang/"+lang, {
            method:"POST"
          });
          
          // update some places in the UI manually
          $(".codecontent h5").text(Blockly.Msg.UI_GENERATED_CODE);
          curLanguage = lang;
          
          // reload workspace if already loaded
          if(window.main) {
            window.main.reload();
          }
        
          if(next) {
            next();
          }
        });
      }
    };
  
    // All known languages
    var availableLanguages = [];
  
    // Register language dropdown links
    $(".languageitem").each(function(i, e) {
      var lang = $(e).attr("data-lang");
      availableLanguages.push(lang);
      $(e).click(function() {
        loadLanguage(lang);
      });
    })
    
    // Pick the language to load...
    var curLanguage = "null";
    var langToLoad = availableLanguages[0];
    var lang = navigator.language || navigator.userLanguage;
    for(var i=1;i<availableLanguages.length;i++) {
      if (lang.indexOf(availableLanguages[i]) == 0) {
        langToLoad = availableLanguages[i];
        break;
      }
    }
    
    // Get the language preference for the user...
    $.ajax("/api/lang", {
      method:"POST",
      data:{},
      success:function(data){
          if(data) {
            langToLoad = data;
          }
          init();
      }, 
      error:function(){
          init();
      }
    });
    
    var init = function() {
      loadLanguage(langToLoad, function() {
        //
        // When loading this file, remove the buzy indicator and immediatelly start the "Main" code!
        //
        Notifications.done();
        window.main = new Main();
      });
    };
});