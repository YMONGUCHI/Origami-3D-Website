// Expandable description card for the model viewer pages. infoCardHtml() builds
// the panel from a model descriptor (every field optional); bindInfoCard() wires
// the click-to-expand toggle. CSS travels with this module via the import below.
import './infoCard.css';

export function infoCardHtml(model) {
  // Every field is optional; only the ones a model actually carries are shown.
  const fields = [
    ['Geometric Shape', model.shape],
    ['Number of Pieces', model.pieces],
    ['Number of Tetrahedra', model.tetrahedra],
    ['Number of Quadrahedra', model.quadrahedra],
    ['Number of Pentahedra', model.pentahedra],
    ['Number of Hexahedra', model.hexahedra],
    ['Variation', model.variation != null ? `#${model.variation}` : null],
    ['Inverted', model.inverted ? 'Yes' : null],
    ['Individual Piece', model.type && model.type !== 'Misc' ? model.type : null],
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

// Click the title bar to expand/collapse. Delegated off <body> so it works
// regardless of when the card is inserted.
export function bindInfoCard() {
  document.body.addEventListener('click', (ev) => {
    if (!ev.target.closest('.expandable_title-bar')) return;
    ev.target.closest('.expandable').classList.toggle('expandable-open');
  });
}
