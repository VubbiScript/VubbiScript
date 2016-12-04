define(["jquery", "underscore"], function($, _){
    
    /**
     * Constructor of the object that handles the notifications on top of the screen and the loading indicator
     * 
     * @constructor
     */
    var Notifications = function() {
        this.notifdisplay = $("#notificationcontainer");
        this.notif = null;
    };
    
    /**
     * Show a notification
     * 
     * Note: you probably want to use "notifySuccess" or "notifyError" instead!
     * 
     * @param {String} msg - the message to show
     * @param {String} level - a css class to use for the notification
     */
    Notifications.prototype.notify = function(msg, level) {
        this.notifdisplay.empty();
        this.notif = $('<div class="alert">').append($("<p>", {"text": msg})).addClass("alert-"+level);
        this.notif.prepend($('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
            .click(_.bind(this.hide, this)));
        this.notifdisplay.append(this.notif);
        this.clearHide();
    };
    
    /**
     * Call to make the current notification hide itself after some time
     * 
     * @param {int} millis - the number of millis after which to hide the current notification
     */
    Notifications.prototype.enableHideTimeout = function(millis) {
        this.clearHide();
        this._timer = setTimeout(_.bind(this.hide, this), millis);
    };
    
    /**
     * Prevent the current notification from hidding itself automatically after some time
     */
    Notifications.prototype.clearHide = function() {
        if(this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    };
    
    /**
     * Hide the current notification
     */
    Notifications.prototype.hide = function() {
        this.clearHide();
        var notif = this.notif;
        this.notif.hide(200, function(){
            if(notif === this.notif) {
                this.notif = null;
                this.notifdisplay.empty();
            }
        });
    };
    
    /**
     * Show a success notification
     * 
     * Note: the notification will disappear automatically
     */
    Notifications.prototype.notifySuccess = function(msg) {
        this.notify(msg, "success");
        this.enableHideTimeout(2000);
    };
    
    /**
     * Show an error notification
     */
    Notifications.prototype.notifyError = function(msg) {
        this.notify(msg, "danger");
    };
    
    /**
     * Show the buzzy indicator
     */
    Notifications.prototype.buzy = function(msg) {
        $("#buzyindicator .buzyindicatorstate").text(msg);
        $("#buzyindicator").fadeIn(300);
    };
    
    /**
     * Hide the buzzy indicator
     */
    Notifications.prototype.done = function() {
        $("#buzyindicator .buzyindicatorstate").text("");
        $("#buzyindicator").fadeOut(300);
    };
    
    return new Notifications();
});