var dino, dinoAni;

var ground;

var monster;

var boss1, bossAni;
   
var mb, mbImg;

var fb, fbImg; 

var monstersGroup, fbsGroup, mbsGroup;

var gameOver;

var score = 0;

var PLAY = 1;
var END = 0;

var gameState =  PLAY;

function preload(){
    mbImg = loadImage("magical_ball.png");

    fbImg = loadImage("fire_ball.png");

    dinoAni = loadImage("Dino_standing.png");

    bossAni = loadAnimation("dragon_up.png", "dragon_down.png");
}




function setup(){
 createCanvas(1000, 500);

    dino = createSprite(100, 450, 20, 50);
    dino.addImage(dinoAni);
    dino.debug = true;
    dino.setCollider("rectangle", 0, 0, 10, 20);
    dino.scale = 0.4
  
   
    ground = createSprite(500, 490, 2000, 15);
    ground.shapeColor = ("brown")

    monstersGroup = new Group(); 
    fbsGroup = new Group();
    mbsGroup = new Group();


    textSize(20);
  text("SCORE: ", score, 800, 100);

}

function draw(){
background(230);

dino.collide(ground);

ground.velocityX = -3;

    if(ground.x <0){
    ground.x = ground.width/2;
    }

    if(gameState === PLAY){

spawnMonster();
spawnBosses();
spawnMagicalBall();

    

   

  if(keyDown("space")){
      shootFireBall();
  }

  if(fbsGroup.isTouching(monstersGroup)){
    score = score + 5;  
    monstersGroup.destroyEach();
     fbsGroup.destroyEach();
     
  }

  if(mbsGroup.isTouching(dino)){
    score = score+20;
    mbsGroup.destroyEach();
  }

  if(monstersGroup.isTouching(dino)){
    gameState = END;
}

    }


  if(monstersGroup.isTouching(dino)){
      gameState = END;
  }
  if(gameState === END){
      mbsGroup.setVelocityXEach(0);
      monstersGroup.setVelocityXEach(0);
      boss1.velocityX = 0;

      stroke("white");
      textSize(50);
      fill("black");
      text("GAME OVER", gameOver, 150, 250);

      mbsGroup.setLifetimeEach(-1);
      monstersGroup.setLifetimeEach(-1);
      boss1.lifetime = -1;

      

  }
  

drawSprites();

stroke("red");
  textSize(30);
  fill("white");
  text("score: " + score, 800, 50);
 
}


function spawnMonster(){
    if(frameCount%80 === 0){
        monster = createSprite(1000, 460, 30, 50);
        monster.velocityX = -8;
        monster.lifetime = 500; 

        monstersGroup.add(monster);
 }

}

function spawnBosses(){
    if(frameCount%160 === 0){
        boss1 = createSprite(1000, 250, 40, 30);
        boss1.addAnimation("boss", bossAni)
        boss1.scale = 0.5
        boss1.velocityX = -1;
        boss1.lifetime = 1000;
    }
}

function spawnMagicalBall(){
    if(frameCount%600 === 0 ){
        mb = createSprite(1000, 450, 30, 30);
        mb.addImage(mbImg);
        mb.scale = 0.3
        mb.velocityX = -5;
        mb.lifetime = 200;
        mbsGroup.add(mb);
    }
}

function shootFireBall(){
    fb = createSprite(150, 450, 10, 10);
    fb.addImage(fbImg);
    fb.scale = 0.2
    fb.velocityX = 10;

    fbsGroup.add(fb);
}

function mousePressed(){

}