//import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js'
// npx vite
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
//import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';  // Importar RGBELoader


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


// Cargar el entorno HDR
/*const rgbeLoader = new RGBELoader();
rgbeLoader.load('path/to/your/environment.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularRefractionMapping; // Configurar la textura para un mapeo esférico
    scene.background = texture;  // Establecer el fondo de la escena
    scene.environment = texture;  // Establecer la iluminación ambiental de la escena

    // Ahora que la textura HDR está cargada, podemos agregar un modelo o cualquier otro objeto a la escena.
    animate();  // Llamamos a animate después de que el entorno HDR esté listo
});*/

camera.position.z = 2; //Move the camera back

// Cargar texturas
const textureLoader = new TextureLoader();
const baseColor = textureLoader.load('sources/90s_computer/textures/lambert1_baseColor.jpeg');
const emissive = textureLoader.load('sources/90s_computer/textures/lambert1_emissive.jpeg');
const metallicRoughness = textureLoader.load('sources/90s_computer/textures/lambert1_metallicRoughness.png');
const normal = textureLoader.load('sources/90s_computer/textures/lambert1_normal.png');


const loader = new GLTFLoader();

let model;  

loader.load(
  'resources/90s_computer/scene.gltf',
  (gltf) => {
      model = gltf.scene;

      // Recorrer todas las mallas del modelo y asignar el material
      /*model.traverse((child) => {
          if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                  map: baseColor, // Textura base
                  emissiveMap: emissive, // Textura emisiva
                  emissive: new THREE.Color(0x000000), // Color emisivo
                  metalnessMap: metallicRoughness, // Textura de metalness
                  roughnessMap: metallicRoughness, // Textura de roughness
                  normalMap: normal, // Textura normal
              });
          }
      });*/
      model.rotation.y = 2700;
      scene.add(model); // Agregar el modelo a la escena
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate); //Call the animate function
    if (model){
      //model.rotation.x += 0.01; //Rotate the mesh
      //model.rotation.y += 0.01; //Rotate the mesh
    }
    renderer.render(scene, camera); //Render the scene
}
animate();
//renderer.render(scene, camera); //Render the scene