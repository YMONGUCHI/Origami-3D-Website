import * as THREE from 'three';
import './style.css';
import gsap from "gsap";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { mountNav } from './components/nav.js';
import { mountFooter } from './components/footer.js';
import { mountFeaturedStrip } from './components/featuredStrip.js';
import { mountGalleryTeaser } from './components/galleryTeaser.js';
import './home.css';
mountNav();
mountFeaturedStrip([
  "sonobe/icosahedron/type-1/size-3",   // 270pcs
  "sonobe/octahedron/type-2/size-2",    // 144pcs
  "sonobe/icosahedron/type-2/size-2",   // 360pcs
  "bow-tie/icosahedron",
  "poke/octahedron",
  "sonobe/plane/hexagon/size-2",        // 72pcs
]);
mountGalleryTeaser([
  { src: "/Gallery_PNG/BowTieMotif_30pcs_Inverted.png", alt: "Bow Tie Motif, 30 pieces, inverted" },
  { src: "/Gallery_PNG/Sonobe_30pcs.png", alt: "Sonobe, 30 pieces" },
  { src: "/Gallery_PNG/Sonobe_90pcs.png", alt: "Sonobe, 90 pieces" },
  { src: "/Gallery_PNG/Sonobe_120pcs.png", alt: "Sonobe, 120 pieces" },
]);
mountFooter();

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
controls.autoRotate = true

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
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop() 

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})