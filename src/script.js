import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as dat from 'lil-gui'
import { seededRandom } from 'three/src/math/MathUtils'
//import { BufferGeometry } from '../core/BufferGeometry.js';

THREE.ColorManagement.enabled = false

let mouse = new THREE.Vector2(), SELECTED;
let radius = 100, theta = 0;
let container = document.getElementById( 'webdolRayCaster' );



/**
 * Base
 */
// Debug
const gui = new dat.GUI()



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//plane
const geometry = new THREE.PlaneGeometry( undefined, undefined);
const geometry2 = new THREE.PlaneGeometry( 5, 5 );




//texture
const image1Texture = new THREE.TextureLoader().load("image/1.jpg");
const image2Texture = new THREE.TextureLoader().load("image/003.jpg");
//const image3Texture = textureLoader.load("image/3.jpg");
//const imageLoader= new THREE.ImageLoader();



//material
//const material = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide} );
const image1Material =new THREE.MeshStandardMaterial(
    {map:image1Texture}
  
    );
const image2Material =new THREE.MeshStandardMaterial(
    {map:image2Texture}
    );

const plane = new THREE.InstancedMesh( geometry, image1Material );
const plane2 = new THREE.Mesh( geometry, image2Material );
const plane3 = new THREE.Mesh( geometry, image2Material );



const loader = new THREE.ImageLoader();


//plane 전체단위 랜덤 생성
for(var i = 0; i <50; i++){
    const plane = new THREE.Mesh( geometry, image1Material );
    const plane2 = new THREE.Mesh( geometry, image2Material );
    const plane3 = new THREE.Mesh( geometry, image2Material );

    plane.position.x= Math.random()*20
    plane.position.y= Math.random()*20
    plane.position.z= Math.random()*20
    
    plane.rotation.y= Math.random()*10
    plane.rotation.x= Math.random()*10
   // plane.rotation.set(Math.PI/2,0,0)
    
    scene.add( plane, plane2, plane3 );
}


for(var i = 0; i <50; i++){
    
    const plane2 = new THREE.Mesh( geometry, image2Material );

    
    plane2.position.x= Math.random()*20
    plane2.position.y= Math.random()*20
    plane2.position.z= Math.random()*20
    
    plane2.rotation.y= Math.random()*10
    plane2.rotation.x= Math.random()*10
   // plane.rotation.set(Math.PI/2,0,0)
    
    scene.add( plane2 );
}



plane2.position.x = Math.random()*5
plane2.position.y= Math.random()*5
plane2.position.z= Math.random()*5
plane2.rotation.x= Math.random()*5
plane2.rotation.y= Math.random()*5

plane3.position.x= Math.random()*5
plane3.position.y= Math.random()*5
plane3.position.z= Math.random()*5
plane3.rotation.x= Math.random()*5
plane3.rotation.y= Math.random()*5



scene.add( plane2, plane3 );


_zoomFit(Object3D, camera); {
const box = new THREE.Box3().setFromObject(Object3D);
const sizeBox = box.getSize(new THREE.Vector3()).length();
const centerBox = box.getCenter(new THREE.Vector3());

const halfSizeModel = sizeBox * 0.5;
const halfFov = THREE.Math.degToRad(this._camera.fov * .5);
const distance = halfSizeModel / Math.tan(halfFov);

const direction = (new THREE.Vector3()).subVectors(
    camera.position, centerBox).normalize();

const position = direction.multiplyScalar(distance).add(centerBox);
camera.position.copy(position);

camera.near = sizeBox/100;
camera.far = sizeBox*100;
camera.updateProjectionMatrix();
camera.lookAt(centerBox.x, centerBox.y, centerBox.z);
}


//model
var cloud;
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    'models/cloud/cloud.gltf',
    
    (gltf) =>
    {
        cloud = gltf.scene;
        scene.add(cloud)
        _zoomFit(root, camera);
    }
)




//raycast









/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 150
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 40)
camera.position.set(15, 15, 15)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true



//카메라 rotation
//controls.autoRotate = true;



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
const cursor = {
    x: 0,
    y: 0
}



const tick = () =>
{
    


    const elapsedTime = clock.getElapsedTime();
  
    plane.position.x = Math.cos(elapsedTime);
    plane.position.y = Math.sin(elapsedTime);
    camera.lookAt(plane.position);
  
    renderer.render(scene, camera);
  
    window.requestAnimationFrame(tick);
    
}

tick()

