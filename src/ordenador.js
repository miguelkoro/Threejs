import Canvas from '/src/canvas.js'; 
//import Image from '/src/image.js';

class ordenador{
    constructor(){
        this.canvasComputer = new Canvas(784,583);
        this.ctxComputer = this.canvasComputer.ctx;
        this.planeComputer = this.canvasComputer.crearPlano(2.15, 1.6);
        this.planeComputer.position.set(-3.32, 5.39, 0.05);  // Colocar el plano más cerca de la cámara o en la posición deseada
        this.planeComputer.rotation.x = -0.065;  // Rotar el plano
        //this.group.add(this.planeComputer);  // Añadir el plano al grupo

       /* this.ctxComputer.fillStyle = 'white';
        this.ctxComputer.fill();
        this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
        this.ctxComputer.font = '30px Arial';
        this.ctxComputer.fillText('Contenido del Canvas', 50, 50);*/
        this.prueba=1;
        
    }

    animate(){
        
        
        this.ctxComputer.clearRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);  // Limpiar el canvas
        this.ctxComputer.beginPath();
        //this.ctxComputer.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        //this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);

        //if (this.fondoImg.complete) {
        
        this.ctxComputer.drawImage(this.fondoImg, 0, 0);
        this.ctxComputer.fillStyle = 'white';
        this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
        //this.ctxComputer.fill();
        //this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);
        //this.canvasComputer.update();
        //this.ctxComputer.closePath();
        this.ctxComputer.font = '30px Arial';
        this.ctxComputer.fillText('Contenido del Canvas', 50, 50);
        this.ctxComputer.stroke();
        this.canvasComputer.update();
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
        this.fondoImg.src = "resources/sprites/computer/windowswallpaperY.png";

        //const aspectRatio = this.fondoImg.width / this.fondoImg.height;

        // Ajustar el tamaño del canvas y del plano
        /*this.canvasComputer.canvas.width = this.fondoImg.width;
        this.canvasComputer.canvas.height = this.fondoImg.height;
        this.planeComputer.scale.set(aspectRatio, 1, 1);*/

        //this.ctxComputer.drawImage(this.fondoImg, 0, 0);
        //this.canvasComputer.update();
        //this.ctxComputer.drawImage(this.fondoImg, 0, 0);
       
    }
   

}
export default ordenador;