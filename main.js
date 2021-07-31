// import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const ambientOcclusionTexture = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
// const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
// const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
// const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
// const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.manFilter = THREE.NearestFilter;

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true });

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// Cube
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Sphere
const widthSegments = 100;
const heightSegments = 100;
const sphereGeometry = new THREE.SphereBufferGeometry(
  0.5,
  widthSegments,
  heightSegments
);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.receiveShadow = true;
sphere.castShadow = true;
sphere.position.x = 1.3;
scene.add(sphere);

// Cone
const coneGeometry = new THREE.ConeBufferGeometry(0.5, 1, 14, 1);
const coneMaterial = new THREE.MeshNormalMaterial();
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = -1.3;
scene.add(cone);

// light group
const group = new THREE.Group();

// Cylinder: Lamp
const lampGeometry = new THREE.CylinderBufferGeometry(
  0.2,
  0.8,
  0.7,
  13,
  1,
  true
);
const lampMaterial = new THREE.MeshNormalMaterial();
const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
lampMaterial.side = THREE.DoubleSide;
lamp.position.y = 1.3;
lamp.position.x = -2;
lamp.rotation.z = 0.8;
group.add(lamp);

// Ring
const ringGeometry = new THREE.RingBufferGeometry(0.2, 0.6, 30);
const ringMaterial = new THREE.MeshNormalMaterial();
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ringMaterial.side = THREE.DoubleSide;
ring.position.y = 1.3;
ring.position.x = 0;
// ring.rotation.z = -2;
ring.rotation.x = -4.74;
ring.rotation.y = -2.36;
ring.position.x = -2.25;
ring.position.y = 1.55;
group.add(ring);
scene.add(group);

gui
  .add(group.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("group Position X");
gui
  .add(group.position, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("group Position y");
gui
  .add(group.rotation, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("group rotation X");
gui
  .add(group.rotation, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Ring rotation y");

// TorusKnot
const torusGeometry = new THREE.TorusKnotBufferGeometry(0.1, 0.4, 33, 6, 12, 7);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.y = 0.5;
scene.add(torus);

/**
 * Lights
 */

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.radius = 10;

//Plane
const geometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshStandardMaterial({
  color: 0x346f99,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.rotation.x = 4.7;
plane.position.y = -0.55;
scene.add(plane);

/**
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  cube.rotation.y = elapsedTime;
  torus.rotation.y = -elapsedTime;
  group.rotation.y = -elapsedTime * 0.8;

  cone.position.y = Math.sin(elapsedTime * 0.5) + 1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
