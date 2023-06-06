// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create ball geometry
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create an array to store ball objects
const balls = [];

// Function to create a new ball and add it to the scene
function createBall() {
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.position.x = Math.random() * 10 - 5; // Random x position between -5 and 5
  ball.position.y = 10; // Start above the scene
  scene.add(ball);
  balls.push(ball);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move balls down
  balls.forEach((ball) => {
    ball.position.y -= 0.1;

    // Reset position if ball falls below a certain threshold
    if (ball.position.y < -5) {
      ball.position.y = 10;
    }
  });

  renderer.render(scene, camera);
}

// Create initial balls
for (let i = 0; i < 10; i++) {
  createBall();
}

// Start the animation
animate();
