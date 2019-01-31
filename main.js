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
* Get selected Mask Group
* Duplicate original image and mask shape
* Delete the original image
* Set duplicated mask shape fill to white, add default drop shadow, and send backward
*/
function createDropShadow(selection) {
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
    
    // Send the shadow behind the original Mask Group
    commands.sendBackward();
    
    // Unselect objects
    selection.items = null;
}


/*
* Get all selected Mask Groups
* For each Mask Group:
* Duplicate original image and mask shape
* Delete the original image
* Set duplicated mask shape fill to white, add default drop shadow, and send backward
*/
/*function createDropShadow(selection) {
    let node = selection.items;
    console.log(selection.items.length);
    console.log(node);
    
    for (let i = 0; i < selection.items.length; i++) {
        let current = selection.items[i];
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
    }
    
    node.forEach(function(element) {
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
    })
    
    selection.items = null;  
}*/


/*
* Adds drop shadows to multiple selections (does not group)
* For each selection - duplicate the initial object
* Set initial object fill to white, add default drop shadow, and send backward
*/
/*function createDropShadow(selection) {
    let items = selection.items;
    items.forEach(function(element) {
        commands.duplicate();
        let clone = element;
        clone.fill = new Color({r:255, g:255, b:255, a:255});
        clone.shadow = new Shadow(0, 3, 6, new Color({r:0, g:0, b:0, a:40}));
        selection.items = null;
    });
}*/


/*
* Add drop shadow to one selection and group
* (does not work for multiple selections)
* For each selection - duplicate the initial object
* Set initial object fill to white, add default drop shadow, and send backward
*/
/*function createDropShadow(selection) {
    let items = selection.items;
    items.forEach(function(element) {
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
    });
}*/


module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};