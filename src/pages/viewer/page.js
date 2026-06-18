// Shared hydrator for every model viewer page. The page's <body> carries a
// data-model="<slug>" attribute; we look that up in MODELS and build the page
// (nav, canvas, info card, color selector) from the descriptor, then render.
import '../../style.css';
import '../../styles/base.css';
import { MODELS } from '../../data/models.js';
import { gltfloader } from '../../main.js';
import { mountNav } from '../../components/nav.js';
import { infoCardHtml, bindInfoCard } from '../../components/infoCard.js';
import { colorSelectorHtml } from '../../components/colorSelector.js';

const slug = document.body.dataset.model;
const model = MODELS[slug];

if (!model) {
  console.error(`page.js: unknown model "${slug}" (check data-model and models.js)`);
} else {
  document.title = `${model.name} · Origami Collection`;
  // Insert the page chrome before the <script> tags already in <body>.
  document.body.insertAdjacentHTML('afterbegin', pageHtml(model));
  mountNav();
  bindInfoCard();
  gltfloader(model.glb, model.palette, { cameraZ: model.cameraZ });
}

function pageHtml(model) {
  return `
    <canvas class="webgL"></canvas>
    ${infoCardHtml(model)}
    ${colorSelectorHtml(model.palette)}
  `;
}
