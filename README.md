# Origami 3D Website

A personal website that catalogs and displays 3D models of modular origami pieces I have folded. Each model on the site corresponds to a real paper origami structure I built first, then recreated in Blender and rendered in the browser using Three.js.

**Live demo:** [origami-3d-website.pages.dev](https://origami-3d-website.pages.dev)

## Motivation

I have been folding modular origami since high school, where I founded an origami club, and I have continued the practice into my CS studies. Over time, I accumulated dozens of finished models, but showing them to people meant physically carrying paper structures around or sending photos that flattened the geometry. This project began as a way to display every model I have folded in one place, viewable from any angle, without needing the physical paper in hand.

The site also became useful for planning. Modeling a piece in 3D before folding it lets me work out color arrangements, identify symmetries, and experiment with variations far more easily than with paper alone. A feature on the site now lets users color-code subdivided regions of certain models, which grew out of that planning workflow.

## Approach

The project follows three stages:

**1. Physical folding.** Each origami model on the site was first built by hand from paper. Modular origami pieces (Sonobe, Bow Tie, Poke, Fuse, and several variants) interlock into geometric forms ranging from a 3-piece tetrahedron up to a 360-piece icosahedron.

**2. 3D modeling in Blender.** Each finished origami structure was recreated in Blender, preserving the unit-by-unit construction so that individual pieces remain visible in the rendered model. The completed scenes were exported as `.glb` files for use in the browser.

**3. Web display with Three.js and Vite.** The site is built with Vite as the bundler and Three.js for 3D rendering. Each model has its own page with a description, an embedded interactive 3D viewer, and notes on the folding pattern. The Models page provides a thumbnail-based index, and the Gallery page shows reference photos of the physical originals.

## Technical Notes

The project uses a multi-page architecture rather than a single-page application. Each origami variant has its own HTML entry point, which allowed me to keep individual pages self-contained while sharing common JavaScript and styling. The site contains over sixty pages in total, registered automatically through a `glob`-based scan in the Vite configuration so that new model pages can be added without manual config edits.

The architectural decisions were made along the way as the project grew, which means earlier ones occasionally needed revisiting. For example, the build configuration originally hardcoded only a handful of entry points; updating it to detect every page automatically came later, after the project had grown well beyond what manual registration could handle. Path conventions for static assets (3D models, thumbnails, reference images) were also standardized through the `public/` directory only after the site reached its current scale.

## Status

The site is live and continuously expanding. I plan to keep folding, modeling, and adding pages, and to build out additional features in adjacent directions, including:

* Folding blueprints generated from the 3D models
* Interactive folding tutorials in 3D, where the camera and instructions can guide a viewer through assembly without hands obscuring the paper
* Practical applications of modular origami beyond display, drawing on the structural properties of the units themselves
