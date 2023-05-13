// in this we use threejs for rendering 3d object and use gsap for animation
import * as THREE from "three";
import { gsap } from "gsap";
import "./style.css";

const scene = new THREE.Scene();

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
//just assume scene as a movie-scene where you need all material, camera, lights
//creating scene with threejs
//define shape of the module
// create the materials
var material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// var material4 = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// create the geometries
var geometry1 = new THREE.CircleGeometry(5, 64);
// var geometry2 = new THREE.CircleGeometry(0.4, 64);
// var geometry3 = new THREE.CircleGeometry(4, 64);
// var geometry4 = new THREE.CircleGeometry(0.4, 64);

// create the meshes
var circle1 = new THREE.Mesh(geometry1, material1);
// var circle2 = new THREE.Mesh(geometry2, material2);
// var circle3 = new THREE.Mesh(geometry3, material3);
// var circle4 = new THREE.Mesh(geometry4, material4);

// set the positions
circle1.position.set(5, 7, 0);
// circle2.position.set(1, 2, 0);
// circle3.position.set(-5, -9, 0);
// circle4.position.set(-1, -5, 0);

// add the meshes to the scene
scene.add(circle1);
// scene.add(circle2);
// scene.add(circle3);
// scene.add(circle4);

// create a new animation mixer and animation clip
const mixer = new THREE.AnimationMixer(circle1);

// create some more complex GSAP animation data
const animationData = {
  tracks: [
    {
      name: "position",
      type: "vector3",
      keys: [
        {
          time: 0,
          value: [0, 0, 0],
        },
        {
          time: 0.5,
          value: [0, 1, 0],
        },
        {
          time: 1,
          value: [0, 0, 0],
        },
        {
          time: 2,
          value: [0, -1, 0],
        },
        {
          time: 2.5,
          value: [0, 0, 0],
        },
      ],
    },
    {
      name: "scale",
      type: "vector3",
      keys: [
        {
          time: 0,
          value: [1, 1, 1],
        },
        {
          time: 0.5,
          value: [2, 2, 2],
        },
        {
          time: 1,
          value: [1, 1, 1],
        },
        {
          time: 2,
          value: [0.5, 0.5, 0.5],
        },
        {
          time: 2.5,
          value: [1, 1, 1],
        },
      ],
    },
    {
      name: "rotation",
      type: "quaternion",
      keys: [
        {
          time: 0,
          value: [0, 0, 0, 1],
        },
        {
          time: 0.5,
          value: [0, 0, Math.sqrt(2) / 2, Math.sqrt(2) / 2],
        },
        {
          time: 1,
          value: [0, 0, 0, 1],
        },
        {
          time: 2,
          value: [0, 0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2],
        },
        {
          time: 2.5,
          value: [0, 0, 0, 1],
        },
      ],
    },
    {
      name: "opacity",
      type: "number",
      keys: [
        {
          time: 0,
          value: 1,
        },
        {
          time: 1,
          value: 0.5,
        },
        {
          time: 2,
          value: 0.1,
        },
        {
          time: 2.5,
          value: 1,
        },
      ],
    },
  ],
};

const animationClip = THREE.AnimationClip.parse(animationData);

// create an animation action from the clip and add it to the mixer
// add a mouseover event listener to the circle
circle1.addEventListener("mouseover", () => {
  // fade in the animation over 0.5 seconds
  const animationAction = mixer
    .clipAction(animationClip, circle1)
    .fadeIn(0.5)
    .play();
});

// add a mouseout event listener to the circle
circle1.addEventListener("mouseout", () => {
  // fade out the animation over 0.5 seconds
  const animationAction = mixer
    .clipAction(animationClip, circle1)
    .fadeOut(0.5)
    .stop();
});

// update loop to advance the mixer

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);
function animate() {
  requestAnimationFrame(animate);
  // mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
animate();
// add eventlistner so when screen resize canvas automatically change its size
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
