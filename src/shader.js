// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
// import testVertexShader from './shaders/test/vertex.glsl'
// import testFragmentShader from './shaders/test/fragment.glsl'



// const material = new THREE.RawShaderMaterial({
//     vertexShader: `
//         uniform mat4 projectionMatrix;
//         uniform mat4 viewMatrix;
//         uniform mat4 modelMatrix;

//         attribute vec3 position;

//         void main()
//         {
//             gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//         }
//     `,
//     fragmentShader: `
//         precision mediump float;

//         void main()
//         {
//             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//         }
//     `
// })