/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview note input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldNote');

goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');

/**
 * Class for an editable note field.
 *
 * @param {string}
 *            text The initial content of the field.
 * @param {Function=}
 *            opt_validator An optional function that is called to validate any
 *            constraints on what the user entered. Takes the new text as an
 *            argument and returns the accepted text or null to abort the
 *            change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldNote = function(noteFrequence, opt_validator) {
    Blockly.FieldNote.superClass_.constructor.call(this, noteFrequence, opt_validator);
};
goog.inherits(Blockly.FieldNote, Blockly.FieldTextInput);

Blockly.FieldNote.WIDTH = 15;
Blockly.FieldNote.HEIGHT = 60;

Blockly.FieldNote.NOTENAMES = {
    "987.767": "h’’",
    "932.328": "ais’’/b’’",
    "880": "a’’",
    "830.609": "gis’’/as’’",
    "783.991": "g’’ ",
    "739.989": "fis’’/ges’’",
    "698.456": "f’’",
    "659.255": "e’’",
    "622.254": "dis’’/es’’",
    "587.33": "d’’ ",
    "554.365": "cis’’/des’’",
    "523.251": "c’’ ",
    "493.883": "h’",
    "466.164": "ais’/b’ ",
    "440": "a’ ",
    "415.305": "gis’/as’",
    "391.995": "g’",
    "369.994": "fis’/ges’",
    "349.228": "f’",
    "329.628": "e’",
    "311.127": "dis’/es’",
    "293.665": "d’",
    "277.183": "cis’/des’",
    "261.626": "c’ ",
    "246.942": "h",
    "233.082": "ais/b",
    "220": "a",
    "207.652": "gis/as",
    "195.998": "g",
    "184.997": "fis/ges",
    "174.614": "f",
    "164.814": "e",
    "155.563": "dis/es",
    "146.832": "d",
    "138.591": "cis/des",
    "130.813": "c"
};

/**
 * Clean up this FieldNote, as well as the inherited FieldTextInput.
 *
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldNote.prototype.dispose_ = function() {
    var thisField = this;
    return function() {
        Blockly.FieldNote.superClass_.dispose_.call(thisField)();
        if (thisField.clickWrapper_) {
            Blockly.unbindEvent_(thisField.clickWrapper_);
        }
        if (thisField.clickWrapper1_) {
            Blockly.unbindEvent_(thisField.clickWrapper1_);
        }
    };
};

/**
 * Show the inline free-text editor on top of the text and disable it.
 *
 * @private
 */
Blockly.FieldNote.prototype.showEditor_ = function() {
    var noFocus = goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    Blockly.FieldNote.superClass_.showEditor_.call(this, noFocus);
    Blockly.FieldTextInput.htmlInput_.setAttribute('disabled', 'true');
    var div = Blockly.WidgetDiv.DIV;
    if (!div.firstChild) {
        // Mobile interface uses window.prompt.
        return;
    }
    // Build the SVG DOM.
    var svg = Blockly.createSvgElement('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:html': 'http://www.w3.org/1999/xhtml',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'version': '1.1',
        'height': Blockly.FieldNote.HEIGHT + 'px',
        'width': (Blockly.FieldNote.WIDTH * 22) + 'px'
    }, div);
    // list for C-dur
    var black = [1, 3, 6, 8, 10];
    // Draw white notes first.  
    var i = 0;
    for (var j = 28; j < 64; j++) {
        var mod = (j - 4) % 12;
        if (black.indexOf(mod) == -1) {
            var frequence = Math.round(440000.0 * Math.pow(2.0, (j - 49.0) / 12.0)) / 1000.0;
            var color = frequence != this.getValue() ? '#ffffff' : Blockly.CAT_ACTION_RGB;
            var note = Blockly.createSvgElement('rect', {
                'x': i * Blockly.FieldNote.WIDTH,
                'y': 0,
                'width': Blockly.FieldNote.WIDTH,
                'height': Blockly.FieldNote.HEIGHT,
                'fill': color,
                'stroke': "#000000",
                'id': 'white' + frequence
            }, svg);
            Blockly.bindEvent_(note, 'mouseover', this, this.onMouseHover);
            Blockly.bindEvent_(note, 'touchstart', this, this.onTouch);
            Blockly.bindEvent_(note, 'touchmove', this, this.onTouch);
            i++;
            if (frequence == this.getValue()) {
                this.selected_ = note;
            }
        }
    }
    // Draw black notes on top.
    i = 0;
    for (var j = 28; j < 64; j++) {
        var mod = (j - 4) % 12;
        if (black.indexOf(mod) >= 0) {
            var frequence = Math.round(440000.0 * Math.pow(2.0, (j - 49.0) / 12.0)) / 1000.0;
            var color = frequence != this.getValue() ? '#000000' : Blockly.CAT_ACTION_RGB;
            var note = Blockly.createSvgElement('rect', {
                'x': i * Blockly.FieldNote.WIDTH - 5,
                'y': 0,
                'width': Blockly.FieldNote.WIDTH - 5,
                'height': Blockly.FieldNote.HEIGHT - 20,
                'fill': color,
                'id': 'black' + frequence
            }, svg);
            Blockly.bindEvent_(note, 'mouseover', this, this.onMouseHover);
            Blockly.bindEvent_(note, 'touchstart', this, this.onTouch);
            Blockly.bindEvent_(note, 'touchmove', this, this.onTouch);
            if (frequence == this.getValue()) {
                this.selected_ = note;
            }
        } else {
            i++;
        }
    }
    this.clickWrapper_ = Blockly.bindEvent_(svg, 'click', this, Blockly.WidgetDiv.hide);
    this.clickWrapper1_ = Blockly.bindEvent_(svg, 'touchend', this, Blockly.WidgetDiv.hide);
};

