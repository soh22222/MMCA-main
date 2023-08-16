import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import { seededRandom } from 'three/src/math/MathUtils'
//import { BufferGeometry } from '../core/BufferGeometry.js';

var scene, camera, renderer;
var element = document.getElementById("container");


init();
animate();


// Setup Function
function init() {

  // Setting up Scene, Renderer, Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
  camera.position.z = 200;
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(800, 800);
  element.appendChild(renderer.domElement);
  

  // Magenta-Pink Pointlight
  var L1 = new THREE.PointLight(0xB887ED, 1.5);
  L1.position.z = 450;
  L1.position.y = 200;
  L1.position.x = 200;
  scene.add(L1);
  // Dark Purple Pointlight
  var L2 = new THREE.PointLight(0x436CE8, 1.5);
  L2.position.z = 450;
  L2.position.y = -150;
  L2.position.x = -200;
  scene.add(L2);
  
  
  // Phong material, Grey, Emissive
  var greyPhongMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(100,30,100)"),
    specular: new THREE.Color("rgb(140,70,140)"),
    shininess: 10,
    shading: THREE.FlatShading,
    transparent: 1,
    opacity: 1
  });
  

  // Cube  
  var boxGeo = new THREE.BoxGeometry(40, 40, 40);
  for (var i=0; i<150; i++) {
    box = new THREE.Mesh(boxGeo, greyPhongMat);
    box.position.x = Math.random() * 1000 - 500;
    box.position.y = Math.random() * 1000 - 500;
    box.position.z = Math.random() * 500 - 500;
    scene.add(box);
  }
  
}


// Animation Setup Function
function render() {
  var timer = Date.now() * 0.0001;
  for ( var i=0, l=scene.children.length; i<l; i++ ) {
    var object = scene.children[i];
    object.rotation.x = timer * 8;
    object.rotation.y = timer * 7.5;
  }
  renderer.render(scene, camera);
}



// Animate Function
function animate() {
  requestAnimationFrame(animate);
  render();
}


