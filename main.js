/*
* Masked Image Shadows
* v0.0.2
*
* Add a drop shadow to the selected Mask Group.
*
* Jonathan Ellis and Aaron Ooi
*
* Distributed under the MIT license. See LICENSE file for details.
*
*/

let {Color, Shadow, scenegraph} = require("scenegraph");
let commands = require("commands");

/*
* Get all selected Mask Groups
* For each Mask Group:
* Duplicate original image and mask shape
* Delete the original image
* Set duplicated mask shape fill to white, add default drop shadow, and send backward
*/
function createDropShadow(selection) {
    // Access selected Mask Group/s
    let node = selection.items;
    
    for (let i = 0; i < node.length; i++) {
        // Select each Mask Group node
        selection.items = node[i];
        let current = selection.items[0];
        
        // Duplicate and ungroup Mask Group
        commands.duplicate();
        commands.ungroup();
        
        // Delete the duplicated image
        let unusedImage = selection.items[0]
        unusedImage.removeFromParent();
        
        // Edit the duplicated mask shape -- rename "shadow", white fill, no stroke, add default drop shadow
        let shadowBox = selection.items[1]
        shadowBox.name = "Shadow";
        shadowBox.fill = new Color({r:255, g:255, b:255, a:255});
        shadowBox.stroke = null;
        shadowBox.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        
        // Send the shadow behind the original Mask Group, group together, use original Mask Group layer name
        commands.sendBackward();
        selection.items = [node[i], shadowBox];
        commands.group();
        let newLayerName = selection.items[0];
        newLayerName.name = node[i].name;
    }
    
    selection.items = null; 
}

/*
* Get selected Mask Group
* Duplicate original image and mask shape
* Delete the original image
* Set duplicated mask shape fill to white, add default drop shadow
* Send shadow backward and group with original Mask Group
*/
/*function createDropShadow(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    console.log("Plugin command is running!");
    
    // Access selected Mask Group
    let node = selection.items[0];
    
    // Duplicate and ungroup Mask Group
    commands.duplicate();
    commands.ungroup();
    
    // Delete the duplicated image
    let unusedImage = selection.items[0]
    unusedImage.removeFromParent();
    
    // Edit the duplicated mask shape -- rename "shadow", white fill, no stroke, add default drop shadow
    let shadowBox = selection.items[1]
    shadowBox.name = "Shadow";
    shadowBox.fill = new Color({r:255, g:255, b:255, a:255});
    shadowBox.stroke = null;
    shadowBox.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));

    // Send the shadow behind the original Mask Group, group together with original Mask Group layer name
    commands.sendBackward();
    selection.items = [node, shadowBox];
    commands.group();
    let newLayerName = selection.items[0];
    newLayerName.name = node.name;
    
    // Unselect objects
    selection.items = null;
}*/

/*node.forEach(function(element) {
    let current = element;
    console.log(current);
    commands.duplicate();
    commands.ungroup();
    let unusedImage = selection.items[0]
    unusedImage.removeFromParent();
    let shadowBox = selection.items[1]
    shadowBox.name = "Shadow";
    shadowBox.fill = new Color({r:255, g:255, b:255, a:255});
    shadowBox.stroke = null;
    shadowBox.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
    commands.sendBackward();
})*/

module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};