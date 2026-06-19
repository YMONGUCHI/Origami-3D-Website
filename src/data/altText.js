// Descriptive alt-text helpers, shared by the catalog, the homepage strips, and
// the gallery so image alternatives stay consistent and describe the model
// rather than just repeating its name.

// For the 3D-render thumbnails under /Models_PNG/. Builds from the descriptor,
// e.g. "3D render of a 12-piece Sonobe octahedron modular origami model".
export function modelAlt(model) {
  const bits = [];
  if (model.pieces) bits.push(`${model.pieces}-piece`);
  if (model.type && model.type !== 'Misc') bits.push(model.type);
  if (model.shape) bits.push(model.shape.toLowerCase());
  const desc = bits.join(' ');
  return desc
    ? `3D render of a ${desc} modular origami model`
    : `3D render of ${model.name}, a modular origami model`;
}

// For the photos of real, hand-folded models under /Gallery_PNG/. Parses the
// "<Family> - <Npcs ...>" name into "A hand-folded N-piece <Family> model".
export function photoAlt(name) {
  const [family, descriptor] = name.split(' - ');
  if (descriptor) {
    const pieces = descriptor.replace(/(\d+)\s*pcs?/i, '$1-piece');
    return `A hand-folded ${pieces} ${family} model`;
  }
  return `A hand-folded ${name} modular origami model`;
}
