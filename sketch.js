var ground,groundImage;
var displayheight;

var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;

var obstacle;
var obstacleX;

var cameraDistance;

var trex,trexRun;

var invisibleGround;

var gameState;

var obstaclesGroup;
var groundGroup;

var score;
var fc;

var checkpoint,die,jump;

var gameOver,gameOverImage;
var restart,restartImage;

var backgroundImg;

var clouds,cloudsImage,cloudsGroup,cloudsX;

function preload(){
  groundImage = loadImage("ground2.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  cloudsImage = loadImage("img/cloud.png");

  trexRun = loadAnimation("img/newtrex1.png","img/newtrex3.png","img/newtrex4.png");
  backgroundImg = loadImage("img/bkacground img.jpg");

  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight-50);
  createSprite(400, 200, 50, 50);
  cameraDistance = 0;

  displayheight = displayHeight - 90;
  obstacleX = displayWidth + 100;
  cloudsX = displayWidth + 100;

  ground = createSprite(displayWidth/2,displayheight-20,displayWidth,50);
  ground.scale = 1.5;
  ground.addImage(groundImage);

  invisibleGround = createSprite(displayWidth/2,displayHeight - 100,displayWidth,20);
  invisibleGround.visible = false;

  obstacle = createSprite(3000,3000,10,10);
  clouds = createSprite(3000,3000,10,10);

  trex = createSprite(100,925,10,10);
  trex.addAnimation("running",trexRun);
  

  gameOver = createSprite(displayWidth/2,displayHeight/2 - 150,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;


  restart = createSprite(displayWidth/2,displayHeight/2,10,10);
  restart.addImage(restartImage);
  restart.visible = false;

  gameState = "play";
  score = 0;
  fc = 0;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  groundGroup = new Group();
}



function draw() {
  background(backgroundImg);
  console.log(gameState);

  gameOver.x = camera.position.x;
  restart.x = camera.position.x;


  if(gameState == "play"){
    fc++;
    score = Math.round(fc/4);

  trex.collide(invisibleGround);

    trex.velocityY = trex.velocityY + 5;

  if(keyWentDown("space") && trex.y > 850){
    trex.velocityY = -45;
    jump.play();
  }

  if(score % 100 == 0 && score != 0){
    checkpoint.play();
  }

  trex.x = camera.position.x - displayWidth/4;

  if(frameCount % 10 == 0){
    createObstacles();
  }

  if(frameCount % 10 == 0){
    spawnClouds();
  }

  camera.position.x = camera.position.x + 15;
  cameraDistance = cameraDistance + 10;

  if(camera.position.x >= ground.x - 50 && camera.position.x <= ground.x + 50){
    ground = createSprite(camera.position.x + displayWidth,displayheight - 20,displayWidth,50);
    groundGroup.add(ground);
    ground.scale = 1.5;
    ground.addImage(groundImage);
  }

  invisibleGround.x = trex.x;

  if(trex.isTouching(obstaclesGroup)){
    gameState = "end";
    die.play();
  }
} 

if(gameState == "end"){
    trex.velocityY = 0;

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      Restart();
    }
}

  



  

  
  drawSprites();
  push();
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Score:" + score,camera.position.x,50);
  pop();

  push();
  rectMode(CENTER);
  fill(255);
  noStroke();
  rect(400,200,100,100);
  pop();
}

function createObstacles(){
  obstacle = createSprite(obstacleX,940,10,10);
  obstaclesGroup.add(obstacle);

  var rand = Math.round(random(1,5));
  switch(rand){
    case 1:
      obstacle.addImage(obstacle1);
    break;

    case 2:
      obstacle.addImage(obstacle2);
    break;

    case 3:
      obstacle.addImage(obstacle3);
    break;

    case 4:
      obstacle.addImage(obstacle4);
    break;

    case 5:
      obstacle.addImage(obstacle5);
    break;

    case 6:
      obstacle.addImage(obstacle6);
    break;
  }

  obstacleX = obstacleX + 900;
}

function Restart(){
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  fc = 0;
  obstacleX = camera.position.x + 800;
  cloudsX = camera.position.x + 800;
  ground.x = camera.position.x;
  gameState = "play";
}

function spawnClouds(){
  clouds = createSprite(cloudsX,random(50,200),10,10);
  cloudsGroup.add(clouds);
  clouds.addImage(cloudsImage);
  cloudsX = cloudsX + 500;
}