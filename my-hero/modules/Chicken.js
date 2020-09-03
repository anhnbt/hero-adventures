import Sprite from './Sprite.js';

export default class Chicken extends Sprite {
  constructor(x, y, sort, game) {
    super({
      game          : game,
      type          : 'chicken',
      sort          : sort,
      src           : './assets/images/Run.png',
      x             : x,
      y             : y,
      width         : 32,
      height        : 34,
      speedX        : -1.5,
      frameNumber   : 0,
      row           : 0,
      tickCount     : 0,
      ticksPerFrame : 2,
      totalFrames   : 14,
      die           : false
    })
  }

  death() {
    this.die = true;
    this.src = './assets/images/Hit.png';
    
    this.frameNumber = 0;
    this.ticksPerFrame = 5;
    this.totalFrames = 5;
  }
}