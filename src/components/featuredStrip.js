// Featured models strip for the homepage. mountFeaturedStrip(slugs) fills the
// #featuredTrack container with catalog cards for the given model slugs, each
// linking to its viewer page (same card markup as the Models catalog).
import './featuredStrip.css';
import { MODELS } from '../data/models.js';
import { modelAlt } from '../data/altText.js';

function makeCard(model, slug) {
  const card = document.createElement('a');
  card.href = '/model_pages/' + slug + '/index.html';
  card.className = 'model-card';
  const p = document.createElement('p');
  const parts = model.name.split(' - ');
  p.innerHTML = '<span class="model-type">' + parts[0] + '</span>'
    + (parts[1] ? '<br><span class="model-shape">' + parts[1] + '</span>' : '');
  card.appendChild(p);
  const image = new Image();
  image.loading = 'lazy';
  image.src = model.thumbnail;
  image.alt = modelAlt(model);
  card.appendChild(image);
  return card;
}

export function mountFeaturedStrip(slugs) {
  const track = document.getElementById('featuredTrack');
  if (!track) return;
  slugs.forEach(function (slug) {
    const model = MODELS[slug];
    if (!model) return;
    track.appendChild(makeCard(model, slug));
  });
}
