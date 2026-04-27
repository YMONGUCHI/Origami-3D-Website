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
  side: THREE.DoubleSide,
})
const material2 = new THREE.MeshStandardMaterial({
  color: "#0400ff",
  roughness: 0.2,
  side: THREE.DoubleSide,
})

// Import GLTFLoader
// Objects are broken down into three different parts where each one represents a specific color
const loader = new GLTFLoader()
loader.load("/GLB_Files/boxtriangle.glb", 
  function(gltf) {
    // Objects
    const model = gltf.scene;
    const object1 = model.children[0]; 
    const object2 = model.children[1];

    // Assign Objects its default colors
    object1.material = material1;
    object2.material = material2;

    // Add objects to scene
    scene.add(object1); 
    scene.add(object2);
    scene.add(object3);
  },
  function(error) {
    console.error(error);
  }
);

// Changes color of Object1 into a user's choice
function myColor1() {
  var color = document.getElementById('colorPicker1').value;
  material1.color.set(color);
}
document.getElementById('colorPicker1').addEventListener('input', myColor1);

// Changes color of Object2 into a user's choice
function myColor2() {
  var color = document.getElementById('colorPicker2').value;
  material2.color.set(color);
}
document.getElementById('colorPicker2').addEventListener('input', myColor2);

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

// Light 5
const light5 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light5.position.set(10, 10, -0) //X, Y, Z
light5.intensity = 100
scene.add(light5)

// Light 6
const light6 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light6.position.set(-10, -10, -0) //X, Y, Z
light6.intensity = 100
scene.add(light6)

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 15
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
controls.enableZoom = true // Zooming
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

