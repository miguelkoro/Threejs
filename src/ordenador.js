import Canvas from '/src/canvas.js'; 
//import Image from '/src/image.js';

class ordenador{
    constructor(){
        this.canvasComputer = new Canvas(1225, 672);
        this.ctxComputer = this.canvasComputer.getCanvas();
        this.planeComputer = this.canvasComputer.crearPlano(2.2, 1.8);
        this.planeComputer.position.set(-3.3, 5.3, 0);  // Colocar el plano más cerca de la cámara o en la posición deseada
        this.planeComputer.rotation.x = -0.05;  // Rotar el plano
        //this.group.add(this.planeComputer);  // Añadir el plano al grupo

        this.ctxComputer.fillStyle = 'white';
        this.ctxComputer.fill();
        this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
        this.ctxComputer.font = '30px Arial';
        this.ctxComputer.fillText('Contenido del Canvas', 50, 50);
    }

    animate(){
        this.canvasComputer.update();
        this.ctxComputer.clearRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);  // Limpiar el canvas

        //this.ctxComputer.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        //this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);

        //if (this.fondoImg.complete) {
        this.ctxComputer.drawImage(this.fondoImg, 0, 0);
        this.ctxComputer.fillStyle = 'red';
        this.ctxComputer.fill();
        this.ctxComputer.fillRect(0, 5, this.canvasComputer.width, 5);
        //}
    }

    getCtx(){
        return this.ctxComputer;
    }
    getPlane(){
        return this.planeComputer;
    }

    loadImages(loader){
        this.fondoImg = new Image();
               // Load an image of intrinsic size 300x227 in CSS pixels
        this.fondoImg.src = "resources/sprites/computer/windowswallpaper.png";
       
    }
   

}
export default ordenador;