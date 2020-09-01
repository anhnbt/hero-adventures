class Chicken {
  constructor(context) {

    this.gameWidth = game.width;
    this.gameHeight = game.width;

    this.width = 32;
    this.height = 34
    this.sidewalk = 205 - this.height/2;

    this.speedY = 0;
    this.speedX = 15;
    this.x = this.gameWidth;
    this.y = this.sidewalk;

    this.image = new Image();
    this.image.src = './assets/images/Chicken/Run.png';

    this.cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.currentLoopIndex = 0;
  }

  drawFrame(frame, ctx) {
    ctx.drawImage(this.image, frame*this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  draw(ctx) {
    if (ctx) {
      this.drawFrame(this.cycleLoop[this.currentLoopIndex], ctx);
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= this.cycleLoop.length) {
        this.currentLoopIndex = 0;
      }
      // ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
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