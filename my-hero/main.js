import {Sky, Rocks, Hills, Clouds, HillsCastle, TreesRocks, Ground} from './modules/Sky.js';
import Chicken from './modules/Chicken.js';
import Hero from './modules/Hero.js';

const game = {
  isRunning: false,
  
  init() {
    this.canvas      = document.getElementById('gamecanvas');
    this.context     = this.canvas.getContext('2d');

    this.sky         = new Sky(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.rocks       = new Rocks(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.hills       = new Hills(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.clouds      = new Clouds(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.hillsCastle = new HillsCastle(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.treesRocks  = new TreesRocks(0, 0, this.canvas.width, this.canvas.height, this.context);
    this.ground      = new Ground(0, 0, this.canvas.width, this.canvas.height, this.context);

    this.hero        = new Hero(50, 90, this.context);
    this.chicken     = new Chicken(this.canvas.width, 205, this.context);

    // Start game
    this.draw();

    window.addEventListener('keydown', function (e) {
      game.key = e.keyCode;
    });

    window.addEventListener('keyup', function (e) {
      game.key = false;
      game.hero.stopMove();
    });
  },

  draw() {
    // Clear canvas
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.sky.render();
    game.rocks.render();
    game.hills.render();
    game.clouds.render();
    game.clouds.update();
    game.hillsCastle.render();
    game.treesRocks.render();
    game.treesRocks.update();
    game.ground.render();

    if (game.key && game.key === 32) { game.hero.jump(); }

    game.hero.render();
    game.hero.update();

    game.chicken.render();
    game.chicken.update();

    if (game.chicken.x > 10 && game.chicken.x <= 60 && game.hero.y >= 180) {
      document.getElementById('myTitle').innerText = 'Game Over!';
      document.getElementById('startBtn').innerText = 'Play again';
      document.getElementById('myfilter').style.display = "block";
      document.getElementById('myButton').style.display = "block";
      game.isRunning = false;
    }

    if (game.isRunning) {
      requestAnimationFrame(game.draw);
    }
  }
};

// window.addEventListener('load', function() {
// });

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function() {
  game.isRunning = true;
  game.init();
  document.getElementById('myfilter').style.display = "none";
  document.getElementById('myButton').style.display = "none";
})