/**
 * Event blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityInput');

goog.require('Blockly.Blocks');

// Generated from "http://docs.unity3d.com/ScriptReference/KeyCode.html"
var buttons = [
    ["A", "A"], // 'a' key.
    ["B", "B"], // 'b' key.
    ["C", "C"], // 'c' key.
    ["D", "D"], // 'd' key.
    ["E", "E"], // 'e' key.
    ["F", "F"], // 'f' key.
    ["G", "G"], // 'g' key.
    ["H", "H"], // 'h' key.
    ["I", "I"], // 'i' key.
    ["J", "J"], // 'j' key.
    ["K", "K"], // 'k' key.
    ["L", "L"], // 'l' key.
    ["M", "M"], // 'm' key.
    ["N", "N"], // 'n' key.
    ["O", "O"], // 'o' key.
    ["P", "P"], // 'p' key.
    ["Q", "Q"], // 'q' key.
    ["R", "R"], // 'r' key.
    ["S", "S"], // 's' key.
    ["T", "T"], // 't' key.
    ["U", "U"], // 'u' key.
    ["V", "V"], // 'v' key.
    ["W", "W"], // 'w' key.
    ["X", "X"], // 'x' key.
    ["Y", "Y"], // 'y' key.
    ["Z", "Z"], // 'z' key.
    ["Mouse0", "Mouse0"], // First (primary) mouse button.
    ["Mouse1", "Mouse1"], // Second (secondary) mouse button.
    ["Mouse2", "Mouse2"], // Third mouse button.
    ["UpArrow", "UpArrow"], // Up arrow key.
    ["DownArrow", "DownArrow"], // Down arrow key.
    ["RightArrow", "RightArrow"], // Right arrow key.
    ["LeftArrow", "LeftArrow"], // Left arrow key.
    ["Backspace", "Backspace"], // The backspace key.
    ["Space", "Space"], // Space key.
    ["Return", "Return"], // Return key.
    ["Tab", "Tab"], // The tab key.
    ["Escape", "Escape"], // Escape key.
    ["Keypad0", "Keypad0"], // Numeric keypad 0.
    ["Keypad1", "Keypad1"], // Numeric keypad 1.
    ["Keypad2", "Keypad2"], // Numeric keypad 2.
    ["Keypad3", "Keypad3"], // Numeric keypad 3.
    ["Keypad4", "Keypad4"], // Numeric keypad 4.
    ["Keypad5", "Keypad5"], // Numeric keypad 5.
    ["Keypad6", "Keypad6"], // Numeric keypad 6.
    ["Keypad7", "Keypad7"], // Numeric keypad 7.
    ["Keypad8", "Keypad8"], // Numeric keypad 8.
    ["Keypad9", "Keypad9"], // Numeric keypad 9.
    ["KeypadPeriod", "KeypadPeriod"], // Numeric keypad '.'.
    ["KeypadDivide", "KeypadDivide"], // Numeric keypad '/'.
    ["KeypadMultiply", "KeypadMultiply"], // Numeric keypad '*'.
    ["KeypadMinus", "KeypadMinus"], // Numeric keypad '-'.
    ["KeypadPlus", "KeypadPlus"], // Numeric keypad '+'.
    ["KeypadEnter", "KeypadEnter"], // Numeric keypad enter.
    ["KeypadEquals", "KeypadEquals"], // Numeric keypad '='.
    ["F1", "F1"], // F1 function key.
    ["F2", "F2"], // F2 function key.
    ["F3", "F3"], // F3 function key.
    ["F4", "F4"], // F4 function key.
    ["F5", "F5"], // F5 function key.
    ["F6", "F6"], // F6 function key.
    ["F7", "F7"], // F7 function key.
    ["F8", "F8"], // F8 function key.
    ["F9", "F9"], // F9 function key.
    ["F10", "F10"], // F10 function key.
    ["F11", "F11"], // F11 function key.
    ["F12", "F12"], // F12 function key.
    ["F13", "F13"], // F13 function key.
    ["F14", "F14"], // F14 function key.
    ["F15", "F15"], // F15 function key.
    ["Alpha0", "Alpha0"], // The '0' key on the top of the alphanumeric keyboard.
    ["Alpha1", "Alpha1"], // The '1' key on the top of the alphanumeric keyboard.
    ["Alpha2", "Alpha2"], // The '2' key on the top of the alphanumeric keyboard.
    ["Alpha3", "Alpha3"], // The '3' key on the top of the alphanumeric keyboard.
    ["Alpha4", "Alpha4"], // The '4' key on the top of the alphanumeric keyboard.
    ["Alpha5", "Alpha5"], // The '5' key on the top of the alphanumeric keyboard.
    ["Alpha6", "Alpha6"], // The '6' key on the top of the alphanumeric keyboard.
    ["Alpha7", "Alpha7"], // The '7' key on the top of the alphanumeric keyboard.
    ["Alpha8", "Alpha8"], // The '8' key on the top of the alphanumeric keyboard.
    ["Alpha9", "Alpha9"], // The '9' key on the top of the alphanumeric keyboard.
    ["Delete", "Delete"], // The forward delete key.
    ["Clear", "Clear"], // The Clear key.
    ["Pause", "Pause"], // Pause on PC machines.
    ["Insert", "Insert"], // Insert key key.
    ["Home", "Home"], // Home key.
    ["End", "End"], // End key.
    ["PageUp", "PageUp"], // Page up.
    ["PageDown", "PageDown"], // Page down.
    ["Exclaim", "Exclaim"], // Exclamation mark key '!'.
    ["DoubleQuote", "DoubleQuote"], // Double quote key '"'.
    ["Hash", "Hash"], // Hash key '#'.
    ["Dollar", "Dollar"], // Dollar sign key '$'.
    ["Ampersand", "Ampersand"], // Ampersand key '&'.
    ["Quote", "Quote"], // Quote key '.
    ["LeftParen", "LeftParen"], // Left Parenthesis key '('.
    ["RightParen", "RightParen"], // Right Parenthesis key ')'.
    ["Asterisk", "Asterisk"], // Asterisk key '*'.
    ["Plus", "Plus"], // Plus key '+'.
    ["Comma", "Comma"], // Comma ',' key.
    ["Minus", "Minus"], // Minus '-' key.
    ["Period", "Period"], // Period '.' key.
    ["Slash", "Slash"], // Slash '/' key.
    ["Colon", "Colon"], // Colon ':' key.
    ["Semicolon", "Semicolon"], // Semicolon ';' key.
    ["Less", "Less"], // Less than '<' key.
    ["Equals", "Equals"], // Equals '=' key.
    ["Greater", "Greater"], // Greater than '>' key.
    ["Question", "Question"], // Question mark '?' key.
    ["At", "At"], // At key '@'.
    ["LeftBracket", "LeftBracket"], // Left square bracket key '['.
    ["Backslash", "Backslash"], // Backslash key '\'.
    ["RightBracket", "RightBracket"], // Right square bracket key ']'.
    ["Caret", "Caret"], // Caret key '^'.
    ["Underscore", "Underscore"], // Underscore '_' key.
    ["BackQuote", "BackQuote"], // Back quote key '`'.
    ["Numlock", "Numlock"], // Numlock key.
    ["CapsLock", "CapsLock"], // Capslock key.
    ["ScrollLock", "ScrollLock"], // Scroll lock key.
    ["RightShift", "RightShift"], // Right shift key.
    ["LeftShift", "LeftShift"], // Left shift key.
    ["RightControl", "RightControl"], // Right Control key.
    ["LeftControl", "LeftControl"], // Left Control key.
    ["RightAlt", "RightAlt"], // Right Alt key.
    ["LeftAlt", "LeftAlt"], // Left Alt key.
    ["LeftCommand", "LeftCommand"], // Left Command key.
    ["LeftApple", "LeftApple"], // Left Command key.
    ["LeftWindows", "LeftWindows"], // Left Windows key.
    ["RightCommand", "RightCommand"], // Right Command key.
    ["RightApple", "RightApple"], // Right Command key.
    ["RightWindows", "RightWindows"], // Right Windows key.
    ["AltGr", "AltGr"], // Alt Gr key.
    ["Help", "Help"], // Help key.
    ["Print", "Print"], // Print key.
    ["SysReq", "SysReq"], // Sys Req key.
    ["Break", "Break"], // Break key.
    ["Menu", "Menu"] // Menu key.
];

Blockly.Blocks['unityInput_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("knop")
        .appendField(new Blockly.FieldDropdown(buttons), "KEY")
        .appendField(new Blockly.FieldDropdown([["net ingedrukt", "Down"], ["net losgelaten", "Up"], ["nog steeds ingedrukt", ""]]), "PRESSED");
    this.setOutput(true, "Boolean");
    this.setColour(Blockly.CAT_LOGIC_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};