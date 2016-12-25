define([], function(){
    
    /*
     * The connection class contains methods which do calls to the server.
     */
    
    /**
     * Create a connection object
     * 
     * @constructor
     */
    var Connection = function() {};
    
    /**
     * Private method to convert an object to xml which can be send to the server.
     * 
     * Assumes the keys do not contain invalid xml characters!
     * 
     * @private
     */
    Connection.prototype._params = function(obj) {
        var request = $("<request>");
        _.each(obj, function(content, key){
            request.append($("<"+key+">").text(content));
        });
        return request.prop('outerHTML');
    }
    
    /**
     * Save a file to the server.
     * 
     * @param {String} file - name of the file to save
     * @param {String} content - the xml content of the file (Blockly format)
     * @param {String} code - the generated code (C#)
     * @param {Function} done - callback which will be called when the call to the server returns successfully.
     * @param {Function} error - callback which will be called when the call to the server fails or returns an error.
     */
    Connection.prototype.save = function(file, content, code, done, error) {
        var data = this._params({
            file:file, 
            content:content,
            code:code
        });
        
        $.ajax("/api/save", {
            method:"POST",
            data:data,
            success:function(){
                done();
            }, 
            error:function(){
                error();
            }
        });
    };
    
    /**
     * Load a file from the server.
     * 
     * The done function has one argument = the xml content of the file (Blockly format) (String)
     * 
     * @param {String} file - name of the file to load
     * @param {Function} done - callback which will be called when the call to the server returns successfully.
     * @param {Function} error - callback which will be called when the call to the server fails or returns an error.
     */
    Connection.prototype.load = function(file, done, error) {
        var data = this._params({
            file:file
        });
        
        $.ajax("/api/load", {
            method:"POST",
            data:data,
            success:function(xml){
                done(xml);
            }, 
            error:function(){
                error();
            }
        });
    };
    
    /**
     * Delete a file on the server.
     *
     * This completely deletes the file (cs + blockly xml)
     * 
     * @param {String} file - name of the file to delete
     * @param {Function} done - callback which will be called when the call to the server returns successfully.
     * @param {Function} error - callback which will be called when the call to the server fails or returns an error.
     */
    Connection.prototype.delete = function(file, done, error) {
        var data = this._params({
            file:file
        });
        
        $.ajax("/api/delete", {
            method:"POST",
            data:data,
            success:function(){
                done();
            }, 
            error:function(){
                error();
            }
        });
    };
    
    /**
     * Get the list of available Scratchity files on the server.
     * 
     * The done function has one argument = an array of file names
     * 
     * @param {Function} done - callback which will be called when the call to the server returns successfully.
     * @param {Function} error - callback which will be called when the call to the server fails or returns an error.
     */
    Connection.prototype.list = function(done, error) {
        $.ajax("/api/list", {
            method:"POST",
            success:function(xml){
                var items = $("> file", $(xml)).map(function(n, e) {return $(e).text();}).get();
                done(items);
            }, 
            error:function(){
                error();
            }
        });
    };
    
    /**
     * Load the toolbox configuration from the server.
     * This is usually the first call to be done to the server...
     * 
     * The done function has one argument = the toolbox xml (String)
     * 
     * @param {Function} done - callback which will be called when the call to the server returns successfully.
     * @param {Function} error - callback which will be called when the call to the server fails or returns an error.
     */
    Connection.prototype.loadToolbox = function(done, error) {
        $.ajax("toolbox.xml", {
            method:"GET",
            success:function(xml){
                done(xml);
            }, 
            error:function(){
                error();
            }
        });
    };
    
    // return the constructor
    return Connection;
});