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
        this.speedX = Math.floor(Math.random() * 2 + 1);
    }

    //Check if collision between player and enemy happen
    if ((player.y < 400) && (player.y > 50)) {
        if (((player.x - this.x) < 40) && ((player.y - this.y) < 40)) {
            alert('bum');
            player.reset();
        }
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
    this.sprite = 'images/char-boy.png';
    this.update();
    this.handleInput();
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 300;
    this.y = 400;
};

Player.prototype.handleInput = function (key) {

    if (key == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 100;
    }
    if (key == 'right' && this.x < 350) {
        this.x += 100;
    }
    if (key == 'down' && this.y < 400) {
        this.y -= -100;
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
