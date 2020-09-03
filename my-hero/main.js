import {Sky, Rocks, Hills, Clouds, HillsCastle, TreesRocks, Ground} from './modules/Sky.js';
import Chicken from './modules/Chicken.js';
import Hero from './modules/Hero.js';

const game = {
  width: 480,
  height: 270,
  isRunning: false,
  score: 0,
  
  init() {
    this.canvas      = document.getElementById('gamecanvas');
    this.context     = this.canvas.getContext('2d');
    this.sky         = new Sky(this);
    this.rocks       = new Rocks(this);
    this.hills       = new Hills(this);
    this.clouds      = new Clouds(this);
    this.hillsCastle = new HillsCastle(this);
    this.treesRocks  = new TreesRocks(this);
    this.ground      = new Ground(this);

    this.hero        = new Hero(80, 95, this);
    this.chicken_1   = new Chicken(this.width, 205, 1, this);
    this.chicken_2   = new Chicken(this.width*1.5, 205, 2, this);
    this.chicken_3   = new Chicken(this.width*2, 205, 3, this);

    this.draw();

    window.addEventListener('keydown', function (e) {
      game.key = e.keyCode;
    });

    window.addEventListener('keyup', function (e) {
      game.key = false;
      game.hero.stopMove();
    });
    
    this.canvas.addEventListener("touchstart", function(e) {
      e.preventDefault();
      game.key = 32;
    }, false);
    this.canvas.addEventListener("touchend", function(e) {
      e.preventDefault();
      game.key = false;
      game.hero.stopMove();
    }, false);
  },

  gameOver() {
    game.hero.death();
    game.chicken_1.death();
    game.chicken_2.death();
    game.chicken_3.death();
    setTimeout(function() {
      game.isRunning = false;
      document.getElementById('myTitle').innerText = 'Game Over!';
      document.getElementById('startBtn').innerText = 'Play again';
      document.getElementById('myfilter').style.display = "block";
      document.getElementById('myButton').style.display = "block";
    }, 1600);
  },

  draw() {
    // Clear canvas
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

    
    game.chicken_1.draw(game.context);
    game.chicken_1.update();

    game.chicken_2.draw(game.context);
    game.chicken_2.update();

    game.chicken_3.draw(game.context);
    game.chicken_3.update();

    if (game.key && game.key === 32) {
      game.hero.jump();
    }
    
    game.hero.draw(game.context);
    game.hero.update();

    if ((game.chicken_1.x >= 80 && game.chicken_1.x <= 100
      || game.chicken_2.x >= 80 && game.chicken_2.x <= 100
      || game.chicken_3.x >= 80 && game.chicken_3.x <= 100) && game.hero.y >= 190) {
      game.gameOver();
    }
    // if (
    //   game.hero.x <= (game.chicken_1.x + game.chicken_1.width/2)
    //   && game.chicken_1.x <= (game.hero.x + game.hero.width/2)
    //   && game.hero.y <= (game.chicken_1.y + game.chicken_1.height/2)
    //   && game.chicken_1.y <= (game.hero.y + game.hero.height/2)
    // ) {
    //   game.score += 10;
    // }

    game.context.fillStyle = "rgb(250, 250, 250)";
    game.context.font = "24px Helvetica";
    game.context.textAlign = "left";
    game.context.textBaseline = "top";
    game.context.fillText("Score: " + game.score, game.width/2-50, 32);

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