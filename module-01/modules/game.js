import Background from './background.js';
import Hero from './hero.js';
import Chicken from './chicken.js';
import InputHandle from './game_controllers.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    // Variables
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  
  start() {
    this.backgound = new Background(this);
    this.hero = new Hero(this);
    this.chicken = new Chicken(this);
    new InputHandle(this.hero);
  }

  update(progress) {
    this.backgound.update(progress);
    this.hero.update(progress);
    this.chicken.update(progress);

    if ((this.chicken.x < this.hero.x+this.hero.width/2) && (this.hero.y >= 165)) {
      console.log("Game Over!");
    }
  }

  draw(ctx) {
    this.backgound.draw(ctx);
    this.hero.draw(ctx);
    this.chicken.draw(ctx);
  }

}