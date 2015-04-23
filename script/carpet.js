var carpetImg = new Image();


carpetImg.src = "../image/carpet.png";

carpetImg.onload = loadImageCarpet;
//on recupere la largeur et hauteur de l'img chargé
function loadImageCarpet()
{   
    sizeCarpet = carpetImg.width / 6;
}

