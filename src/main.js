//import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
// npx vite
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();  //Create a scene
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); //FOV, Aspect Ratio, Near, Far
const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(window.innerWidth, window.innerHeight); //Set the size of the renderer
renderer.setPixelRatio(devicePixelRatio); //Set the pixel ratio
document.body.appendChild(renderer.domElement); //Add the renderer to the body; en el podremos poner los objetos 3d

/*const boxGeometry = new THREE.BoxGeometry(1,1,1); //Create a box geometry
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); //Create a material
const mesh = new THREE.Mesh(boxGeometry, material); //Create a mesh
scene.add(mesh); //Add the mesh to the scene*/

camera.position.z = 2; //Move the camera back

// Texture loader
const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load('resources/retro_computer/textures/None_diffuse.png');


const loader = new GLTFLoader();
let model;  

loader.load( 'resources/shiba/scene.gltf', function ( gltf ) {

  model = gltf.scene;


	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );


function animate() {
    requestAnimationFrame(animate); //Call the animate function
    if (model){
      //model.rotation.x += 0.01; //Rotate the mesh
      model.rotation.y += 0.01; //Rotate the mesh
    }
    renderer.render(scene, camera); //Render the scene
}
animate();
//renderer.render(scene, camera); //Render the scene