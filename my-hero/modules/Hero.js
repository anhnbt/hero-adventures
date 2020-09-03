import Sprite from './Sprite.js';

export default class Hero extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      type          : 'hero',
      src           : './assets/images/Sprites/Run.png',
      x             : x,
      y             : y,
      width         : 180,
      height        : 180,
      speedX        : 3,
      speedY        : 0,
      frameNumber   : 0,
      row           : 0,
      tickCount     : 0,
      ticksPerFrame : 5,
      totalFrames   : 8,
    
      gravity       : 0.2,
      gravitySpeed  : 0,
      die           : false
    })
  }

  death() {
    this.die = true;
    this.src = './assets/images/Sprites/Death.png';
    this.row = 0;
    this.frameNumber = 0;
    this.ticksPerFrame = 8;
    this.totalFrames = 11;
  }

  jump() {
    this.src = './assets/images/Sprites/Jump.png';
    this.row = 0;
    this.frameNumber = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.totalFrames = 3;
    this.accelerate(-0.6);
  }

  stopMove() {
    this.accelerate(0.2);
  }

  accelerate(n) {
    this.gravity = n;
  }
  
  moveLeft() {
    this.row = 0;
    this.totalFrames = 8;
    this.x -= this.speedX;
  }

  moveRight() {
    this.row = 0;
    this.totalFrames = 8;
    this.x += this.speedX;
  }

}