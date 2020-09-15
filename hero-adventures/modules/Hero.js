import Sprite from './Sprite.js';

export default class Hero extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/dude.png',
      x             : x,
      y             : y,
      width         : 32,
      height        : 48,
      scale         : 1,
      speedX        : 3,
      gravity       : 0.05,
      gravitySpeed  : 0,

      isDead        : false,
      animations    : {
        type          : 'Hero',
        frameNumber   : 4,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 8,
        totalFrames   : 1,
      }
    })
  }

  jump() {
    this.animations.frameNumber = 4;
    this.animations.totalFrames = 1;
    this.accelerate(-0.6);
  }
  
  moveLeft() {
    this.animations.tickCount   = 0;
    this.animations.ticksPerFrame = 8;
    this.animations.frameNumber = 0;
    this.animations.totalFrames = 4;
    if (!this.isDead) {
      this.x -= this.speedX;
    }
  }

  moveRight() {
    this.animations.tickCount   = 0;
    this.animations.ticksPerFrame = 8;
    this.animations.frameNumber = 5;
    this.animations.totalFrames = 4;
    if (!this.isDead) {
      this.x += this.speedX;
    }
  }

  stopMove() {
    this.animations.frameNumber = 4;
    this.animations.totalFrames = 1;
    this.accelerate(0.2);
  }

  accelerate(n) {
    this.gravity = n;
  }

}