import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as dat from 'lil-gui'
import { seededRandom } from 'three/src/math/MathUtils'
//import { BufferGeometry } from '../core/BufferGeometry.js';

THREE.ColorManagement.enabled = false


/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

    //console.log(mouse)
})


// let mouse = new THREE.Vector2(), SELECTED;
// let radius = 100, theta = 0;
// let container = document.getElementById( 'webdolRayCaster' );
const textureLoader = new THREE.TextureLoader()


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0.1, 0.17, 0.22)
scene.fog = new THREE.Fog( 'black', 10, 50 );

//plane
const geometry = new THREE.PlaneGeometry();
const geometry2 = new THREE.PlaneGeometry(5, 5);
const geometry3 = new THREE.PlaneGeometry(2, 2.3);

for (let i = 0; i < 6; i++) {
    const image1Material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(`/images/${i}.jpeg`)
    })

    const img = new THREE.Mesh(geometry3, image1Material)
    img.position.x = Math.random() * 20
    img.position.y = Math.random() * 20
    img.position.z = Math.random() * 20
    img.rotation.y = Math.random() * 10
    img.rotation.x = Math.random() * 10
    //scene.add(img)
}



let objs = []
scene.traverse((object) => {
    if (object.isMesh)
        objs.push(object)
})



//particle
const particlesGeometry = new THREE.BufferGeometry()
const count = 500
const positions = new Float32Array(count * 3)
//const textures = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
    //textures[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


const particlesMaterial = new THREE.PointsMaterial()

const particleTexture = textureLoader.load('texture/dustpng.png')

particlesMaterial.size = 3
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color('white')
particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
//particlesMaterial.alphaTest = 0.001
particlesMaterial.depthWrite = false


const dust = new THREE.Points(particlesGeometry, particlesMaterial)
//scene.add(dust)




//texture

const image1Texture = new THREE.TextureLoader().load("images/1.jpeg");
const image2Texture = new THREE.TextureLoader().load("images/3.jpeg");


//material

const image1Material = new THREE.MeshStandardMaterial(
    { map: image1Texture }

);
const image2Material = new THREE.MeshStandardMaterial(
    { map: image2Texture }
);

const plane = new THREE.InstancedMesh(geometry, image1Material);
const plane2 = new THREE.Mesh(geometry, image2Material);
const plane3 = new THREE.Mesh(geometry, image2Material);



const loader = new THREE.ImageLoader();


//plane 전체단위 랜덤 생성
for (var i = 0; i < 50; i++) {
    const plane = new THREE.Mesh(geometry, image1Material);

    plane.position.x = Math.random() * 20
    plane.position.y = Math.random() * 20
    plane.position.z = Math.random() * 20

    plane.rotation.y = Math.random() * 10
    plane.rotation.x = Math.random() * 10
}


for (var i = 0; i < 50; i++) {
    const plane2 = new THREE.Mesh(geometry, image2Material);

    plane2.position.x = Math.random() * 20
    plane2.position.y = Math.random() * 20
    plane2.position.z = Math.random() * 20

    plane2.rotation.y = Math.random() * 10
    plane2.rotation.x = Math.random() * 10
}

plane2.position.x = Math.random() * 5
plane2.position.y = Math.random() * 5
plane2.position.z = Math.random() * 5
plane2.rotation.x = Math.random() * 5
plane2.rotation.y = Math.random() * 5

plane3.position.x = Math.random() * 5
plane3.position.y = Math.random() * 5
plane3.position.z = Math.random() * 5
plane3.rotation.x = Math.random() * 5
plane3.rotation.y = Math.random() * 5

scene.add(plane2, plane3);


//model 

const gltfLoader = new GLTFLoader()

let mixer = null
let images = null

gltfLoader.load("/models/world_middle/world_middle_images.gltf", (gltf) => {
    images = gltf.scene;
    console.log(images)

    images.position.y = -8
   images.rotation.y = 15
    scene.add(images)
    tick()
}
);


let model2 = null
gltfLoader.load("/models/world_middle/world_middle_videos.gltf", (gltf) => {
    model2 = gltf.scene;
    //model2.color = new THREE.Color('red')
   
    console.log(model2)

    model2.position.y = -4
    scene.add(model2)
    tick()
}
);




let model3 = null
gltfLoader.load("/models/world_middle/world_middle_articles.gltf", (gltf) => {
    model3 = gltf.scene;
    console.log(model3)

    model3.position.y = -6
    scene.add(model3)
    tick()
}
);

let model4 = null
gltfLoader.load("/models/world_middle/world_middle_ads.gltf", (gltf) => {
    model4 = gltf.scene;
    console.log(model4)

    model4.position.y = -7
    scene.add(model4)
    tick()
}
);


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

const pointLight = new THREE.PointLight('red', 1)
pointLight.position.y =2
pointLight.position.z =10
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
// 원근카메라
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 400)
camera.position.set(15, 1, 20)

//이미지 사이즈 비슷하게 보이는 ver
//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(- 5*aspectRatio, 5*aspectRatio, 5, - 5, 0.1, 1000)


scene.add(camera)

gui.add(camera.position, 'x').min(0).max(25)

// Controls
const controls = new OrbitControls(camera, canvas, plane)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true



//카메라 rotation

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


//raycaster
const raycaster = new THREE.Raycaster()
let currentIntersect = null

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    //model.position.y = Math.sin(elapsedTime * 0.3) * 1.5
images.rotation.y = elapsedTime * 0.05

  model2.rotation.y = elapsedTime * 0.05
  model3.rotation.y = elapsedTime * -0.1
  model4.rotation.y = elapsedTime * -0.05

    if (mixer) {
        mixer.update(deltaTime)
    }
    // Update controls
    controls.update()

    camera.lookAt(plane.position);
    dust.rotation.y = elapsedTime * 0.1

    if (images) {
        raycaster.setFromCamera(mouse, camera)   
        const imagesIntersects = raycaster.intersectObject(images)
        
        if (imagesIntersects.length) {
            currentIntersect = imagesIntersects[0].object
            gsap.to(currentIntersect.scale, { duration: .7, x: 10, y: 10, z: 10 });
            gsap.to(currentIntersect.scale, { duration: .7, x: 1, y: 1, z: 1 });
        }
    }

    
    if (model2) {
        raycaster.setFromCamera(mouse, camera)   
        const modelIntersects = raycaster.intersectObject(model2)
        
        if (modelIntersects.length) {
            currentIntersect = modelIntersects[0].object
            gsap.to(currentIntersect.scale, { duration: .7, x: 10, y: 10, z: 10 });
            gsap.to(currentIntersect.scale, { duration: .7, x: 1, y: 1, z: 1 });
        }
    }






    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}


