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
const { alert, createDialog } = require("./lib/dialogs.js");

const DIALOG_CANCELED = "reasonCancelled";

var colorR = 0;
var colorG = 0;
var colorB = 0;
var colorA = 0;

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
    
    /*await createDialog({
        title: "Mask Group Drop Shadow"
    })*/
    
    showSettings().then(function() {
        
    });
    
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

    /*createDialog({
        title: 'SVG Output'
    })*/
}

function showOnboarding() {
    var dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <form method="dialog">
            <h1>Mask Group Shadows</h1>
            <hr>
            <ul>
                <li>• Select...</li>
                <li>• Select...</li>
            </ul>
            <footer>
                <button id="ok" type="submit" uxp-variant="cta">OK</button>
            </footer>
        </form>`;
    document.appendChild(dialog);

    return dialog.showModal().then(function () {
        dialog.remove();
    });
}

function showSettings() {
    var dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <style>
        .row {
            display: flex;
            align-items: center;
            margin-top: 10px;
        }

        hr {
            margin-bottom: 20px;
        }

        .option-section {
            margin: 20px 6px;
        }
        </style>
        <form method="dialog">
            <h1>Mask Group Shadows</h1>
            <hr>
            <p>Select options for the drop shadow.</p>
            <h2 class="option-section">Color</h3>
            <div class="row">
                <div class="col">
                    <label>R:</label>
                    <input type="number" uxp-quiet="true" id="numSteps" min="0" max="255" value="${colorR}" />
                </div>
                <div class="col">
                    <label>G:</label>
                    <input type="number" uxp-quiet="true" id="numSteps" min="0" max="255" value="${colorG}" />
                </div>
                <div class="col">
                    <label>B:</label>
                    <input type="number" uxp-quiet="true" id="numSteps" min="0" max="255" value="${colorB}" />
                </div>
                <div class="col">
                    <label>A:</label>
                    <input type="number" uxp-quiet="true" id="numSteps" min="0" max="255" value="${colorA}" />
                </div>
            </div>
            <footer>
                <button id="cancel" type="reset" uxp-variant="primary">Cancel</button>
                <button id="ok" type="submit" uxp-variant="cta">OK</button>
            </footer>
        </form>`;
    document.appendChild(dialog);

    // Ok button & Enter key automatically 'submit' the form
    // Esc key automatically cancels
    // Cancel button has no default behavior
    document.getElementById("cancel").onclick = () => dialog.close(DIALOG_CANCELED);

    return dialog.showModal().then(function (reason) {
        dialog.remove();

        if (reason === DIALOG_CANCELED) {
            return null;
        } else {
            return parseInt(dialog.querySelector("#numSteps").value);
        }
    });
}

module.exports = {
    commands: {
        createDropShadow: createDropShadow
    }
};
