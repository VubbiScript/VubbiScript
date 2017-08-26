'use strict';

goog.provide('Blockly.PhysicsToggle');

Blockly.PhysicsToggle.makeToggleField = function(opt_onchange) {
  return new Blockly.FieldDropdownImage([
                ['2D', "2D"],
                ['3D', "3D"]
            ], "/toggle_", 16, 16, "png", true, false, opt_onchange);
};