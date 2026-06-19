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
  const pieceAlt = model.type && model.type !== 'Misc' ? `${model.type} unit` : 'origami unit';
  const piece = model.piece
    ? `<img src="${model.piece}" class="expandable_image" alt="A single ${pieceAlt}">`
    : '';
  return `
    <div class="expandable">
      <button type="button" class="expandable_title-bar" aria-expanded="false">
        <span class="expandable_title">${model.name}</span>
        <ion-icon class="expandable_icon" name="chevron-forward-outline" aria-hidden="true"></ion-icon>
      </button>
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
    const bar = ev.target.closest('.expandable_title-bar');
    if (!bar) return;
    const open = bar.closest('.expandable').classList.toggle('expandable-open');
    bar.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
