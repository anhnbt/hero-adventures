import Sprite from './Sprite.js';

export default class Hero extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      type          : 'hero',
      src           : './assets/images/HeroKnight/Run.png',
      x             : x,
      y             : y,
      width         : 147,
      height        : 177,
      scale         : 2.5,
      speedX        : 3,
      speedY        : 0,
      frameNumber   : 0,
      row           : 0,
      tickCount     : 0,
      ticksPerFrame : 5,
      totalFrames   : 10,
    
      gravity       : 0.2,
      gravitySpeed  : 0,
      status           : true
    })
  }

  death() {
    this.status = false;
    this.src = './assets/images/HeroKnight/Run.png';
    this.row = 0;
    this.frameNumber = 0;
    this.ticksPerFrame = 8;
    this.totalFrames = 10;
  }

  jump() {
    this.src = './assets/images/HeroKnight/Jump.png';
    this.row = 0;
    this.frameNumber = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 4;
    this.totalFrames = 10;
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
    this.frameNumber = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.totalFrames = 8;
    if (this.status) {
      this.x -= this.speedX;
    }
  }

  moveRight() {
    this.row = 0;
    this.frameNumber = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.totalFrames = 8;
    if (this.status) {
      this.x += this.speedX;
    }
  }

}