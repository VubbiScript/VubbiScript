/**
 * @fileoverview Toggle Icon field. Has two states
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.FieldToggleIcon');

goog.require('Blockly.Field');


/**
 * Class for a checkbox field.
 * 
 * @param {string} state The initial state of the field
 * @param {string} positiveState The value to use for the positive state
 * @param {string} negativeState The value to use for the negative state
 * @param {string} positiveImage The image to use to show the positive situation
 * @param {string} negativeImage The image to use to show the negative situation
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new checkbox state.  If
 *     it returns a value, this becomes the new checkbox state, unless the
 *     value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldToggleIcon = function(state, positiveState, negativeState, positiveSvgPath, negativeSvgPath, opt_validator) {
  Blockly.FieldToggleIcon.superClass_.constructor.call(this, '', opt_validator);
  
  this.height_ = 16;
  this.width_ = 16;
  this.positiveState_ = positiveState;
  this.negativeState_ = negativeState;
  this.positiveSvgPath_ = positiveSvgPath;
  this.negativeSvgPath_ = negativeSvgPath;
  
  this.size_.width = 8;
  
  if(!(state === this.positiveState_ || state === this.negativeState_)) {
    state = this.negativeState_;
  }
  
  // Set the initial state.
  this.setValue(state);
};
goog.inherits(Blockly.FieldToggleIcon, Blockly.Field);

/**
 * Some icons that can be used in this element...
 * 
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
Blockly.FieldToggleIcon.ICON_EYE_VISIBLE = "M 7.9433594 3.2304688 C 6.2463524 3.2554687 4.9285279 3.8182063 3.8730469 4.6914062 C 2.8175659 5.5647062 2.013174 6.7261625 1.2167969 7.9765625 L 1 8.3164062 L 1.2871094 8.5996094 C 3.1053036 10.401909 5.0643402 12.027344 8.140625 12.027344 C 11.244697 12.027344 13.406371 10.142122 15.132812 7.9199219 L 15.382812 7.5996094 L 15.121094 7.2910156 C 14.142442 6.1324156 13.214575 5.1100469 12.085938 4.3730469 C 10.957299 3.6360469 9.6261012 3.2056687 7.9453125 3.2304688 L 7.9433594 3.2304688 z M 8.2695312 4.1679688 C 10.173379 4.1679688 11.726563 5.7191469 11.726562 7.6230469 C 11.726564 9.5268469 10.173379 11.080078 8.2695312 11.080078 C 6.3656835 11.080078 4.8144531 9.5268469 4.8144531 7.6230469 C 4.8144531 5.7191469 6.3656835 4.1679688 8.2695312 4.1679688 z M 8.28125 5.5898438 A 1.9777621 1.9777621 0 0 0 6.3027344 7.5664062 A 1.9777621 1.9777621 0 0 0 8.28125 9.5449219 A 1.9777621 1.9777621 0 0 0 10.257812 7.5664062 A 1.9777621 1.9777621 0 0 0 8.28125 5.5898438 z";
Blockly.FieldToggleIcon.ICON_EYE_HIDDEN = "M 13.626953 2.1386719 L 11.640625 4.125 L 10.642578 5.1230469 L 9.6347656 6.1308594 L 6.84375 8.921875 L 5.7695312 9.9960938 L 4.5976562 11.167969 L 3.2167969 12.548828 L 4.4296875 13.761719 L 6.375 11.816406 L 7.2753906 10.916016 L 8.6894531 9.5019531 L 10.210938 7.9804688 L 11.5625 6.6289062 L 13.064453 5.1269531 L 14.839844 3.3515625 L 13.626953 2.1386719 z M 7.9433594 3.2304688 C 6.2463524 3.2554687 4.9285279 3.8182063 3.8730469 4.6914062 C 2.8175659 5.5647062 2.013174 6.7261625 1.2167969 7.9765625 L 1 8.3164062 L 1.2871094 8.5996094 C 2.0683735 9.3740437 2.882231 10.106973 3.7929688 10.701172 L 5.2421875 9.2519531 C 4.9783808 8.7640123 4.8144531 8.2148737 4.8144531 7.6230469 C 4.8144531 5.7191469 6.3656837 4.1679688 8.2695312 4.1679688 C 8.8619838 4.1679688 9.4120902 4.3313943 9.9003906 4.5957031 L 10.773438 3.7226562 C 9.9445231 3.4035473 9.0228447 3.2145697 7.9453125 3.2304688 L 7.9433594 3.2304688 z M 8.28125 5.5898438 A 1.9777621 1.9777621 0 0 0 6.3027344 7.5664062 A 1.9777621 1.9777621 0 0 0 6.3808594 8.1132812 L 8.8261719 5.6679688 A 1.9777621 1.9777621 0 0 0 8.28125 5.5898438 z M 13.722656 5.7402344 L 11.714844 7.7480469 C 11.648803 9.5507296 10.197256 11.002315 8.3945312 11.068359 L 7.4804688 11.982422 C 7.6984337 11.999996 7.9105721 12.027344 8.140625 12.027344 C 11.244697 12.027344 13.406371 10.142122 15.132812 7.9199219 L 15.382812 7.5996094 L 15.121094 7.2910156 C 14.652686 6.7364797 14.195378 6.2160017 13.722656 5.7402344 z";

/**
 * Mouse cursor style when over the hotspot that initiates editability.
 */
