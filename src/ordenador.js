import Canvas from '/src/canvas.js'; 
//import Image from '/src/image.js';
import Border from '/src/border.js';

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
        this.botonCerrar_border = new Border(this.ctxComputer,{x:this.ctxComputer.width-36,y:9}, 25, 25);
    }

    animate(){
        
        
        this.ctxComputer.clearRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);  // Limpiar el canvas
        this.ctxComputer.beginPath();
        //this.ctxComputer.fillText('Texto actualizado en el Canvas', 50, 50);  // Dibujo dinámico en el canvas
        //this.ctxComputer.fillRect(0, 0, this.canvasComputer.width, this.canvasComputer.height);

        //if (this.fondoImg.complete) {
        
        this.dibujarFondo();
        this.ctxComputer.fillStyle = 'white';

        //this.botonCerrar_border.drawRectangle(this.ctxComputer);
        //this.canvasComputer.update();
        //this.ctxComputer.closePath();
        this.ctxComputer.font = '30px Arial';
        //this.ctxComputer.fillText('Contenido del Canvas', 50, 50);
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

    dibujarFondo(){
        this.ctxComputer.drawImage(this.fondoImg, 
            0, 0,   //Coordenadas de recorte iniciales
            this.fondoImg.width, this.fondoImg.height,  //Coordenadas de recorte finales
            0, 0,   //Posicion de la imagen en la pantalla
            this.ctxComputer.width, this.ctxComputer.height);     //Tamaño de la imagen
       /* this.ctxComputer.drawImage(this.barraComputer, 
            0, 0, //Coordenadas de recorte iniciales
            this.barraComputer.width, this.barraComputer.height/2,  //Coordenadas de recorte finales
            0, this.ctxComputer.height-this.barraComputer.height/2,  //Posicion de la imagen en la pantalla
            this.barraComputer.width, this.barraComputer.height/2); */    //Tamaño de la imagen*/
        this.ctxComputer.drawImage(this.barraComputer, 
            0, 0, //Coordenadas de recorte iniciales
            this.barraComputer.width, this.barraComputer.height/2,  //Coordenadas de recorte finales
            0, this.ctxComputer.height-this.barraComputer.height/4,  //Posicion de la imagen en la pantalla
            this.ctxComputer.width, this.barraComputer.height/4);   //Tamaño de la imagen*/
        
            /*this.ctxComputer.drawImage(this.ventana, 
                0, 0, //Coordenadas de recorte iniciales
                this.ventana.width, this.ventana.height,  //Coordenadas de recorte finales
                0, 0,  //Posicion de la imagen en la pantalla
                this.ctxComputer.width, this.ctxComputer.height);   //Tamaño de la imagen*/
        
    }

    loadImages(loader){
        this.fondoImg = new Image();
               // Load an image of intrinsic size 300x227 in CSS pixels
        this.fondoImg.src = "resources/sprites/computer/FondoWindows.png";
        this.barraComputer = new Image();
        this.barraComputer.src = "resources/sprites/computer/BarraPC.png";

        this.ventana = new Image();
        this.ventana.src = "resources/sprites/computer/VentanaWindows.png";

       
    }
   

}
export default ordenador;