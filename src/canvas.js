import * as THREE from 'three';
class Canvas{
    constructor(width, height){
        // Crear el canvas HTML y usarlo como textura
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;  // Tamaño del canvas
        this.canvas.height = height;  // Tamaño del canvas
        this.crearTextura();
    }

    crearTextura(){
        this.texture = new THREE.CanvasTexture(this.canvas);  // Usamos el canvas como textura
        this.texture.minFilter = THREE.LinearFilter;  // Asegurarse de que la textura se vea bien al hacer zoom
    }

    crearPlano(width, height){
        // Crear un plano y aplicarle la textura
        this.geometry = new THREE.PlaneGeometry(width, height);  // Un plano de tamaño 2x2
        this.material = new THREE.MeshBasicMaterial({ map: this.texture });  // Aplicar la textura del canvas
        this.plane = new THREE.Mesh(this.geometry, this.material);
        return this.plane;
    }

    getCanvas(){
        return this.ctx;
    }

    getPlane(){
        return this.plane;
    }

    update(){
        this.texture.needsUpdate = true;  // Actualizar la textura
    }
}

export default Canvas;