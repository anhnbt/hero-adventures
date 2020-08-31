import Background from './background.js';
import Hero from './hero.js';
import InputHandle from './control.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    // Variables
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  
  start() {
    this.backgound = new Background(this);
    this.hero = new Hero(this);
    new InputHandle(this.hero);
  }

  update(progress) {
    this.backgound.update(progress);
    this.hero.update(progress);
  }

  draw(ctx) {
    this.backgound.draw(ctx);
    this.hero.draw(ctx);
  }

}