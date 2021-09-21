// import './style.css';
// import * as THREE from 'three';

// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// // import * as THREE from './node_modules/three/src/Three.js'

// //all about scene, camera and render
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGL1Renderer({
//   canvas: document.querySelector('#bg'),
// });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize( window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// renderer.render(scene, camera);

// // creamos un objeto, le damos forma y textura y luego lo renderizamos
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshPhongMaterial({ color:0x1d5cc2});
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// // luz direccionada desde un punto
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(0,20,20)

// // soft white light
// const ambientLight = new THREE.AmbientLight( 0xffffff );
// ambientLight.position.set(5,5,5)
// scene.add( pointLight, ambientLight );

// // helper de la luz. no funciona
// // const pointLightHelper = new THREE.PointLightHelper( pointLight );
// // scene.add( pointLightHelper );
// // grid sobre el plano x
// // scene.add(new THREE.GridHelper(200, 50))


// //orbit controls
// //const controls = new OrbitControls(camera, renderer.domElement);

// //random populating(?) the space
// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
//   const star = new THREE.Mesh(geometry, material);
//   //generamos de forma random la posicion de las estrellas
//   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
//   star.position.set(x,y,z);
//   scene.add(star);
// }
// Array(200).fill().forEach(addStar);

// //background image
// const spaceTexture = new THREE.TextureLoader().load('space3.jpg');
// scene.background = spaceTexture;

// //sphere with texture
// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3,32,32),
//   new THREE.MeshStandardMaterial( {
//     map: moonTexture,
//     normalMap: normalTexture
//   })
// )
// //dos modos de asignar posicion. Funcionan igual
// moon.position.z = 30;
// moon.position.setX(-10);
// scene.add(moon)

// //funcion para mover la camara. Tiene un glitch al inicio del movimiento(resuelto. causado por ls controles)
// function moveCamera () {
//   const t = document.body.getBoundingClientRect().top;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;

// //creamos una funcion que nos evita tener que llamar a cada rato a "renderer.render(scene, camera)"
// function animate(){
//   requestAnimationFrame ( animate );

//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.01;

//   //moon.rotation.x += 0.01;
//   moon.rotation.y += 0.005;
//   moon.rotation.z += 0.01;
  
//   //esto causa un glitch al inicio del scrolling
//   //controls.update();
//   renderer.render( scene, camera);
// }
// animate();

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x505170, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space3.jpg');
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('');

// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), 
// new THREE.MeshBasicMaterial({ color:0x505170  }));

//scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 2;

// sphere earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const material3 = new THREE.MeshStandardMaterial( { map : earthTexture, normalMap: normalTexture } );
const geometry3 = new THREE.SphereGeometry(2, 32, 32);
const dode = new THREE.Mesh(geometry3, material3);
scene.add(dode);
dode.position.z = -5;
dode.position.x = 2;



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  dode.rotation.y += 0.01;
  //dode.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  //dode.rotation.x += 0.01;
  dode.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
