import Sprite from './Sprite.js';

export default class Bee extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      type          : 'bee',
      src           : './assets/images/Bee/Idle.png',
      x             : x,
      y             : y,
      width         : 36,
      height        : 34,
      scale         : 1,
      speedX        : 0.8,
      speedY        : 0.8,
      frameNumber   : 0,
      row           : 0,
      tickCount     : 0,
      ticksPerFrame : 8,
      totalFrames   : 6,

      gravity       : 0,
      gravitySpeed  : 0,
      die           : false
    })
  }

  death() {
    this.die = true;
    this.src = './assets/images/Bee/Idle.png';
    
    this.frameNumber = 0;
    this.ticksPerFrame = 5;
    this.totalFrames = 5;
  }
}