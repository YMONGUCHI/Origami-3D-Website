import * as THREE from 'three';
import './style.css'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

//Function main definition
function gltfloader(gltf_file) {
  var scene;
  scene = createscene();
  const materials = definematerials();
  loadgltf(gltf_file, materials, scene);
  materials.forEach((m, i) => bindColor(`colorPicker${i + 1}`, m));
  var sizes;
  sizes = definewindowsizes();
  createlights(scene);
  var camera;
  camera = definecamera(scene, sizes);
  var canvas, renderer;
  [canvas,renderer] = definerenderer(sizes, scene, camera);
  var controls;
  controls = definecontrols(camera, canvas);
  configureresize(controls, scene, camera, renderer);
  dropdownanimation();
  setupExpandable();
}

//Function for loading modules with 6 colors
function gltfloader2(gltf_file) {
  var scene;
  scene = createscene();
  const materials = definematerials2();
  loadgltf2(gltf_file, ...materials, scene);
  materials.forEach((m, i) => bindColor(`colorPicker${i + 1}`, m));
  var sizes;
  sizes = definewindowsizes();
  createlights(scene);
  var camera;
  camera = definecamera(scene, sizes);
  var canvas, renderer;
  [canvas,renderer] = definerenderer(sizes, scene, camera);
  var controls;
  controls = definecontrols(camera, canvas);
  configureresize(controls, scene, camera, renderer);
  dropdownanimation();
  setupExpandable();
}

// Create a new scene
function createscene() {
  const scene = new THREE.Scene();
  return scene;
}

// Create a material in our shared style. Color is intentionally not set here:
// each material's color is applied on load from its HTML color picker
// (see bindColor/applyColor), so the picker `value` attributes are the single
// source of truth for the colors.
function makeMaterial() {
  return new THREE.MeshStandardMaterial({ roughness: 0.2, side: THREE.DoubleSide });
}

// Materials for the standard 3-color models (colored via colorPicker1-3).
function definematerials() {
  return Array.from({ length: 3 }, makeMaterial);
}

// Materials for the 6-color models (colored via colorPicker1-6).
function definematerials2() {
  return Array.from({ length: 6 }, makeMaterial);
}

// Import GLTFLoader
function loadgltf(gltf_file, materials, scene) {
  const loader = new GLTFLoader();

  loader.load(gltf_file,
  function(gltf) {
    // Each child of the model is one colored part.
    const model = gltf.scene;
    const objects = [...model.children];
    objects.forEach((object, i) => {
      if (!materials[i]) return;
      object.material = materials[i];
      scene.add(object);
    });
  },
  function(error) {
    console.error(error);
    }
  );
}

function loadgltf2(gltf_file, material1, material2, material3, material4, material5, material6, scene) {
  const loader = new GLTFLoader();

  loader.load(gltf_file, 
  function(gltf) {
    // Objects are broken down into three different parts where each one represents a specific color
    const model = gltf.scene;
    const object1 = model.getObjectByName('Solid1'); 
    const object2 = model.getObjectByName('Solid2');
    const object3 = model.getObjectByName('Solid3');
    const object4 = model.getObjectByName('Solid4');
    const object5 = model.getObjectByName('Solid5');
    const object6 = model.getObjectByName('Solid6');

    // Assign Objects its default colors
    object1.material = material1;
    object2.material = material2;
    object3.material = material3;
    object4.material = material4;
    object5.material = material5;
    object6.material = material6;

    // Add objects to scene
    scene.add(object1); 
    scene.add(object2);
    scene.add(object3);
    scene.add(object4);
    scene.add(object5);
    scene.add(object6);
    },
  function(error) {
    console.error(error);
    }
  );
}

// Changes color of objects into user's choices
function applyColor(pickerId, material) {
  var color = document.getElementById(pickerId).value;
  material.color.set(color);
}

// Set a material's color from a picker, and keep it in sync on change
function bindColor(pickerId, material) {
  applyColor(pickerId, material);
  document.getElementById(pickerId).addEventListener('input', () => applyColor(pickerId, material));
}

// Window Sizes
function definewindowsizes() {
  const sizes = {
    width: window.innerWidth,
    height:window.innerHeight,
  }
  return sizes;
}

// Create lights for the scene
function createlights(scene) {
  // Light 1
  const light1 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light1.position.set(10, 0, 0) //X, Y, Z
  light1.intensity = 100
  scene.add(light1)

  // Light 2
  const light2 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light2.position.set(0, 10, 0) //X, Y, Z
  light2.intensity = 100
  scene.add(light2)

  // Light 3
  const light3 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light3.position.set(-10, 0, 0) //X, Y, Z
  light3.intensity = 100
  scene.add(light3)

  // Light 4
  const light4 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light4.position.set(0, -10, 0) //X, Y, Z
  light4.intensity = 100
  scene.add(light4)

  //Light 5
  const light5 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light5.position.set(0, 0, -10) //X, Y, Z
  light5.intensity = 100
  scene.add(light5)
}

// Camera
function definecamera(scene, sizes) {
  const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 7
  scene.add(camera)
  return camera;
}

// Renderer
function definerenderer(sizes, scene, camera) {
  const canvas = document.querySelector(".webgL")
  const renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(2)
  renderer.render(scene, camera)
  return [canvas, renderer];
}

// Controls
function definecontrols(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true // Give a sense of weight
  controls.enablePen = false // Moving -> This sets it so that you can't move
  controls.enableZoom = true // Zooming
  controls.autoRotate = true
  return controls;
}

// Allow resizing when the window is scaled up or down
function configureresize(controls, scene, camera, renderer) {
  window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
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
}

//Dropdown animation for Navigation
function dropdownanimation() {
  const tl = gsap.timeline({ defaults: { duration: 1} })
  tl.fromTo('nav', {y: "-100%" }, {y: "0%"})
}

// Handler
function setupExpandable() {
  document.body.addEventListener("click", (ev) => {
    if (!ev.target.closest(".expandable_title-bar")) return;
    ev.target.closest(".expandable").classList.toggle("expandable-open");
  });
}

export {gltfloader}
export {gltfloader2}