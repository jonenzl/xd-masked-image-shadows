/*
* Masked Image Shadows
* v0.0.2
*
* Add a drop shadow to selected Mask Groups.
* The plugin will create a shape layer below the mask group with a shadow applied.
* The name of the new shadow layer will be the that of the original mask group with "-shadow" appended.
*
* Jonathan Ellis and Aaron Ooi
*
* Distributed under the MIT license. See LICENSE file for details.
*/

let {Color, Shadow, scenegraph} = require("scenegraph");
let commands = require("commands");
const { alert, error } = require("./lib/dialogs.js");

/*
* Get all selected Mask Groups
* For each Mask Group:
* Duplicate original image and mask shape
* Delete the original image
* Set duplicated mask shape fill to white, add default drop shadow, and send backward
*/
function createDropShadow(selection) {
    // Access selected Mask Group/s, record user's initial selection
    let initialSelection = selection.items.map(i => i)
    let node = selection.items;
    console.log(node);
    
    // If there is no current selection, send an alert modal
    if (!selection.hasArtwork) {
        alert("Incorrect selection", "In order to function correctly, this plugin works when only Mask Groups have been selected. If the Mask Group is within a symbol or grouped with other objects, make sure to select the Mask Group separately.");
        return;
    }
    
    for (let i = 0; i < node.length; i++) {
        // Select each Mask Group node
        selection.items = node[i];
        let current = selection.items[0];
        
        // Duplicate and ungroup Mask Group
        commands.duplicate();
        commands.ungroup();
        
        // Delete the duplicated image
        let unusedImage = selection.items[0]
        console.log(unusedImage);
        unusedImage.removeFromParent();
        
        // Edit the duplicated mask shape -- rename new shadow layer, white fill, no stroke, add default drop shadow
        let shadowBox = selection.items[1]
        shadowBox.name = `${node[i].name}-shadow`;
        shadowBox.fill = new Color({r:255, g:255, b:255, a:255});
        shadowBox.stroke = null;
        shadowBox.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        
        // Send the shadow behind the original Mask Group
        commands.sendBackward();
    }
    
    // Reset selection in the document to the user's initial selection before plugin execution
    selection.items = initialSelection;
}

module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};
