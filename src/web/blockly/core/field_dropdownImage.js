/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dropdown input field. Used for editable titles, presented with
 *               images.
 * 
 * @author beate.jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.FieldDropdownImage');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');
goog.require('goog.userAgent');

/**
 * Class for an editable dropdown field.
 * 
 * @param {(!Array.
 *            <!Array.<string>>|!Function)} menuGenerator An array of options
 *            for a dropdown list, or a function which generates these options.
 * @param {Function=}
 *            opt_validator A function that is executed when a new option is
 *            selected, with the newly selected value as its sole argument. If
 *            it returns a value, that value (which must be one of the options)
 *            will become selected in place of the newly selected option, unless
 *            the return value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldDropdownImage = function(menuGenerator, pathToImages, width, height, opt_type, opt_stickyarrow, opt_useVerticalSeparatorPrefix, opt_onchange) {
    // Ensure height and width are numbers.  Strings are bad at math.
    this.height_ = Number(height);
    this.width_ = Number(width);
    this.type_ = '.' + (opt_type || 'png');
    this.labelStr_ = this.opt_label || "";
    this.stickyarrow_ = opt_stickyarrow === true;
    this.useVerticalSeparatorPrefix_ = opt_useVerticalSeparatorPrefix === true;
    this.menuGenerator_ = menuGenerator;
    this.anyChangesListener_ = opt_onchange;
    this.trimOptions_();
    this.pathToMedia_ = Blockly.Css.mediaPath_ + pathToImages;
    var firstTuple = this.getOptions_()[0];
    this.size_ = new goog.math.Size(this.width_ + (this.stickyarrow_?2:10), this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
    this.text_ = firstTuple[0] || '';
    this.setValue(firstTuple[1]);
};
goog.inherits(Blockly.FieldDropdownImage, Blockly.Field);

/**
 * Rectangular mask used by Firefox.
 * 
 * @type {Element}
 * @private
 */
Blockly.FieldDropdownImage.prototype.rectElement_ = null;

/**
 * Horizontal distance that a checkmark ovehangs the dropdown.
 */
Blockly.FieldDropdownImage.CHECKMARK_OVERHANG = 25;

/**
 * Android can't (in 2014) display "▾", so use "▼" instead.
 */
Blockly.FieldDropdownImage.ARROW_CHAR = goog.userAgent.ANDROID ? '\u25BC' : '\u25BE';

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldDropdownImage.prototype.CURSOR = 'default';

/**
 * Install this dropdown on a block.
 */
Blockly.FieldDropdownImage.prototype.init = function() {
    if (this.fieldGroup_) {
        // Image has already been initialized once.
        return;
    }
    // Build the DOM.
    /** @type {SVGElement} */
    this.fieldGroup_ = Blockly.createSvgElement('g', {
        'cursor' : 'default'
    }, null);
    if (!this.visible_) {
        this.fieldGroup_.style.display = 'none';
    }
    /** @type {SVGElement} */
    this.imageElement_ = Blockly.createSvgElement('image', {
        'height' : this.height_ + 'px',
        'width' : this.width_ + 'px'
    }, this.fieldGroup_);
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', goog.isString(this.src_) ? this.src_ : '');
    // to make the combination of image and arrow clickable
    this.rectElement_ = Blockly.createSvgElement('rect', {
        'height' : this.height_ + 'px',
        'width' : (this.width_ + (this.stickyarrow_?2:15)) + 'px',
        'fill-opacity' : 0,
        'cursor' : 'default',
    }, this.fieldGroup_);

    // Configure the field to be transparent with respect to tooltips.
    var topElement = this.rectElement_ || this.imageElement_;
    topElement.tooltip = this.sourceBlock_;
    Blockly.Tooltip.bindMouseEvents(topElement);

    // Add dropdown arrow: "option ▾" (LTR) or "▾ אופציה" (RTL)
    this.arrow_ = Blockly.createSvgElement('tspan', {}, null);
    this.arrow_.appendChild(document.createTextNode(this.sourceBlock_.RTL ? Blockly.FieldDropdownImage.ARROW_CHAR + (this.stickyarrow_?'':' ') : (this.stickyarrow_?'':' ')
            + Blockly.FieldDropdownImage.ARROW_CHAR));
    this.textElement_ = Blockly.createSvgElement('text', {
        'class' : 'blocklyText',
        'y' : this.size_.height / 2,
        'x' : this.size_.width - 6
    }, this.fieldGroup_);
    if (this.sourceBlock_ && this.arrow_) {
        // Update arrow's colour.
        this.arrow_.style.fill = '#ffffff';
      
        if(this.stickyarrow_) {
          this.arrow_.style.fill = '#383838';
        }
    }
    if (this.sourceBlock_.RTL) {
        this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild);
    } else {
        this.textElement_.appendChild(this.arrow_);
    }
    
    // Optional - vertical separator bar in front of dropdown
    if(this.useVerticalSeparatorPrefix_) {
        this.labelElement_ = Blockly.createSvgElement('text', {
            'class' : 'blocklyText',
            'y' : this.size_.height / 2 - 1,
            'x' : -8
        }, this.fieldGroup_);
        var labelTSpan = Blockly.createSvgElement('tspan', {}, null);
        labelTSpan.appendChild(document.createTextNode("|"));
        this.labelElement_.appendChild(labelTSpan);
        labelTSpan.style.fill = "rgba(255,255,255,0.5)";
    }

    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

    this.mouseUpWrapper_ = Blockly.bindEvent_(this.fieldGroup_, 'mouseup', this, this.onMouseUp_);
};