Blockly.FieldNote.prototype.onMouseHover = function(e) {
    if (this.selected_) {
        if (this.selected_.id.indexOf('white') != -1) {
            this.selected_.setAttribute('fill', '#ffffff');
        } else {
            this.selected_.setAttribute('fill', '#000000');
        }
    }
    e.target.setAttribute('fill', Blockly.CAT_ACTION_RGB);
    var noteFrequence = e.target.id.replace(/white|black/, '');
    this.selected_ = e.target;
    this.setValue(noteFrequence);
    this.resizeEditor_();
};

Blockly.FieldNote.prototype.widgetDispose_ = function() {
    var thisField = this;
    return function() {
        var htmlInput = Blockly.FieldTextInput.htmlInput_;
        thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
        Blockly.unbindEvent_(htmlInput.onKeyDownWrapper_);
        Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
        Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
        thisField.workspace_.removeChangeListener(htmlInput.onWorkspaceChangeWrapper_);
        Blockly.FieldTextInput.htmlInput_ = null;
        // Delete style properties.
        var style = Blockly.WidgetDiv.DIV.style;
        style.width = 'auto';
        style.height = 'auto';
        style.fontSize = '';
    };
};

/**
 * Get the language-neutral value from this dropdown menu.
 *
 * @return {string} Current text.
 */
Blockly.FieldNote.prototype.getValue = function() {
    return this.value_;
};

/**
 * Set the language-neutral value for this dropdown menu.
 *
 * @param {string}
 *            newValue New value to set.
 */
Blockly.FieldNote.prototype.setValue = function(newValue) {
    if (newValue === null) {
        // No change if null.
        return;
    }
    var oldValue = this.getValue();
    if (oldValue == newValue) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, oldValue, newValue));
    }
    this.value_ = newValue;
    if (Blockly.FieldNote.NOTENAMES[newValue]) {
        this.setText(Blockly.FieldNote.NOTENAMES[newValue]);
    } else {
        this.setText(newValue);
    }

    if (Blockly.FieldTextInput.htmlInput_)
        Blockly.FieldTextInput.htmlInput_.value = Blockly.FieldNote.NOTENAMES[newValue];

};

Blockly.FieldNote.prototype.onTouch = function(e) {
    e.preventDefault();
    
    if (e.touches.length > 1 || (e.type == "touchend" && e.touches.length > 0))
        return;
    var touch = e.touches[0];
    var element = document.elementFromPoint(touch.clientX, touch.clientY);
    var event = document.createEvent("SVGEvents");
    event.initEvent("mouseover", true, true);
    element.dispatchEvent(event);
}