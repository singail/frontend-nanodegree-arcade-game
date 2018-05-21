let count = 0;
let points = 0;
const winner = document.querySelector('#winnerModal');
const close = document.querySelector('.close');
const button = document.querySelector('.playAgain');
const modalText = document.querySelector('.congrats');

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speedX = 2;
    this.sprite = 'images/enemy-bug.png';
    this.update();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * Math.random();
    if (this.x > 505) {
        this.x = -100;
        this.speedX = Math.floor(Math.random() * 3 + 2);
    }

    //Check if there is a collision between player and enemy
    if (player.x < this.x + 30 &&
        player.x + 60 > this.x &&
        player.y < this.y + 30 &&
        player.y + 60 > this.y) {
        //If there is a collision, move player back to the start position and count collisions
        player.reset();
        count++;
        countCollisions();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 300;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move player to the start position
Player.prototype.reset = function () {
    this.x = 300;
    this.y = 400;
};

Player.prototype.handleInput = function (key) {

    if (key == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (key == 'right' && this.x < 350) {
        this.x += 101;
    }
    if (key == 'down' && this.y < 400) {
        this.y -= -83;
    }

    //When player reaches the water, add a point
    if (key == 'up' && this.y <= 10) {
        points++;
        countPoints();
        setTimeout(function () {
            player.reset();
        }, 500);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var enemy1 = new Enemy(-100, 70);
var enemy2 = new Enemy(-200, 225);
var enemy3 = new Enemy(-50, 140);
var enemy4 = new Enemy(-600, 220);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Star class
var Star = function (x) {
    this.x = x;
    this.y = -25;
    this.sprite = 'images/Star.png';
};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var star1 = new Star(350);
var star2 = new Star(400);
var star3 = new Star(450);
var stars = [star1, star2, star3];

//This function checks, how many collisions happened and changes the number of stars visible on the screen
function countCollisions() {
    if (count == 3) {
        star1.x = -1000;
    }

    if (count == 5) {
        star2.x = -1000;
    }

    if (count == 7) {
        star3.x = -1000;
        gameOver();
    }
}

//The game ends after 7 collisions
function gameOver() {
    modalText.innerHTML = 'Sorry! You lost!';
    winner.style.display = 'block';
    resetGame();
    star1.x = 350;
    star2.x = 400;
    star3.x = 450;
}

//This function announces that the player has won, if he has 6 points
function countPoints() {
    if (points == 6) {
        setTimeout(function () {
            winner.style.display = 'block';
        }, 500);
        resetGame();
    }
}

//Close the modal and reset the game
button.addEventListener('click', function () {
    winner.style.display = 'none';
    resetGame();
})

close.addEventListener('click', function () {
    winner.style.display = 'none';
    resetGame();
})

//Reset the game after the modal is closed
function resetGame() {
    count = 0;
    points = 0;
    star1.x = 350;
    star2.x = 400;
    star3.x = 450;
}
