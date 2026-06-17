import * as THREE from 'three';
import './style.css'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import { bindColorPickers } from './components/colorSelector.js'

// Create a new scene
function createscene() {
  const scene = new THREE.Scene();
  return scene;
}

// Create a material with no color set
function makeMaterial() {
  return new THREE.MeshStandardMaterial({ roughness: 0.2, side: THREE.DoubleSide });
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

  // Light 6 — front (toward the camera) so the camera-facing side is lit
  const light6 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
  light6.position.set(0, 0, 10) //X, Y, Z
  light6.intensity = 100
  scene.add(light6)
}

// Camera
function definecamera(scene, sizes, z = 7) {
  const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = z
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
function configureresize(sizes, controls, scene, camera, renderer) {
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

// Load model and give each part a material (by Solid name, else child order)
function loadgltf(gltf_file, materials, scene) {
  const loader = new GLTFLoader();
  loader.load(gltf_file,
    function (gltf) {
      const model = gltf.scene;
      const children = [...model.children];
      materials.forEach((material, i) => {
        const object = model.getObjectByName('Solid' + (i + 1)) || children[i];
        if (!object) return;
        object.material = material;
        scene.add(object);
      });
    },
    function (error) { console.error(error); }
  );
}

// Render a model from its GLB file and palette
function gltfloader(gltf_file, palette, options = {}) {
  const { cameraZ = 7 } = options;
  const scene = createscene();
  const materials = palette.map(makeMaterial);
  loadgltf(gltf_file, materials, scene);
  bindColorPickers(materials);
  const sizes = definewindowsizes();
  createlights(scene);
  const camera = definecamera(scene, sizes, cameraZ);
  const [canvas, renderer] = definerenderer(sizes, scene, camera);
  const controls = definecontrols(camera, canvas);
  configureresize(sizes, controls, scene, camera, renderer);
  dropdownanimation();
}

export {gltfloader}