# Changelog

## Unreleased

### SEO & sharing

- **Added per-page meta tags** across all 68 pages: a `<title>`,
  a `<meta name="description">`, and Open Graph / Twitter Card tags, so shared
  links unfurl with a real title, description, and preview image.
- **Generated them data-driven** via a re-runnable script
  (`scripts/inject-meta.mjs`): the four main pages come from a small config, and
  each model page's tags are derived from `models.js` by its `data-model` slug
  (description from shape and piece count, `og:image` from the model thumbnail).
  The injected block is wrapped in `<!-- meta:auto -->` markers, so re-running
  after adding a model refreshes it in place rather than duplicating.

### Accessibility

- **Reduced-motion support.** A `prefers-reduced-motion` media query neutralizes
  CSS animations and transitions site-wide, and a shared `src/utils/motion.js`
  gates the JS-driven motion: the 3D models no longer auto-rotate, the homepage
  color cycling holds its original palette, and the nav slide-in is skipped.
  Dragging to rotate still works.
- **Keyboard focus.** Added a visible `:focus-visible` ring (site accent) across
  the dark theme, turned the info-card toggle from a non-focusable `<div>` into a
  real `<button>` with `aria-expanded`, and stopped suppressing the focus outline
  on the search inputs.
- **Descriptive alt text.** Catalog, gallery, and homepage images now describe
  the model (piece count, family, shape; "hand-folded" for the real-model photos)
  via a shared `src/data/altText.js`, instead of repeating the bare name. The
  info-card piece image gained alt text and its decorative chevron is now hidden
  from assistive tech.

## v1.1 — First patch

The first major update since the initial commit. This patch covers a near-complete
rewrite of the project's architecture, the move to a central data layer, a reusable
component system, and a built-out homepage. Changes are grouped by theme below.

### Architecture

- **Moved all source under `src/`** and grouped pages into `model_pages/` and
  `pages/` directories for a clear, predictable layout.
- **Introduced a central data layer** (`src/data/`): `models.js` is now the single
  source of truth for every model, and `galleryPhotos.js` for the gallery. Both the
  catalog and the homepage read from these.
- **Reduced each model page to a thin stub.** Per-model information moved into
  `models.js`, and each `index.html` was minimized to a `data-model` slug hydrated
  by a shared loader. This removed roughly 5,400 lines of duplicated markup.
- **Made the Models page data-driven**, reading and ordering its cards from
  `models.js` rather than hardcoded entries.
- **Simplified `main.js`** into a reusable viewer library, separated from
  page-specific code, and hoisted the duplicated info-card handler into a shared
  loader.
- **Consolidated the 3-color model pages** onto the shared root `style.css`.
- **Formalized the `models.js` data contract**: required fields (`name`, `glb`,
  `thumbnail`, `palette`) plus optional geometry metadata, with the info panel
  rendering only the fields a model carries. Standardized static-asset paths under
  `public/` (`GLB_Files`, `Models_PNG`, `Individual_Pieces`, `Gallery_PNG`).

### Features

- **Catalog grouping** on the Models page, switchable by Type, Shape, or Pieces,
  with a fixed display order for known families and shapes and an "Other" bucket
  for unset values.
- **Live search** that filters the catalog as you type, matching against each
  model's name, type, shape, and slug, with a "no results" state.
- **Live color selector** on every viewer page: one picker per palette entry,
  bound to the model's materials by index, recoloring in real time.
- **Expandable info card** that renders only the metadata a model has, with
  click-to-expand wired via event delegation.
- **Interactive 3D viewer** with `OrbitControls` (rotate, pan, zoom) and damping.
- **Auto-rotation with interaction pause**: models spin on their own, pause when
  grabbed, and resume after an idle delay.
- **Floating scroll-to-top button** that fades in past 400px and smooth-scrolls
  to the top.

### Components

- **Added a reusable component system** (`src/components/`), each module shipping
  its own CSS: shared `nav` and `footer`, a `backToTop` button, the expandable
  `infoCard`, the `colorSelector` overlay, and the homepage's `featuredStrip`,
  `galleryTeaser`, and `statsRow`.

### Homepage

- **Built out the homepage** beyond the bare 3D hero: intro, live stats band,
  featured-models strip, gallery teaser, and about blurb.
- **Added responsiveness and a custom entrance animation**, with supporting
  `home.css`/`home.js`.
- **Hero color cycling**: the homepage model crossfades through a set of palettes
  on a timed smoothstep loop.
- **Hero interaction cues**: an animated "drag to rotate" hint (breathing text
  with a spinning glyph) and a bouncing scroll-cue chevron, both fading out on
  first interaction.
- **Live stats** are derived from the data layer, so counts stay accurate as the
  catalog grows.
- **Updated the homepage catchphrase.**

### Content & polish

- **Renamed the site** from "Origami Club" to "Origami Collection" across all pages.
- **Added a shared footer** and updated the About section.
- **Reworked the model metadata fields** in `models.js` so each model carries
  consistent, optional geometry data.
- **Improved navigation and the Models interface**, with responsiveness fixes
  throughout.
- **Unified hover and motion polish**: a shared accent color on hover for all
  clickable text, a lift-on-hover effect for model cards, and a rotating chevron
  on the info card's expand toggle.
