// Homepage stats band. mountStatsRow() fills #statsRow with live counts derived
// from models.js, so the numbers stay accurate as the catalog changes.
import './statsRow.css';
import { MODELS } from '../data/models.js';
import { GALLERY_PHOTOS } from '../data/galleryPhotos.js';

export function mountStatsRow() {
  const row = document.getElementById('statsRow');
  if (!row) return;
  const models = Object.values(MODELS);
  const total = models.length;
  const families = new Set(models.map((m) => m.type).filter(Boolean)).size;
  const maxPieces = models.reduce((max, m) => Math.max(max, m.pieces || 0), 0);

  const stats = [
    [String(total), '3D models'],
    [String(GALLERY_PHOTOS.length), 'Gallery photos'],
    [String(families), 'Folding families'],
    [String(maxPieces), 'Max pieces'],
  ];

  row.innerHTML = stats.map(function (s) {
    return '<div class="stat">'
      + '<div class="stat_num">' + s[0] + '</div>'
      + '<div class="stat_label">' + s[1] + '</div>'
      + '</div>';
  }).join('');
}
