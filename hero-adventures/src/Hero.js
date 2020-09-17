class Hero extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/dude.png',
      x             : x,
      y             : y,
      width         : 32,
      height        : 48,
      speedX        : 3,
      gravity       : 0.5,
      gravitySpeed  : 0,

      isDead        : false,
      animations    : {
        type          : 'Hero',
        frameNumber   : 1,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 8,
        totalFrames   : 4,
      }
    })
  }

  jump() {
    this.animations.currentFrame = 0;
    this.animations.totalFrames = 1;
    this.accelerate(-0.5);
  }

}