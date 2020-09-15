export default class Background {
  constructor(options) {
    this.game   = options.game;
    this.src    = options.src; // Path to image sprite sheet
    this.x      = 0; // Coordinates on canvas
    this.y      = 0;
    this.width  = options.width; // Size of sprite frame
    this.height = options.height;
    this.speedX = (options.speedX) ? options.speedX : 0;

    this.type   = (options.type) ? options.type : 'image';
    this.image  = new Image();
  }

  update() {
    if (!this.game.isRunning) return;
    this.x += this.speedX;
    if (this.x === -(this.width)) {
      this.x = 0;
    }
  }

  draw() {
    this.image.src = this.src;
    this.game.ctx.save();
    this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.type === 'animation') {
      this.game.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    this.game.ctx.restore();
  }

}