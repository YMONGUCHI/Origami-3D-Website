import './style.css'
import '../../scrollbar.css'
import gsap from "gsap"
import { GALLERY_PHOTOS } from '../../galleryPhotos.js';
import { mountNav } from '../../components/nav.js';
import { mountFooter } from '../../components/footer.js';
import { mountBackToTop } from '../../components/backToTop.js';
mountNav();
mountFooter();
mountBackToTop();

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
    image.loading = 'lazy';
    image.src = png;
    image.alt = name;
    card.appendChild(image);
    return card;
}

var container = document.getElementById('imageContainer');
var searchQuery = '';

// Render the photos whose name matches the current search query.
function render() {
    container.innerHTML = '';
    var matches = GALLERY_PHOTOS.filter(function (item) {
        return !searchQuery || item.name.toLowerCase().indexOf(searchQuery) !== -1;
    });
    if (matches.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'no-results';
        empty.textContent = 'No photos match “' + searchQuery + '”.';
        container.appendChild(empty);
        return;
    }
    matches.forEach(function (item) { container.appendChild(makeCard(item.name, item.src)); });
}

// Search box: filters the gallery photos by name.
var search = document.createElement('div');
search.className = 'search-bar';
var input = document.createElement('input');
input.type = 'search';
input.className = 'search-input';
input.placeholder = 'Search gallery…';
input.addEventListener('input', function () {
    searchQuery = input.value.trim().toLowerCase();
    render();
});
search.appendChild(input);
container.parentNode.insertBefore(search, container);

render();

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})