/**
 * Create a dropdown menu under the text.
 * 
 * @private
 */
Blockly.FieldDropdownImage.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, null);
    var thisField = this;

    function callback(e) {
        var menuItem = e.target;
        if (menuItem) {
            var value = menuItem.getValue();
            if (thisField.sourceBlock_ && thisField.validator_) {
                // Call any validation function, and allow it to override.
                var override = thisField.validator_(value);
                if (override !== undefined) {
                    value = override;
                }
            }
            if (value !== null) {
                thisField.setValue(value);
            }
        }
        Blockly.WidgetDiv.hideIfOwner(thisField);
    }

    var menu = new goog.ui.Menu();
    menu.setRightToLeft(this.sourceBlock_.RTL);
    var options = this.getOptions_();
    for (var x = 0; x < options.length; x++) {
        var text = options[x][0]; // Human-readable text.
        var value = options[x][1]; // Language-neutral value.
        var img = goog.dom.createDom('img');
        goog.dom.setProperties(img, {
            'src' : this.pathToMedia_ + value + this.type_,
            'alt' : text,
            'width' : this.width_,
            'height' : this.height_
        });
        var menuItem = new goog.ui.MenuItem(img);
        menuItem.setRightToLeft(this.sourceBlock_.RTL);
        menuItem.addClassName('dropdownImage');
        menuItem.setValue(value);
        menuItem.setCheckable(true);
        menu.addChild(menuItem, true);
        menuItem.setChecked(value == this.value_);
    }
    // Listen for mouse/keyboard events.
    goog.events.listen(menu, goog.ui.Component.EventType.ACTION, callback);
    // Listen for touch events (why doesn't Closure handle this already?).
    function callbackTouchStart(e) {
        var control = this.getOwnerControl(e.target);
        // Highlight the menu item.
        control.handleMouseDown(e);
    }
    function callbackTouchEnd(e) {
        var control = this.getOwnerControl(e.target);
        // Activate the menu item.
        control.performActionInternal(e);
    }
    menu.getHandler().listen(menu.getElement(), goog.events.EventType.TOUCHSTART, callbackTouchStart);
    menu.getHandler().listen(menu.getElement(), goog.events.EventType.TOUCHEND, callbackTouchEnd);

    // Record windowSize and scrollOffset before adding menu.
    var windowSize = goog.dom.getViewportSize();
    var scrollOffset = goog.style.getViewportPageOffset(document);
    var xy = goog.style.getPageOffset(this.imageElement_); //this.getAbsoluteXY_();
    var borderBBox = this.getScaledBBox_();
    var div = Blockly.WidgetDiv.DIV;
    menu.render(div);
    var menuDom = menu.getElement();
    Blockly.addClass_(menuDom, 'blocklyDropdownMenu');
    // Record menuSize after adding menu.
    var menuSize = goog.style.getSize(menuDom);
    // Recalculate height for the total content, not only box height.
    menuSize.height = menuDom.scrollHeight;

    // Position the menu.
    // Flip menu vertically if off the bottom.
    if (xy.y + menuSize.height + borderBBox.height >= windowSize.height + scrollOffset.y) {
        xy.y -= menuSize.height + 2;
    } else {
        xy.y += borderBBox.height;
    }
    if (this.sourceBlock_.RTL) {
        xy.x += borderBBox.width;
        xy.x += Blockly.FieldDropdownImage.CHECKMARK_OVERHANG;
        // Don't go offscreen left.
        if (xy.x < scrollOffset.x + menuSize.width) {
            xy.x = scrollOffset.x + menuSize.width;
        }
    } else {
        xy.x -= Blockly.FieldDropdownImage.CHECKMARK_OVERHANG;
        // Don't go offscreen right.
        if (xy.x > windowSize.width + scrollOffset.x - menuSize.width) {
            xy.x = windowSize.width + scrollOffset.x - menuSize.width;
        }
    }
    Blockly.WidgetDiv.position(xy.x - 3, xy.y, windowSize, scrollOffset, this.sourceBlock_.RTL);
    menu.setAllowAutoFocus(true);
    menuDom.focus();
};

