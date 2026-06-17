// Gallery teaser strip for the homepage. mountGalleryTeaser(items) fills the
// #galleryTrack container with photo tiles, each linking to the Gallery page.
// items: [{ src, alt }].
import './galleryTeaser.css';

export function mountGalleryTeaser(items) {
  const track = document.getElementById('galleryTrack');
  if (!track) return;
  items.forEach(function (item) {
    const link = document.createElement('a');
    link.href = '/pages/gallery/index.html';
    link.className = 'gallery-shot';
    const image = new Image();
    image.src = item.src;
    image.alt = item.alt;
    link.appendChild(image);
    track.appendChild(link);
  });
}
