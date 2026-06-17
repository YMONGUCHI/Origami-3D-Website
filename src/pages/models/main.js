import './style.css'
import gsap from "gsap"
import { MODELS } from '../../models.js'

function PNG_Loader(array) {
    var container = document.getElementById('imageContainer');
    for (var i = 0; i < array.length; ++i) {
        var currentItem = array[i];
        // One card per model (image + name); the flex container lays them out.
        var card = document.createElement('a');
        card.href = currentItem[2];
        card.className = 'model-card';

        var image = new Image();
        image.src = currentItem[1];
        image.alt = currentItem[0];
        card.appendChild(image);

        var modelName = document.createElement('p');
        modelName.textContent = currentItem[0];
        card.appendChild(modelName);

        container.appendChild(card);
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