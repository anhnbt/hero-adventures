/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

class Monster extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/AngryPig.png',
      x             : x,
      y             : y,
      width         : 36,
      height        : 30,
      speedX        : -4,
      
      isDead        : false,
      type          : 'Monster',
      animations    : {
        frameNumber   : 0,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 2,
        totalFrames   : 12,
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
}