// Gallery teaser strip for the homepage. mountGalleryTeaser(items) fills the
// #galleryTrack container with cards (same look as the Featured strip), each
// linking to the Gallery page. items: [{ name, src }].
import './galleryTeaser.css';

function makeCard(item) {
  const card = document.createElement('a');
  card.href = '/pages/gallery/index.html';
  card.className = 'model-card';
  const p = document.createElement('p');
  const parts = item.name.split(' - ');
  p.innerHTML = '<span class="model-type">' + parts[0] + '</span>'
    + (parts[1] ? '<br><span class="model-shape">' + parts[1] + '</span>' : '');
  card.appendChild(p);
  const image = new Image();
  image.loading = 'lazy';
  image.src = item.src;
  image.alt = item.alt || item.name;
  card.appendChild(image);
  return card;
}

export function mountGalleryTeaser(items) {
  const track = document.getElementById('galleryTrack');
  if (!track) return;
  items.forEach(function (item) {
    track.appendChild(makeCard(item));
  });
}