/**
 * Factor out common words in statically defined options. Create prefix and/or
 * suffix labels.
 * 
 * @private
 */
Blockly.FieldDropdownImage.prototype.trimOptions_ = function() {
    this.prefixField = null;
    this.suffixField = null;
    var options = this.menuGenerator_;
    if (!goog.isArray(options) || options.length < 2) {
        return;
    }
    var strings = options.map(function(t) {
        return t[0];
    });
    var shortest = Blockly.shortestStringLength(strings);
    var prefixLength = Blockly.commonWordPrefix(strings, shortest);
    var suffixLength = Blockly.commonWordSuffix(strings, shortest);
    if (!prefixLength && !suffixLength) {
        return;
    }
    if (shortest <= prefixLength + suffixLength) {
        // One or more strings will entirely vanish if we proceed.  Abort.
        return;
    }
    if (prefixLength) {
        this.prefixField = strings[0].substring(0, prefixLength - 1);
    }
    if (suffixLength) {
        this.suffixField = strings[0].substr(1 - suffixLength);
    }
    // Remove the prefix and suffix from the options.
    var newOptions = [];
    for (var x = 0; x < options.length; x++) {
        var text = options[x][0];
        var value = options[x][1];
        text = text.substring(prefixLength, text.length - suffixLength);
        newOptions[x] = [ text, value ];
    }
    this.menuGenerator_ = newOptions;
};

/**
 * Return a list of the options for this dropdown.
 * 
 * @return {!Array.<!Array.<string>>} Array of option tuples: (human-readable
 *         text, language-neutral name).
 * @private
 */
Blockly.FieldDropdownImage.prototype.getOptions_ = function() {
    if (goog.isFunction(this.menuGenerator_)) {
        return this.menuGenerator_.call(this);
    }
    return (this.menuGenerator_);
};

/**
 * Get the language-neutral value from this dropdown menu.
 * 
 * @return {string} Current text.
 */
Blockly.FieldDropdownImage.prototype.getValue = function() {
    return this.value_;
};

/**
 * Handle a mouse up event on an editable field.
 * 
 * @param {!Event}
 *            e Mouse up event.
 * @private
 */
Blockly.FieldDropdownImage.prototype.onMouseUp_ = function(e) {
    if ((goog.userAgent.IPHONE || goog.userAgent.IPAD) && !goog.userAgent.isVersionOrHigher('537.51.2') && e.layerX !== 0 && e.layerY !== 0) {
        // Old iOS spawns a bogus event on the next touch after a 'prompt()' edit.
        // Unlike the real events, these have a layerX and layerY set.
        return;
    } else if (Blockly.isRightButton(e)) {
        // Right-click.
        return;
    } else if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
        // Drag operation is concluding.  Don't open the editor.
        return;
    } else if (this.sourceBlock_.isEditable()) {
        // Non-abstract sub-classes must define a showEditor_ method.
        this.showEditor_();
    }
};

/**
 * Set the language-neutral value for this dropdown menu.
 * 
 * @param {string}
 *            newValue New value to set.
 */
Blockly.FieldDropdownImage.prototype.setValue = function(newValue) {
    if (newValue === null || newValue === this.value_) {
        return; // No change if null.
    }
    this.value_ = newValue;
    this.src_ = this.pathToMedia_ + newValue + '.png';
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    if(this.anyChangesListener_) {
      this.anyChangesListener_(newValue);
    }
    if (this.imageElement_) {
        this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', goog.isString(this.src_) ? this.src_ : '');
    }
};

/**
 * Returns the height and width of the field, accounting for the workspace
 * scaling.
 * 
 * @return {!goog.math.Size} Height and width.
 * @private
 */
Blockly.FieldDropdownImage.prototype.getScaledBBox_ = function() {
    var bBox = this.imageElement_.getBBox();
    // Create new object, as getBBox can return an uneditable SVGRect in IE.
    return new goog.math.Size(bBox.width * this.sourceBlock_.workspace.scale, bBox.height * this.sourceBlock_.workspace.scale);
};

/**
 * Close the dropdown menu if this input is being deleted.
 */
Blockly.FieldDropdownImage.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldDropdownImage.superClass_.dispose.call(this);
};

/**
 * Images are fixed width, no need to render.
 * 
 * @private
 */
Blockly.FieldDropdownImage.prototype.render_ = function() {
    // NOP
};
