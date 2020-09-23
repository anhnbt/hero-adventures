/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

let mutedBtn = document.getElementById("mutedBtn");
let startBtn = document.getElementById("startBtn");
let framesPerSecond = 60;  // FPS valid values are 60,30,20,15,10...
let requestId;

const game = {
  width            : 480,
  height           : 270,
  isRunning        : false,
  isSpeedDecrement : false,
  speedX           : 0.2,
  score            : 0,
  level            : 0,
  isPauseMusic     : false,
  
  //Initialization game
  init() {
    this.jumpPressed   = false;
    this.isJumping     = false;
    this.score         = 0;
    this.level         = 0;
    this.fps           = 0;
    this.canvas        = document.getElementById('gamecanvas');
    this.ctx           = this.canvas.getContext('2d', { alpha: false });
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    
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

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener("touchstart", this.touchStartHandler);
  },

  keyDownHandler(e) {
    if (!game.isJumping) {
      if (e.keyCode == 32) { //spacebar
        game.jumpPressed = true;
      }
      game.isJumping = true;
      e.preventDefault();
    }
  },
  
  // Mobile touch controls
  touchStartHandler(e) {
    if (!game.isJumping && e.touches) {
      game.jumpPressed = true;
      game.isJumping = true;
      e.preventDefault();
    }
  },

  draw() {
    game.ctx.clearRect(0, 0, game.width, game.height);

    game.bg.draw();
    game.rocks.draw();
    game.hills.draw();
    game.clouds.draw();
    game.hillsCastle.draw();
    game.treesRocks.draw();
    game.ground.draw();
    
    game.hero.draw();

    if (game.bgAudio.paused == true) {
      game.bgAudio.pause();
    } else {
      game.bgAudio.play();
    }
    
    if (game.isRunning) {
      if (game.jumpPressed) {
        game.jumpAudio.play();
        game.hero.jump();
      }


      game.clouds.update();
      game.treesRocks.update();
      game.ground.update();

      game.hero.update();
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
      
      game.collisionDetection();
      game.drawScore();
      
      requestId = window.requestAnimationFrame(game.draw);
    }
    
  },

  collisionDetection() {
    for (let i = 0; i < game.coins.length; i++) {
      if (!game.coins[i].dead) {
        if (game.hero.x + game.hero.width > game.coins[i].x
            && game.hero.x < game.coins[i].x + game.coins[i].width
            && game.hero.y + game.hero.height > game.coins[i].y
            && game.hero.y < game.coins[i].y + game.coins[i].height) {
            game.coins[i].dead = true;
            game.isSpeedDecrement = false;
            game.score++;
        }
      }
    }

    for (let i = 0; i < game.monsters.length; i++) {
      if (!game.monsters[i].dead) {
        if (game.hero.x + game.hero.width > game.monsters[i].x
          && game.hero.x < game.monsters[i].x + game.monsters[i].width
          && game.hero.y + game.hero.height > game.monsters[i].y
          && game.hero.y < game.monsters[i].y + game.monsters[i].height) {
          console.log("GameOVer!!!!");
          game.monsters[i].dead = true;
          game.hitAudio.play();
          game.endAudio.play();
          game.gameOver();
        }
      }
    }
  },

  gameOver() {
    window.cancelAnimationFrame(requestId);
    game.isRunning = false;
    game.bgAudio.pause();
    document.getElementById('myTitle').innerText = 'Game Over!';
    document.getElementById('myScore').innerText = "Score: " + game.score;
    startBtn.innerText = '🔄 Try Again';
    document.getElementById('myfilter').style.display = "block";
    document.getElementById('myButton').style.display = "block";
    document.getElementById('howToPlay').style.display = "none";
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
    game.ctx.font      = "16px Ranchers";
    game.ctx.fillStyle = "Black";
    
    game.ctx.textAlign = 'left';
    game.ctx.fillText("Score: " + game.score, 10, 32);

    game.ctx.textAlign = 'right';
    game.ctx.fillText("Level: " + game.level, game.width -10, 32);
  },

};

function startGame() {
  // the html page is ready
  game.init();
  game.bgAudio.autoplay = true;
  game.bgAudio.volume = 0.4;
}

startBtn.addEventListener('click', function() {
  game.isRunning = true;
  game.init();
  game.readyAudio.play();
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
}, false);

mutedBtn.addEventListener('click', function() {
  if (game.bgAudio.paused == true) {
    game.bgAudio.play();
    mutedBtn.innerHTML = "&#127925; Pause";
  } else {
    game.bgAudio.pause();
    mutedBtn.innerHTML = "&#127925; Play";
  }
}, false);