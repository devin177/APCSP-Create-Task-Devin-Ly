var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//create the variables needed for the game
let lagtime = 0;

//Bringing in the assets for the game 
var spaceship_image = new Image;
spaceship_image.src = "spaceshipSprite.png";

let spaceship = new Object();
spaceship.x = canvas.width/2 - 87/4;
spaceship.y = canvas.height - 72.5;
spaceship.velocity = 3


let spaceBackground = new Image;
spaceBackground.src = "spaceBackground.jpg";

// variables that represent buttons presses
let LEFT = 37;
let UP = 38;
let RIGHT = 39;
let DOWN = 40;
let SPACE = 32;
let controller = {};

let bullet = new Object();
let bulletCounter = 0;
bullet.x = [];
bullet.y = [];


//function that is called when a button is pressed/let go of that checks the keycode of the buttons
//and turns their corresponding part of the controller object to true/false
function key_state(keyCode, key_boolean){
	if(keyCode === LEFT){
		controller.left = key_boolean;
	}
	if(keyCode === RIGHT){
		controller.right = key_boolean;
	}
	if(keyCode === UP){
		controller.up = key_boolean;
	}
	if(keyCode === DOWN){
		controller.down = key_boolean;
	}
	if(keyCode  === SPACE){
		controller.space = key_boolean;
	}
}

//function that parses what buttons have been pressed
function parse_buttons(){
	if(controller.left && spaceship.x > 0){
		spaceship.x -= spaceship.velocity;
	}
	if(controller.up && spaceship.y > 0){
		spaceship.y -= spaceship.velocity;
	}
	if(controller.down && spaceship.y < canvas.height-146/3){
		spaceship.y += spaceship.velocity;
	}
	if(controller.right && spaceship.x < canvas.width - 87/3){
		spaceship.x += spaceship.velocity;
	}
}


		//make 2 arrays called x and y for bullets and in firegun push x and y coordinates into it the x and y would be relative to the ship
		//make a function that draws the bullets at those coordinates
		//make a function that adds/subtracts a number from the y coordinate y[i] - 6;
function parse_gun(){
	if(controller.space){
		bullet.x.push(spaceship.x);
		bullet.y.push(spaceship.y);
		firegun();
	}
}
function firegun(){
	draw_bullet();
	setTimeout("firegun();", 1000/144);
}


//When keys are pressed, these take the keycode and a boolean and then calls the function key_state
document.onkeydown = function(e){
	key_state(e.keyCode, true);
}
document.onkeyup = function(e){
	key_state(e.keyCode, false);
}


function draw_background(){

	ctx.drawImage(spaceBackground, 0,0, canvas.width,canvas.height);
	}

function draw_characters(){
	ctx.drawImage(spaceship_image, spaceship.x ,spaceship.y, 87/3, 146/3);
}

function draw_bullet(){
	let bulletImage = new Image;
	bulletImage.src = "bulletSprite.png";
	ctx.drawImage(bulletImage, bullet.x[bulletCounter]+25/3, bullet.y[bulletCounter]-357/8, 25/2, 357/8);
	bullet.y[bulletCounter] -= 1;
}







function mainGameLoop(){
	//Checks time since last loop and if it's been 1/60 of a second, then it draws everything again
	if(new Date().getTime() - lagtime > 1000/60){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		draw_background();
		draw_characters();
		parse_buttons();
		parse_gun();

		lagtime = new Date().getTime();
	}
	setTimeout("mainGameLoop();", 1);
}
mainGameLoop();








//https://www.w3schools.com/graphics/game_controllers.asp
//http://jsfiddle.net/Ey2eK/1/
//https://www.html5rocks.com/en/tutorials/canvas/notearsgame/
//https://www.w3schools.com/graphics/game_controllers.asp
//https://www.khanacademy.org/computing/computer-programming/html-css-js/using-js-libraries-in-your-webpage/a/whats-a-js-library
//https://www.packtpub.com/books/content/installing-jquery
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
//https://www.youtube.com/watch?v=GhM-PRF2-RU&list=PLJnkyVAO-LM6O_GLQo-Xg5hYIiAsG_KN2&index=2