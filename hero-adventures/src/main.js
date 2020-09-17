const game = {
  width            : 480,
  height           : 270,
  isRunning        : false,
  keydown          : false,
  jumpPressed      : false,
  isSpeedDecrement : false,
  speedX           : 0.2,
  score            : 0,
  level            : 0,
  
  init() {
    this.jumpPressed   = false;
    this.isJumping     = false;
    this.score         = 0;
    this.level         = 0;
    this.canvas        = document.getElementById('gamecanvas');
    this.ctx           = this.canvas.getContext('2d');
    
    this.ctx.font      = "16px Arial";
    this.ctx.fillStyle = "#008CBA"; // Blue 

    this.coinAudio     = document.getElementById("coinAudio");
    this.hitAudio      = document.getElementById("hitAudio");
    this.endAudio      = document.getElementById("gameOverAudio");
    this.jumpAudio     = document.getElementById("jumpAudio");
    this.bgAudio       = document.getElementById("bgAudio");
    this.readyAudio    = document.getElementById("readyAudio");
    this.bg            = new Bg(this);
    this.rocks         = new Rocks(this);
    this.hills         = new Hills(this);
    this.clouds        = new Clouds(this);
    this.hillsCastle   = new HillsCastle(this);
    this.treesRocks    = new TreesRocks(this);
    this.ground        = new Ground(this);
    this.hero          = new Hero(80, 220, this);
    this.coins         = [
      new Coin(this.width, this.height/2, this),
      new Coin(this.width*2, this.height/2, this)
    ];
    this.monsters      = [
      new Monster(this.width, 220, this),
      new Monster(this.width*2, 220, this)
    ];

    this.draw();

    document.addEventListener('keydown', this.keyDownHandler, false);
  },

  keyDownHandler(e) {
    if (!game.isJumping) {
      if (e.keyCode == 32) {
        game.jumpPressed = true;
      }
      game.isJumping = true;
    }
  },

  drawScore() {
    if (!game.isSpeedDecrement && game.score > 0 && game.score % 5 === 0) {
      game.coinAudio.play();
      game.ctx.fillStyle = "#f44336"; // Red 
      game.isSpeedDecrement = true;
      game.ground.speedX -= game.speedX;
      game.level++;
      for (let i = 0; i < game.monsters.length; i++) {
        game.monsters[i].speedX -= game.speedX;
      }

      for (let i = 0; i < game.coins.length; i++) {
        game.coins[i].speedX -= game.speedX;
      }
    }
    game.ctx.fillText("Score: " + game.score, 10, 32);
    game.ctx.fillText("Level: " + game.level, game.width - 100, 32);
  },

  collisionDetection() {
    if (game.isRunning) {
      for (let i = 0; i < game.coins.length; i++) {
        if (!game.coins[i].isDead) {
          if (game.hero.x > game.coins[i].x - game.coins[i].width/2 
            && (game.coins[i].x > game.hero.x || game.coins[i].x > game.hero.x - game.hero.width)
            && game.hero.y < game.coins[i].y) {
            game.score++;
            game.coins[i].isDead = true;
            game.isSpeedDecrement = false;
            game.ctx.fillStyle = "#008CBA"; // Blue 
          }
        }
      }
  
      for (let i = 0; i < game.monsters.length; i++) {
        if (!game.monsters[i].isDead) {
          if (game.hero.x > (game.monsters[i].x - game.monsters[i].width/2)
            && (game.monsters[i].x > game.hero.x || game.monsters[i].x > game.hero.x - game.hero.width)
            && game.hero.y > (game.monsters[i].y + 10 - game.monsters[i].height)) {
            game.hitAudio.play();
            game.endAudio.play();
            game.hero.isDead = true;
            game.monsters[i].isDead = true;
            game.gameOver();
          }
        }
      }
    }
  },

  gameOver() {
    game.bgAudio.pause();
    game.isRunning = false;
    document.getElementById('myTitle').innerText = 'Game Over!';
    document.getElementById('myScore').innerText = "Score: " + game.score;
    document.getElementById('startBtn').innerText = 'Play again';
    document.getElementById('myfilter').style.display = "block";
    document.getElementById('myButton').style.display = "block";
  },

  draw() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.bg.draw();
    game.rocks.draw();
    game.hills.draw();
    game.clouds.draw();
    game.clouds.update();
    game.hillsCastle.draw();
    game.treesRocks.draw();
    game.treesRocks.update();
    game.ground.draw();
    game.ground.update();

    for (let i = 0; i < game.coins.length; i++) {
      if (!game.coins[i].isDead) {
        game.coins[i].draw();
      }
      game.coins[i].update();
    }

    for (let i = 0; i < game.monsters.length; i++) {
      if (!game.monsters[i].isDead) {
        game.monsters[i].draw();
      }
      game.monsters[i].update();
    }
    
    if (game.jumpPressed) {
      game.jumpAudio.play();
      game.hero.jump();
    }
    
    game.hero.draw();
    game.hero.update();
    
    game.collisionDetection();
    game.drawScore();
    if (game.isRunning) {
      requestAnimationFrame(game.draw);
    }
  }
};

function startGame() {
  game.init();
}

document.addEventListener("DOMContentLoaded", startGame);

document.getElementById('startBtn').addEventListener('click', function() {
  game.readyAudio.play();
  game.bgAudio.play();
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
  game.isRunning = true;
  game.init();
})