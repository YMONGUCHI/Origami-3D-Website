// Shared hydrator for every model viewer page. The page's <body> carries a
// data-model="<slug>" attribute; we look that up in MODELS and build the page
// (nav, canvas, info panel, color selector) from the descriptor, then render.
import './style.css';
import { MODELS } from './models.js';
import { gltfloader } from './main.js';
import { mountNav } from './components/nav.js';

const slug = document.body.dataset.model;
const model = MODELS[slug];

if (!model) {
  console.error(`page.js: unknown model "${slug}" (check data-model and models.js)`);
} else {
  document.title = 'Origami Club';
  // Insert the page chrome before the <script> tags already in <body>.
  document.body.insertAdjacentHTML('afterbegin', pageHtml(model));
  mountNav();
  gltfloader(model.glb, model.palette, { cameraZ: model.cameraZ });
}

function pageHtml(model) {
  return `
    <canvas class="webgL"></canvas>
    ${infoPanelHtml(model)}
    ${colorSelectorHtml(model.palette)}
  `;
}

function infoPanelHtml(model) {
  const fields = [
    ['Number of Pieces', model.pieces],
    ['Geometric Shape', model.shape],
    ['Number of Tetrahedron', model.tetrahedra],
    ['Individual Piece', model.type !== 'Misc' ? model.type : null],
  ];
  const lines = fields
    .filter(([, v]) => v != null)
    .map(([label, v]) => `<p>${label}: ${v}</p>`)
    .join('\n');
  const piece = model.piece
    ? `<img src="${model.piece}" class="expandable_image">`
    : '';
  return `
    <div class="expandable">
      <div class="expandable_title-bar">
        <span class="expandable_title">${model.name}</span>
        <ion-icon class="expandable_icon" name="chevron-forward-outline"></ion-icon>
      </div>
      <div class="expandable_content-wrapper">
        <div class="expandable_content">
          ${lines}
          ${piece}
        </div>
      </div>
    </div>`;
}

function colorSelectorHtml(palette) {
  // One uniform row per color, laid out by the flex CSS — works for any count.
  const rows = palette
    .map(
      (color, i) => `
      <div class="color-row">
        <span class="color-label">Color ${i + 1}:</span>
        <input type="color" id="colorPicker${i + 1}" value="${color}">
      </div>`
    )
    .join('');
  return `
    <div class="color-selector">
      <h3 class="color-selector_title">Color Selector</h3>
      <div class="color-rows">${rows}</div>
    </div>`;
}
