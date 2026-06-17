import './style.css'
import gsap from "gsap"
import { MODELS } from '../../models.js'
import { mountNav } from '../../components/nav.js';
mountNav();

// One card (type/shape name lines + thumbnail) for a model.
function makeCard(model, slug) {
    var card = document.createElement('a');
    card.href = "/model_pages/" + slug + "/index.html";
    card.className = 'model-card';
    var p = document.createElement('p');
    var parts = model.name.split(' - ');
    p.innerHTML = '<span class="model-type">' + parts[0] + '</span>'
        + (parts[1] ? '<br><span class="model-shape">' + parts[1] + '</span>' : '');
    card.appendChild(p);
    var image = new Image();
    image.src = model.thumbnail;
    image.alt = model.name;
    card.appendChild(image);
    return card;
}

var container = document.getElementById('imageContainer');
var ORDER = {
    type:  ["Sonobe", "Bow Tie Motif", "Poke", "Fuse", "Misc"],
    shape: ["Tetrahedron", "Hexahedron", "Octahedron", "Icosahedron", "Compound", "Plane"],
};
function orderedKeys(dimension, keys) {
    var order = ORDER[dimension];
    if (order) {
        var known = order.filter(function (k) { return keys.indexOf(k) !== -1; });
        var rest = keys.filter(function (k) { return order.indexOf(k) === -1; }).sort();
        return known.concat(rest);
    }
    return keys.slice().sort(function (a, b) {
        if (a === "Other") return 1;
        if (b === "Other") return -1;
        return Number(a) - Number(b);
    });
}
function headerLabel(dimension, key) {
    if (key === "Other") return "Other";
    return dimension === "pieces" ? key + " pieces" : key;
}
function render(dimension) {
    container.innerHTML = '';
    var groups = {};
    Object.entries(MODELS).forEach(function (e) {
        var key = e[1][dimension];
        key = (key == null || key === '') ? "Other" : String(key);
        (groups[key] = groups[key] || []).push(e);
    });
    orderedKeys(dimension, Object.keys(groups)).forEach(function (key) {
        var header = document.createElement('h2');
        header.className = 'section-header';
        header.textContent = headerLabel(dimension, key);
        container.appendChild(header);
        groups[key].forEach(function (e) { container.appendChild(makeCard(e[1], e[0])); });
    });
}

var bar = document.createElement('div');
bar.className = 'group-bar';
bar.innerHTML = '<span class="group-bar_label">Group by:</span>';
[["type", "Type"], ["shape", "Shape"], ["pieces", "Pieces"]].forEach(function (d) {
    var btn = document.createElement('button');
    btn.textContent = d[1];
    btn.addEventListener('click', function () {
        bar.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        render(d[0]);
    });
    bar.appendChild(btn);
});
container.parentNode.insertBefore(bar, container);
bar.querySelector('button').classList.add('active');
render('type');

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})