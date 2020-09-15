import {Sky, Rocks, Hills, Clouds, HillsCastle, TreesRocks, Ground} from './modules/Sky.js';
import Monster from './modules/Monster.js';
import Hero from './modules/Hero.js';
import Coin from './modules/Coin.js';
import Bee from './modules/Bee.js';

const game = {
  width: 480,
  height: 270,
  isRunning: false,
  rightPressed: false,
  leftPressed: false,
  jumpPressed: false,
  score: 0,
  
  init() {
    this.score       = 0;
    this.canvas      = document.getElementById('gamecanvas');
    this.ctx         = this.canvas.getContext('2d');

    this.footAudio   = document.getElementById("footAudio");
    this.getAudio    = document.getElementById("getAudio");
    this.dieAudio    = document.getElementById("dieAudio");
    this.sky         = new Sky(this);
    this.rocks       = new Rocks(this);
    this.hills       = new Hills(this);
    this.clouds      = new Clouds(this);
    this.hillsCastle = new HillsCastle(this);
    this.treesRocks  = new TreesRocks(this);
    this.ground      = new Ground(this);

    this.coin        = new Coin(this.width/2, 200, this);
    this.bee         = new Bee(this.width/2, 0, this);
    this.hero        = new Hero(100, 225, this);
    this.monster     = new Monster(this.width, 225, this);

    this.draw();

    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
  },

  keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      game.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      game.leftPressed = true;
    } else if (e.keyCode == 32) {
      game.jumpPressed = true;
    }
  },

  keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      game.rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      game.leftPressed = false;
    } else if (e.keyCode == 32) {
      game.jumpPressed = false;
      game.hero.stopMove();
    }
  },

  drawScore() {
    game.ctx.font = "16px Arial";
    game.ctx.fillStyle = "#0095DD";
    game.ctx.fillText("Score: " + game.score, game.width/2-50, 32);
  },

  collisionDetection() {
    if (!game.coin.isDead) {
      if (game.hero.x > game.coin.x-game.coin.width/2 && game.hero.y > game.coin.y-game.coin.height/2) {
        game.getAudio.play();
        game.coin.x = game.width;
        game.score++;
      }
    }
        
    if (!game.monster.isDead) {
      if (
        game.hero.x > game.monster.x-game.monster.width
        && game.hero.y > game.monster.y-game.monster.height) {
        game.dieAudio.play();
        game.hero.isDead = true;
        game.monster.isDead = true;
        game.coin.isDead = true
        game.gameOver();
      }
    }
  },

  gameOver() {
    game.isRunning = false;
    document.getElementById('myTitle').innerText = 'Game Over!';
    document.getElementById('myScore').innerText = "Score: " + game.score;
    document.getElementById('startBtn').innerText = 'Play again';
    document.getElementById('myfilter').style.display = "block";
    document.getElementById('myButton').style.display = "block";
  },

  draw() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.sky.draw();
    game.rocks.draw();
    game.hills.draw();
    game.clouds.draw();
    game.clouds.update();
    game.hillsCastle.draw();
    game.treesRocks.draw();
    game.treesRocks.update();
    game.ground.draw();
    game.ground.update();

    game.bee.draw();
    game.bee.update();
    game.coin.draw();
    game.coin.update();
    game.monster.draw();
    game.monster.update();
    
    if (game.jumpPressed) {
      game.hero.jump();
    }

    if (game.leftPressed) {
      game.footAudio.play();
      game.hero.moveLeft();
    }
    
    if (game.rightPressed) {
      game.footAudio.play();
      game.hero.moveRight();
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
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
  game.isRunning = true;
  game.init();
})