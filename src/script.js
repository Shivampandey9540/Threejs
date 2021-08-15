import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
//loading

const textureloader = new THREE.TextureLoader();

const normaltexture = textureloader.load("/Texture/NormalMap.png");
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(1, 10, 10);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.9;
material.roughness = 0.3;
material.normalMap = normaltexture;
material.color = new THREE.Color(0x292929);
// const mat = gui.addfolders("material");
// mat.add(material.metalness);
// mat.add(material.roughness);

// gui.add(material, metalness);
// gui.add(material, roughness);
// gui.add(material, normalMap);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
const light = gui.addFolder("light");

scene.add(pointLight);
light.add(pointLight.position, "y").min(-4).max(3).step(0.01);
light.add(pointLight.position, "x").min(-6).max(3).step(0.01);
light.add(pointLight.position, "z").min(-3).max(3).step(0.01);
light.add(pointLight, "intensity").min(0).max(10).step(0.01);

//red light
const pointLight2 = new THREE.PointLight(0xff0000, 2);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;

pointLight2.position.set(-1.9, 1.73, -3);
pointLight2.intensity = 3;
// how to create a folder for  light and other things

const light1 = gui.addFolder("Light 2");
scene.add(pointLight2);

light1.add(pointLight2.position, "y").min(-4).max(3).step(0.01);
light1.add(pointLight2.position, "x").min(-6).max(3).step(0.01);
light1.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
light1.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointlighthelper = new THREE.PointLightHelper(pointLight2, 2);
// scene.add(pointlighthelper);

//blue light
const pointLight3 = new THREE.PointLight(0xe1ff, 2);

pointLight3.position.set(1.9, -1.84, -3);

pointLight3.intensity = 3;

// create a folder for lighting 3
const light2 = gui.addFolder("Light 3");

scene.add(pointLight3);
light2.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight3.position, "x").min(-3).max(10).step(0.01);
light2.add(pointLight3.position, "z").min(-10).max(3).step(0.01);
light2.add(pointLight3, "intensity").min(0).max(3).step(0.01);

// const pointlighthelper2 = new THREE.PointLightHelper(pointLight3, 2);
// scene.add(pointlighthelper2);

//creating a color panale for
const light2Color = {
  color: 0xff0000,
};
light2.addColor(light2Color, "color").onChange(() => {
  pointLight3.color.set(light2Color.color);
});

// folder

/**
 *
 *
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 * set up for mouse move mements
 */
document.addEventListener("mousemove", onDocumentMouseMove);
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //sphere control for mouse movement
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.05 * (targetY - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetX - sphere.rotation.x);
  sphere.rotation.z += 0.05 * (targetY - sphere.rotation.z);
  // Update objects
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
