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
const { confirm, alert } = require("./lib/dialogs.js");

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
        
        // Group together, use original Mask Group layer name (does not follow Plugin Guidelines 2.2)
        /*selection.items = [node[i], shadowBox];
        commands.group();
        let newLayerName = selection.items[0];
        newLayerName.name = node[i].name;*/
    }
    
    // Reset selection in the document to the user's initial selection before plugin execution
    selection.items = initialSelection;
}

async function showAlert() {
    const feedback = await confirm("Masked Image Shadows",
    "Smart filters are nondestructive and will preserve your original images.",
    ["Cancel", "Create Shadow"]);
    
    switch (feedback.which) {
        case 0:
            break;
        case 1:
            break;
    }
}

/*async function showAlert() {
    await alert("Incorrect selection",
    "In order to function correctly, this plugin requires one or more Mask Groups to be selected.");  
}*/

module.exports = {
    commands: {
        createDropShadow: createDropShadow,
        showAlert
    }
};