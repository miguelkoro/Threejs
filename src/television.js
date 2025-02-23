import Canvas from '/src/canvas.js'; 
//import Image from '/src/image.js';

class television{
    constructor(){
        this.canvasTelevision = new Canvas(887,672);
        this.ctxTelevision = this.canvasTelevision.ctx;
        this.planeTelevision = this.canvasTelevision.crearPlano(2.535,1.915);//(2.58, 1.95);
        this.planeTelevision.position.set(7.91, 4, 7.29);  // Colocar el plano más cerca de la cámara o en la posición deseada
        this.planeTelevision.rotation.y =  -Math.PI/2;  // Rotar el plano
        //this.group.add(this.planeComputer);  // Añadir el plano al grupo

       /* this.ctxTelevision.fillStyle = 'white';
        this.ctxTelevision.fill();
        this.ctxTelevision.fillRect(0, 0, this.canvasTelevision.width, this.canvasTelevision.height);
        this.ctxTelevision.font = '30px Arial';
        this.ctxTelevision.fillText('Contenido del Canvas', 50, 50);*/
        
    }

    animate(){
        
        this.ctxTelevision.clearRect(0, 0, this.canvasTelevision.width, this.canvasTelevision.height);  // Limpiar el canvas
        this.ctxTelevision.beginPath();
        this.ctxTelevision.drawImage(this.fondoImg, 0, 0);

        this.ctxTelevision.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        /*this.ctxTelevision.fillStyle='black';
        this.ctxTelevision.fill();
        this.ctxTelevision.fillRect(0, 50, this.canvasTelevision.width, 50);*/
        this.ctxTelevision.stroke();
        //if (this.fondoImg.complete) {
        this.canvasTelevision.update();
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
        this.fondoImg.src = "resources/sprites/television/FondoPrincipalX.png";
       
    }
   

}
export default television;