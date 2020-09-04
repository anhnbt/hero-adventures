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
    this.context     = this.canvas.getContext('2d');
    this.sky         = new Sky(this);
    this.rocks       = new Rocks(this);
    this.hills       = new Hills(this);
    this.clouds      = new Clouds(this);
    this.hillsCastle = new HillsCastle(this);
    this.treesRocks  = new TreesRocks(this);
    this.ground      = new Ground(this);

    this.coin        = new Coin(this.width/2, 205, this);
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
    game.context.font = "16px Arial";
    game.context.fillStyle = "#0095DD";
    game.context.fillText("Score: " + game.score, game.width/2-50, 32);
  },

  collisionDetection() {
    if (game.coin.status) {
      if (game.hero.x > game.coin.x) {
        game.coin.status = false;
        game.coin.x = game.width;
        game.score++;
      }
    }

    if (game.monster.status) {
      if (
        game.hero.x > game.monster.x-game.monster.width
         && game.hero.y > game.monster.y-game.monster.height) {
        game.hero.death();
        game.monster.death();
        game.gameOver();
      }
    }
  },

  gameOver() {
    setTimeout(function() {
      game.isRunning = false;
      document.getElementById('myTitle').innerText = 'Game Over!';
      document.getElementById('startBtn').innerText = 'Play again';
      document.getElementById('myfilter').style.display = "block";
      document.getElementById('myButton').style.display = "block";
    }, 1500);
  },

  draw() {
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.sky.draw(game.context);
    game.rocks.draw(game.context);
    game.hills.draw(game.context);
    game.clouds.draw(game.context);
    game.clouds.update();
    game.hillsCastle.draw(game.context);
    game.treesRocks.draw(game.context);
    game.treesRocks.update();
    game.ground.draw(game.context);
    game.ground.update();

    game.bee.draw(game.context);
    game.bee.update();
    game.coin.draw(game.context);
    game.coin.update();
    game.monster.draw(game.context);
    game.monster.update();

    if (game.jumpPressed) {
      game.hero.jump();
    }
    if (game.leftPressed) {
      game.hero.moveLeft();
    }
    
    if (game.rightPressed) {
      game.hero.moveRight();
    }
    
    game.hero.draw(game.context);
    game.hero.update();
    
    game.collisionDetection();
    game.drawScore();
    if (game.isRunning) {
      requestAnimationFrame(game.draw);
    }
  }
};

function startup() {
  game.init();
}

document.addEventListener("DOMContentLoaded", startup);

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function() {
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
  game.isRunning = true;
  game.init();
})