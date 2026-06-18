# Origami 3D Website

A personal website that catalogs and displays 3D models of modular origami pieces I have folded. Each model on the site corresponds to a real paper origami structure I built first, then recreated in Blender and rendered in the browser using Three.js.

**Live demo:** [origami-3d-website.pages.dev](https://origami-3d-website.pages.dev)

## Motivation

I have been folding modular origami since high school, where I founded an origami club, and I have continued the practice into my CS studies. Over time, I accumulated dozens of finished models, but showing them to people meant physically carrying paper structures around or sending photos that flattened the geometry. This project began as a way to display every model I have folded in one place, viewable from any angle, without needing the physical paper in hand.

The site also became useful for planning. Modeling a piece in 3D before folding it lets me work out color arrangements, identify symmetries, and experiment with variations far more easily than with paper alone. Each viewer page includes a color selector that recolors the model's individual units live in the browser, which grew out of that planning workflow.

## Approach

The project follows three stages:

**1. Physical folding.** Each origami model on the site was first built by hand from paper. Modular origami pieces (Sonobe, Bow Tie, Poke, Fuse, and several variants) interlock into geometric forms ranging from a 3-piece tetrahedron up to a 360-piece icosahedron.

**2. 3D modeling in Blender.** Each finished origami structure was recreated in Blender, preserving the unit-by-unit construction so that individual pieces remain visible in the rendered model. The completed scenes were exported as `.glb` files for use in the browser.

**3. Web display with Three.js and Vite.** The site is built with Vite as the bundler and Three.js for 3D rendering. Each model has its own page with an embedded interactive 3D viewer, an expandable info card describing the folding pattern, and a live color selector. The Models page provides a thumbnail-based catalog that can be grouped and searched, and the Gallery page shows reference photos of the physical originals.

## Overall Structure

The project uses a multi-page architecture rather than a single-page application. Each page is its own HTML entry point, registered automatically through a `glob`-based scan in the Vite configuration (`vite.config.js`), so new pages can be added without manual config edits. There are currently 68 entry points: a homepage, the Models / Gallery / About pages, and 64 model viewer pages.

The codebase is organized around three ideas:

**A central data layer.** `src/data/models.js` is the single source of truth for every model: display name, `.glb` file, thumbnail, color palette, and optional geometry metadata (shape, piece count, constituent polyhedra, variation, inversion). `src/data/galleryPhotos.js` does the same for the gallery. Both the catalog and the homepage read from these, so the site's numbers and listings stay in sync with the data automatically. See [The models.js data contract](#the-modelsjs-data-contract) for the full field reference.

**Data-driven viewer pages.** Each model page's `index.html` is a thin stub whose `<body>` carries a single `data-model="<slug>"` attribute. A shared hydrator, `src/pages/viewer/page.js`, reads that slug, looks it up in `models.js`, and builds the entire page (navigation, canvas, info card, color selector) from the descriptor before rendering with Three.js. Adding a model is mostly a matter of adding a data entry and a stub, rather than hand-writing a full page.

**Reusable components.** `src/components/` holds self-contained UI modules, each shipping its own CSS via an `import`: the shared `nav` and `footer`, a floating `backToTop` button, the expandable `infoCard`, the `colorSelector` overlay, and the homepage's `featuredStrip`, `galleryTeaser`, and `statsRow`. The `statsRow` derives its counts (total models, gallery photos, folding families, max piece count) directly from the data layer, so they are never hardcoded.

Shared styling lives in `src/styles/base.css` (reset, fonts, scrollbar), imported by every entry; `src/style.css` adds the scroll-lock used only by the full-screen 3D pages.

## The `model_pages` Hierarchy

Every model viewer lives under `src/model_pages/`, organized into a category hierarchy. The path of each model encodes where it sits in that hierarchy (for example, `sonobe/octahedron/type-1/size-1`). The levels, from top to bottom, are:

```
Level 1   Folding family     sonobe, poke, fuse, misc, bow-tie
   |
Level 2   Shape              tetrahedron, octahedron, icosahedron, plane
   |
Level 3   Type               type-1, type-2            (Sonobe only)
   |
Level 4   Size               size-1, size-2, size-3    (Sonobe only)
   |
Level 5   Variation          variant-1 to 3, inverted  (Sonobe only)
```

Not every model uses every level. Levels 1 and 2 are the universal path that all families follow: every model is at minimum a folding family and a shape. Levels 3 through 5 currently apply to Sonobe only, which is the one family deep and varied enough to branch that far. For the other families, the shape is the model page itself, with nothing beneath it.

**Level descriptions:**

**Folding family** — The group a piece belongs to, defined by the rough shape and folding method of the individual units rather than the model they build. Despite the variations within it, every piece in a family shares that base unit. The name usually comes from the designer; for example, the Sonobe unit is said to have been designed by Mitsunobu Sonobe.

**Shape** — The geometric solid the finished model represents (tetrahedron, octahedron, icosahedron, plane, and so on). More to be explained later.

**Type** — How the model can be built when the geometric shape allows more than one construction. This applies only to the icosahedron and octahedron, which can each be built in two different ways.

**Size** — The nth size up from the base size. Larger sizes use proportionally more pieces, so size has a direct relationship with the total piece count.

**Variation** — A slight change to the base piece design that alters the overall look of the model by adding varying detail.

## Features

Each entry below focuses on *how* the feature is implemented, as a reference for reuse, rather than just what it does. File paths point to the source.

### Functional

**Data-driven page hydration** (`src/pages/viewer/page.js`). This is the backbone the viewer features hang off. Each model page's `<body>` carries `data-model="<slug>"` and two `<script>` tags. The hydrator reads `document.body.dataset.model`, looks the slug up in `MODELS`, and injects the chrome with `insertAdjacentHTML('afterbegin', ...)` so it lands *before* the existing scripts. The injected HTML is assembled from the component builders, then the components are wired and the model is loaded:

```js
const slug = document.body.dataset.model;
const model = MODELS[slug];
if (!model) {
  console.error(`unknown model "${slug}"`);
} else {
  document.title = `${model.name} · Origami Collection`;
  document.body.insertAdjacentHTML('afterbegin', `
    <canvas class="webgL"></canvas>
    ${infoCardHtml(model)}
    ${colorSelectorHtml(model.palette)}
  `);
  mountNav();
  bindInfoCard();
  gltfloader(model.glb, model.palette, { cameraZ: model.cameraZ });
}
```
The reusable pattern: a single shared script + a per-page data attribute replaces N hand-written pages. Builders return HTML strings; binders attach behavior after injection.

**Catalog grouping** (`src/pages/models/`). Grouping is a reduce over `Object.entries(MODELS)` keyed by whichever field (`type`, `shape`, or `pieces`) the active button selects. A static `ORDER` map fixes the display order of known families/shapes; anything unknown is sorted and appended, and entries missing the field fall into an `"Other"` bucket:

```js
const ORDER = {
  type:  ["Sonobe", "Bow Tie Motif", "Poke", "Fuse", "Misc"],
  shape: ["Tetrahedron", "Hexahedron", "Octahedron", "Icosahedron", "Compound", "Plane"],
};
// group:
entries.forEach(e => {
  const key = e[1][dimension] ?? "Other";
  (groups[key] = groups[key] || []).push(e);
});
// order: known keys first (in ORDER), then the rest sorted
```
The button bar just re-runs `render(dimension)` with a different key. Reusable idea: keep grouping logic data-driven and push display order into a small lookup table rather than hardcoding it into the markup.

**Live search** (`src/pages/models/`). The search input filters before grouping by building a lowercase haystack per model and testing for substring inclusion, so one box covers name, family, shape, and slug:

```js
function matchesSearch(entry) {
  if (!searchQuery) return true;
  const m = entry[1];
  const hay = (m.name + ' ' + (m.type||'') + ' ' + (m.shape||'') + ' ' + entry[0]).toLowerCase();
  return hay.includes(searchQuery);
}
```
`input` event → set `searchQuery` → re-`render()`. Search and grouping compose because both run inside the same render pass.

**GLB rendering + OrbitControls** (`src/main.js`). The viewer core sets up a Three.js scene, lights, a camera, a `GLTFLoader`, and `OrbitControls` with `enableDamping = true` for weighted motion. `gltfloader(glb, palette, opts)` is exported so both the homepage and the viewer pages reuse the same setup, parameterized by the model's GLB path, palette, and optional camera distance.

**Auto-rotation with interaction pause** (`src/main.js`, `src/pages/home/home.js`). `OrbitControls` exposes `autoRotate` plus `start`/`end` events. The pattern: turn rotation off on `start`, and on `end` set a timer to turn it back on after an idle delay (clearing any pending timer so rapid interactions don't stack):

```js
controls.autoRotate = true;
let resumeTimer;
controls.addEventListener('start', () => {
  controls.autoRotate = false;
  clearTimeout(resumeTimer);
});
controls.addEventListener('end', () => {
  resumeTimer = setTimeout(() => { controls.autoRotate = true }, 5000); // 1500ms on homepage
});
```

**Live color selector** (`src/components/colorSelector.js`). Two exported functions split markup from behavior. `colorSelectorHtml(palette)` maps the palette to one `<input type="color">` per entry, with predictable ids (`colorPicker1`, `colorPicker2`, …). `bindColorPickers(materials)` matches picker `i` to material `i` by index and syncs on `input`:

```js
export function bindColorPickers(materials) {
  materials.forEach((material, i) => {
    const picker = document.getElementById(`colorPicker${i + 1}`);
    if (!picker) return;
    const apply = () => material.color.set(picker.value);
    apply();                                   // set initial color
    picker.addEventListener('input', apply);   // live updates
  });
}
```
The contract that makes it work: palette length === number of colorable materials, in the same order (see the `.glb` requirements). Reusable idea: index-aligned arrays (palette ↔ pickers ↔ materials) avoid any per-model wiring.

**Expandable info card** (`src/components/infoCard.js`). `infoCardHtml(model)` declares fields as `[label, value]` pairs, filters out `null`/absent values, and renders only what remains, so sparse models show no empty rows:

```js
const fields = [
  ['Geometric Shape', model.shape],
  ['Number of Pieces', model.pieces],
  ['Variation', model.variation != null ? `#${model.variation}` : null],
  // …
];
const lines = fields.filter(([, v]) => v != null)
                    .map(([label, v]) => `<p>${label}: ${v}</p>`).join('\n');
```
Expansion is wired once with **event delegation off `<body>`**, so it works no matter when the card is injected:

```js
export function bindInfoCard() {
  document.body.addEventListener('click', (ev) => {
    if (!ev.target.closest('.expandable_title-bar')) return;
    ev.target.closest('.expandable').classList.toggle('expandable-open');
  });
}
```

**Live homepage stats** (`src/components/statsRow.js`). Counts are derived from `MODELS`/`galleryPhotos` at runtime (total models = key count, families = distinct `type` values, max pieces = `Math.max` over `pieces`), so the band never goes stale when the data grows. Reusable idea: compute display numbers from the source of truth instead of typing them into the markup.

**Scroll-to-top button** (`src/components/backToTop.js` / `.css`). `mountBackToTop()` appends one button, toggles an `is-visible` class when `window.scrollY > 400`, and smooth-scrolls on click. The scroll listener is passive for performance; visibility is pure CSS (opacity + translate transition, `pointer-events: none` until shown):

```js
window.addEventListener('scroll', () => {
  btn.classList.toggle('is-visible', window.scrollY > 400);
}, { passive: true });
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
```

### Stylistic

**Homepage hero color cycling** (`src/pages/home/home.js`). Inside the render loop, the model's three materials crossfade through a list of palettes. Each palette is held for `HOLD` ms, then `lerp`ed to the next over `MOVE` ms using a smoothstep ease. Time drives everything off one `performance.now()` clock, so it loops forever without state:

```js
const PALETTES = [[...], [...], ...].map(set => set.map(h => new THREE.Color(h)));
const HOLD = 1500, MOVE = 2000, STEP = HOLD + MOVE;
// in loop():
const tt = (performance.now() - animStart) % (STEP * PALETTES.length);
const idx = Math.floor(tt / STEP);
const within = tt - idx * STEP;
const from = PALETTES[idx], to = PALETTES[(idx + 1) % PALETTES.length];
const p = within <= HOLD ? 0 : (within - HOLD) / MOVE;
const eased = p * p * (3 - 2 * p);          // smoothstep
material1.color.copy(from[0]).lerp(to[0], eased);
// …material2, material3
```
Reusable ideas: a smoothstep (`p*p*(3-2p)`) gives a soft crossfade with no easing library, and `THREE.Color.lerp` interpolates colors directly.

**Animated "drag to rotate" hint** (`src/pages/home/home.css`). The motion is pure CSS keyframes, split across two elements so they compose: the text *breathes* (opacity) and the glyph *spins* (rotation). Splitting them onto an inner span means the parent can still fade out independently in JS:

```css
.hero_hint-inner { animation: hero-breathe 2.4s ease-in-out infinite; }
.hero_hint-icon  { animation: hero-spin 4s linear infinite; }
@keyframes hero-breathe { 0%,100% { opacity: .4 } 50% { opacity: 1 } }
@keyframes hero-spin    { to { transform: rotate(360deg) } }
```
On first interaction JS adds `.is-hidden`, which sets `opacity:0` **and** `animation:none` so the fade-out isn't fighting the keyframe.

**Bouncing scroll-cue chevron** (`src/pages/home/home.css`). The chevron is drawn with no image: a square with only `border-right` + `border-bottom`, rotated 45°. It bounces via a translate keyframe, and (like the hint) fades out on scroll by toggling a class:

```css
.hero_scroll-chevron {
  width: 16px; height: 16px;
  border-right: 2px solid rgba(255,255,255,.75);
  border-bottom: 2px solid rgba(255,255,255,.75);
  transform: rotate(45deg);
}
.hero_scroll { animation: hero-bounce 1.8s ease-in-out infinite; }
@keyframes hero-bounce { 0%,100% { transform: translateX(-50%) translateY(0) }
                         50%      { transform: translateX(-50%) translateY(8px) } }
```
The two-border-plus-rotate trick is the same one the back-to-top button uses for its up-chevron (`border-top` + `border-left`). Reusable idea: chevrons/arrows need no SVG or icon font, just two borders and a rotate.

**Info-card chevron rotation + height animation** (`src/components/infoCard.css`). Opening the card is one class toggle that drives two transitions. The chevron rotates 90°, and the content animates open using the **`grid-template-rows: 0fr → 1fr`** technique, which animates height without needing a fixed pixel height:

```css
.expandable_content-wrapper { display: grid; grid-template-rows: 0fr;
                              transition: grid-template-rows .3s; }
.expandable_content { overflow: hidden; }
.expandable-open .expandable_content-wrapper { grid-template-rows: 1fr; }
.expandable-open .expandable_icon { transform: rotate(90deg); }
```
Reusable idea: `grid-template-rows` `0fr`↔`1fr` is the clean way to animate "expand to content height" that `height: auto` can't transition.

**Hover text highlight** (`nav.css`, `footer.css`, `home.css`, `pages/models/style.css`). One consistent accent (`#00ff83`) is applied on hover to every clickable text element, so the whole site shares one hover language:

```css
nav a:hover,
.section-head_link:hover,
.model-card:hover p { color: #00ff83; }
```

**Card pop on hover** (`pages/models/style.css`, `home.css`). Cards lift with a transform (cheap to animate, GPU-friendly) and, on the Models page, recolor their label at the same time:

```css
.model-card { transition: transform .15s ease; }
.model-card:hover   { transform: translateY(-6px); }
.model-card:hover p { color: #00ff83; }
```
Reusable idea: animate `transform` (not `top`/`margin`) for hover lifts to stay on the compositor and avoid layout reflow.

## The `models.js` Data Contract

`src/data/models.js` exports a single `MODELS` object, keyed by slug. **The slug must match the folder path under `src/model_pages/`** — for example, the entry `"sonobe/octahedron/type-1/size-1"` corresponds to `src/model_pages/sonobe/octahedron/type-1/size-1/index.html`. This is the link between a page stub and its data: the stub's `data-model` attribute is the slug, and the hydrator looks it up here.

Each entry is a descriptor object. Four fields are **required**; everything else is optional, and the info card renders only what is present.

**Required fields:**

| Field | Type | Description |
|-----------|----------|-------------|
| `name` | string | Display name, shown in the page title bar and the catalog card. By convention it is `"<Family> - <Shape>"` (e.g. `"Sonobe - Tetrahedron"`); the catalog splits on `" - "` to show family and shape on separate lines. |
| `glb` | string | Path to the 3D model file under `/GLB_Files/`. |
| `thumbnail` | string | Path to the catalog image under `/Models_PNG/`. |
| `palette` | string[] | One color per colored part of the model. The array length defines how many color pickers the selector shows and how many materials are bound. |

**Optional fields:**

| Field | Type | Description |
|----------------|----------|-------------|
| `piece` | string | Individual-piece image for the info panel, under `/Individual_Pieces/`. |
| `type` | string | Folding family, used for catalog grouping (e.g. `"Sonobe"`, `"Poke"`, `"Misc"`). |
| `shape` | string | Geometric shape, also used for grouping (e.g. `"Octahedron"`). |
| `pieces` | number | Number of modules in the model. |
| `tetrahedra` | number | Number of constituent tetrahedra. |
| `quadrahedra` | number | Number of constituent quadrahedra. |
| `pentahedra` | number | Number of constituent pentahedra. |
| `hexahedra` | number | Number of constituent hexahedra. |
| `variation` | number | Variation number; its presence means this entry is variation #N of a base model. |
| `inverted` | boolean | `true` when this entry is the inverted-coloring version of a model. |
| `cameraZ` | number | Camera distance override for the viewer, for models that need to sit closer or farther by default. |

**Example entry:**

```js
"sonobe/tetrahedron": {
  name: "Sonobe - Tetrahedron",
  glb: "/GLB_Files/sonobemoduletetrahedron.glb",
  thumbnail: "/Models_PNG/Sonobe_Tetrahedron.png",
  palette: ["#00ff83", "#0400ff", "#aa22ff"],
  piece: "/Individual_Pieces/sonobepiece.png",
  type: "Sonobe",
  shape: "Tetrahedron",
  pieces: 3,
  tetrahedra: 2,
},
```

### `.glb` file requirements

The 3D models are the one thing the data layer cannot generate, so they follow a few conventions:

- **Location.** Every `.glb` lives in `public/GLB_Files/`, and the `glb` field references it with a leading-slash absolute path (`/GLB_Files/<file>.glb`). Anything in `public/` is served from the site root, so the path in the data must start at `/GLB_Files/`, not `./` or `../`. The same applies to thumbnails (`public/Models_PNG/`, referenced as `/Models_PNG/...`) and piece images (`public/Individual_Pieces/`).
- **Separate materials per colored part.** The color selector works by binding one picker to one material, in order. For the recoloring to work, the model must be exported from Blender with a distinct material per part you want to be independently colorable, and the `palette` array must have the same number of entries, in the same order.
- **Format.** Export as binary glTF (`.glb`), which packs geometry and materials into a single file so each model is one request.

To add a new model: export its `.glb` (and a thumbnail) into the right `public/` folders, add an entry to `MODELS` keyed by its slug, and create the matching stub at `src/model_pages/<slug>/index.html` carrying that slug in `data-model`.

## How It Was Built

The architectural decisions were made along the way as the project grew, which means earlier ones occasionally needed revisiting. The build configuration originally hardcoded only a handful of entry points; updating it to detect every page automatically came later, after the project had grown well beyond what manual registration could handle. The viewer pages were likewise once self-contained HTML files with duplicated markup; they were since consolidated behind the shared `page.js` hydrator and the central data layer, which is what makes adding a new model cheap today. Path conventions for static assets were standardized through the `public/` directory only after the site reached its current scale. The detailed history is in [CHANGELOG.md](./CHANGELOG.md).

## Project Structure

```
Origami-3D-Website/
├── public/
│   ├── GLB_Files/            3D models (.glb), one per catalog entry
│   ├── Models_PNG/           catalog thumbnails
│   ├── Individual_Pieces/    single-unit images for the info card
│   ├── Gallery_PNG/          reference photos of the physical models
│   └── SonobeLogo1.png       site logo
├── src/
│   ├── components/           reusable UI modules, each with its own CSS
│   │                         (nav, footer, backToTop, infoCard,
│   │                          colorSelector, featuredStrip,
│   │                          galleryTeaser, statsRow)
│   ├── pages/                home, models, gallery, about, viewer
│   │   └── viewer/page.js    shared hydrator for every model page
│   ├── model_pages/          64 model viewer stubs, grouped by family
│   ├── data/
│   │   ├── models.js         single source of truth for all models
│   │   └── galleryPhotos.js  single source of truth for the gallery
│   ├── styles/
│   │   └── base.css          shared reset, fonts, scrollbar
│   ├── main.js               Three.js viewer core (scene, lights,
│   │                         controls, GLB loader, rotation)
│   ├── index.html            homepage entry
│   └── style.css             scroll-lock for full-screen 3D pages
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js            auto-registers every index.html as an entry
└── README.md
```

## Running Locally

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Built with [Vite](https://vitejs.dev/), [Three.js](https://threejs.org/), and [GSAP](https://gsap.com/).

## Roadmap

The site is live and continuously expanding. Planned work falls into two buckets.

**Additional features:**

* Improve each individual model page (richer per-model detail and presentation)
* A new page with a building/folding animation that walks through how a model is assembled
* Folding blueprints generated from the 3D models
* Interactive folding tutorials in 3D, where the camera and instructions guide a viewer through assembly without hands obscuring the paper
* Practical applications of modular origami beyond display, drawing on the structural properties of the units themselves

**System improvements:**

* Accessibility (keyboard navigation, ARIA, focus handling, reduced-motion support)
* Meta tags (titles, descriptions, Open Graph/social previews) for each page

See [CHANGELOG.md](./CHANGELOG.md) for a summary of notable changes.
