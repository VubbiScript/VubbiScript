/**
 * @fileoverview A C# code input field
 * 
 * @author jeroen.penninck@gmail.com (Jeroen Penninck)
 */
'use strict';

goog.provide('Blockly.FieldCodeInput');

goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Class for an editable C# code text field.
 * @param {string} code The initial code inside the field.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldCodeInput = function(code) {
  Blockly.FieldCodeInput.superClass_.constructor.call(this, code,
      null);
  this.size_ = new goog.math.Size(0, 10/* just set it to some temporary height > ADDITIONALSIZE */);
  
  this.aceeditor_ = null;
};
goog.inherits(Blockly.FieldCodeInput, Blockly.Field);

/**
 * Point size of text.  Should match blocklyText's font-size in CSS.
 */
Blockly.FieldCodeInput.FONTSIZE = 11;

/**
 * Minimal width of the editor
 */
Blockly.FieldCodeInput.MINWIDTH = 180;

/**
 * Some magic constant to make it align correctly :)
 */
Blockly.FieldCodeInput.ADDITIONALSIZE = 4;

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldCodeInput.prototype.CURSOR = 'text';

/**
 * Install this text on a block.
 */
Blockly.FieldCodeInput.prototype.init = function() {
  if (this.fieldGroup_) {
    // Text has already been initialized once.
    return;
  }
  // Build the DOM.
  // Build the DOM.
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  this.borderRect_ = Blockly.createSvgElement('rect',
      {'rx': 2,
       'ry': 2,
       'x': -Blockly.BlockSvg.SEP_SPACE_X / 2,
       'y': 0,
       'height': this.size_.height-Blockly.FieldCodeInput.ADDITIONALSIZE}, this.fieldGroup_, this.sourceBlock_.workspace);
  this.borderRect_.tooltip = this.sourceBlock_;
  this.textElement_ = Blockly.createSvgElement('text',
      {'class': 'blocklyCode', 'y': 12.5}, null);
  this.fieldGroup_.appendChild(this.textElement_);
  
  this.updateEditable();
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  this.mouseUpWrapper_ =
      Blockly.bindEvent_(this.fieldGroup_, 'mouseup', this, this.onMouseUp_);
  
  // Configure the field to be transparent with respect to tooltips.
  Blockly.Tooltip.bindMouseEvents(this.fieldGroup_);
  // Force a render.
  this.updateTextNode_();
  if (Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
        this.sourceBlock_, 'field', this.name, '', this.getValue()));
  }
};
/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldCodeInput.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  // Dispose the text element
  if (this.mouseUpWrapper_) {
    Blockly.unbindEvent_(this.mouseUpWrapper_);
    this.mouseUpWrapper_ = null;
  }
  this.sourceBlock_ = null;
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
};

/**
 * Draws the border with the correct width.
 * Saves the computed width in a property.
 * @private
 */
Blockly.FieldCodeInput.prototype.render_ = function() {
  if (this.visible_ && this.textElement_) {
    var lineheight = 14*1.2;// 14 px * 1.2em
    var height = lineheight*this.lastLineCount_+8;
    
    var key = this.textElement_.textContent + '\n' +
        this.textElement_.className.baseVal;
    if (Blockly.Field.cacheWidths_ && Blockly.Field.cacheWidths_[key]) {
      var width = Blockly.Field.cacheWidths_[key];
    } else {
      try {
        var width = this.longestLineTextElem_.getComputedTextLength();
      } catch (e) {
        // MSIE 11 is known to throw "Unexpected call to method or property
        // access." if Blockly is hidden.
        var width = this.longestLineTextElem_.textContent.length * 8;
      }
      if(width<Blockly.FieldCodeInput.MINWIDTH) {
        width = Blockly.FieldCodeInput.MINWIDTH;
      }
      if (Blockly.Field.cacheWidths_) {
        Blockly.Field.cacheWidths_[key] = width;
      }
    }
    
    if (this.borderRect_) {
      this.borderRect_.setAttribute('width',
          width + Blockly.BlockSvg.SEP_SPACE_X);
    }
    if (this.borderRect_) {
      this.borderRect_.setAttribute('height',
          height - Blockly.FieldCodeInput.ADDITIONALSIZE);
    }
  } else {
    var width = 0;
  }
  this.size_.width = width;
  this.size_.height = height + Blockly.FieldCodeInput.ADDITIONALSIZE;
};

