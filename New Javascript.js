var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//create the variables needed for the game
let lagtime = 0;

//Bringing in the assets for the game 
var spaceship_image = new Image;
spaceship_image.src = "spaceshipSprite.png";



let spaceBackground = new Image;
spaceBackground.src = "spaceBackground.jpg";


let bulletImage = new Image;
bulletImage.src = "bulletSprite.png";

let enemyImage = new Image;
enemyImage.src = "enemy.png";



let spaceship = new Object();
spaceship.x = canvas.width/2 - 87/4;
spaceship.y = canvas.height - 72.5;
spaceship.velocity = 5;

// variables that represent buttons presses
let LEFT = 37;
let UP = 38;
let RIGHT = 39;
let DOWN = 40;
let SPACE = 32;
let controller = {};




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
let bulletTimer = 0;
function parse_gun(){
	if(controller.space){
		create_bullet();
	}
}


//When keys are pressed, these take the keycode and a boolean and then calls the function key_state
document.onkeydown = function(e){
	key_state(e.keyCode, true);
}
document.onkeyup = function(e){
	key_state(e.keyCode, false);
}

function create_bullet(){
	bullets.x.push(spaceship.x);
	bullets.y.push(spaceship.y);
}
function draw_background(){
	ctx.drawImage(spaceBackground, 0,0, canvas.width,canvas.height);
}

function draw_characters(){
	ctx.drawImage(spaceship_image, spaceship.x ,spaceship.y, 87/3, 146/3);
}

function draw_bullet(i){
	ctx.drawImage(bulletImage, bullets.x[i]+25/3, bullets.y[i]- 357/8, 25/2, 357/8);
}
function update(){
	for(var i = 0; i < bullets.x.length; i ++){
		if(bullets.y[i] <= -318/8){		
			bullets.x.splice(i,1);
			bullets.y.splice(i,1);
		}
	}
	for(var i = 0; i < bullets.x.length; i ++){
		bullets.y[i] -=1;
		draw_bullet(i);
	}
	for(var i = 0; i < enemy.x.length; i ++){
		enemy.y[i] += 1;
		draw_enemy(i);
	}
}

let bullets = new Object();
bullets.x = [];
bullets.y = [];

let enemy = new Object();
enemy.x = [];
enemy.y = [];

function randomNumber(min,max){
	number = Math.floor(Math.random() * (max - min) + min);
	return(number);
}
function create_enemies(){
	enemy.x.push(randomNumber(0,405-318/8));
	enemy.y.push(0);
}
function draw_enemy(i){
	ctx.drawImage(enemyImage,enemy.x[i] ,enemy.y[i], enemyImage.width/8, enemyImage.height/8);	
}

function check_collision(){
	for(var i = 0; i < bullets.x.length; i++){
		for(var  j=0; j < enemy.x.length; j++){
			
		}
	}
}



function mainGameLoop(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	draw_background();
	draw_characters();
	parse_buttons();
	update();

}

//this parse gun is outside of the main loop because i wanted to lower
//the fire rate of the gun to prevent lag
setInterval("create_enemies();", 1000);
setInterval("parse_gun();", 500);
setInterval("mainGameLoop();", 1000/60);







//https://www.w3schools.com/graphics/game_controllers.asp
//http://jsfiddle.net/Ey2eK/1/
//https://www.html5rocks.com/en/tutorials/canvas/notearsgame/
//https://www.w3schools.com/graphics/game_controllers.asp
//https://www.khanacademy.org/computing/computer-programming/html-css-js/using-js-libraries-in-your-webpage/a/whats-a-js-library
//https://www.packtpub.com/books/content/installing-jquery
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
//https://www.youtube.com/watch?v=GhM-PRF2-RU&list=PLJnkyVAO-LM6O_GLQo-Xg5hYIiAsG_KN2&index=2
