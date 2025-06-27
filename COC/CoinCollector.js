console.log("commit has pushed")
/* setup constants */
const canvasHeight = 500; 
const canvasWidth = 500;
const WALL_THICKNESS = 3;
const playerSize = 30;
const playerStart = 200;
const coinSize = 20;
const timeOut = 5000;
const warning = 2000;
//set up global variables 
var Speed = 8;
const controls = ['w', 'a', 's', 'd', 'space'];
var score = 0;
var LifeExpectancy = 5000;
var playerSpeed = 3;
var gameState = "start"
var i = 0;
var lives = 3;
var firstDraw = 0;
var highScore;
var highScoreNew;
//set up function, creates sprites 
function setup() {
	//create canvas and set up settings
	cnv = new Canvas(canvasWidth, canvasHeight);
	displayMode('centered')
	background("pink")
	//create player character
	player = new Sprite(playerStart, playerStart, playerSize, playerSize, 'k');
	player.color = 'blue';
	//create coin and enemy groups
	totalCoin = new Group();
	totalEnemy = new Group();
	walls = new Group();
	//make the walls for collisions
    wallBot = new Sprite(canvasWidth/2,canvasHeight,canvasWidth,   WALL_THICKNESS, "s");
	wallTop = new Sprite(canvasWidth/2,0,canvasWidth, WALL_THICKNESS, "s");
	wallRH = new Sprite(canvasWidth,  canvasHeight/2, WALL_THICKNESS, canvasWidth, "s");
	wallLH = new Sprite(0,  canvasWidth/2, WALL_THICKNESS, canvasWidth, "s");
    //adding walls to wall group
    walls.add(wallTop);
    walls.add(wallBot);
    walls.add(wallRH);
    walls.add(wallLH);
    console.log(walls);
}

function draw() {
	//if game is on start screen, run this code
	if (gameState == "start") {

		text("Coin Collector:game that works", 50, 50)
		text("collect the yellow coins using WASD", 50, 70)
		text("avoid the green loan sharks!", 50, 90)
		text("press Enter to start", 50, 250)

		if (kb.pressed('enter')) {
			gameState = "running";
		}
	}
	//if game is playing, run this code
	if (gameState == "running") {
		//set background to a lighter shade if lives is greater than 0, visual indicator that they are low on lives
		if(lives== 0){
			background('skyblue')
		}else{
			background('lightblue')
		}
		playerMovement();
		//checks if the total amount of coins is maxed out, otherwise randomly creates coin
		if (totalCoin.length < 10) {
			if (random(0, 1000) < 15) {
				createCoin()
				console.log(random(0, 1000))
			}
		} else {
			console.log("limit reached")
		}
		//checks if the total amount of enemies is maxed out, otherwise randomly creates enemies
		if (totalEnemy.length < 5) {
			if (random(0, 1000) < 5) {
				createEnemy();
				console.log(random(0, 1000))
			}
		}
		//display text 
		text("score = " + score, 50, 50)
		text("lives = " + lives, 50, 60)
		//check if coins are going to disapear
		for (i = 0; i < totalCoin.length; i++) {
			checkCoinTime(totalCoin[i])
		}
		//check if enemeis are going to disapear
		for (i = 0; i < totalEnemy.length; i++) {
			checkEnemyTime(totalEnemy[i]);
		}
		//check if player collides with coins or enemy
		totalCoin.collides(player, addPoint);
		totalEnemy.collides(player, playerHitDebt);
		//check if player has enough lives, else go to end screen
		if (lives < 0) {
			player.vel.y = 0;
			player.vel.x = 0;
			player.x = 250;
			player.y = 250;
			gameState = "dead";
		}
		//run function of player ran out of lives
	} else if (gameState == "dead") {
		background('blue');
		if (firstDraw == 0) {
			//get high score from database to check if current score has beaten it
			fb_get_high_score("COC").then((_highScore) => {
				console.log(_highScore)
				//check if score is higher
				if (score > _highScore) {
					highScore = score;
					highScoreNew = true;//boolean to state that they have got a new high score 
					console.log("updating score to " + highScore)
					fb_update_high_score_COC(highScore)
				} else {
					highScore = _highScore;
					highScoreNew = false;
					console.log(highScore);
				}
				console.log(highScore);
			}).catch((error) => {
				console.log('Error!');
				console.log(error);
			})
			firstDraw = 1;



		}
		//if player accdentaly hasn't signed in 
		if (highScore !== undefined) {
			text("your high Score is $" + highScore, 50, 70);
		} else {
			text("looks like you haven't signed in Yet", 50, 70)
		}
		text("uh,oh! you got caught by the Loan Sharks!", 50, 50)
		text("you scored $" + score, 50, 100)
		text("press enter to replay", 50, 120);
		if (kb.pressed('enter')) {
			score = 0;
			lives = 3;
			firstDraw = 0;
			gameState = running;
		}
	}
}

function addPoint(_coin_, _player_) {
	_coin_.remove();
	score = score + 1;
}

function createCoin() {
	//random (0, WIDNOWHEIGHT)
	const coinSpawnY = (Math.random() * canvasWidth)
	const coinSpawnX = (Math.random() * canvasHeight)
	console.log(coinSpawnY)
	console.log(coinSpawnX)
	coin = new Sprite(coinSpawnX, coinSpawnY, coinSize);
	coin.color = 'yellow';
	coin.spawntime = millis();
	console.log("spawntime " + coin.spawntime);
	totalCoin.add(coin);
}
function createEnemy() {
	//random (0, WIDNOWHEIGHT)
	const enemySpawnY = (Math.random() * canvasWidth)
	const enemySpawnX = (Math.random() * canvasHeight)
	console.log(enemySpawnY)
	console.log(enemySpawnX)
	enemy = new Sprite(enemySpawnX, enemySpawnY, coinSize, coinSize);
	enemy.color = 'green';
	enemy.spawntime = millis();
	enemy.collides(player, enemyDeathAuto);
	totalEnemy.add(enemy);
}
function checkCoinTime(checkingCoin) {

	if (checkingCoin.spawntime + timeOut < millis()) {

		console.log("A coin has died of dementia")
		checkingCoin.remove()
	} else if (coin.spawntime + warning < millis()) {
		console.log("cranberry sauce")
		checkingCoin.color = 'red';
	} else {
		console.log("plum Jam")
	}
}
function checkEnemyTime(checkingEnemy) {
	if (checkingEnemy.spawntime + timeOut < millis()) {

		console.log("A enemy has died of dementia")
		checkingEnemy.remove()
	}
}

function enemyDeathAuto(_enemy, _player) {
	_enemy.remove();
}

function playerHitDebt(_enemy, _player) {
	_enemy.remove();
	lives = lives - 1;
}

function playerMovement() {
	var xPress = 0;
	var yPress = 0;
	/* controls for x*/
	if (kb.pressing(controls[1])) {
		//left
		xPress = xPress - Speed;
	}

	if (kb.pressing(controls[3])) {
		//right
		xPress = xPress + Speed;
	}
	/* controls for y*/
	if (kb.pressing(controls[0])) {
		//up
		yPress = yPress - Speed;
	}

	if (kb.pressing(controls[2])) {
		//down
		yPress = yPress + Speed;

	}
	player.vel.x = xPress;
	player.vel.y = yPress;
	walls.collides(player,playerStop);
	
}
function playerStop(_walls,_player){
	console.log(yPress)
}