//Global variables that are static (we don't change their value in the program), normally we write these in ALL CAPS
var PLAYER_SPEED = 10;
var PLAYER_SIZE = 20;
var ENEMY_SPEED = 50;
var ENEMY_SIZE = 15;

//Global variables (the x and y coord of the player)
var playerX;
var playerY;
var score;

var enemyArray = [];

var aKeyPressed;
var sKeyPressed;
var dKeyPressed;
var wKeyPressed;

var canvasObject = document.getElementById("myCanvas"); //get the HTML canvas
var canvas = canvasObject.getContext("2d"); //get the context of the canvas
canvas.canvas.width  = 880;
canvas.canvas.height = 420;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var isPlaying = false; //a boolean to see if we're playing or not
setInterval(draw, 20); //call the draw function every 20ms

/*
This function resets the enemy and players X & Y position. We call this function before we
start the game
*/
function resetGame()
{

     enemyX = canvasObject.width;
     enemyY = getRandomInt(0, canvasObject.height);
     playerX = PLAYER_SIZE + 10; //make it spawn just off the edge of the screen
     playerY = canvasObject.height/2; //middle Y value
     score = 0;
     updateScore();
     addEnemies(2); //add 4 enemies 
}


function addEnemies(numOfEnemies)
{
   enemyArray = [];
   for(var i = 0; i < numOfEnemies; i++)
   {
       enemyArray[i] = {x:getRandomInt(canvasObject.width/2,canvasObject.width) , y: getRandomInt(ENEMY_SIZE, canvasObject.height-ENEMY_SIZE), size: ENEMY_SIZE}; //add an enemy object into the array
   }
}

function addOneEnemy()
{
       enemyArray.push({x:getRandomInt(canvasObject.width/2,canvasObject.width) , y: getRandomInt(ENEMY_SIZE, canvasObject.height-ENEMY_SIZE), size: ENEMY_SIZE} ) //add an enemy object into the array
  
}

/*
Draws the player onto the cavnas 
*/
function drawPlayer() {
  if(aKeyPressed === true){
    playerX -= PLAYER_SPEED;
  }
  if(sKeyPressed === true){
    playerY -= PLAYER_SPEED;
  }
  if(dKeyPressed === true){
    playerX += PLAYER_SPEED;
  }
  if(wKeyPressed === true){
    playerY += PLAYER_SPEED;
  }
  checkWalls();
    canvas.beginPath();
    canvas.arc(playerX, playerY, PLAYER_SIZE, 0, Math.PI*2);
    canvas.fillStyle = "#000000";
    canvas.fill();
    canvas.closePath();

}
/*
Draws the enemies onto the cavnas. We iterate though each ememy in the array and update 
the objects values. 
*/
function drawEnemy() {
  for(var i = 0; i < enemyArray.length; i++)
  {
    var theEnemy = enemyArray[i];
    theEnemy.x -= Math.min(getRandomInt(10,20+score/5),40); 
    if(theEnemy.x <= 0) //if the enemy is off the screen
    {
      score = score+1; //add one to the score
      if(score % 10 === 0 && score > 0){
        addOneEnemy();
      }
      updateScore();
      theEnemy.x = canvasObject.width; //reset x position to the right side of the canvas
      theEnemy.y = getRandomInt(ENEMY_SIZE, canvasObject.height-ENEMY_SIZE); //pick a random y value
    }
    canvas.beginPath();
    canvas.arc(theEnemy.x, theEnemy.y, ENEMY_SIZE, 0, Math.PI*2);
    canvas.fillStyle = "#0000FF";
    canvas.fill();
    canvas.closePath();
    
  }  
}

/*
Draws the label onto the cavnas. This is called when isPlaying is set to false
*/
function drawClickToPlay()
{
    canvas.font="30px Arial";
    canvas.fillText("Game Over!",canvasObject.width/2 - 85 ,canvasObject.height/2 - 50);
    canvas.fillText("Press 'p' to start",canvasObject.width/2 - 110, canvasObject.height/2 + 50);
}

/*
This function is called when the user presses a key. We check to see if it is
a key we are looking for and update our boolean. See the full list here: http://keycode.info
*/
function keyDownHandler(e) {
  if (e.keyCode == 65) {
    aKeyPressed = true;
  } 
  else if (e.keyCode == 68) {
    dKeyPressed = true;
  }
  else if (e.keyCode == 87) {
    sKeyPressed = true;
  }
  else if (e.keyCode == 83) {
    wKeyPressed = true;
  }
  else if(e.keyCode == 80) {
      if(isPlaying == false){
        resetGame(); 
        isPlaying = true;
        }
    }
}

function keyUpHandler(e) {
  if (e.keyCode == 65) {
    aKeyPressed = false;
  } 
  else if (e.keyCode == 68) {
    dKeyPressed = false;
  }
  else if (e.keyCode == 87) {
    sKeyPressed = false;
  }
  else if (e.keyCode == 83) {
    wKeyPressed = false;
  }
}


function draw() {
  canvas.clearRect(0, 0, canvasObject.width, canvasObject.height); //first clear the canvas
  if(isPlaying) //if we're playing...
  {
      drawEnemy();
      drawPlayer();
      checkCollision();
  }
  else //we're not playing
  {
      drawClickToPlay(); //draw the text onto the canvas
  } 
}

/*
Helper method to update the HTML score elemnt
*/
function updateScore()
{
  document.getElementById("scoreText").innerHTML = "<h2>Score: "+score+"</h2>"; //update the HTML text
}

/*
Helper method to detect if the two circles collide
*/
function checkCollision()
{
  var thePlayer = {radius: PLAYER_SIZE, x: playerX, y: playerY}; //player
  
  for(var i = 0; i < enemyArray.length; i++)
  {
    var theEnemy = enemyArray[i]; //get the emeny 
    var dx = thePlayer.x - theEnemy.x;
    var dy = thePlayer.y - theEnemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < thePlayer.radius + theEnemy.size) {
     isPlaying = false; // collision detected!
    }
  }
}

function checkWalls()
{
  if(playerX < 0) playerX = 0;
  if(playerY < 0) playerY = 0;
  if(playerX > canvasObject.width) playerX = canvasObject.width;
  if(playerY > canvasObject.height) playerY = canvasObject.height;
}

/*
Helper method to generate a random integer 
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



