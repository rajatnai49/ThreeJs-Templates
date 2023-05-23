// in this we use threejs for rendering 3d object and use gsap for animation
import * as THREE from "three";
import { gsap } from "gsap";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//just assume scene as a movie-scene where you need all material, camera, lights
//creating scene with threejs
const scene = new THREE.Scene();
{
  //define shape of the module
  const geometry = new THREE.SphereGeometry(0.2, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
  });

  //mesh is a combination of shape(geometry) and material
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}

{
  //define shape of the module
  const geometry = new THREE.SphereGeometry(0.3, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
  });

  //mesh is a combination of shape(geometry) and material
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(4, 0, 0);
  scene.add(mesh);
}

{
  //define shape of the module
  const geometry = new THREE.SphereGeometry(0.5, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
  });

  //mesh is a combination of shape(geometry) and material
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(8, 0, 0);
  scene.add(mesh);
}

{
  //define shape of the module
  const geometry = new THREE.SphereGeometry(0.4, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
  });

  //mesh is a combination of shape(geometry) and material
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(10, 0, 0);
  scene.add(mesh);
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//define white light
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
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

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePen = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const rotationSpeeds = [1, 3, 5, 7];

// continuously update scene
const loop = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
