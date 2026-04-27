import * as THREE from 'three';
import './style.css'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

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

// Window Sizes
const sizes = {
  width: window.innerWidth,
  height:window.innerHeight,
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

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})

//Function main definition
function gltfloader(gltf_file) {
  var scene;
  scene = createscene();
  var material1, material2, material3;
  [material1, material2, material3] = definematerials();
  loadgltf(gltf_file, material1, material2, material3, scene);
  myColor1(material1);
  document.getElementById('colorPicker1').addEventListener('input', function() { myColor1(material1); });
  myColor2(material2);
  document.getElementById('colorPicker2').addEventListener('input', function() { myColor2(material2); });
  myColor3(material3);
  document.getElementById('colorPicker3').addEventListener('input', function() { myColor3(material3); });
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
}

//Function for loading modules with 6 colors
function gltfloader2(gltf_file) {
  var scene;
  scene = createscene();
  var material1, material2, material3, material4, material5, material6;
  [material1, material2, material3, material4, material5, material6] = definematerials2();
  loadgltf2(gltf_file, material1, material2, material3, material4, material5, material6, scene);
  myColor1(material1);
  document.getElementById('colorPicker1').addEventListener('input', function() { myColor1(material1); });
  myColor2(material2);
  document.getElementById('colorPicker2').addEventListener('input', function() { myColor2(material2); });
  myColor3(material3);
  document.getElementById('colorPicker3').addEventListener('input', function() { myColor3(material3); });
  myColor4(material4);
  document.getElementById('colorPicker4').addEventListener('input', function() { myColor4(material4); });
  myColor5(material5);
  document.getElementById('colorPicker5').addEventListener('input', function() { myColor5(material5); });
  myColor6(material6);
  document.getElementById('colorPicker6').addEventListener('input', function() { myColor6(material6); });
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
}

// Create a new scene
function createscene() {
  const scene = new THREE.Scene();
  return scene;
}

function definematerials() {
  const material1 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material2 = new THREE.MeshStandardMaterial({
    color: "#aa22ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material3 = new THREE.MeshStandardMaterial({
    color: "#0400ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  return [material1, material2, material3];
}

// Define new materials
function definematerials2() {
  const material1 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material2 = new THREE.MeshStandardMaterial({
    color: "#aa22ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material3 = new THREE.MeshStandardMaterial({
    color: "#0400ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material4 = new THREE.MeshStandardMaterial({
    color: "#0400ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material5 = new THREE.MeshStandardMaterial({
    color: "#0400ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  const material6 = new THREE.MeshStandardMaterial({
    color: "#0400ff",
    roughness: 0.2,
    side: THREE.DoubleSide,
  })
  return [material1, material2, material3, material4, material5, material6];
}

// Import GLTFLoader
function loadgltf(gltf_file, material1, material2, material3, scene) {
  const loader = new GLTFLoader();

  loader.load(gltf_file, 
  function(gltf) {
    // Objects are broken down into three different parts where each one represents a specific color
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


// Changes color of Object1 into a user's choice
function myColor1(material1) {
  var color = document.getElementById('colorPicker1').value;
  material1.color.set(color);
}

// Changes color of Object2 into a user's choice
function myColor2(material2) {
  var color = document.getElementById('colorPicker2').value;
  material2.color.set(color);
}

// Changes color of Object3 into a user's choice
function myColor3(material3) {
  var color = document.getElementById('colorPicker3').value;
  material3.color.set(color);
}

// Changes color of Object4 into a user's choice
function myColor4(material4) {
  var color = document.getElementById('colorPicker4').value;
  material4.color.set(color);
}

// Changes color of Object5 into a user's choice
function myColor5(material5) {
  var color = document.getElementById('colorPicker5').value;
  material5.color.set(color);
}

// Changes color of Object6 into a user's choice
function myColor6(material6) {
  var color = document.getElementById('colorPicker6').value;
  material6.color.set(color);
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

export {gltfloader}
export {gltfloader2}