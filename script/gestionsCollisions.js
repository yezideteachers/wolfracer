/*
function transvervaleCollision(x,y,transversale)
{
  if (x > transversale.x1 &&  x < transversale.x2 && x )
}
*/
var boxCollisionLevels=[];
//quadtree
  var myTree = new Quadtree({
    x: 0,
    y: 0,
    width: 6400,
    height: 1200
  });
  
 for(i = 0 ; i < collisionsBox.length ; i++)
   {
    myTree.insert({
      x : collisionsBox[i].x,
      y :  collisionsBox[i].y,
      width :  collisionsBox[i].width,
      height :  collisionsBox[i].height
    });
   } 

  
function gestionsCollisions(x , y)
  {
    //on verifie qu on ne part pas hors cadre sur la droite
  if (x > (imgWidth -200) )
  {
    monsters[socket.username].x = (imgWidth - 200);
  }
  //on verifie qu on ne part pas hors cadre sur la gauche
  if (x < 0 )
  {
    monsters[socket.username].x = 0;
  }
  //on respawn en position de depart si l'on tombe hors map
  if ( y  > imgHeight - 200)
  {
    monsters[socket.username].x=10;
    monsters[socket.username].y= 10;
  }
  



  //colision box

 //LAISSER CETTE PARTIE DE COMMENTAIRE (possible utilisation de spatial hash dans le futur en vu de meilleur performence )
   /*
   var elementProche =  mySpatialHash.retrieve({
    x : monsters[socket.username].x,
    y : monsters[socket.username].y,
    width : sizeCharacter,
    height : sizeCharacter
   });
*/
    
    
  
  
  


    //on recupere les position necessaire pour la landing box qui se trouve au pied du personnage
    var landingBoxX=x + tempX;
    var landingBoxY=y + tempY;
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(landingBoxX - scrollVal ,landingBoxY - scrollValY ,landingBoxW ,landingBoxH );
    //on pre-calcule les centre des hitbox du personnage
    if(monsters[socket.username].crouching)
    {
    var HitBoxX = x + centerX ;
    var HitBoxY = y + centerY ; 
    var HitBoxR = 16;
    }
    else
    {
    var HitBoxX = x + centerX ;
    var HitBoxY = y + centerX ; 
    var HitBoxR = 16;
    }
    //ajout future de plusieur hitbox pour avoir des collision avec le personnage plus precise
    //var headHitBoxX = x  ;
    //var headHitBoxY = y  ; 
    //LAISSER EN CAS DE DEBUG (visualisation de la hitbox)
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(x - scrollVal,y - scrollValY,sizeCharacter,sizeCharacter);
    //visualisation de la hitbox du joueur
    
    ctx.beginPath();
    ctx.arc(HitBoxX - scrollVal,HitBoxY - scrollValY,HitBoxR,0,2*Math.PI);
    ctx.stroke();
    
    //on enleve le lock qui nous maintient au sol pour pouvoir tomber si l'on est plus sur notre plateforme
    monsters[socket.username].onground = false;
    
    
    //on check les collision box (possibilité d'implementer du quadtree ou spatial hash plus tard pour les perfs)
  
   
  
   var elements = myTree.retrieve({
    x : landingBoxX,
    y : landingBoxY,
    width : landingBoxW,
    height : landingBoxH
});
   
    //on check les collision box (possibilité d'implementer du quadtree ou spatial hash plus tard pour les perfs)
    for (i = 0 ; i < elements.length ; i++)
   {
        //LAISSER EN CAS DE DEBUG (visualisation des boite de collision afin de verifier que les coordonné est bien etait entré)
        //ctx.fillRect(boxCollisionLevels[i].x - scrollVal ,boxCollisionLevels[i].y - scrollValY ,boxCollisionLevels[i].width ,boxCollisionLevels[i].height );
        // on recupere les vecteur pour pouvoir les comparer au demi hauteur et largeur afin de detecter les collision
        var vX = (landingBoxX + (landingBoxW / 2)) - (elements[i].x + (elements[i].width / 2));
        var vY = (landingBoxY + (landingBoxH / 2)) - (elements[i].y + (elements[i].height / 2));
        
        var hWidths = (landingBoxW / 2) + (elements[i].width / 2);
        var hHeights = (landingBoxH / 2) + (elements[i].height / 2);
        
        //on cherche de quel coté a lieu la colision ( gauche droite haut bas) afin de savoir si on atterit sur une plateforme
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
        {                 
          var oX = hWidths - Math.abs(vX);
          oY = hHeights - Math.abs(vY);         
          if (oX >= oY) 
          {
            if (vY < 0) 
            {//cas ou le joueur entre en colision avec le haut d'une boite de collision , c a d arrive sur une plateforme
              monsters[socket.username].jump = false;
              monsters[socket.username].onground = true;
              monsters[socket.username].y -= oY;
            }
          }
          else 
          {
            if (vX > 0) 
            {//cas de la collision a gauche
              monsters[socket.username].x += oX;
            }
            else 
            {//cas d'une collision sur la droite    
                monsters[socket.username].x -= oX;
            }
          }
        }  
    }

    //on verifie si on a atteint un bonus(dagger)
    //dague slows
   // ctx.fillRect( 773- scrollVal ,108 - scrollValY ,sizeDagger ,sizeDagger );
    if ( x < 773 + sizeDagger &&
   x + centerX > 773 &&
   y < 108 + sizeDagger &&
   centerX + y > 108 )
    {
      monsters[socket.username].ownSlow = 20;
      //console.log(monsters[socket.username].ownSlow == true);
    }
    //dague Tp
    //ctx.fillRect( 716- scrollVal ,844 - scrollValY ,sizeDagger ,sizeDagger );
    if ( x < 716 + sizeDagger &&
   x + centerX > 716 &&
   y < 844 + sizeDagger &&
   centerX + y > 844 )
    {
      monsters[socket.username].ownTp = true;
      //console.log(monsters[socket.username].ownSlow == true);
    }

    //flying carpet
   // ctx.fillRect( 900 - scrollVal ,108 - scrollValY ,sizeDagger ,sizeDagger );
    if ( x < 1445 + sizeCarpet &&
   x + centerX > 1445 &&
   y < 768 + sizeCarpet &&
   centerX + y > 768 )
    {
      monsters[socket.username].ownFly = true;
      console.log("Got !!!!!!");
      //console.log(monsters[socket.username].ownSlow == true);
    }

   
      //collision avec les dague usant de cercle
      for (i = 0 ; i < daggerThrown.length ; i++)
          {
            if(daggerThrown[i].type == "slow")
            {
               //on pre-calcule les centre des hitbox des dagues
            var HitBoxDX = daggerThrown[i].x + 50 ;
            var HitBoxDY = daggerThrown[i].y + 50 ; 
            var HitBoxDR = 33;
            //visualisation de la hitbox de la dague
            
            ctx.beginPath();
            ctx.arc(HitBoxDX - scrollVal,HitBoxDY - scrollValY,HitBoxDR,0,2*Math.PI);
            ctx.stroke();
            
            var dx = (HitBoxX + HitBoxR) - (HitBoxDX+ HitBoxDR);
            var dy = (HitBoxY + HitBoxR) - (HitBoxDY + HitBoxDR);
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < HitBoxR + HitBoxDR) 
            {
                // collision detected!
                monsters[socket.username].slowed = true;
                daggerThrown.splice(i,1);
                timerSlow = 0;
                socket.emit('delete_dagger', i);
            }

            }
            else  if(daggerThrown[i].type == "tp")
               {
                  //on observe si la dague tp est sortit du canvas et la detruit si c est le cas.
                  if (daggerThrown[i].x -scrollVal + sizeDagger > canvasWidth || daggerThrown[i].y -scrollValY + sizeDagger > canvasHeight
                  ||daggerThrown[i].x - scrollVal  < 0 || daggerThrown[i].y -scrollValY  < 0)
                  {
                    daggerThrown.splice(i,1);
                  } 
               }

           
          }
      //gestion des collision avec les monstres avec cercle de collision
      for (i = 0 ; i < tabMonster.length ; i++)
          {
              //on pre-calcule les centre des hitbox des monstre
              var HitBoxMX = tabMonster[i].x + 50 ;
              var HitBoxMY = tabMonster[i].y + 70 ; 
              var HitBoxMR = 33;
              //visualisation de la hitbox des monstre
              
              ctx.beginPath();
              ctx.arc(HitBoxMX - scrollVal,HitBoxMY - scrollValY,HitBoxMR,0,2*Math.PI);
              ctx.stroke();
              
              var dx = (HitBoxX + HitBoxR) - (HitBoxMX+ HitBoxMR);
              var dy = (HitBoxY + HitBoxR) - (HitBoxMY + HitBoxMR);
              var distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < HitBoxR + HitBoxMR) 
              {
                  if(monsters[socket.username].life >0) {
                      monsters[socket.username].life-= 1;
                      //monsters[socket.username].x += monsters[socket.username].x - tabMonster[i].x;
                  }
              }

              for(j = 0; j<daggerThrown.length ; j++)
              {
                //on pre-calcule les centre des hitbox des dagues
                var HitBoxDX = daggerThrown[j].x + 50 ;
                var HitBoxDY = daggerThrown[j].y + 50 ; 
                var HitBoxDR = 33;

                var dx2 = (HitBoxDX + HitBoxDR) - (HitBoxMX+ HitBoxMR);
                var dy2 = (HitBoxDY + HitBoxDR) - (HitBoxMY + HitBoxMR);
                var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                 if (distance2 < HitBoxDR + HitBoxMR) 
                {
                    console.log("___________________Monster touched__________________"+"\n");
                    daggerThrown.splice(j,1);
                    if(tabMonster[i].life==0){tabMonster.splice(i,1);}
                    else{tabMonster[i].life-=1;}
                    socket.emit('delete_dagger', j);
                }
              }




          }

          //gestion des collision avec les boules de feu
          for (i = 0 ; i < tabFire.length ; i++)
          {
            //on pre-calcule les centre des hitbox des fireball
            var HitBoxFX = tabFire[i].x + 35 ;
            var HitBoxFY = tabFire[i].y + 30 ; 
            var HitBoxFR = 25;
            //visualisation de la hitbox des fireballs
            
            ctx.beginPath();
            ctx.arc(HitBoxFX - scrollVal,HitBoxFY - scrollValY,HitBoxFR,0,2*Math.PI);
            ctx.stroke();
            
            var dx = (HitBoxX + HitBoxR) - (HitBoxFX+ HitBoxFR);
            var dy = (HitBoxY + HitBoxR) - (HitBoxFY + HitBoxFR);
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < HitBoxR + HitBoxFR) 
            {
               if(monsters[socket.username].life >0) {
                   monsters[socket.username].life-= 0.5;

               }
            }
          }


          if(tabStar.length>bonusPosRandom){
       if ( x < tabStar[bonusPosRandom].x  + tabStar[bonusPosRandom].width &&
              x + sizeCharacter > tabStar[bonusPosRandom].x &&
              y < tabStar[bonusPosRandom].y + tabStar[bonusPosRandom].height &&
              sizeCharacter + y > tabStar[bonusPosRandom].y )
          {
            tabStar.splice(bonusPosRandom, 1);
            bonusReached = true;
            monsters[socket.username].score++;
          }
      }
       //gestion des collision avec les Health
      for (i = 0 ; i < tabHealth.length ; i++)
      {
          if ( x < tabHealth[i].x  + tabHealth[i].width &&
              x + sizeCharacter > tabHealth[i].x &&
              y < tabHealth[i].y + tabHealth[i].height &&
              sizeCharacter + y > tabHealth[i].y )
          {
             tabHealth[i].x=-1;
             if(monsters[socket.username].life<60){monsters[socket.username].life+=20;}

            
             

          }
      }
          

  }  