// in this we use threejs for rendering 3d object and use gsap for animation
import * as THREE from "three";
import { gsap } from "gsap";
import "./style.css";
import CANNON from "cannon";

var world = new CANNON.World();
world.gravity.set(0, 0, -9.82);

var radius = 0.5;
var sphereBody = new CANNON.Body({
  mass: 5,
  position: new CANNON.Vec3(0, 0, 10),
  shape: new CANNON.Sphere(radius),
});
world.addBody(sphereBody);

var groundBody = new CANNON.Body({
  mass: 0,
});

var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

var fixedTimeStep = 1.0 / 60.0;
var maxSubSteps = 3;

var lastTime;
(function simloop(time) {
  requestAnimationFrame(simloop);
  if (lastTime != undefined) {
    var dt = (time - lastTime) / 1000;
    world.step(fixedTimeStep, dt, maxSubSteps);
  }
  console.log("Sphere z position: " + sphereBody.position.z);
  lastTime = time;
})();