/**
 * Set the text in this field.
 * @param {?string} text New text.
 * @override
 */
Blockly.FieldCodeInput.prototype.setValue = function(text) {
  if (text === null) {
    return;  // No change if null.
  }
  if (this.sourceBlock_ && this.validator_) {
    var validated = this.validator_(text);
    // If the new text is invalid, validation returns null.
    // In this case we still want to display the illegal result.
    if (validated !== null && validated !== undefined) {
      text = validated;
    }
  }
  Blockly.Field.prototype.setValue.call(this, text);
};

/**
 * Show the inline free-text editor on top of the text.
 * @private
 */
Blockly.FieldCodeInput.prototype.showEditor_ = function() {
  this.workspace_ = this.sourceBlock_.workspace;
  var quietInput = opt_quietInput || false;

  // Hide the svg text
  this.textElement_.style.visibility = "hidden";
  
  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
  var div = Blockly.WidgetDiv.DIV;
  // Create the input.
  var htmlEditorDomRoot = goog.dom.createDom('div', 'code-field-editor');
  
  // Blockly FONTSIZE does not work... It seems we need that value (pt) to be converted to px and round down !?
  var fontSize =
      (/*Blockly.FieldCodeInput.FONTSIZE*/14 * this.workspace_.scale) + 'px';
  
  // Font-size
  htmlEditorDomRoot.style.fontSize = fontSize;
  
  /** @type {!HTMLInputElement} */
  Blockly.FieldCodeInput.htmlEditorDomRoot_ = htmlEditorDomRoot;
  div.appendChild(htmlEditorDomRoot);
  
  // Set the value in the div
  htmlEditorDomRoot.textContent = this.text_;
  
  // TODO: pressing "Escape" is not implemented yet and currently keeps the focus on the editor (same for tab and enter)
  htmlEditorDomRoot.initialValue = this.text_;// <- in case you press escape
  
  htmlEditorDomRoot.oldValue = this.text_;// <- for detecting changes to the content
  
  // Initialize ACE
  this.aceeditor_ = ace.edit(htmlEditorDomRoot);
  this.aceeditor_.setTheme("ace/theme/xcode");
  this.aceeditor_.getSession().setMode("ace/mode/csharp");
  this.aceeditor_.setShowPrintMargin(false);
  this.aceeditor_.renderer.setShowGutter(false);
  this.aceeditor_.setHighlightActiveLine(false);
  this.aceeditor_.focus();
  
  this.validate_();
  this.resizeEditor_();

  htmlEditorDomRoot.onAceChangeWrapper_ = goog.bind(this.onEditorContentChange_, this);
  this.aceeditor_.on("change", htmlEditorDomRoot.onAceChangeWrapper_);
  htmlEditorDomRoot.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
  this.workspace_.addChangeListener(htmlEditorDomRoot.onWorkspaceChangeWrapper_);
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldCodeInput.prototype.onEditorContentChange_ = function(e) {
  var htmlInput = Blockly.FieldCodeInput.htmlEditorDomRoot_;
  // Update source block.
  var text = this.aceeditor_.getValue();
  if (text !== htmlInput.oldValue) {
    htmlInput.oldValue = text;
    this.setValue(text);
    this.validate_();
  } else if (goog.userAgent.WEBKIT) {
    // Cursor key.  Render the source block to show the caret moving.
    // Chrome only (version 26, OS X).
    this.sourceBlock_.render();
  }
  this.resizeEditor_();
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldCodeInput.prototype.validate_ = function() {
  // TODO: to implement... Need to detect valid C# code...
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldCodeInput.prototype.resizeEditor_ = function() {
  // Shift the editor a bit (ace positions the text a bit different)
  // TODO: this does not WORK correctly with workspace scaling 
  // => ACE defines some things in pixels => which we cannot scale from here!
  var shiftx = 1 * this.workspace_.scale;
  var shifty = 3 * this.workspace_.scale;
  var editoradditionalheight = 18 * this.workspace_.scale;// Make the editor a line too big...
  
  var div = Blockly.WidgetDiv.DIV;
  var bBox = this.fieldGroup_.getBBox();
  div.style.width = bBox.width * this.workspace_.scale - shiftx + 'px';
  div.style.height = bBox.height * this.workspace_.scale + editoradditionalheight + 'px';
  var xy = this.getAbsoluteXY_();
  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (this.sourceBlock_.RTL) {
    var borderBBox = this.getScaledBBox_();
    xy.x += borderBBox.width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
    // Firefox mis-reports the location of the border by a pixel
    // once the WidgetDiv is moved into position.
    xy.x -= 1;
    xy.y -= 1;
  }
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  
  // add our own shift
  xy.x+=shiftx;
  xy.y+=shifty;
  
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
  
  this.aceeditor_.resize();
};

/**
 * Close the editor, save the results, and dispose of the editable
 * text field's elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldCodeInput.prototype.widgetDispose_ = function() {
  var thisField = this;
  return function() {
    var htmlEditorDomRoot = Blockly.FieldCodeInput.htmlEditorDomRoot_;
    // Save the edit
    var text = thisField.aceeditor_.getValue();
    thisField.setValue(text);
    thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
    thisField.workspace_.removeChangeListener(
        htmlEditorDomRoot.onWorkspaceChangeWrapper_);
    Blockly.FieldCodeInput.htmlEditorDomRoot_ = null;
    thisField.aceeditor_.destroy();
    thisField.aceeditor_ = null;
    // Delete style properties.
    var style = Blockly.WidgetDiv.DIV.style;
    style.width = 'auto';
    style.height = 'auto';
    style.fontSize = '';
    
    // Show the svg text again
    thisField.textElement_.style.visibility = "visible";
  };
  
};
  
/**
 * Update the text node of this field to display the current text.
 * @private
 */
Blockly.FieldCodeInput.prototype.updateTextNode_ = function() {
  if (!this.textElement_) {
    // Not rendered yet.
    return;
  }
  var lines = this.text_.split(/[\n\r]/);
  
  // Empty the text element.
  goog.dom.removeChildren(/** @type {!Element} */ (this.textElement_));
  
  var longestline = 0;
  for(var i=0;i<1 || i<lines.length; i++) {
    var text = "";
    if(i<lines.length) {
      text = lines[i];
    }
    if (text.length > this.maxDisplayLength) {
      // Truncate displayed string and add an ellipsis ('...').
      text = text.substring(0, this.maxDisplayLength - 2) + '\u2026';
    }
    // Replace whitespace with non-breaking spaces so the text doesn't collapse.
    text = text.replace(/\s/g, Blockly.Field.NBSP);
    if (this.sourceBlock_.RTL && text) {
      // The SVG is LTR, force text to be RTL.
      text += '\u200F';
    }
    if (!text) {
      // Prevent the field from disappearing if empty.
      text = Blockly.Field.NBSP;
    }
    
    var textNode = document.createTextNode(text);
    var tspanNode = Blockly.createSvgElement("tspan", {'x':0, 'dy':(i==0?'0px':'1.2em')}, null);
    // Make tooltip = tooltip from parent block
    tspanNode.tooltip = this.sourceBlock_;
    if(text.length>longestline) {
      longestline = text.length;
      this.longestLineTextElem_ = textNode;
    }
    tspanNode.appendChild(textNode);
    this.textElement_.appendChild(tspanNode);
  }
  this.lastLineCount_ = lines.length>0?lines.length:1;

  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;
};