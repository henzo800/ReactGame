var startTime = Date.now();
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");
var time = 0;
var timerRunning = false;
var keyPress = false;
var play = false;
var react = false;
var reactStart = 0;
var scoreScreen = false;
var gameState = 0;
var score = 0;

document.addEventListener('keydown', keyDownHandler, false);
function keyDownHandler(event) {
	//space
	if(event.keyCode == 32) {
		keyPress = true;
	}
	event.preventDefault();
}

document.addEventListener('keyup', keyUpHandler, false);
function keyUpHandler(event) {

	if(event.keyCode == 32) {
		keyPress = false;
	}
}

document.addEventListener('mousedown', mouseDownHandler, false);
function mouseDownHandler(event) {

	keyPress = true;
}

document.addEventListener('mouseup', mouseUpHandler, false);
function mouseUpHandler(event) {

	keyPress = false;
}

function timer() {
	if(timerRunning == true) {
		setTimeout(function() {
			var nowTime = Date.now();
			time = nowTime - startTime;
			timer();
		}, 1)
	}
}

function startTimer() {
	if(timerRunning == false) {
		startTime = Date.now();
	}
	timerRunning = true;
	timer();
}

function stopTimer() {
	timerRunning = false;
	score = time;
}

function drawCircle() {
	ctx.arc(canvas.width/2, canvas.height/2, 400, 0, 2 * Math.PI, false);
	if(gameState == 2) {
		ctx.fillStyle = "rgb(255, 0, 0)";
	}
	else if(gameState == 3) {
		ctx.fillStyle = "rgb(0, 255, 0)";
	} 
	else {
		ctx.fillStyle = "rgb(0, 0, 255)";
	}
	ctx.fill();
}
function again() {
	time = 0;
	reactStart = 0;
	gameState = 1;
}
function tick() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var fTime = score/1000;
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = '100px Consolas';
	ctx.textAlign = 'center';
	if(gameState == 0) {
		ctx.fillText("Click to start", (canvas.width/2), canvas.height/2);
		if(keyPress == true) {
			gameState = 1;
		}
	}
	else if(gameState == 1) {
		drawCircle();
		ctx.fillText("Wait", canvas.width/2, 100);
		reactStart = reactStart + Math.floor((Math.random() * 100) + 1);
		if(reactStart > 1000) {
			gameState = 2;
		}
		if(keyPress == true && reactStart > 100) {
			stopTimer();
			gameState = 4;
		}
		
	}
	else if(gameState == 2) {
		startTimer();
		drawCircle();
		ctx.fillText("Click the red circle", canvas.width/2, 100);
		if(keyPress == true) {
			gameState = 3;
			stopTimer();
		}
	}
	else if(gameState == 3) {
		drawCircle();
		ctx.fillText(fTime.toFixed(3), (canvas.width/2), canvas.height-50);
		ctx.fillText("Click to play again", canvas.width/2, 100);
		if(keyPress == true) {
			again();
		}
	}
	else if(gameState == 4) {
		drawCircle();
		ctx.fillText("Too Early!", (canvas.width/2), canvas.height-50);
		ctx.fillText("Click to play again", canvas.width/2, 100);
		if(keyPress == true) {
			again();
		}
	}
}
setInterval(tick, 100)