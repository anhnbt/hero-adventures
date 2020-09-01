class Game {
  constructor(width, height) {
    // Variables
    this.width = width;
    this.height = height;
  }
  
  start() {
    this.backgound = new Background(this);
    this.hero = new Hero(this);
    this.chicken = new Chicken(this);
    // new InputHandle(this.hero);
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