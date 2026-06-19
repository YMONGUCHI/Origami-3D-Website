import * as THREE from 'three';
import '../../style.css';
import '../../styles/base.css';
import { prefersReducedMotion, animateNavIn } from '../../utils/motion.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { mountNav } from '../../components/nav.js';
import { mountFooter } from '../../components/footer.js';
import { mountFeaturedStrip } from '../../components/featuredStrip.js';
import { mountGalleryTeaser } from '../../components/galleryTeaser.js';
import { mountStatsRow } from '../../components/statsRow.js';
import './home.css';
mountNav();
mountStatsRow();
mountFeaturedStrip([
  "sonobe/icosahedron/type-1/size-3",   // 270pcs
  "sonobe/octahedron/type-2/size-2",    // 144pcs
  "sonobe/icosahedron/type-2/size-2",   // 360pcs
  "bow-tie/icosahedron",
]);
mountGalleryTeaser([
  { name: "Bow Tie Motif - 30pcs Inverted", src: "/Gallery_PNG/BowTieMotif_30pcs_Inverted.png" },
  { name: "Sonobe - 30pcs", src: "/Gallery_PNG/Sonobe_30pcs.png" },
  { name: "Sonobe - 90pcs", src: "/Gallery_PNG/Sonobe_90pcs.png" },
  { name: "Sonobe - 120pcs", src: "/Gallery_PNG/Sonobe_120pcs.png" },
]);
mountFooter();

// Honor the OS "reduce motion" setting for the auto-spin and color cycling.
const reduceMotion = prefersReducedMotion();

// Scene
const scene = new THREE.Scene();

// Material 1-3
const material1 = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.2,
})
const material2 = new THREE.MeshStandardMaterial({
  color: "#0400ff",
  roughness: 0.2,
})
const material3 = new THREE.MeshStandardMaterial({
  color: "#aa22ff",
  roughness: 0.2,
})

// Import GLTFLoader
// Objects are broken down into three different parts where each one represents a specific color
const loader = new GLTFLoader();
loader.load("/GLB_Files/sonobemoduleicosahedron.glb",
  function(gltf) {
    // Objects
    const model = gltf.scene;
    const object1 = model.children[0]; 
    const object2 = model.children[1];
    const object3 = model.children[2];

    // Assign Objects its default colors
    object1.material = material1;
    object2.material = material2;
    object3.material = material3;

    // Add objects to scene
    scene.add(object1); 
    scene.add(object2);
    scene.add(object3);
  },
  function(error) {
    console.error(error);
  }
);

// Stage sizes (the model area, not the whole window)
const stage = document.querySelector(".hero-stage");
const sizes = {
  width: stage.clientWidth,
  height: stage.clientHeight,
}

// Light 1
const light1 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light1.position.set(0, 10, 10) //X, Y, Z
light1.intensity = 100
scene.add(light1)

// Light 2
const light2 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light2.position.set(0, -10, 10) //X, Y, Z
light2.intensity = 100
scene.add(light2)

// Light 3
const light3 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light3.position.set(0, 0, 10) //X, Y, Z
light3.intensity = 100
scene.add(light3)

// Light 4
const light4 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light4.position.set(0, 0, -10) //X, Y, Z
light4.intensity = 100
scene.add(light4)

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

// Renderer
const canvas = document.querySelector(".webgL")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // Give a sense of weight
controls.enablePen = false // Moving -> This sets it so that you can't move
controls.enableZoom = false // Zooming
controls.autoRotate = !reduceMotion

// Pause auto-rotation while the user drags; resume after 10s idle. Also fade
// the "drag to rotate" hint the first time they grab the model.
const dragHint = document.querySelector('.hero_hint')
const scrollCue = document.querySelector('.hero_scroll')
let resumeTimer
let interacted = false

// Reveal the "drag to rotate" hint after 5s, unless the user already grabbed it.
const hintTimer = setTimeout(() => {
  if (!interacted && dragHint) dragHint.classList.remove('is-hidden')
}, 5000)

controls.addEventListener('start', () => {
  controls.autoRotate = false
  clearTimeout(resumeTimer)
  interacted = true
  clearTimeout(hintTimer)
  if (dragHint) dragHint.classList.add('is-hidden')
})
controls.addEventListener('end', () => {
  resumeTimer = setTimeout(() => { if (!reduceMotion) controls.autoRotate = true }, 1500)
})

// Fade the scroll cue once the user starts scrolling.
window.addEventListener('scroll', () => {
  if (scrollCue && window.scrollY > 10) scrollCue.classList.add('is-hidden')
}, { passive: true })

// Resize
// Allow resizing when the window is scaled up or down
window.addEventListener('resize', () => {
  // Update Sizes to match the model stage
  sizes.width = stage.clientWidth
  sizes.height = stage.clientHeight
  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})
// Stepped color animation, like string lights: hold a 3-color set for HOLD ms,
// then crossfade to the next set over MOVE ms, looping through PALETTES. The
// first set is the original palette, so it starts on the established colors.
const PALETTES = [
  ["#00ff83", "#0400ff", "#aa22ff"],   // green / blue / purple (original)
  ["#d9f0ff", "#a3d5ff", "#83c9f4"],   // light blue / blue / sky blue
  ["#f71735", "#f75c03", "#ffe100"],   // red / orange / yellow
  ["#000000", "#ffffff", "#fff200"],   // black / white / yellow
  ["#aaff00", "#00ffc8", "#0091ff"],   // lime / teal / azure
  ["#ff00aa", "#8a2be2", "#2233ff"],   // magenta / violet / blue
].map((set) => set.map((hex) => new THREE.Color(hex)))

const animStart = performance.now()
const HOLD = 1500   // ms to hold each set
const MOVE = 2000   // ms to crossfade to the next
const STEP = HOLD + MOVE
const loop = () => {
  // Skip the color crossfade under reduced motion; the materials keep their
  // default (original-palette) colors. Rendering still runs so the user can
  // drag to rotate.
  if (!reduceMotion) {
    const tt = (performance.now() - animStart) % (STEP * PALETTES.length)
    const idx = Math.floor(tt / STEP)
    const within = tt - idx * STEP
    const from = PALETTES[idx]
    const to = PALETTES[(idx + 1) % PALETTES.length]
    const p = within <= HOLD ? 0 : (within - HOLD) / MOVE
    const eased = p * p * (3 - 2 * p)    // smoothstep crossfade
    material1.color.copy(from[0]).lerp(to[0], eased)
    material2.color.copy(from[1]).lerp(to[1], eased)
    material3.color.copy(from[2]).lerp(to[2], eased)
  }
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Slide the nav in on load (skipped under reduced motion).
animateNavIn();