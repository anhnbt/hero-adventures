import Sprite from './Sprite.js';

export default class Monster extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      type          : 'monster',
      src           : './assets/images/AngryPig/Run.png',
      x             : x,
      y             : y,
      width         : 36,
      height        : 30,
      scale         : 1,
      speedX        : -1,
      frameNumber   : 0,
      row           : 0,
      tickCount     : 0,
      ticksPerFrame : 2,
      totalFrames   : 12,
      status        : true
    })
  }

  death() {
    this.status = false;
    this.src = './assets/images/AngryPig/Hit.png';
    
    this.frameNumber = 0;
    this.ticksPerFrame = 8;
    this.totalFrames = 5;
  }
}