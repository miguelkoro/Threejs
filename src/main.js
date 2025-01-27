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

// Crear el canvas HTML y usarlo como textura
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;  // Tamaño del canvas
canvas.height = 1080;  // Tamaño del canvas

const texture = new THREE.CanvasTexture(canvas);  // Usamos el canvas como textura
texture.minFilter = THREE.LinearFilter;  // Asegurarse de que la textura se vea bien al hacer zoom

// Crear un plano y aplicarle la textura
const geometry = new THREE.PlaneGeometry(1.22, 1.05);  // Un plano de tamaño 2x2
const material = new THREE.MeshBasicMaterial({ map: texture });  // Aplicar la textura del canvas
const plane = new THREE.Mesh(geometry, material);
//geometry.rotateY(Math.PI);  // Rotar el plano para que se vea de frente
plane.position.set(-0.02, 0.32, 0.6);  // Colocar el plano más cerca de la cámara o en la posición deseada
plane.rotation.x = -0.09;  // Rotar el plano
// Añadir el plano a la escena
//scene.add(plane);
// Crear el grupo que contendrá el plano y el modelo
const group = new THREE.Group();
group.add(plane);  // Añadir el plano al grupo

// Dibujar algo en el canvas, por ejemplo, un simple texto
ctx.fillStyle = 'white';
ctx.fill();
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = '30px Arial';
ctx.fillText('Contenido del Canvas', 50, 50);



//------------------

camera.position.z = 2; //Move the camera back



const loader = new GLTFLoader();

let model;  

loader.load(
  'resources/90s_computer/scene.gltf',
  (gltf) => {
      model = gltf.scene;
      model.rotation.y = 4.7; // Rotar el modelo
      //scene.add(model); // Agregar el modelo a la escena
      group.add(model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);

scene.add(group);  // Añadir el grupo a la escena


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


function createImages(imagesrc){
  var image=new Image()
  image.src=imagesrc+'.png'
  return image;
}
var imgPcWall = createImages('resources/sprites/computer/windowswallpaperXL');

function animate() {
    requestAnimationFrame(animate); //Call the animate function
    if (model){
      //model.rotation.y += 0.01; //Rotate the mesh
      group.rotation.y += 0.002; //Rotate the mesh
      //model.rotation.y += 0.01; //Rotate the mesh
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
    ctx.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
    ctx.drawImage(imgPcWall, 0, 0);
    // Indicar a Three.js que la textura del canvas ha cambiado
    texture.needsUpdate = true;

    renderer.render(scene, camera); //Render the scene
}
animate();
//renderer.render(scene, camera); //Render the scene