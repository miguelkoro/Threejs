// npx vite
import * as THREE from 'three';
import Load from '/src/load.js';
import Habitacion from '/src/habitacion.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();  //Create a scene
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); //FOV, Aspect Ratio, Near, Far
const renderer =  new THREE.WebGLRenderer( { alpha: true } ); //Create a renderer

renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize(window.innerWidth, window.innerHeight); //Set the size of the renderer
renderer.setPixelRatio(devicePixelRatio); //Set the pixel ratio
document.body.appendChild(renderer.domElement); //Add the renderer to the body; en el podremos poner los objetos 3d

const loadjs = new Load();
const loader = loadjs.loadingManager();


//------------------

const habitacion = new Habitacion();
habitacion.iniciarCamara(camera);

//EVENTOS TECLADO Y RATON

window.addEventListener('keydown', (event) => {
  habitacion.keyDownEvent(event.code);
});

window.addEventListener('keyup', (event) => {
  habitacion.keyUpEvent(event.code);
});

const controls = new PointerLockControls(camera, document.body);

document.addEventListener('click', () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  console.log('Pointer locked');
  showPointer();
});

controls.addEventListener('unlock', () => {
  console.log('Pointer unlocked');
  hidePointer();
});


window.addEventListener('mousemove', (event) => {
  //habitacion.mouseMoveEvent(event, window);
});


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('click', (event) => { 
  habitacion.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  habitacion.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  habitacion.onClickRaycaster(camera);

});


//------------------ Controlador del punto central
const point = document.getElementById("center-point");//document.createElement('div');


function showPointer(){  
    point.style.display = 'block';  
}
function hidePointer(){
    point.style.display = 'none';
}

//------------------


habitacion.loadModels(loader, scene);  // Cargar los modelos


/*function createImages(imagesrc){
  var image=new Image()
  image.src=imagesrc+'.png'
  return image;
}
var imgPcWall = createImages('resources/sprites/computer/windowswallpaperXL');*/

//------------------


function animate() {
  requestAnimationFrame(animate); //Call the animate function

  //ctxComputer.drawImage(imgPcWall, 0, 0); 

  habitacion.updateControls(camera);
  habitacion.animate();
  
  renderer.render(scene, camera); //Render the scene
}
animate();