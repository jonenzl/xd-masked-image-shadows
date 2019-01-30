/*
 * Masked Image Shadows
 * v0.0.1
 *
 * Duplicate the current selection and give it a drop shadow, move duplicated object behind initial selection
 *
 * Jonathan Ellis and Aaron Ooi
 */

var {Rectangle, Color, Shadow} = require("scenegraph");
var commands = require("commands");

function createDropShadow(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    console.log("Plugin command is running!");
    
    // Get the currently selected object/s
    var items = selection.items;
    var targetNode = items;
    selection.items = targetNode;
    
    // For each selection - duplicate the object with white fill, no stroke, default drop shadow, and send backward
    for (var i = 0; i < items.length; i++) {
        commands.duplicate();
        var clone = selection.items[i];
        clone.fill = new Color({r:255, g:255, b:255, a:255});
        clone.stroke = null;
        clone.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        commands.sendBackward();
    }
}

module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};