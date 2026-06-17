import './style.css'
import gsap from "gsap"
import { mountNav } from '../../components/nav.js';
import { mountFooter } from '../../components/footer.js';
mountNav();
mountFooter();

// Container Loader
function Container_Loader(array, model_name, png_file) {
    var item_array = [model_name, png_file];
    array.push(item_array);
}

// One card (type/shape caption lines + photo), same format as the Models page.
function makeCard(name, png) {
    var card = document.createElement('div');
    card.className = 'model-card';
    var p = document.createElement('p');
    var parts = name.split(' - ');
    p.innerHTML = '<span class="model-type">' + parts[0] + '</span>'
        + (parts[1] ? '<br><span class="model-shape">' + parts[1] + '</span>' : '');
    card.appendChild(p);
    var image = new Image();
    image.src = png;
    image.alt = name;
    card.appendChild(image);
    return card;
}

function PNG_Loader(array) {
    var container = document.getElementById('imageContainer');
    for (var i = 0; i < array.length; ++i) {
        container.appendChild(makeCard(array[i][0], array[i][1]));
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










