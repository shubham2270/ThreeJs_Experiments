import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);

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

//  Outputs tree
const makeTree = (x, z, coneX) => {
  console.log("called tree");
  const tree = new THREE.Group();
  // Tree cone
  const coneGroup = new THREE.Group();
  const coneGeometry = new THREE.ConeBufferGeometry(0.3, 1, 6, 1);
  const coneMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#58c74e"),
  });
  const cone1 = new THREE.Mesh(coneGeometry, coneMaterial);
  const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);
  const cone3 = new THREE.Mesh(coneGeometry, coneMaterial);
  // cone1.rotation.x = coneX;
  // cone.receiveShadow = true;
  cone1.castShadow = true;
  cone2.castShadow = true;
  cone3.castShadow = true;
  cone1.receiveShadow = true;
  cone2.receiveShadow = true;
  cone3.receiveShadow = true;
  cone1.position.y = 1.3;
  cone2.position.y = 0.9;
  cone3.position.y = 0.5;
  coneGroup.add(cone1, cone2, cone3);
  const randomHeight = Math.random();
  coneGroup.position.y = randomHeight > 0.6 ? 0 : randomHeight;
  tree.add(coneGroup);

  // Tree trunk
  const trunkGeometry = new THREE.BoxBufferGeometry(0.15, 0.15, 1.095);
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#80652b"),
  });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  trunk.rotation.x = 4.7;

  tree.add(trunk);
  tree.position.x = x;
  tree.position.z = z;
  return tree;
};

// No. of tree
const treeCount = 40;
for (let i = 0; i < treeCount; i++) {
  const x = (Math.random() - 0.5) * 8;
  const z = (Math.random() - 0.5) * 8;
  scene.add(makeTree(x, z));
}

// scene.add(tree);

/**
 * Lights
 */
// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.top = 200;
// directionalLight.shadow.camera.right = 200;
// directionalLight.shadow.camera.bottom = -200;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 200;
directionalLight.shadow.radius = 10;

// Ambient Light
const light = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
scene.add(light);
//land
const geometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#c9bf97"),
  side: THREE.DoubleSide,
});
const land = new THREE.Mesh(geometry, material);
land.receiveShadow = true;
land.rotation.x = 1.57;
land.position.y = -0.55;
scene.add(land);

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
camera.position.x = 5;
camera.position.y = 2;
camera.position.z = 5;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();