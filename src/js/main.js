/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

const mutedBtn = document.getElementById("mutedBtn");
const startBtn = document.getElementById("startBtn");

const game = {
  width            : 480,
  height           : 270,
  isRunning        : false,
  isJumping        : false,
  jumpPressed      : false,
  isSpeedDecrement : false,
  speedX           : 0.2,
  score            : 0,
  level            : 0,
  isPauseMusic     : false,
  
  //initiate game
  init() {
    this.jumpPressed   = false;
    this.isJumping     = false;
    this.score         = 0;
    this.level         = 0;
    this.canvas        = document.getElementById('gamecanvas');
    this.ctx           = this.canvas.getContext('2d');
    
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
    document.addEventListener("touchstart", this.touchStartHandler, false);
  },

  keyDownHandler(e) {
    if (!game.isJumping) {
      if (e.keyCode == 32) {
        game.jumpPressed = true;
      }
      game.isJumping = true;
    }
  },

  touchStartHandler() {
    if (!game.isJumping) {
      game.jumpPressed = true;
      game.isJumping = true;
    }
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
      if (!game.coins[i].dead) {
        game.coins[i].draw();
      }
      game.coins[i].update();
    }

    for (let i = 0; i < game.monsters.length; i++) {
      if (!game.monsters[i].dead) {
        game.monsters[i].draw();
      }
      game.monsters[i].update();
    }
    
    game.hero.draw();
    game.hero.update();

    if (game.isPauseMusic) {
      game.bgAudio.pause();
    } else {
      game.bgAudio.play();
    }
    
    if (game.isRunning) {
      if (game.jumpPressed) {
        game.jumpAudio.play();
        game.hero.jump();
      }

      game.collision();
      game.drawScore();
      requestAnimationFrame(game.draw);
    }
  },

  collision() {
    for (let i = 0; i < game.coins.length; i++) {
      if (!game.coins[i].dead) {
        if (game.hero.x > game.coins[i].x - game.coins[i].width/2 
          && (game.coins[i].x > game.hero.x || game.coins[i].x > game.hero.x - game.hero.width)
          && game.hero.y < game.coins[i].y) {
          game.score++;
          game.coins[i].dead = true;
          game.isSpeedDecrement = false;
        }
      }
    }

    for (let i = 0; i < game.monsters.length; i++) {
      if (!game.monsters[i].dead) {
        if (game.hero.x > (game.monsters[i].x - game.monsters[i].width/2)
          && (game.monsters[i].x > game.hero.x || game.monsters[i].x > game.hero.x - game.hero.width)
          && game.hero.y > (game.monsters[i].y + 10 - game.monsters[i].height)) {
          game.hitAudio.play();
          game.endAudio.play();
          game.gameOver();
        }
      }
    }
  },

  gameOver() {
    game.isRunning = false;
    game.bgAudio.pause();
    document.getElementById('myTitle').innerText = 'Game Over!';
    document.getElementById('myScore').innerText = "Score: " + game.score;
    startBtn.innerText = 'Play again';
    document.getElementById('myfilter').style.display = "block";
    document.getElementById('myButton').style.display = "block";
  },

  drawScore() {
    if (!game.isRunning) return;
    if (!game.isSpeedDecrement && game.score > 0 && game.score % 5 === 0) {
      game.coinAudio.play();
      game.isSpeedDecrement = true;
      game.ground.speed -= game.speedX;
      game.level++;
      for (let i = 0; i < game.monsters.length; i++) {
        game.monsters[i].speed -= game.speedX;
      }

      for (let i = 0; i < game.coins.length; i++) {
        game.coins[i].speed -= game.speedX;
      }
    }
    this.ctx.font      = "18px Arial";
    game.ctx.strokeStyle = "#fc0";
    game.ctx.lineWidth = 1;
    game.ctx.strokeText("Score: " + game.score, 10, 32);
    game.ctx.strokeText("Level: " + game.level, game.width - 120, 32);
  },

};

function startGame() {
  game.init();
  game.bgAudio.autoplay = true;
  game.bgAudio.load(); 
  game.bgAudio.volume = 0.4;
}

document.addEventListener("DOMContentLoaded", startGame);

startBtn.addEventListener('click', function() {
  game.readyAudio.play();
  game.isRunning = true;
  game.init();
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
});

mutedBtn.addEventListener('click', function() {
  if (game.isPauseMusic) {
    game.bgAudio.play();
    mutedBtn.textContent = "Music Off";
    mutedBtn.classList.remove("btn-danger");
    mutedBtn.classList.add("btn-default");
  } else {
    game.bgAudio.pause();
    mutedBtn.textContent = "Music On";
    mutedBtn.classList.remove("btn-default");
    mutedBtn.classList.add("btn-danger");
  }
  game.isPauseMusic = !game.isPauseMusic;
});