Blockly.FieldToggleIcon.prototype.CURSOR = 'pointer';

/**
 * Install this toggle button on a block.
 */
Blockly.FieldToggleIcon.prototype.init = function() {
  if (this.fieldGroup_) {
    // Field has already been initialized once.
    return;
  }
  // Build the DOM.
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  this.borderRect_ = Blockly.createSvgElement('rect',
      {'height': this.height_, 
       'width': this.width_, 
       'class':'blocklyIconShape',
       'fill-opacity':'0',
       'stroke-opacity':'0'
      }, this.fieldGroup_, this.sourceBlock_.workspace);
  
  // Make the two images
  this.positiveElement_ = Blockly.createSvgElement('path', {
    'd':this.positiveSvgPath_, 
    'height': this.height_, 
    'width': this.width_,
    'class': 'blocklyIconSymbol'
  }, this.fieldGroup_);
  this.negativeElement_ = Blockly.createSvgElement('path', {
    'd':this.negativeSvgPath_, 
    'height': this.height_, 
    'width': this.width_,
    'class': 'blocklyIconSymbol'
  }, this.fieldGroup_);
  
  if(this.state_ === this.positiveState_) {
    this.positiveElement_.style.display = 'block';
    this.negativeElement_.style.display = 'none';
  } else {
    this.positiveElement_.style.display = 'none';
    this.negativeElement_.style.display = 'block';
  }
  
  this.updateEditable();
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
  this.mouseUpWrapper_ =
      Blockly.bindEvent_(this.fieldGroup_, 'mouseup', this, this.onMouseUp_);
  if (Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
        this.sourceBlock_, 'field', this.name, '', this.getValue()));
  }
};

/**
 * Return positive value or negative value (see constructor).
 * @return {string} Current state.
 */
Blockly.FieldToggleIcon.prototype.getValue = function() {
  return this.state_;
};

/**
 * Set the toggle icon to one of the two states (see constructor for allowed values).
 * @param {string} strBool New state.
 */
Blockly.FieldToggleIcon.prototype.setValue = function(strVal) {
  if(strVal === this.positiveState_ || strVal === this.negativeState_) {
    if (this.state_ !== strVal) {
      if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.state_, strVal));
      }
      this.state_ = strVal;
      if (this.positiveElement_ && this.negativeElement_) {
        if(this.state_ === this.positiveState_) {
          this.positiveElement_.style.display = 'block';
          this.negativeElement_.style.display = 'none';
        } else {
          this.positiveElement_.style.display = 'none';
          this.negativeElement_.style.display = 'block';
        }
      }
    }
  }
};

/**
 * Returns the height and width of the field.
 * @return {!goog.math.Size} Height and width.
 */
Blockly.FieldToggleIcon.prototype.getSize = function() {
  return this.size_;
};

/**
 * Draws the border with the correct width.
 * Saves the computed width in a property.
 * @private
 */
Blockly.FieldToggleIcon.prototype.render_ = function() {
};

/**
 * Add or remove the UI indicating if this field is editable or not.
 */
Blockly.FieldToggleIcon.prototype.updateEditable = function() {
  if (!this.EDITABLE || !this.sourceBlock_) {
    return;
  }
  if (this.sourceBlock_.isEditable()) {
    Blockly.addClass_(/** @type {!Element} */ (this.fieldGroup_),
                      'blocklyIconGroup');
    Blockly.removeClass_(/** @type {!Element} */ (this.fieldGroup_),
                         'blocklyIconGroupReadonly');
    this.fieldGroup_.style.cursor = this.CURSOR;
  } else {
    Blockly.addClass_(/** @type {!Element} */ (this.fieldGroup_),
                      'blocklyIconGroupReadonly');
    Blockly.removeClass_(/** @type {!Element} */ (this.fieldGroup_),
                         'blocklyIconGroup');
    this.fieldGroup_.style.cursor = '';
  }
};

/**
 * Toggle the state of the checkbox.
 * @private
 */
Blockly.FieldToggleIcon.prototype.showEditor_ = function() {
  var newState = this.positiveState_;
  if(this.state_ === this.positiveState_) {
    newState = this.negativeState_;
  }
  if (this.sourceBlock_ && this.validator_) {
    // Call any validation function, and allow it to override.
    var override = this.validator_(newState);
    if (override !== undefined && (override === this.positiveState_ || override === this.negativeState_ || override === null)) {
      newState = override;
    }
  }
  if (newState !== null) {
    this.setValue(newState);
  }
};
