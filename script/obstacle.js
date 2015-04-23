

var spriteY=0;
var imgHealth = new Image();
var imgStar = new Image();
imgHealth.src = "../image/health.png"
imgStar.src = "../image/star.png"


function monster2(ctx,x,y,life){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.life = life;
    this.width = 600;
    this.height = 600;
    this.tempX=this.x;
    this.tickCount = 0;
    this.ticksPerFrame = 30;
    this.stepMonster=0;
    this.spriteX=0;
    this.imgMonster = new Image();
    this.imgMonster.src = "../image/snakeR.png";
    
}
    monster2.prototype.drawMonster = function(){
        
        //console.log("SpriteX : " + spriteX);
        //console.log("tickCount : " + this.tickCount);
        this.ctx.drawImage(this.imgMonster,((this.spriteX % 2) * this.width),0,this.width, this.height,this.x -scrollVal, this.y - scrollValY, 200, 200);
        if(this.tickCount > this.ticksPerFrame){this.tickCount = 0 ;this.spriteX= this.spriteX + 1;}
        if(this.x>this.tempX){this.stepMonster=-200;this.imgMonster.src = "../image/snakeL.png";}
        else if(this.x<this.tempX-300){this.stepMonster=200;this.imgMonster.src = "../image/snakeR.png";}
        if(this.stepMonster<0){this.x-=5;}
        else{this.x+=5;}
        this.tickCount =this.tickCount + 1;
        
};
/*
objet representant le dragon
*/

function monster3(ctx,x,y,life){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.life = life;
    this.width = 96;
    this.height = 91;
    this.tempX=this.x;
    this.tickCount = 0;
    this.ticksPerFrame = 30;
    this.stepMonster=0;
    this.spriteX=0;
    this.imgMonster = new Image();
    this.imgMonster.src = "../image/dragon.png";
}
    monster3.prototype.drawMonster = function(){
        
        this.ctx.drawImage(this.imgMonster,((this.spriteX % 2) * this.width),100,this.width, this.height,this.x -scrollVal, this.y - scrollValY, 150, 150);
        this.ctx.fillStyle="red";
        this.ctx.fillRect(this.x - scrollVal + 50, this.y - scrollValY - 20, this.life*10,10);
        if(this.tickCount > this.ticksPerFrame){this.tickCount = 0 ;this.spriteX= this.spriteX + 1;}
        if(this.x>this.tempX){this.stepMonster=-200;}
        else if(this.x<this.tempX-100){this.stepMonster=200;}
        if(this.stepMonster<0){this.x-=2;}
        else{this.x+=2;}
        this.tickCount =this.tickCount + 1;
};

function fire(ctx,x,y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.tempY = this.y;
    this.step = 0;
    this.imgfire = new Image();
    this.imgfire.src = "../image/fire.png";
}

//faire apparaitre le feu (une boule qui se deplace a la verticale)
    fire.prototype.drawFire = function () {
        this.ctx.drawImage(this.imgfire, 0, 0, this.width, this.height, this.x - scrollVal, this.y - scrollValY, 40, 60);
        if (this.y < this.tempY) {
            this.step = 100;
        }
        else if (this.y > this.tempY + 400) {
            this.step = -100;
        }
        if (this.step < 0) {
            this.y--;
        }
        else {
            this.y++;
        }

};

function Star(ctx,x,y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 70;
}

    Star.prototype.drawStar = function () {
        this.ctx.drawImage(imgStar, this.x - scrollVal, this.y - scrollValY, 40, 40);
        
    };


function Health(ctx,x,y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;

}
    Health.prototype.drawHealth = function () {
        this.ctx.drawImage(imgHealth, this.x - scrollVal, this.y - scrollValY, this.width, this.height);
        
    };