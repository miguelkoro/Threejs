//import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js'
// npx vite
import * as THREE from 'three';
import Load from '/src/load.js'; 
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


//import { TextureLoader } from 'three';
//import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';  // Importar RGBELoader

//import { createText } from 'three/addons/jsm/Addons.js';


const scene = new THREE.Scene();  //Create a scene
//scene.background = new THREE.Color( 0xff0000 );
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); //FOV, Aspect Ratio, Near, Far
const renderer =  new THREE.WebGLRenderer( { alpha: true } ); // init like this
renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent

console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(window.innerWidth, window.innerHeight); //Set the size of the renderer
renderer.setPixelRatio(devicePixelRatio); //Set the pixel ratio
document.body.appendChild(renderer.domElement); //Add the renderer to the body; en el podremos poner los objetos 3d

// Crear el canvas HTML y usarlo como textura
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1225;  // Tamaño del canvas
canvas.height = 672;  // Tamaño del canvas

const texture = new THREE.CanvasTexture(canvas);  // Usamos el canvas como textura
texture.minFilter = THREE.LinearFilter;  // Asegurarse de que la textura se vea bien al hacer zoom

// Crear un plano y aplicarle la textura
const geometry = new THREE.PlaneGeometry(1.8, 1.4);  // Un plano de tamaño 2x2
const material = new THREE.MeshBasicMaterial({ map: texture });  // Aplicar la textura del canvas
const plane = new THREE.Mesh(geometry, material);
//geometry.rotateY(Math.PI);  // Rotar el plano para que se vea de frente
plane.position.set(-3.5, 5.3, 0);  // Colocar el plano más cerca de la cámara o en la posición deseada
//plane.rotation.x = -0.0815;  // Rotar el plano
plane.rotation.x = -0.05;  // Rotar el plano
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

// Variables para el control del teclado
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const direction = new THREE.Vector3();
const right = new THREE.Vector3();
const up = new THREE.Vector3(0, 1, 0);

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      moveForward = true;
      break;
    case 'KeyS':
      moveBackward = true;
      break;
    case 'KeyA':
      moveLeft = true;
      break;
    case 'KeyD':
      moveRight = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      moveForward = false;
      break;
    case 'KeyS':
      moveBackward = false;
      break;
    case 'KeyA':
      moveLeft = false;
      break;
    case 'KeyD':
      moveRight = false;
      break;
  }
});


const controls = new PointerLockControls(camera, document.body);

document.addEventListener('click', () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  console.log('Pointer locked');
});

controls.addEventListener('unlock', () => {
  console.log('Pointer unlocked');
});

/*const width = 2;
const height = 1;
const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( -1, 2.5, 1 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )*/

//const rectLightHelper = new RectAreaLightHelper( rectLight );
//rectLight.add( rectLightHelper );

//------------------
//mouse position
// Variables para el seguimiento del ratón
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

//------------------

camera.position.z = 6; //Move the camera back
camera.position.y = 7; //Move the camera back
camera.position.x = 0.5; //Move the camera back
camera.rotation.x = -0.5; //Tilt the camera down

//------------------


//------------------

//Pared


//scene.add( wallMesh );


//------------------
/*const loadingManager = new THREE.LoadingManager();

const loader = new GLTFLoader(loadingManager);
//const loader = new GLTFLoader();

loadingManager.onStart = function (url, itemsLoaded, total) {
  console.log('Loading process has started!');
};
loadingManager.onProgress = function (url, itemsLoaded, total) {
  console.log(`Started loading: ${url}
                number of items loaded: ${itemsLoaded}
                total number of items: ${total}
              `);
};
loadingManager.onLoad = function () {
  console.log('Loading process has been completed!');
};

const progressBar = document.getElementById('progress-bar');

loadingManager.onProgress = function (url, loaded, total) {
progressBar.value = (loaded / total) * 100;
};
const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onLoad = function () {
progressBarContainer.style.display = 'none';
};*/
const loadjs = new Load();
const loader = loadjs.loadingManager();
//------------------
const point = document.createElement('div');
function createPointer(){
    // Crear un elemento div para el punto
   
    point.style.position = 'absolute';
    point.style.width = '4px';
    point.style.height = '4px';
    point.style.backgroundColor = 'white';
    point.style.borderRadius = '50%';
    point.style.left = '50%';
    point.style.top = '50%';
    point.style.transform = 'translate(-50%, -50%)';
    hidePointer();
    document.body.appendChild(point);
}

function showPointer(){
    point.style.display = 'block';
}
function hidePointer(){
    point.style.display = 'none';
}


let officeLamp_model;  
loader.load(
  'resources/Habitacion/ThreejsBlend.gltf',
  (gltf) => {
      officeLamp_model = gltf.scene;
      //officeLamp_model.rotation.y = 4; // Rotar el modelo
      officeLamp_model.scale.set(10, 10, 10); // Escalar el modelo
      //officeLamp_model.position.set(4.2, 0, -1.2);
      //scene.add(model); // Agregar el modelo a la escena
      group.add(officeLamp_model);  // Añadir el plano al grupo

    createPointer();
    showPointer();
   
    
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);



let test_model;  
loader.load(
  'resources/scene-v1/scene.gltf',
  (gltf) => {
    test_model = gltf.scene;
    //test_model.rotation.y = 4; // Rotar el modelo
    test_model.scale.set(10, 10, 10); // Escalar el modelo
    test_model.position.set(-3.1, 4.9, -3.6);
      //scene.add(model); // Agregar el modelo a la escena
      group.add(test_model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);





scene.add(group);  // Añadir el grupo a la escena


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 5, 0);
//directionalLight.rotateX(Math.PI / 2);
scene.add(directionalLight);


function createImages(imagesrc){
  var image=new Image()
  image.src=imagesrc+'.png'
  return image;
}
var imgPcWall = createImages('resources/sprites/computer/windowswallpaperXL');

//------------------

function moverPersonajeHabitacion(){
    // Calcular la dirección de la cámara
    camera.getWorldDirection(direction);
    right.crossVectors(direction, up).normalize();

    // Controlar el movimiento de la cámara con las teclas
    const moveSpeed = 0.2;
    if (moveForward) {
      camera.position.addScaledVector(direction, moveSpeed);
    }
    if (moveBackward) {
      camera.position.addScaledVector(direction, -moveSpeed);
    }
    if (moveLeft) {
      camera.position.addScaledVector(right, -moveSpeed);
    }
    if (moveRight) {
      camera.position.addScaledVector(right, moveSpeed);
    }

    //Restringir el movimiento vertical de la cámara
    if (camera.position.y < initialCameraY || camera.position.y > initialCameraY) {
      camera.position.y = initialCameraY;
    }
}

//------------------
const initialCameraY = camera.position.y;

function animate() {
  requestAnimationFrame(animate); //Call the animate function
  //if (model){
    //model.rotation.y += 0.01; //Rotate the mesh
    //group.rotation.y += 0.01; //Rotate the mesh
    //model.rotation.y += 0.01; //Rotate the mesh
  //}

  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
  ctx.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgPcWall, 0, 0);
  // Indicar a Three.js que la textura del canvas ha cambiado
  texture.needsUpdate = true;

  moverPersonajeHabitacion();
  
  renderer.render(scene, camera); //Render the scene
}
animate();
//renderer.render(scene, camera); //Render the scene