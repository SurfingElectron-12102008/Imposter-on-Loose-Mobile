var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, imposter, laser, bg
var playerAn, imposterImg, laserImg, bgImg, playerImg

var obstacle, obstacleImg

var edge

var endPic, endImg, ID, PD

var score=0;

var laserSound, bgSound, dieSound;

var restart, RI;

function preload(){
  playerAn = loadAnimation("AP1.png", "AP2.png", "AP3.png", "AP4.png");
 
 playerImg = loadImage("PD.png");

  ID=loadImage("ID.png");

  PD=loadImage("PD.png");
  
 imposterImg = loadImage("AI.png");  
  
 laserImg = loadImage("LS.png");  
 
bgImg = loadImage("BG2.PNG");  

obstacleImg= loadImage("PetObstacle.png");

endImg=loadImage("Dying Scene.png")

laserSound=loadSound("Laser Gun Sound Effect.mp3");
bgSound=loadSound("gamebgsound.mp3");
dieSound=loadSound("Among Us (Kill) - Sound Effect (HD).mp3");

RI=loadImage("restart button.png");
}

function setup() {
  createCanvas(370, 660);

  bg=createSprite(720,350)
bg.addImage("bg",bgImg)
bg.x = bg.width /1;
bg.scale=2

  player=createSprite(200,480,30,40)
  player.addAnimation("ruuning",playerAn);
  player.scale=0.4

laserGroup=createGroup()
imposterGroup=createGroup()
obstacleGroup=createGroup() 

player.setCollider("rectangle",0,0,100, 250);


restart=createSprite(175,300,600,350);
restart.addImage(RI);
restart.scale=0.5;

endPic=createSprite(175,120,1200,700)
endPic.addImage(endImg);
endPic.scale=0.3;


}

function draw() {
  
edge=createEdgeSprites();

  background(0);

  textSize(40);
  stroke("white");
  fill("white")
  text("Score: "+score,500,750)

  if (bg.x < 100){
    bg.x = bg.width/1;
  }

  if (gameState===PLAY){
  score=score+Math.round(getFrameRate()/50)
  bg.velocityX=-(1+2*score/100)
player.visible=true; 
restart.visible=false;

    endPic.visible=false;
  console.log(score);
  if(keyDown("space")){
    shootArrow();
    laserSound.play();
  }

 spawnImposter();


 if(laserGroup.isTouching(imposterGroup)){
  laserGroup.destroyEach()
  imposter.addImage(ID);
  dieSound.play();
  imposter.lifetime=1;
  imposter.scale=0.15;
  
 }
 if(laserGroup.isTouching(obstacleGroup)){
  laserGroup.destroyEach()
  obstacleGroup.destroyEach()
  dieSound.play();
 }
 spawnObstacle();
 
 
 if(keyDown("RIGHT_ARROW")){
   player.x=player.x+8
 }
 
 if(keyDown("LEFT_ARROW")){
   player.x=player.x-8
 }
 
 player.collide(edge);
 laserGroup.collide(edge);

 if(obstacleGroup.isTouching(player)){
  dieSound.play();

  gameState=END
}

if(imposterGroup.isTouching(player)){
  dieSound.play();
 
 gameState=END;
}
  }
  drawSprites();

  if(gameState===END){
  obstacleGroup.velocityY=0;
  imposterGroup.velocityX=0;
  laserGroup.velocityX=0;
  player.VelocityX=0;
  endPic.visible=true;
   
player.visible=false;
restart.visible=true;
bg.velocityX=0;

  
if(mousePressedOver(restart)){
  reset();
}
  }
restart.depth=endPic.depth;
restart.depth=restart.depth+1;
}

function shootArrow(){
  laser=createSprite(player.x,450,10,2) 
laser.addImage(laserImg)
laser.velocityX=7.5
laser.scale=0.1
laserGroup.add(laser);
laser.setCollider("rectangle",0,0,40, 40);
laser.lifetime=-1;

}

function spawnImposter(){
  if (frameCount % 200 === 0) {
  imposter=createSprite(500,430,30,40)
  imposter.addImage(imposterImg);
  
imposter.scale=0.3
imposterGroup.add(imposter);
imposter.setCollider("rectangle",0,7,40, 160);
imposter.lifetime=-1;
imposter.velocityX=-(2+2*score/100);
imposter.depth=endPic.depth;
endPic.depth=endPic.depth+1;
  }
}
 
function spawnObstacle(){
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(150,-10,40,10);
    obstacle.x = Math.round(random(0,300));
    obstacle.addImage(obstacleImg)
  
    obstacle.scale=0.2
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,140, 180);
    obstacle.depth=endPic.depth;
  endPic.depth=endPic.depth+1;
  obstacle.lifetime=-1;
  obstacle.velocityY=(1+2*score/100);

  }
}





function reset(){
  gameState = PLAY
  restart.visible = false;
  obstacleGroup.destroyEach();
  imposterGroup.destroyEach();
  score = 0;
  }