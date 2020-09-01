class Background {
  constructor(options) {
    this.ctx = options.context;
    this.src = options.src; // Path to image sprite sheet
    this.x = options.x; // Coordinates on canvas
    this.y = options.y;
    this.width = options.width; // Size of sprite frame
    this.height = options.height;
    this.speedX = options.speedX;

    this.type = options.type;
  }

  update() {
    this.x += this.speedX;
    if (this.x === -(this.width)) {
      this.x = 0;
    }
  }

  render() {
    const image = new Image();
    image.src = this.src;
    this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
    if (this.type === 'animation') {
      this.ctx.drawImage(image, this.x + this.width, this.y, this.width, this.height);
    }
  }

}