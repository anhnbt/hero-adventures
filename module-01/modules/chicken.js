export default class Chicken {
  constructor(game) {

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 32;
    this.height = 34
    this.sidewalk = 205 - this.height/2;

    this.speedY = 0;
    this.speedX = 15;
    this.x = this.gameWidth;
    this.y = this.sidewalk;

    this.image = new Image();
    this.image.src = './assets/images/Idle/Chicken.png';
  }

  draw(ctx) {
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  }

  update(progress) {
    if (!progress) return;

    this.x += -1;
    
    if (this.x === -this.width) {
      this.x = this.gameWidth;
    }
  }
}