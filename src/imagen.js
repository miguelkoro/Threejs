/*class Border{
    constructor(position,width,height){
        this.position={x:(position.x), y:(position.y)}
        this.width=(width);   //La altura y la anchura seran la diferencia de los puntos
        this.height=(height);
        this.center={x:this.position.x+this.width/2,y:this.position.y+this.height/2}
        this.color='black'
        this.lineWidth=(1)
    }

    drawGrid(color){
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
    }

    drawRectangle(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.position.x, this.position.y, this.lineWidth,this.height);
        ctx.fillRect(this.position.x+this.width, this.position.y, this.lineWidth,this.height);
        ctx.fillRect(this.position.x, this.position.y, this.width,this.lineWidth);
        ctx.fillRect(this.position.x, this.position.y+this.height, this.width,this.lineWidth);
    }
}

class ImageDraw extends Border{ 
    constructor(position, width, height, image='', column=0,row=0, velocity={x:0,y:0}, maxframes=0, maxtimecounter=0, opacity=1){
        super(position, width, height)
        this.image=image

        this.velocity={x:velocity.x,y:velocity.y}
        this.radius=0
        this.column=column
        this.row=row
        this.opacity=opacity
        this.opacityspeed=0
        this.maxtimecounter=maxtimecounter
        this.timecounter=0
        this.maxframes=maxframes
        this.rotation=0
        this.rotationspeed=0
        this.blackandwhite=false
        this.random={min:0,max:0}
        this.randomframechange=false
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    update(){
        //this.velocity=velocity
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y        
        this.draw()
    }
    drawSprite(){
        if(this.blackandwhite)this.toBlackAndWhite()
        ctx.drawImage(this.image,
            this.width*this.column,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen 
    }
    updateSprite(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //this.opacity+=this.opacitySpeed
        //this.draw()
        this.drawSprite()
    }

    frameChange(){
        if(this.randomframechange){
            if(this.maxtimecounter!=0){
                if(this.timecounter<this.maxtimecounter)
                    this.timecounter++
                else{
                    if(this.column==this.maxframes)this.column=0
                    else this.column++  
                    this.timecounter=getRndInteger(this.random.min,this.random.max); 
                }
            }
        }else{
            if(this.maxtimecounter!=0){
                if(this.timecounter<this.maxtimecounter)
                    this.timecounter++
                else{
                    if(this.column==this.maxframes)this.column=0
                    else this.column++  
                    this.timecounter=0; 
                }
            }
        }
    }

 
    drawAnimatedSprite(){
        this.frameChange()
        ctx.save();
        ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image,
            this.width*this.column,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen  
        ctx.restore();
    }

    updateAnimatedSprite(){
        //this.velocity=velocity
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //this.opacity+=this.opacitySpeed
        this.rotation+=this.rotationspeed
        this.drawAnimatedSprite()
    }

    drawCircle(radius, color){
        this.radius=radius
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth = radius;
        ctx.beginPath()            
        ctx.arc(this.position.x, this.position.y,radius,0, Math.PI*2)        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
   
    visible(){
        this.drawAnimatedSprite()
        //this.updateAnimatedSprite()
        if(this.opacity+this.opacityspeed>=1){
            
            this.opacity=1
            return true
       }else{
           this.opacity+=this.opacityspeed
           
           return false
       }   
       
       //console.log('ff')
    }
    invisible(){
        //this.updateAnimatedSprite()
        this.drawAnimatedSprite()
        if(this.opacity-this.opacityspeed<=0){
            this.opacity=0
            
            return true
       }else{
           this.opacity-=this.opacityspeed
           
           return false
       }
    }
    toBlackAndWhite(){
        //this.draw()
        var imgData = ctx.getImageData(this.position.x, this.position.y, this.width, this.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
            let colour = 0;
            if (count > 510) colour = 255;
            else if (count > 255) colour = 127.5;

            imgData.data[i] = colour;
            imgData.data[i + 1] = colour;
            imgData.data[i + 2] = colour;
            imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

}*/
import Border from "./border";

class Imagen extends Border{
    constructor(image, border){
        this.image=image;
        this.border=border;
    }

    drawImagen(){
        //this.ctx.drawImage(this.image, this.border.position.x, this.border.position.y);
    }
}
export default Imagen;