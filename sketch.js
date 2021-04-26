var mario;
var platformGroup , obstacleGroup;
var marioAnimation , groundAnimation,wallAnimation, obstacleAnimation , flagAnimation;
var PLAY = 1;
  var WIN = 2;
  var LOSE = 0;
  var gameState = PLAY;

function preload()
{
  marioAnimation = loadAnimation("images/Capture1.png","images/Capture3.png","images/Capture4.png");
  groundAnimation = loadAnimation("images/ground.png");
  wallAnimation = loadAnimation("images/wall.png");
  obstacleAnimation = loadAnimation("images/obstacle1.png");
  flagAnimation = loadAnimation("images/Flag.png");

}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  

  
  //creating a player mario
  mario = new Player();
  //creating a group
  platformGroup= createGroup();
  obstacleGroup= createGroup();

  //adding platforms to stand for mario
  for (var i=0;i<14;i++)
	 {
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,80]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.rw + gap; //counting x location of next platform to be build
      if(i%3 == 0){
      wall = new Walls(countDistanceX);
      platformGroup.add(wall.spt);

      }
      if(i%4 == 0){
      obstacle = new obstacles(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
   }
   flag = createSprite(countDistanceX , height-330 );
   flag.addAnimation("flag",flagAnimation);
   flag.scale = 0.2;
 
}

function draw() {
  background('skyblue');

  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);

if(gameState == PLAY){

  if(obstacleGroup.isTouching(mario.spt) || mario.spt.y > height){
    gameState=LOSE;
  }

  mario.applyGravity();
  mario.spt.collide(platformGroup);

  //Calling various function to controll mario
  if (keyDown("left"))  
  { 
    mario.moveLeft();
  }
  if (keyDown("right")) 
  { 
    
    mario.moveRight();
  }
  if (keyDown("up")&& mario.spt.velocityY ==0) 
  { 
    mario.jump();
  }

}


if(gameState == LOSE){

  text("GAME OVER " , mario.spt.x , 300);

  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0 , 0);
  mario.spt.pause();

}

if(gameState == WIN){
text(" WINNER " , mario.spt.x , 300);
  if(flag.isTouching(mario.spt) || mario.spt.y > height){
    gameState=WIN;
  }

}










  
  //apply gravity to mario and set colliding with platforms
 
   drawSprites();
}



