import './style.css'
import gsap from "gsap"

// Container Loader
function Container_Loader(array, model_name, png_file) {
    var item_array = [model_name, png_file];
    array.push(item_array);
}

function PNG_Loader(array) {
    var container = document.getElementById('imageContainer');
    for (var i = 0; i < array.length; ++i) {
        var currentItem = array[i];
        // Load Image
        var image = new Image();
        image.src = currentItem[1];
        image.style.width = "80%";
        var imageAnchor = document.createElement('a');
        imageAnchor.appendChild(image);
        container.appendChild(imageAnchor);

        // Load Model_name
        var modelName = document.createElement('p');
        modelName.textContent = currentItem[0];
        var modelNameAnchor = document.createElement('a');
        modelNameAnchor.appendChild(modelName);
        modelNameAnchor.style.color = "white";
        container.appendChild(modelNameAnchor);

        // Position the image
        var column = (i % 4) * 300;
        var row = Math.floor(i / 4) * 400;
        imageAnchor.style.position = "absolute";
        imageAnchor.style.left = column + 220 + "px";
        imageAnchor.style.top = row + 180 + "px";
        modelNameAnchor.style.position = "absolute";
        modelNameAnchor.style.left = column + 240 + "px";
        modelNameAnchor.style.top = (row + 440) +"px";
    }
}

// Function call
var PNG_Files = [];
Container_Loader(PNG_Files, "Bow Tie Motif - 30pcs Inverted", "/Gallery_PNG/BowTieMotif_30pcs_Inverted.png");
Container_Loader(PNG_Files, "Sonobe - 1pc", "/Gallery_PNG/Sonobe_1pc.png");
Container_Loader(PNG_Files, "Sonobe - 2pcs", "/Gallery_PNG/Sonobe_2pcs.png");
Container_Loader(PNG_Files, "Sonobe - 3pcs", "/Gallery_PNG/Sonobe_3pcs.png");
Container_Loader(PNG_Files, "Sonobe - 6pcs", "/Gallery_PNG/Sonobe_6pcs.png");
Container_Loader(PNG_Files, "Sonobe - 12pcs", "/Gallery_PNG/Sonobe_12pcs.png");
Container_Loader(PNG_Files, "Sonobe - 15pcs", "/Gallery_PNG/Sonobe_15pcs.png");
Container_Loader(PNG_Files, "Sonobe - 18pcs", "/Gallery_PNG/Sonobe_18pcs.png");
Container_Loader(PNG_Files, "Sonobe - 24pcs", "/Gallery_PNG/Sonobe_24pcs.png");
Container_Loader(PNG_Files, "Sonobe - 30pcs", "/Gallery_PNG/Sonobe_30pcs.png");
Container_Loader(PNG_Files, "Sonobe - 30pcs Inverted", "/Gallery_PNG/Sonobe_30pcs_Inverted.png");
Container_Loader(PNG_Files, "Sonobe - 30pcs Var. 1", "/Gallery_PNG/Sonobe_30pcs_Modif1.png");
Container_Loader(PNG_Files, "Sonobe - 30pcs Var. 2", "/Gallery_PNG/Sonobe_30pcs_Modif3.png");
Container_Loader(PNG_Files, "Sonobe - 30pcs Var. 3", "/Gallery_PNG/Sonobe_30pcs_Modif4.png");
Container_Loader(PNG_Files, "Sonobe - 36pcs", "/Gallery_PNG/Sonobe_36pcs.png");
Container_Loader(PNG_Files, "Sonobe - 48pcs", "/Gallery_PNG/Sonobe_48pcs.png");
Container_Loader(PNG_Files, "Sonobe - 54pcs", "/Gallery_PNG/Sonobe_54pcs.png");
Container_Loader(PNG_Files, "Sonobe - 90pcs", "/Gallery_PNG/Sonobe_90pcs.png");
Container_Loader(PNG_Files, "Sonobe - 108pcs", "/Gallery_PNG/Sonobe_108pcs.png");
Container_Loader(PNG_Files, "Sonobe - 120pcs", "/Gallery_PNG/Sonobe_120pcs.png");
Container_Loader(PNG_Files, "Sonobe - 144pcs", "/Gallery_PNG/Sonobe_144pcs.png");
Container_Loader(PNG_Files, "Sonobe - 18pcs", "/Gallery_PNG/Sonobe_idkpcs.png");

PNG_Loader(PNG_Files);

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})










