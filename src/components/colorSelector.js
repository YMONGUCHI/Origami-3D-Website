// Color selector overlay for the model viewer pages. colorSelectorHtml() builds
// the markup from a palette; bindColorPickers() wires each picker to its material
// once the model has loaded (pickers and materials line up by index). CSS travels
// with this module via the import below.
import './colorSelector.css';

export function colorSelectorHtml(palette) {
  // One uniform row per color, laid out by the grid CSS — works for any count.
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

// Set each material's color from its picker, then keep it in sync on change.
export function bindColorPickers(materials) {
  materials.forEach((material, i) => {
    const picker = document.getElementById(`colorPicker${i + 1}`);
    if (!picker) return;
    const apply = () => material.color.set(picker.value);
    apply();
    picker.addEventListener('input', apply);
  });
}
