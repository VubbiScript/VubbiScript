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
    "./Notifications"
    ], function(
        $,
        _,
        bootstrap,
        Blockly,
        Blocks,
        lang,
        Workspace,
        Connection,
        Notifications
){
    
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
     * Util function - convert a name in camelcase to something with more readable capitalisation
     */
    var toDisplay = function(str) {
        return str.replace(/([^A-Z])([A-Z])/g, function($0, $1, $2) {return $1+" "+$2; });
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
            this.reloadList();
            
        }, this), _.bind(function(){
            Notifications.notifyError("Kan toolbox niet laden.");
        }, this));
    };
    
    /**
     * @private
     * Attach click listeners to the save & new buttons
     */
    Main.prototype._initButtons = function() {
        $("#button_save").click(_.bind(this.save, this));
        $("#button_new").click(_.bind(this.newFile, this));
    };
    
    /**
     * @private
     * Put the current file name in the header
     */
    Main.prototype._updateFilename = function() {
        if(!this._filename) {
            $("#filenamedisplay").text("naamloos bestand");
        }else{
            $("#filenamedisplay").text(toDisplay(this._filename));
        }
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
        this.cs.save(this._filename, this.ws.getProgram(), _.bind(function(){
            Notifications.done();
            //Notifications.notifySuccess("Opgeslaan!");
            this.reloadList();
        }, this), _.bind(function(){
            Notifications.done();
            Notifications.notifyError("Oh! Er is iets mis gegaan tijdens het opslaan van het bestand...");
            this.reloadList();
        }, this));
    };
    
    /**
     * Function which will execute the continueCallback if the current file is saved.
     * If not, this function might ask whether you want to save the file. (and call the callback later)
     * 
     * Currently not implemented. => will always call the callback
     */
    Main.prototype.checkSaved = function(continuecallback) {
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
                //Notifications.notifySuccess("Bestand geladen!");
            }, this), _.bind(function() {
                Notifications.done();
                Notifications.notifyError("Oh! Er is iets mis gegaan tijdens het laden van het bestand...");
            }, this));
        }, this));
    };
    
    /**
     * Called when the user wants to delete a file
     *
     * @param {String} file - the name of the file to delete
     */
    Main.prototype.delete = function(file) {
        var ok = confirm("Ben je zeker dat je het script \""+toDisplay(file)+"\" wilt verwijderen?")
        if(ok) {
            Notifications.buzy("Verwijderen...");
            this.cs.delete(file, _.bind(function(data) {
                Notifications.done();
                if(this._filename === file){
                    this._filename = null;
                    this._updateFilename();
                }
                this.reloadList();
            }, this), _.bind(function() {
                Notifications.done();
                Notifications.notifyError("Oh! Er is iets mis gegaan tijdens het verwijderen van het bestand...");
                this.reloadList();
            }, this));
        }
    }
    
    /**
     * Called when the user wants to make a new file (clears the workspace)
     */
    Main.prototype.newFile = function() {
        this.checkSaved(_.bind(function(){
            this._filename = null;
            this._updateFilename();
            this.ws.initProgram();
        }, this));
    };
    
    /**
     * Reloads the list of files that are available on the system (and show the list in the dropdown on top)
     */
    Main.prototype.reloadList = function() {
        var cont = $("#filelistcontainer");
        cont.empty();
        this.cs.list(_.bind(function(list) {
            _.each(list, _.bind(function(e) {
                var fileentry = $("<a>", {"class":"list-group-item loadfile_link", "text":toDisplay(e)}).click(_.bind(this.load, this, e));
                var deletebtn = $("<div>", {"class":"btn-deletefile btn btn-small"}).append($("<span>", {"class":"glyphicon glyphicon-trash"}));
                deletebtn.click(_.bind(function(event) {
                    event.stopPropagation();// Do not load the file also :)
                    this.delete(e);
                }, this));
                fileentry.prepend(deletebtn);
                cont.append(fileentry);
            }, this));
            if(list.length===0) {
                cont.append($("<div>", {"class":"list-group-item", "text":"Je hebt nog geen Scripts..."}))
            }
        }, this), _.bind(function(){
            cont.append($("<div>", {"class":"list-group-item", "text":"Kan de lijst met bestanden niet laden..."}));
        }, this));
    };
    
    //
    // When loading this file, remove the buzy indicator and immediatelly start the "Main" code!
    //
    Notifications.done();
    new Main();
});