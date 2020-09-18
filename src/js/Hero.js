/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

class Hero extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/Dude.png',
      x             : x,
      y             : y,
      width         : 32,
      height        : 48,
      gravity       : 0.5,
      gravitySpeed  : 0,

      isDead        : false,
      type          : 'Hero',
      animations    : {
        frameNumber   : 1,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 5,
        totalFrames   : 4,
      }
    })
  }

  get speed() {
    return this.speedX;
  }

  set speed(value) {
    this.speedX = value;
  }

  get dead() {
    return this.isDead;
  }

  set dead(value) {
    this.isDead = value;
  }

  jump() {
    this.animations.currentFrame = 1;
    this.animations.totalFrames = 1;
    this.accelerate(-0.8);
  }

}