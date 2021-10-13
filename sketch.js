var path,mainCyclist;
var bow , arrow
var bowImage, arrowImage
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var Arrowgroup

var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;



var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;


function preload(){
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");

  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");


  
 
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

bow = createSprite(900,150,20,50);
bow.addImage(bowImage); 
bow.scale = 1;


mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  


mainCyclist.setCollider("rectangle",0,0,40,40);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
Arrowgroup = new Group();


}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
   bow.collide(edges);
  
  

  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
  if(keyDown("space")) {
      createArrow();

    
  }

  if(keyDown("up_arrow")){
    bow.velocityY=-3;
  }
  
 if(keyDown("down_arrow")){
    bow.velocityY=3;
  }
  
  
  
  if(Arrowgroup.isTouching(mainCyclist)){
     gameState = END;
  }
  

   
 

  
    
 
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press R to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    Arrowgroup.setVelocityXEach(0);
    
    
     if(keyDown("R")) {
       reset();

     }
}
}

function createArrow() {
  var arrow= createSprite(1100, 150, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 900;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 500;
  arrow.scale = 0.3;
  Arrowgroup.add(arrow)
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  Arrowgroup.destroyEach();
  bow.y=150;

  distance = 0;
 }


