import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
{
  const geometry = new THREE.SphereGeometry(15, 64, 64);
  const material = new THREE.PointsMaterial({
    size: 0.2,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
}
{
  const geometry = new THREE.SphereGeometry(10, 32, 32);
  const material = new THREE.PointsMaterial({
    size: 0.1,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
}

{
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.PointsMaterial({
    size: 0.05,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.y = 20;
camera.position.x = 2;
camera.position.z = 4;
scene.add(camera);

const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;

controls.enableZoom = false;
controls.autoRotateSpeed = 5;

// Continuously update the scene
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
