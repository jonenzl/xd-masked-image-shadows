/*
 * Masked Image Shadows
 * v0.0.1
 *
 * Duplicate the current selection and give it a drop shadow, move duplicated object behind initial selection
 *
 * Jonathan Ellis and Aaron Ooi
 */

let {Color, Shadow} = require("scenegraph");
let commands = require("commands");

function createDropShadow(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    console.log("Plugin command is running!");
    
    // Get the currently selected object/s
    let items = selection.items;

    //****************************************************************//
    //    Adds drop shadows to multiple selections (does not group)   //
    //****************************************************************//
    // For each selection - duplicate the initial object
    // Set initial object fill to white, add default drop shadow, and send backward
    items.forEach(function(element) {
        commands.duplicate();
        let clone = element;
        clone.fill = new Color({r:255, g:255, b:255, a:255});
        clone.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        selection.items = null;
    });
    
    //*****************************************************************************************//
    //    Add drop shadow to one selection and group (does not work for multiple selections)   //
    //*****************************************************************************************//
    // For each selection - duplicate the initial object
    // Set initial object fill to white, add default drop shadow, and send backward
    /*items.forEach(function(element) {
        let initial = element;
        commands.duplicate();
        let clone = selection.items[0];
        clone.fill = new Color({r:255, g:255, b:255, a:255});
        clone.stroke = null;
        clone.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        commands.sendBackward();
        selection.items = [initial, clone];
        commands.group();
        selection.items = null;
    });*/
}

module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};