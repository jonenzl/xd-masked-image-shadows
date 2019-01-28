/*
 * Masked Image Shadows
 * v0.0.1
 *
 * Jonathan Ellis and Aaron Ooi
 */

var {Rectangle, Color} = require("scenegraph");

function myCommand(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    console.log("Plugin command is running!");

    // Insert a white square at (0, 0) in the current artboard or group/container
    var shape = new Rectangle();
    shape.width = 100;
    shape.height = 100;
    shape.fill = new Color({r:255, g:0, b:0, a:255});
    /*shape.fill = new Color("#FFFFFF");*/
    
    // Add a drop shadow to the rectangle -- currently not working, trying to figure out their API
    /*shape.shadowOffsetX = 0;
    shape.shadowOffsetY = 10;
    shape.shadowBlur = 20;
    shape.shadowColor = new Color({r:0, g:0, b:0, a:40});*/
    
    selection.insertionParent.addChild(shape);
}

module.exports = {
    commands: {
        myCommand: myCommand
    }
};