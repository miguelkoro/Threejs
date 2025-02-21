import Canvas from '/src/canvas.js'; 
//import Image from '/src/image.js';

class television{
    constructor(){
        this.canvasTelevision = new Canvas(1225, 672);
        this.ctxTelevision = this.canvasTelevision.getCanvas();
        this.planeTelevision = this.canvasTelevision.crearPlano(2.8, 2.1);
        this.planeTelevision.position.set(7.85, 3.9, 6.9);  // Colocar el plano más cerca de la cámara o en la posición deseada
        this.planeTelevision.rotation.y =  -Math.PI/2;  // Rotar el plano
        //this.group.add(this.planeComputer);  // Añadir el plano al grupo

        this.ctxTelevision.fillStyle = 'white';
        this.ctxTelevision.fill();
        this.ctxTelevision.fillRect(0, 0, this.canvasTelevision.width, this.canvasTelevision.height);
        this.ctxTelevision.font = '30px Arial';
        this.ctxTelevision.fillText('Contenido del Canvas', 50, 50);
    }

    animate(){
        this.canvasTelevision.update();
        this.ctxTelevision.clearRect(0, 0, this.canvasTelevision.width, this.canvasTelevision.height);  // Limpiar el canvas

        //this.ctxComputer.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        //this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);

        //if (this.fondoImg.complete) {
        this.ctxTelevision.drawImage(this.fondoImg, 0, 0);
        //}
    }

    getCtx(){
        return this.ctxTelevision;
    }
    getPlane(){
        return this.planeTelevision;
    }

    loadImages(loader){
        this.fondoImg = new Image();
               // Load an image of intrinsic size 300x227 in CSS pixels
        this.fondoImg.src = "resources/sprites/television/FondoPrincipal.png";
       
    }
   

}
export default television;