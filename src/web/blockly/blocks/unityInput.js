/**
 * Event blocks for Unity
 */
'use strict';

goog.provide('Blockly.Blocks.unityInput');

goog.require('Blockly.Blocks');

// Generated from "http://docs.unity3d.com/ScriptReference/KeyCode.html"
var generateButtons = function() {
    return [
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
        [Blockly.Msg.UNITY_KEYCODE_Mouse0, "Mouse0"], // First (primary) mouse button.
        [Blockly.Msg.UNITY_KEYCODE_Mouse1, "Mouse1"], // Second (secondary) mouse button.
        [Blockly.Msg.UNITY_KEYCODE_Mouse2, "Mouse2"], // Third mouse button.
        [Blockly.Msg.UNITY_KEYCODE_UpArrow, "UpArrow"], // Up arrow key.
        [Blockly.Msg.UNITY_KEYCODE_DownArrow, "DownArrow"], // Down arrow key.
        [Blockly.Msg.UNITY_KEYCODE_RightArrow, "RightArrow"], // Right arrow key.
        [Blockly.Msg.UNITY_KEYCODE_LeftArrow, "LeftArrow"], // Left arrow key.
        [Blockly.Msg.UNITY_KEYCODE_Backspace, "Backspace"], // The backspace key.
        [Blockly.Msg.UNITY_KEYCODE_Space, "Space"], // Space key.
        [Blockly.Msg.UNITY_KEYCODE_Return, "Return"], // Return key.
        [Blockly.Msg.UNITY_KEYCODE_Tab, "Tab"], // The tab key.
        [Blockly.Msg.UNITY_KEYCODE_Escape, "Escape"], // Escape key.
        [Blockly.Msg.UNITY_KEYCODE_Alpha0, "Alpha0"], // The '0' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha1, "Alpha1"], // The '1' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha2, "Alpha2"], // The '2' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha3, "Alpha3"], // The '3' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha4, "Alpha4"], // The '4' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha5, "Alpha5"], // The '5' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha6, "Alpha6"], // The '6' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha7, "Alpha7"], // The '7' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha8, "Alpha8"], // The '8' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Alpha9, "Alpha9"], // The '9' key on the top of the alphanumeric keyboard.
        [Blockly.Msg.UNITY_KEYCODE_Keypad0, "Keypad0"], // Numeric keypad 0.
        [Blockly.Msg.UNITY_KEYCODE_Keypad1, "Keypad1"], // Numeric keypad 1.
        [Blockly.Msg.UNITY_KEYCODE_Keypad2, "Keypad2"], // Numeric keypad 2.
        [Blockly.Msg.UNITY_KEYCODE_Keypad3, "Keypad3"], // Numeric keypad 3.
        [Blockly.Msg.UNITY_KEYCODE_Keypad4, "Keypad4"], // Numeric keypad 4.
        [Blockly.Msg.UNITY_KEYCODE_Keypad5, "Keypad5"], // Numeric keypad 5.
        [Blockly.Msg.UNITY_KEYCODE_Keypad6, "Keypad6"], // Numeric keypad 6.
        [Blockly.Msg.UNITY_KEYCODE_Keypad7, "Keypad7"], // Numeric keypad 7.
        [Blockly.Msg.UNITY_KEYCODE_Keypad8, "Keypad8"], // Numeric keypad 8.
        [Blockly.Msg.UNITY_KEYCODE_Keypad9, "Keypad9"], // Numeric keypad 9.
        [Blockly.Msg.UNITY_KEYCODE_KeypadPeriod, "KeypadPeriod"], // Numeric keypad '.'.
        [Blockly.Msg.UNITY_KEYCODE_KeypadDivide, "KeypadDivide"], // Numeric keypad '/'.
        [Blockly.Msg.UNITY_KEYCODE_KeypadMultiply, "KeypadMultiply"], // Numeric keypad '*'.
        [Blockly.Msg.UNITY_KEYCODE_KeypadMinus, "KeypadMinus"], // Numeric keypad '-'.
        [Blockly.Msg.UNITY_KEYCODE_KeypadPlus, "KeypadPlus"], // Numeric keypad '+'.
        [Blockly.Msg.UNITY_KEYCODE_KeypadEnter, "KeypadEnter"], // Numeric keypad enter.
        [Blockly.Msg.UNITY_KEYCODE_KeypadEquals, "KeypadEquals"], // Numeric keypad '='.
        [Blockly.Msg.UNITY_KEYCODE_F1, "F1"], // F1 function key.
        [Blockly.Msg.UNITY_KEYCODE_F2, "F2"], // F2 function key.
        [Blockly.Msg.UNITY_KEYCODE_F3, "F3"], // F3 function key.
        [Blockly.Msg.UNITY_KEYCODE_F4, "F4"], // F4 function key.
        [Blockly.Msg.UNITY_KEYCODE_F5, "F5"], // F5 function key.
        [Blockly.Msg.UNITY_KEYCODE_F6, "F6"], // F6 function key.
        [Blockly.Msg.UNITY_KEYCODE_F7, "F7"], // F7 function key.
        [Blockly.Msg.UNITY_KEYCODE_F8, "F8"], // F8 function key.
        [Blockly.Msg.UNITY_KEYCODE_F9, "F9"], // F9 function key.
        [Blockly.Msg.UNITY_KEYCODE_F10, "F10"], // F10 function key.
        [Blockly.Msg.UNITY_KEYCODE_F11, "F11"], // F11 function key.
        [Blockly.Msg.UNITY_KEYCODE_F12, "F12"], // F12 function key.
        [Blockly.Msg.UNITY_KEYCODE_F13, "F13"], // F13 function key.
        [Blockly.Msg.UNITY_KEYCODE_F14, "F14"], // F14 function key.
        [Blockly.Msg.UNITY_KEYCODE_F15, "F15"], // F15 function key.
        [Blockly.Msg.UNITY_KEYCODE_Delete, "Delete"], // The forward delete key.
        [Blockly.Msg.UNITY_KEYCODE_Clear, "Clear"], // The Clear key.
        [Blockly.Msg.UNITY_KEYCODE_Pause, "Pause"], // Pause on PC machines.
        [Blockly.Msg.UNITY_KEYCODE_Insert, "Insert"], // Insert key key.
        [Blockly.Msg.UNITY_KEYCODE_Home, "Home"], // Home key.
        [Blockly.Msg.UNITY_KEYCODE_End, "End"], // End key.
        [Blockly.Msg.UNITY_KEYCODE_PageUp, "PageUp"], // Page up.
        [Blockly.Msg.UNITY_KEYCODE_PageDown, "PageDown"], // Page down.
        [Blockly.Msg.UNITY_KEYCODE_Exclaim, "Exclaim"], // Exclamation mark key '!'.
        [Blockly.Msg.UNITY_KEYCODE_DoubleQuote, "DoubleQuote"], // Double quote key '"'.
        [Blockly.Msg.UNITY_KEYCODE_Hash, "Hash"], // Hash key '#'.
        [Blockly.Msg.UNITY_KEYCODE_Dollar, "Dollar"], // Dollar sign key '$'.
        [Blockly.Msg.UNITY_KEYCODE_Ampersand, "Ampersand"], // Ampersand key '&'.
        [Blockly.Msg.UNITY_KEYCODE_Quote, "Quote"], // Quote key '.
        [Blockly.Msg.UNITY_KEYCODE_LeftParen, "LeftParen"], // Left Parenthesis key '('.
        [Blockly.Msg.UNITY_KEYCODE_RightParen, "RightParen"], // Right Parenthesis key ')'.
        [Blockly.Msg.UNITY_KEYCODE_Asterisk, "Asterisk"], // Asterisk key '*'.
        [Blockly.Msg.UNITY_KEYCODE_Plus, "Plus"], // Plus key '+'.
        [Blockly.Msg.UNITY_KEYCODE_Comma, "Comma"], // Comma ',' key.
        [Blockly.Msg.UNITY_KEYCODE_Minus, "Minus"], // Minus '-' key.
        [Blockly.Msg.UNITY_KEYCODE_Period, "Period"], // Period '.' key.
        [Blockly.Msg.UNITY_KEYCODE_Slash, "Slash"], // Slash '/' key.
        [Blockly.Msg.UNITY_KEYCODE_Colon, "Colon"], // Colon ':' key.
        [Blockly.Msg.UNITY_KEYCODE_Semicolon, "Semicolon"], // Semicolon ';' key.
        [Blockly.Msg.UNITY_KEYCODE_Less, "Less"], // Less than '<' key.
        [Blockly.Msg.UNITY_KEYCODE_Equals, "Equals"], // Equals '=' key.
        [Blockly.Msg.UNITY_KEYCODE_Greater, "Greater"], // Greater than '>' key.
        [Blockly.Msg.UNITY_KEYCODE_Question, "Question"], // Question mark '?' key.
        [Blockly.Msg.UNITY_KEYCODE_At, "At"], // At key '@'.
        [Blockly.Msg.UNITY_KEYCODE_LeftBracket, "LeftBracket"], // Left square bracket key '['.
        [Blockly.Msg.UNITY_KEYCODE_Backslash, "Backslash"], // Backslash key '\'.
        [Blockly.Msg.UNITY_KEYCODE_RightBracket, "RightBracket"], // Right square bracket key ']'.
        [Blockly.Msg.UNITY_KEYCODE_Caret, "Caret"], // Caret key '^'.
        [Blockly.Msg.UNITY_KEYCODE_Underscore, "Underscore"], // Underscore '_' key.
        [Blockly.Msg.UNITY_KEYCODE_BackQuote, "BackQuote"], // Back quote key '`'.
        [Blockly.Msg.UNITY_KEYCODE_Numlock, "Numlock"], // Numlock key.
        [Blockly.Msg.UNITY_KEYCODE_CapsLock, "CapsLock"], // Capslock key.
        [Blockly.Msg.UNITY_KEYCODE_ScrollLock, "ScrollLock"], // Scroll lock key.
        [Blockly.Msg.UNITY_KEYCODE_RightShift, "RightShift"], // Right shift key.
        [Blockly.Msg.UNITY_KEYCODE_LeftShift, "LeftShift"], // Left shift key.
        [Blockly.Msg.UNITY_KEYCODE_RightControl, "RightControl"], // Right Control key.
        [Blockly.Msg.UNITY_KEYCODE_LeftControl, "LeftControl"], // Left Control key.
        [Blockly.Msg.UNITY_KEYCODE_RightAlt, "RightAlt"], // Right Alt key.
        [Blockly.Msg.UNITY_KEYCODE_LeftAlt, "LeftAlt"], // Left Alt key.
        [Blockly.Msg.UNITY_KEYCODE_LeftCommand, "LeftCommand"], // Left Command key.
        [Blockly.Msg.UNITY_KEYCODE_LeftApple, "LeftApple"], // Left Command key.
        [Blockly.Msg.UNITY_KEYCODE_LeftWindows, "LeftWindows"], // Left Windows key.
        [Blockly.Msg.UNITY_KEYCODE_RightCommand, "RightCommand"], // Right Command key.
        [Blockly.Msg.UNITY_KEYCODE_RightApple, "RightApple"], // Right Command key.
        [Blockly.Msg.UNITY_KEYCODE_RightWindows, "RightWindows"], // Right Windows key.
        [Blockly.Msg.UNITY_KEYCODE_AltGr, "AltGr"], // Alt Gr key.
        [Blockly.Msg.UNITY_KEYCODE_Help, "Help"], // Help key.
        [Blockly.Msg.UNITY_KEYCODE_Print, "Print"], // Print key.
        [Blockly.Msg.UNITY_KEYCODE_SysReq, "SysReq"], // Sys Req key.
        [Blockly.Msg.UNITY_KEYCODE_Break, "Break"], // Break key.
        [Blockly.Msg.UNITY_KEYCODE_Menu, "Menu"] // Menu key.
    ];
};

Blockly.Blocks['unityInput_key'] = {
  init: function() {
    var buttons = generateButtons();
    
    this.appendDummyInput()
        .appendField(Blockly.Msg.UNITY_INPUT_GETKEY_TITLE_1)
        .appendField(new Blockly.FieldDropdown(buttons), "KEY")
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.UNITY_INPUT_GETKEY_OPT_DOWN, "Down"], 
          [Blockly.Msg.UNITY_INPUT_GETKEY_OPT_UP, "Up"], 
          [Blockly.Msg.UNITY_INPUT_GETKEY_OPT_STAY, ""]
        ]), "PRESSED")
        .appendField(Blockly.Msg.UNITY_INPUT_GETKEY_TITLE_2);
    this.setOutput(true, "Boolean");
    this.setColour(Blockly.CAT_DETECT_RGB);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};