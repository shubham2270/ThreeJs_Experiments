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

const environment = new THREE.Group();

/**
 * Objects
 */
// Trees
let conePosition = 0;
// storing cone in array to animate in tick function
let treeConeTop = [];
let treeConeMiddle = [];
let treeConeBottom = [];

const coneGeometry = new THREE.ConeBufferGeometry(0.3, 1, 6, 1);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#58c74e"),
});

//  Outputs tree
const makeTree = (x, z, coneX) => {
  const tree = new THREE.Group();
  // Tree cone
  const coneGroup = new THREE.Group();

  const cone1 = new THREE.Mesh(coneGeometry, coneMaterial);
  const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);
  const cone3 = new THREE.Mesh(coneGeometry, coneMaterial);

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
  // Push all cone in array
  treeConeTop.push(cone1);
  treeConeMiddle.push(cone2);
  treeConeBottom.push(cone3);
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
const treeCount = 30;
for (let i = 0; i < treeCount; i++) {
  const x = (Math.random() - 0.5) * 8;
  const z = (Math.random() - 0.5) * 8;
  environment.add(makeTree(x, z));
}

// Clouds

let clouds = [];

const cloudGeometry = new THREE.IcosahedronGeometry(0.5, 0);
const cloudMaterial = new THREE.MeshStandardMaterial({
  color: "#acb3fb",
  // flatShading: true,
});

const makeCloud = (x, y, z) => {
  const cloudGroup = new THREE.Group();
  const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);
  const cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial);
  const cloud3 = new THREE.Mesh(cloudGeometry, cloudMaterial);

  const cloudScale = 0.8;

  cloud1.castShadow = true;
  cloud1.position.y = 3.5;
  cloud2.castShadow = true;
  cloud2.position.y = 3.5;
  cloud2.position.x = 0.5;
  cloud2.scale.set(cloudScale, cloudScale, cloudScale);
  cloud3.castShadow = true;
  cloud3.position.y = 3.5;
  cloud3.position.x = -0.5;
  cloud3.scale.set(cloudScale, cloudScale, cloudScale);
  cloudGroup.add(cloud1, cloud2, cloud3);

  cloudGroup.position.x = x;
  cloudGroup.position.y = y;
  cloudGroup.position.z = z;

  clouds.push(cloudGroup);

  return cloudGroup;
};

// returns small cloud
const makeSmallCloud = (x, y, z) => {
  const cloudGroup = new THREE.Group();
  const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);

  const cloudScale = 0.5;

  cloud1.castShadow = true;
  cloud1.position.y = 3.5;
  cloud1.scale.set(cloudScale, cloudScale, cloudScale);
  cloudGroup.add(cloud1);

  cloudGroup.position.x = x;
  cloudGroup.position.y = y;
  cloudGroup.position.z = z;

  clouds.push(cloudGroup);

  return cloudGroup;
};

const cloudCount = 3;
for (let i = 0; i < cloudCount; i++) {
  const x = (Math.random() - 0.5) * 7;
  const z = (Math.random() - 0.5) * 7;
  const y = Math.random() - 0.5;
  environment.add(makeCloud(x, y, z));
}
const smallCloudCount = 2;
for (let i = 0; i < cloudCount; i++) {
  const x = (Math.random() - 0.5) * 6;
  const z = (Math.random() - 0.5) * 6;
  const y = Math.random() - 0.5 * 2;
  environment.add(makeSmallCloud(x, y, z));
}

makeCloud();

/**
 * Lights
 */
// Directional light
const directionalLight = new THREE.DirectionalLight(0xfeffd1, 1);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
gui.add(directionalLight.shadow.camera, "near").min(0).max(500).step(0.001);
gui.add(directionalLight.shadow.camera, "far").min(0).max(500).step(0.001);
environment.add(directionalLight);

directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.top = 200;
// directionalLight.shadow.camera.right = 200;
// directionalLight.shadow.camera.bottom = -200;
// directionalLight.shadow.camera.left = -2;
// directionalLight.shadow.camera.near = 200;
// directionalLight.shadow.camera.far = 100;
// directionalLight.shadow.radius = 100;

// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

// Ambient Light
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
environment.add(light);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffd500, 0x007a, 0.3);
environment.add(hemisphereLight);
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
environment.add(land);

scene.add(environment);

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
camera.position.x = 8;
camera.position.y = 20;
camera.position.z = 4;
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

let cameraY = 30;
let cameraAnimate = true;
let autoRotate = false;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate Tree cones
  for (let i = 0; i < treeConeTop.length; i++) {
    treeConeTop[i].rotation.x = Math.sin(elapsedTime) * 0.15;
    treeConeMiddle[i].rotation.x = Math.sin(elapsedTime) * 0.12;
    treeConeBottom[i].rotation.x = Math.sin(elapsedTime) * 0.09;
  }

  // Animate clouds
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].position.y = Math.cos(elapsedTime) * 0.1;
  }

  // Animate camera
  const cameraYPos = 20 - elapsedTime * 5;
  const defaultPos = cameraYPos < 3;
  if (defaultPos) {
    cameraAnimate = false;
  }
  if (cameraAnimate) {
    camera.position.y = defaultPos ? 3 : cameraYPos;
    camera.position.z = defaultPos ? 4 : cameraYPos;
  }

  // start auto rotation after daley
  if (!cameraAnimate) {
    setTimeout(() => {
      autoRotate = true;
    }, 500);
  }

  if (autoRotate) {
    environment.rotation.y = Math.PI * 2 * elapsedTime * 0.01;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
