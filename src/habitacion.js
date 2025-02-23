import * as THREE from 'three';
//import Canvas from '/src/canvas.js'; 
import Ordenador from '/src/ordenador.js';
import Television from '/src/television.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Habitacion{
    constructor(){

        //Inicializar objetos
        this.computer_model = null;
        this.room_model = null;
        this.television_model = null;
        this.postit_model = null;

        //Para manejar la camara
        this.direction = new THREE.Vector3();
        this.right = new THREE.Vector3();
        this.up = new THREE.Vector3(0, 1, 0);

        this.mouse = new THREE.Vector2();

        //Para manejar el movimiento de la camara
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        //Velocidad movimiento personaje
        this.moveSpeed = 0.2;

        //Limites de la habitacion
        this.minX = -8;
        this.maxX = 9;
        this.minZ = 2;
        this.maxZ = 18;

        //Para guardar los valores de la camara antes de meterme en el pc o tele
        this.camX = 0;
        this.camY = 0;
        this.camZ = 0;
        this.camRotX = 0;
        this.camRotY = 0;
        this.camRotZ = 0;

        this.rotarCamara = true;
        this.moverCamara = true;

        this.controls = null;
        this.camera = null;

        this.centrado = false; //Para controlar cuando la camara ha hecho zoom en el pc o tele

        this.salirMensaje = document.getElementById('salir');
        this.pointer = document.getElementById('center-point');

    }

    iniciarCamara(camera){
        camera.position.z = 6; //Move the camera back
        camera.position.y = 7; //Move the camera back 7
        camera.position.x = 0.5; //Move the camera back
        camera.rotation.x = -0.5; //Tilt the camera down

        //this.controls = new PointerLockControls(camera, document.body);
        this.camera=camera;
    }
    iniciarControls(control){
        this.controls = control;
    }

    keyDownEvent(event){
        if(!this.centrado){
            switch (event) {
                case 'KeyW':
                  this.moveForward = true;
                  break;
                case 'KeyS':
                    this.moveBackward = true;
                  break;
                case 'KeyA':
                    this.moveLeft = true;
                  break;
                case 'KeyD':
                    this.moveRight = true;
                  break;
              }
        }else{
            if(event=='Space'){
                this.controls.lock();
                this.centrado = false;
                //this.rotarCamara = true;
                this.camera.position.x = this.camX;
                this.camera.position.y = this.camY;
                this.camera.position.z = this.camZ;
                this.camera.rotation.x = this.camRotX;
                this.camera.rotation.y = this.camRotY;
                this.camera.rotation.z = this.camRotZ;

                this.salirMensaje.style.display = 'none';
            }
        }
    }

    keyUpEvent(event){
        if(!this.centrado){
            switch (event) {
                case 'KeyW':
                    this.moveForward = false;
                break;
                case 'KeyS':
                    this.moveBackward = false;
                break;
                case 'KeyA':
                    this.moveLeft = false;
                break;
                case 'KeyD':
                    this.moveRight = false;
                break;
            }
        }
    }

    clickEvent(controls, event){
        if(!this.centrado){
            controls.lock();
        }
    }

    mouseMoveEvent(camera){
        if(!this.centrado){
            // Establecer el rayo desde la cámara y la posición del ratón
            this.raycaster = new THREE.Raycaster();
            this.mouse.set(0,0)
            this.raycaster.setFromCamera(this.mouse, camera);

            if(this.computer_model != null && this.television_model != null){
                this.intersects = this.raycaster.intersectObject(this.computer_model, true);
                this.television_intersects = this.raycaster.intersectObject(this.television_model, true);

                if (this.intersects.length > 0) {
                    //console.log("PC"); 
                    this.pointer.style.backgroundColor = 'green';      
                }else if(this.television_intersects.length > 0){
                    //console.log("TV");
                    this.pointer.style.backgroundColor = 'green';
                }else{
                    this.pointer.style.backgroundColor = 'white';
                }
            }
        }
    }

    updateControls(camera){

        if(!this.centrado){
            let initialCameraY = camera.position.y;

            camera.getWorldDirection(this.direction);
            this.right.crossVectors(this.direction, this.up).normalize();
            this.moveSpeed = 0.2;

            // Guardar la posición anterior de la cámara
            let previousPosition = camera.position.clone();
            // Restringir el movimiento de la cámara dentro de los límites
            
            if (this.moveForward) {
                camera.position.addScaledVector(this.direction, this.moveSpeed);
            }
            if (this.moveBackward) {
                camera.position.addScaledVector(this.direction, -this.moveSpeed);
            }
            if (this.moveLeft) {
                camera.position.addScaledVector(this.right, -this.moveSpeed);
            }
            if (this.moveRight) {
                camera.position.addScaledVector(this.right, this.moveSpeed);
            }
                
            // Restringir el movimiento de la cámara dentro de los límites
            if (camera.position.x < this.minX || camera.position.x > this.maxX || camera.position.z < this.minZ || camera.position.z > this.maxZ) {
                camera.position.copy(previousPosition); // Revertir a la posición anterior si se exceden los límites
            }

            //Restringir el movimiento vertical de la cámara
            camera.position.y = initialCameraY;        
        }
    }

    loadModels(loader, scene){
        // Crear el grupo que contendrá el plano y el modelo
        this.group = new THREE.Group();       

        this.room_model;  
        loader.load(
        'resources/Habitacion/ThreejsBlend2.gltf',
        (gltf) => {
            this.room_model = gltf.scene;
            this.room_model.scale.set(10, 10, 10); // Escalar el modelo
            this.group.add(this.room_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );

        this.computer_model;  
        loader.load(
        'resources/scene-v1/scene.gltf',
        (gltf) => {
            this.computer_model = gltf.scene;
            //test_model.rotation.y = 4; // Rotar el modelo
            this.computer_model.scale.set(10.5, 10.5, 10.5); // Escalar el modelo
            this.computer_model.position.set(-2.9, 5, -4);
            //scene.add(model); // Agregar el modelo a la escena
            this.group.add(this.computer_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );

        this.television_model;  
        loader.load(
        'resources/television/TV.gltf',
        (gltf) => {
            this.television_model = gltf.scene;
            this.television_model.rotation.y = Math.PI;
            this.television_model.scale.set(1.8, 1.8, 1.8); // Escalar el modelo
            this.television_model.position.set(9, 4, 7.7);
            //scene.add(this.television_model); // Agregar el modelo a la escena
            this.group.add(this.television_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );

        this.postit_model;  
        loader.load(
        'resources/postit/postit.gltf',
        (gltf) => {
            this.postit_model = gltf.scene;          
            this.postit_model.rotation.y = -Math.PI/2;
            

            this.postit_model.scale.set(0.5, 0.5, 0.5); // Escalar el modelo
            this.postit_model.position.set(6.5, 8, -3.2);
            //scene.add(this.television_model); // Agregar el modelo a la escena
            this.group.add(this.postit_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );
        
        scene.add(this.group);  // Añadir el grupo a la escena


        this.lights(scene);
        this.computerCanvas(loader);
        this.televisionCanvas(loader);
        this.addTextToObject(scene, 'Texto sobre el objeto', { x: 1, y: 2, z: 3 });
    }

    addTextToObject(scene, text, position) {
        const loader = new FontLoader();
        loader.load('resources/fonts/Neon.json', (font) => {
            const geometry = new TextGeometry(text, {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false,
            });

            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(geometry, material);

            textMesh.position.set(position.x, position.y, position.z);
            scene.add(textMesh);
        });
    }

    computerCanvas(loader){
        this.ordenador = new Ordenador();
        this.ordenador.loadImages(loader);
        this.group.add(this.ordenador.getPlane());
    }

    televisionCanvas(loader){
        this.television = new Television();
        this.television.loadImages(loader);
        this.group.add(this.television.getPlane());
    }

    lights(scene){
        //const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight = new THREE.AmbientLight(0x4E63CA, 0.3);
        scene.add(this.ambientLight);
        //scene.add(ambientLight);

        this.lava_light = new THREE.PointLight(0xDE5D5D, 1.5, 10);
        this.lava_light.position.set(9.2, 3.8, 2.8);
        scene.add(this.lava_light);

        this.computer_light = new THREE.PointLight(0x52B4FF, 2.5, 10);
        this.computer_light.position.set(-3.3, 5.5, -0.1);
        scene.add(this.computer_light);

        this.lamp_light = new THREE.PointLight(0xf3FEBE, 1.2, 3.5,2.2);
        this.lamp_light.position.set(0.678, 5.186, -0.687);
        scene.add(this.lamp_light);

        this.bedLamp_light = new THREE.PointLight(0xf3FEBE, 2.5, 2.5, 2.8);
        this.bedLamp_light.position.set(9.1, 3.7, 17.6);
        scene.add(this.bedLamp_light);

        this.ceilingLamp_light = new THREE.PointLight(0xF8FECD, 2, 0, 1.8);
        this.ceilingLamp_light.position.set(0, 13.75, 13.1);
        scene.add(this.ceilingLamp_light);

        this.ceilingLamp_light2 = new THREE.DirectionalLight(0xF8FECD, 0.1);
        this.ceilingLamp_light2.position.set(0, 13.75, 13.1);
        scene.add(this.ceilingLamp_light2);

        this.television_light = new THREE.PointLight(0x75FFFD, 2.5, 10);
        this.television_light.position.set(8, 4, 7.34);
        scene.add(this.television_light);

        this.despertador_light = new THREE.PointLight(0xFF5252, 0.22, 0, 1.5);
        this.despertador_light.position.set(8.27, 2.38, 16.621);
        scene.add(this.despertador_light);

        this.floorLamp_light0 = new THREE.PointLight(0xFEFA90, 1.5, 0, 2);
        this.floorLamp_light0.position.set(-8.94, 9.27, -1);
        scene.add(this.floorLamp_light0);

        this.floorLamp_light1 = new THREE.PointLight(0xFEFA90, 1.5, 0, 2);
        this.floorLamp_light1.position.set(-10.7, 6.46, -0.74);
        scene.add(this.floorLamp_light1);

        /*this.floorLamp_light2 = new THREE.PointLight(0xFEFA90, 1.5, 0, 2);
        this.floorLamp_light2.position.set(-9, 3.5, -1.74);
        scene.add(this.floorLamp_light2);*/

        /*this.companyCube_light = new THREE.PointLight(0xFC66FF, 0.5, 0, 2);
        this.companyCube_light.position.set(10, 9.65, 8.81);
        scene.add(this.companyCube_light);*/
    
    }

    animate(){
        this.ordenador.animate();
        this.television.animate();
    }

    saveCamarasPosition(camera){
        this.camX = camera.position.x;
        this.camY = camera.position.y;
        this.camZ = camera.position.z;
        this.camRotX = camera.rotation.x;
        this.camRotY = camera.rotation.y;
        this.camRotZ = camera.rotation.z;
    }

    onClickRaycaster(camera){
        if(!this.centrado){
            // Establecer el rayo desde la cámara y la posición del ratón
            this.raycaster = new THREE.Raycaster();
            this.mouse.set(0,0)
            this.raycaster.setFromCamera(this.mouse, camera);

            if(this.computer_model != null){
                this.intersects = this.raycaster.intersectObject(this.computer_model, true);

                if (this.intersects.length > 0) {
                    // Hacer zoom hacia el objeto
                    /*this.targetPosition = this.intersects[0].point;
                    camera.position.lerp(this.targetPosition, 0.1);*/
                    console.log("PC");
                    this.saveCamarasPosition(camera);
                    camera.position.x = -2.9;
                    camera.position.y = 5.45;
                    camera.position.z = 1.2;
                    //camera.rotation.x = -0.5;
                    camera.lookAt(this.computer_model.position); // Hacer que la cámara mire hacia el objeto
                    camera.position.x = -3.2;
                    //camera.rotation.y = -0.5;
                    //this.moverCamara = false;
                    this.centrado = true;

                    this.hidePointer();
                    this.controls.unlock();

                    this.salirMensaje.style.display = 'block';
                    //camera.rotation.x = 0;
                    
                }
            }

            if(this.television_model != null){
                this.television_intersects = this.raycaster.intersectObject(this.television_model, true);

                if (this.television_intersects.length > 0) {
                    // Hacer zoom hacia el objeto
                    /*this.targetPosition = this.intersects[0].point;
                    camera.position.lerp(this.targetPosition, 0.1);*/
                    console.log("TV");
                    this.saveCamarasPosition(camera);
                    camera.position.x = 6.5;
                    camera.position.y = 3.95;
                    camera.position.z = 7;
                    //
                    camera.lookAt(this.television_model.position); // Hacer que la cámara mire hacia el objeto
                    camera.rotation.y = -Math.PI/2;
                    camera.position.z = 7.4;
                    //camera.rotation.y = -0.5;
                    //this.moverCamara = false;
                    this.centrado = true;

                    this.hidePointer();
                    this.controls.unlock();

                    this.salirMensaje.style.display = 'block';
                }
            }
            // Calcular las intersecciones
        

            /*this.intersects2 = this.raycaster.intersectObject(this.officeLamp_model, true);

            if (this.intersects2.length > 0) {
                // Hacer zoom hacia el objeto
                console.log("Lampara");
            }*/
        }
    }
    showPointer() {
        const point = document.getElementById("center-point");
        if (point) {
            point.style.display = 'block';
        }
    }
    
    hidePointer() {
        const point = document.getElementById("center-point");
        if (point) {
            point.style.display = 'none';
        }
    }
    
}
export default Habitacion;