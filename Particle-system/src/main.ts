// in this we use threejs for rendering 3d object and use gsap for animation
import * as THREE from "three";
import { gsap } from "gsap";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//just assume scene as a movie-scene where you need all material, camera, lights
//creating scene with threejs
const scene = new THREE.Scene();
const count = 1000;
const particles = [];
for (let i = 0; i < count; i++) {
  const time = Math.random() * 100;
  const factor = Math.random() * 100 + 20;
  const speed = (Math.random() * 0.015 + 0.01) / 2;
  const x = Math.random() * 100 - 50;
  const y = Math.random() * 100 - 50;
  const z = Math.random() * 100 - 50;
  particles.push({ time, factor, speed, x, y, z });
}

// Create the mesh and add it to the scene
const geometry = new THREE.DodecahedronGeometry(0.2);
const material = new THREE.MeshPhongMaterial({ color: "#050505" });
const mesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//define white light
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// add eventlistner so when screen resize canvas automatically change its size
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// continuously update scene
const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
