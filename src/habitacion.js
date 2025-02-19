import * as THREE from 'three';
import Canvas from '/src/canvas.js'; 

class Habitacion{
    constructor(){

        //Inicializar objetos
        this.test_model = null;
        this.officeLamp_model = null;
        this.television_model = null;

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
        this.minX = -7;
        this.maxX = 6;
        this.minZ = -2.7;
        this.maxZ = 18;
    }

    iniciarCamara(camera){
        camera.position.z = 6; //Move the camera back
        camera.position.y = 7; //Move the camera back
        camera.position.x = 0.5; //Move the camera back
        camera.rotation.x = -0.5; //Tilt the camera down
    }

    keyDownEvent(event){
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
    }

    keyUpEvent(event){
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

    clickEvent(controls, event){
        controls.lock();
    }

    /*mouseMoveEvent(event, window){
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }*/

    updateControls(camera){

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

    loadModels(loader, scene){
        // Crear el grupo que contendrá el plano y el modelo
        this.group = new THREE.Group();       

        this.officeLamp_model;  
        loader.load(
        'resources/Habitacion/ThreejsBlend2.gltf',
        (gltf) => {
            this.officeLamp_model = gltf.scene;
            this.officeLamp_model.scale.set(10, 10, 10); // Escalar el modelo
            this.group.add(this.officeLamp_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );

        this.test_model;  
        loader.load(
        'resources/scene-v1/scene.gltf',
        (gltf) => {
            this.test_model = gltf.scene;
            //test_model.rotation.y = 4; // Rotar el modelo
            this.test_model.scale.set(10, 10, 10); // Escalar el modelo
            this.test_model.position.set(-3.1, 4.9, -3.6);
            //scene.add(model); // Agregar el modelo a la escena
            this.group.add(this.test_model);  // Añadir el plano al grupo
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
            this.television_model.position.set(6, 5, 5);
            //scene.add(this.television_model); // Agregar el modelo a la escena
            this.group.add(this.television_model);  // Añadir el plano al grupo
        },
        undefined,
        (error) => {
            console.error('Error al cargar el modelo:', error);
        }
        );
        
        scene.add(this.group);  // Añadir el grupo a la escena


        this.lights(scene);
        this.computerCanvas();
    }

    computerCanvas(){
        this.canvasComputer = new Canvas(1225, 672);
        this.ctxComputer = this.canvasComputer.getCanvas();
        this.planeComputer = this.canvasComputer.crearPlano(1.8, 1.4);
        this.planeComputer.position.set(-3.5, 5.3, 0);  // Colocar el plano más cerca de la cámara o en la posición deseada
        //planeComputer.rotation.x = -0.05;  // Rotar el plano
        this.group.add(this.planeComputer);  // Añadir el plano al grupo

        this.ctxComputer.fillStyle = 'white';
        this.ctxComputer.fill();
        this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
        this.ctxComputer.font = '30px Arial';
        this.ctxComputer.fillText('Contenido del Canvas', 50, 50);
    }

    lights(scene){
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(0, 5, 0);
        //directionalLight.rotateX(Math.PI / 2);
        scene.add(directionalLight);

        /*const width = 2;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( -1, 2.5, 1 );
        rectLight.lookAt( 0, 0, 0 );
        scene.add( rectLight )*/
    }

    animate(){
        this.canvasComputer.update();
        this.ctxComputer.clearRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);  // Limpiar el canvas
        this.ctxComputer.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
    }

    onClickRaycaster(camera){
        // Establecer el rayo desde la cámara y la posición del ratón
        this.raycaster = new THREE.Raycaster();
        this.raycaster.setFromCamera(this.mouse, camera);

        if(this.test_model == null){
            this.intersects = this.raycaster.intersectObject(this.test_model, true);

            if (this.intersects.length > 0) {
                // Hacer zoom hacia el objeto
                /*this.targetPosition = this.intersects[0].point;
                camera.position.lerp(this.targetPosition, 0.1);*/
                console.log("Modelo");
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
export default Habitacion;