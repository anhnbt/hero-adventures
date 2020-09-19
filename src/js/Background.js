/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

class Background {
  constructor(options) {
    this.game   = options.game;
    this.src    = options.src;
    this.x      = 0; // Tọa độ trên Canvas
    this.y      = 0;
    this.width  = options.width;
    this.height = options.height;
    this.speedX = options.speedX || 0;

    this.type   = options.type || 'image';
    this.image  = new Image();
  }

  update() {
    if (!this.game.isRunning) return;

    this.x += this.speedX;
    if (this.x <= -(this.game.width)) {
      this.x = 0;
    }
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.type === 'animation') {
      this.game.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    this.image.src = this.src;
  }

}