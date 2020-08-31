export default class Hero {
  constructor(game) {

    // Variables
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 100;
    this.height = 55;

    this.speed = 10;
    
    this.image = new Image(); // Create new img element
    
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: 415 - this.height/2
    }
  }

  moveLeft() {
    this.position.x -= this.speed;
  }

  moveRight() {
    this.position.x += this.speed;
  }

  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }

  // stop() {
  //   this.position.x = this.position.x;
  //   this.position.y = this.position.y;
  // }
  
  draw(ctx) {
    if (ctx) {
      this.image.src = './assets/images/Idle/HeroKnight_Idle_0.png'; // Set source path
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  update(progress) {
    if (!progress) return;

    // this.position.x += this.speed;
    // this.position.y += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
    }

    if (this.position.y + this.height > this.gameHeight) {
      this.position.y = this.gameHeight - this.height;
    }

  }
}