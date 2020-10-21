var PLAY = 0;
var  END = 1;
var gameState = PLAY;

var monkey,monkey_running;
var ground,invisibleGround,groundimg;
var banana,bananaimg;
var obstacle,obstacleimg;

var survivaltime = 0;


function preload(){
  
monkey_running =
  loadAnimation("sprite_0.png","sprite_1.png",             
  "sprite_2.png","sprite_3.png","sprite_4.png",       
    "sprite_5.png","sprite_6.png",
    "sprite_7.png","sprite_8.png");

  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("obstacle.png");
  
  groundimg = loadImage("jungle.jpg")
}



function setup() {
    createCanvas(600,600);
  
  ground = createSprite(300,295,300,10);
  ground.addImage(groundimg)
  ground.scale = 1.25 ;
    ground.x = ground.width/2;
   ground.velocityX = -4;
  
  monkey = createSprite(40,260,10,20);
monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;

  
   obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  
  invisibleGround = createSprite(100,600,400,200);
  invisibleGround.visible = false;
  
 monkey.setCollider("circle",0,0);
  //monkey.debug = true;
  
}


function draw() {
  background("white");
  
  
  if(gameState === PLAY){
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 250){
     monkey.velocityY = -12;
     }

    if( bananasGroup.isTouching(monkey)){
       survivaltime = survivaltime + 2;
      bananasGroup.destroyEach();
      switch(survivaltime){
        case 1: monkey.scale = 0.12;
                break;
        case 2: monkey.scale = 0.14;
                break;
       case 3: monkey.scale = 0.16;
                break;
        case 4: monkey.scale = 0.18 ;
                break;
       default: break;
             }
      
      
       }
    
    
    
  monkey.velocityY = monkey.velocityY + 0.8; 
 
  monkey.collide(invisibleGround);
  
  createBanana ();
  spawnObstacle ();
    

 if(obstaclesGroup.isTouching(monkey)){
       monkey.scale = 0.12;
   gameState = END;
    }
    
}
  else if(gameState === END){
       ground.velocityX = 0;
       monkey.velocityY = 0;
  

    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
    
       }

  
  
  
  
  drawSprites();
  
textSize(15);
  stroke("red")
  fill("red");
  text("SURVIVALTIME- " +  survivaltime,450,50);

  
}

function createBanana (){
  if(frameCount % 100 === 0){
      banana = createSprite(200,200,10,10);
     banana.y = Math.round(random(120,250));
  banana.addImage(bananaimg);
  banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.lifetime = 55 ;  

      banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);

     }
} 

function spawnObstacle (){
  if(frameCount % 150 === 0){
  obstacle = createSprite(300,480,10,20);
  obstacle.x = Math.round(random(120,200));
   obstacle.addImage(obstacleimg);
  obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 60;
    
  obstaclesGroup.add(obstacle);
    
obstacle.setCollider("rectangle",0,0,400,400);
   //  obstacle.debug = true;

}  
}





