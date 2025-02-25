class Border{
    constructor(ctx,position,width,height){
        this.position={x:(position.x), y:(position.y)}
        this.width=(width);   //La altura y la anchura seran la diferencia de los puntos
        this.height=(height);
        this.center={x:this.position.x+this.width/2,y:this.position.y+this.height/2};
        this.color='black';
        this.lineWidth=(1);
        this.ctx=ctx;
    }

   /* drawGrid(color){
        ctx.fillStyle=this.color;
        for(let i=0;i<=50;i++){            
            ctx.fillRect(this.position.x+i*(this.width/50), this.position.y, 1,this.height);  //Verticales
        }
        for(let i=0;i<=50;i++){            
            ctx.fillRect(this.position.x, this.position.y+i*(this.height/50), this.width,1);   //Horizontales
        }
    }
    collition(object){
        if(object.position.x>this.position.x+this.width ||
            object.position.x+object.width<this.position.x ||
            object.position.y>this.position.y+this.height ||
            object.position.y+object.height<this.position.y)
            return true
        else
            return false
    }*/

    /*drawRectangle(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.position.x, this.position.y, this.lineWidth,this.height);
        ctx.fillRect(this.position.x+this.width, this.position.y, this.lineWidth,this.height);
        ctx.fillRect(this.position.x, this.position.y, this.width,this.lineWidth);
        ctx.fillRect(this.position.x, this.position.y+this.height, this.width,this.lineWidth);
    }*/
    drawRectangle(){
        this.ctx.fillStyle=this.color;
        this.ctx.fillRect(this.position.x, this.position.y,  //Coordenadas inicial del rectangulo
            this.width, this.height,   //Ancho y alto del rectangulo
            this.ctx.width, this.ctx.height,    //Posicion del rectangulo en la pantalla
            this.ctx.width, this.ctx.height);  //Tamaño del rectangulo
    }

    isMouseOver(mouseX, mouseY) {
        return mouseX >= this.position.x && mouseX <= this.position.x + this.width &&
               mouseY >= this.position.y && mouseY <= this.position.y + this.height;
    }
}
export default Border;