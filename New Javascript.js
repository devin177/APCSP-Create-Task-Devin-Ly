var main = document.getElementById("main");
var ctx = main.getContext("2d");
var extra = document.getElementById("extra");
var extractx = extra.getContext("2d");
//create the variables needed for the game's canvases

//Bringing in the assets for the game 
var spaceship_image = new Image;
spaceship_image.src = "spaceshipSprite.png";



let spaceBackground = new Image;
spaceBackground.src = "spaceBackground.jpg";


let bulletImage = new Image;
bulletImage.src = "bulletSprite.png";

let enemyImage = new Image;
enemyImage.src = "enemy.png";


//creating spaceship object
let spaceship = new Object();
spaceship.x = main.width/2 - 87/4;
spaceship.y = main.height - 72.5;
spaceship.velocity = 5;

// variables that represent buttons presses
let left = 37;
let up = 38;
let right = 39;
let down = 40;
let space = 32;
let controller = {};




//function that is called when a button is pressed/let go of that checks the keycode of the buttons
//and turns their corresponding part of the controller object to true/false
function key_state(keyCode, key_boolean){
	if(keyCode === left){
		controller.left = key_boolean;
	}
	if(keyCode === right){
		controller.right = key_boolean;
	}
	if(keyCode === up){
		controller.up = key_boolean;
	}
	if(keyCode === down){
		controller.down = key_boolean;
	}
	if(keyCode  === space){
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
	if(controller.down && spaceship.y < main.height-146/3){
		spaceship.y += spaceship.velocity;
	}
	if(controller.right && spaceship.x < main.width - 87/3){
		spaceship.x += spaceship.velocity;
	}
}
//checks if the space bar is pressed and creates a bullet if it is
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
//pushes x and y coordinates of spaceship that will act as the starting point for all bullets into an array
function create_bullet(){
		bullets.x.push(spaceship.x);
		bullets.y.push(spaceship.y);
}

//functions for strictly just drawing the assets
function draw_background(){
	ctx.drawImage(spaceBackground, 0,0, main.width,main.height);
}
function draw_characters(){
	ctx.drawImage(spaceship_image, spaceship.x ,spaceship.y, 87/3, 146/3);
}
//draws bullet based on array, some distance is added so it doesn't spawn on top of the spaceship
function draw_bullet(i){
	ctx.drawImage(bulletImage, bullets.x[i]+25/3, bullets.y[i]- 357/8, 25/2, 357/8);
}

//animating function and also splices parts of the bullets arrays and enemies
//when they go off the screen so that i don't have a bunch of bullets pile up or aliens so less lag
function update(){
	for(var i = 0; i < bullets.x.length; i ++){
		if(bullets.y[i] <= -318/8){		
			bullets.x.splice(i,1);
			bullets.y.splice(i,1);
		}
	}
	for(var i = 0; i < enemy.x.length; i ++){
		if(enemy.y[i] >= main.height){
			enemy.x.splice[i,1];
			enemy.y.splice[i,1];
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
enemy.hit = [];

let score = 0;
let health = 5;

//This creates a random number between 0 - 1 using math.random(), then multiplies it by delta two numbers i choose, add minimum
function randomNumber(min,max){
	number = Math.floor(Math.random() * (max - min) + min);
	return(number);
}

//not actually creating objects for enemies but pushing random x coordinates to randomly spawn into an array and a matching y coordinate at 0 into the other array
function create_enemies(){
	enemy.x.push(randomNumber(0,405-318/8));
	enemy.y.push(0);
}

//drAw tHE eNEmieS according to the coordinates corresponding to the (i) parameter
function draw_enemy(i){
	ctx.drawImage(enemyImage,enemy.x[i] ,enemy.y[i], enemyImage.width/8, enemyImage.height/8);	
}

//goes thru all bullets and all enemies and checks if the rectangles that encompass the images intersect
function check_collision(){
	for(var i = 0; i < bullets.x.length; i ++){
		for(var q = 0; q < enemy.x.length; q ++){
			if(bullets.x[i] + 25/2 >= enemy.x[q] && bullets.x[i] <= enemy.x[q] + 318/8 && bullets.y[i] + 357/8 > enemy.y[q] && bullets.y[i] <= enemy.y[q] + 318/8){
				enemy.x.splice(q,1);
				enemy.y.splice(q,1);
				bullets.x.splice(i,1);
				bullets.y.splice(i,1);
				score += 1;
			}	
		}
	}
	//goes through all enemies and checks if the rectangles that encompass them intersect with our character
	for(var q = 0; q < enemy.y.length; q ++){
		if(spaceship.x + 87/3 >= enemy.x[q] && spaceship.x <= enemy.x[q] + 318/8 && spaceship.y + 146/3 > enemy.y[q] && spaceship.y <= enemy.y[q] + 318/8){
			enemy.x.splice(q,1);
			enemy.y.splice(q,1);
			health -= 1;
		}
	}
}

//this is a function that determines the difficulty. Every time you get 15 points, 
//you go up one level where enemies spawn faster so there are more enemies to kill
let level = 1;
function difficulty(){
	if(score === 15){
		level += 1;
		clearInterval("create_enemies();");
		score = 0;
		setInterval("create_enemies();", 1000 - (level*25));
		clearInterval("parse_gun();");
		setInterval("parse_gun();", 500  - (level*10));
	}
}
//function that displays your score on the screen without having to open the console and also your health and level
function showScore(){
	extractx.clearRect(0,0,extra.width,extra.height);
	extractx.font = "30px Arial";
	extractx.fillText("Score: " + score, extra.width/2-70,extra.height-1);
	extractx.font = "30px Arial";
	extractx.fillText("Health: " + health, 0, extra.height - 1);
	extractx.font = "30px Arial";
	extractx.fillText("Level: " + level, extra.width/2 + 80, extra.height -1);
}
//function that causes a window alert when the game is over because you have 0 health
function gameover(){
	if(health <= 0){
		window.alert("Game over! Your score was: " + (15*(level-1)+score) + "! To play again, refresh the page");
	}
}
//main game loop
function mainGameLoop(){
	ctx.clearRect(0,0,main.width,main.height);
	draw_background();
	draw_characters();
	parse_buttons();
	update();
	showScore();
	difficulty();
	gameover();
}

//this parse gun is outside of the main loop because i wanted to lower
//the fire rate of the gun to prevent lag
//check collision and create enemies are outside MGL because i wanted to have their frequency different from the rest of the other things
setInterval("check_collision();", 10);
setInterval("create_enemies();", 1000);
setInterval("parse_gun();", 500);
setInterval("mainGameLoop();", 10);
