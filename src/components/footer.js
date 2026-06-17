// Shared site footer. Call mountFooter() once per page; it appends the
// <footer> to the end of <body>. (Use on content pages, not the full-screen
// 3D scenes, where flow-positioned content sits at the bottom.)
import './footer.css';

const LINKS = [
  ['/pages/models/index.html', 'Models'],
  ['/pages/gallery/index.html', 'Gallery'],
  ['/pages/about/index.html', 'About'],
];

export function mountFooter() {
  const year = new Date().getFullYear();
  const links = LINKS.map(function (l) {
    return '<a href="' + l[0] + '">' + l[1] + '</a>';
  }).join('');
  document.body.insertAdjacentHTML('beforeend',
    '<footer class="site-footer">' +
      '<div class="site-footer_brand">' +
        '<a href="/index.html" class="site-footer_name">Origami Collection</a>' +
        '<p class="site-footer_tagline">Modular origami, folded and digitized.</p>' +
      '</div>' +
      '<div class="site-footer_links">' + links + '</div>' +
      '<p class="site-footer_copy">&copy; ' + year + ' Origami Collection</p>' +
    '</footer>');
}
