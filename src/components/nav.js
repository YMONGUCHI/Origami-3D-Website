// Shared site navigation bar. Call mountNav() once per page; it injects the
// <nav> at the top of <body>.
import './nav.css';

const LINKS = [
  ['/pages/models/index.html', 'Models'],
  ['/pages/gallery/index.html', 'Gallery'],
  ['/pages/about_us/index.html', 'About Us'],
];

export function mountNav() {
  const items = LINKS.map(function (l) {
    return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>';
  }).join('');
  document.body.insertAdjacentHTML('afterbegin',
    '<nav><a href="/index.html" class="main-link">Origami Collection</a><ul>' + items + '</ul></nav>');
}
