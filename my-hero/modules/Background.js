export default class Background {
  constructor(options) {
    this.ctx    = options.context;
    this.src    = options.src; // Path to image sprite sheet
    this.x      = 0; // Coordinates on canvas
    this.y      = 0;
    this.width  = options.width; // Size of sprite frame
    this.height = options.height;
    this.speedX = options.speedX;

    this.type   = options.type;
  }

  update() {
    this.x += this.speedX;
    if (this.x === -(this.width)) {
      this.x = 0;
    }
  }

  draw(ctx) {
    const image  = new Image();
    image.src = this.src;
    ctx.save();
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
    if (this.type === 'animation') {
      ctx.drawImage(image, this.x + this.width, this.y, this.width, this.height);
    }
    ctx.restore();
  }

}