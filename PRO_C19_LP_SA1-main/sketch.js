//global variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300,600, 1200 );
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  //creating ghost
  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if(gameState==="play")
  {
  if(tower.y > 600){
      tower.y = 300;
    }

    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    if(keyDown("left")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3;
    }
    
    if (climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;  
    }
    
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
        ghost.destroy();
        gameState = "end";
    }
    
    
    //calling the function
    spawnDoors();
    
    drawSprites();
  }
  if(gameState==="end")
  {
     background("black");
      stroke("yellow");
      fill("yellow");
      textSize(35);
      text("Game Over ", 230, 250);
  }
  console.log(gameState);
    }

function spawnDoors()
{
  var rem=frameCount%200;
  if(rem===0) 
  {
    door = createSprite(50,-50);
    doorsGroup.add(door);
    door.x= Math.round(random(60, 540));
    door.lifetime = 600;
    door.addImage("door", doorImg);
    door.velocityY = 1; 

    climber = createSprite(50, 0);
    climber.x=door.x;
    climbersGroup.add(climber);
    climber.lifetime = 600;
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;

    invisibleBlock = createSprite(50, 15);
    invisibleBlock.height=2;
    invisibleBlock.x=climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
    
    ghost.depth=door.depth;
    ghost.depth+=1;

    
  }
}