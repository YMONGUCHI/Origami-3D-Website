import './style.css'
import gsap from "gsap"
import { MODELS } from '../../models.js'

function PNG_Loader(array) {
    var container = document.getElementById('imageContainer');
    for (var i = 0; i < array.length; ++i) {
        var currentItem = array[i];
        // Load Image
        var image = new Image();
        image.src = currentItem[1];
        image.style.width = "80%";
        var imageAnchor = document.createElement('a');
        imageAnchor.href = currentItem[2];
        imageAnchor.appendChild(image);
        container.appendChild(imageAnchor);

        // Load Model_name
        var modelName = document.createElement('p');
        modelName.textContent = currentItem[0];
        var modelNameAnchor = document.createElement('a');
        modelNameAnchor.href = currentItem[2];
        modelNameAnchor.appendChild(modelName);
        modelNameAnchor.style.color = "white";
        container.appendChild(modelNameAnchor);

        // Position the image
        var column = (i % 4) * 300;
        var row = Math.floor(i / 4) * 400;
        imageAnchor.style.position = "absolute";
        imageAnchor.style.left = column + 200 + "px";
        imageAnchor.style.top = row + 200 + "px";
        modelNameAnchor.style.position = "absolute";
        modelNameAnchor.style.left = column + 240 + "px";
        modelNameAnchor.style.top = (row + 440) +"px";
    }
}

// Build the grid from the model data (single source of truth: models.js)
var PNG_Files = Object.entries(MODELS).map(function (entry) {
    var slug = entry[0], m = entry[1];
    return [m.name, m.thumbnail, "/model_pages/" + slug + "/index.html"];
});
PNG_Loader(PNG_Files);

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})