//import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js'
// npx vite
import * as THREE from 'three';
import Load from '/src/load.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



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
plane.position.set(-0.9, 1.45, -0.23);  // Colocar el plano más cerca de la cámara o en la posición deseada
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
camera.position.y = 1.5; //Move the camera back
camera.position.x = 0.5; //Move the camera back
camera.rotation.x = -0.5; //Tilt the camera down

//------------------
const TextureLoader = new THREE.TextureLoader();
const wallTexture = TextureLoader.load('resources/textures/rough-wall-texture.jpg');

// Crear una forma con un agujero cuadrado en el medio
const shape = new THREE.Shape();

// Dibujar el contorno exterior del box
shape.moveTo(-7.5, -5);
shape.lineTo(7.5, -5);
shape.lineTo(7.5, 5);
shape.lineTo(-7.5, 5);
shape.lineTo(-7.5, -5);

// Crear un agujero cuadrado en el medio
const hole = new THREE.Path();
hole.moveTo(-2.5, -2.5);
hole.lineTo(2.5, -2.5);
hole.lineTo(2.5, 2.5);
hole.lineTo(-2.5, 2.5);
hole.lineTo(-2.5, -2.5);
shape.holes.push(hole);

// Crear la geometría extruida
const extrudeSettings = {
  depth: 0.2,
  bevelEnabled: false,
  UVGenerator: THREE.ExtrudeGeometry.WorldUVGenerator
};
const windowWall = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// Crear el material y la malla
const windowWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, color: 0x3D85C6 });
const windowWallMesh = new THREE.Mesh(windowWall, windowWallMaterial);

// Posicionar la malla
windowWallMesh.position.set(8, 0, 5);
windowWallMesh.rotation.y = Math.PI / 2;  // Rotar la malla

// Añadir la malla a la escena
scene.add(windowWallMesh);

//------------------

//Pared


const wall = new THREE.BoxGeometry( 15, 10, 0.2 );
const wallMaterial = new THREE.MeshBasicMaterial( {map: wallTexture, color: 0x3D85C6} );
const wallMesh = new THREE.Mesh( wall, wallMaterial );
wallMesh.position.set(1,0,-2.9);
console.log(wallMesh);
group.add( wallMesh );
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

let officeLamp_model;  
loader.load(
  'resources/office_lamp/scene.gltf',
  (gltf) => {
      officeLamp_model = gltf.scene;
      officeLamp_model.rotation.y = 4; // Rotar el modelo
      officeLamp_model.scale.set(0.05, 0.05, 0.05); // Escalar el modelo
      officeLamp_model.position.set(4.2, 0, -1.2);
      //scene.add(model); // Agregar el modelo a la escena
      group.add(officeLamp_model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);

let lavaLamp_model;  
loader.load(
  'resources/lava_lamp/scene.gltf',
  (gltf) => {
    lavaLamp_model = gltf.scene;
    lavaLamp_model.rotation.y = 4; // Rotar el modelo
    lavaLamp_model.scale.set(0.0025, 0.0025, 0.0025); // Escalar el modelo
    lavaLamp_model.position.set(3.4, 0, -1.3);
      //scene.add(model); // Agregar el modelo a la escena
      group.add(lavaLamp_model);  // Añadir el plano al grupo
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
    test_model.scale.set(9, 9, 9); // Escalar el modelo
    test_model.position.set(-0.5, 1.2, -3.7);
      //scene.add(model); // Agregar el modelo a la escena
      group.add(test_model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);


let officeTable_model;
loader.load(
  'resources/office_desk/scene.gltf',
  (gltf) => {
    officeTable_model = gltf.scene;
      //model.rotation.y = 4.7; // Rotar el modelo
      officeTable_model.scale.set(25, 25, 27); // Escalar el modelo
      officeTable_model.position.set(-3.8, -4.61, -2.346);  // Colocar el modelo en la posición deseada
      //scene.add(model); // Agregar el modelo a la escena
      group.add(officeTable_model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);

let board_model;
loader.load(
  'resources/low_poly_notice_board/scene.gltf',
  (gltf) => {
    board_model = gltf.scene;
    board_model.rotation.x = Math.PI/2; // Rotar el modelo
      board_model.scale.set(40, 40, 40); // Escalar el modelo
      board_model.position.set(1.8, 3, -2);  // Colocar el modelo en la posición deseada
      //scene.add(model); // Agregar el modelo a la escena
      group.add(board_model);  // Añadir el plano al grupo
  },
  undefined,
  (error) => {
      console.error('Error al cargar el modelo:', error);
  }
);

scene.add(group);  // Añadir el grupo a la escena


//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

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

//------------------


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

    camera.rotation.y = mouseX * -0.4; // Controlar la inclinación horizontal
    camera.rotation.x = mouseY * 0.4; // Controlar la inclinación vertical

    renderer.render(scene, camera); //Render the scene
}
animate();
//renderer.render(scene, camera); //Render the scene