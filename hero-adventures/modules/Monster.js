import Sprite from './Sprite.js';

export default class Monster extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/AngryPig/Run.png',
      x             : x,
      y             : y,
      width         : 36,
      height        : 30,
      speedX        : -1,
      
      isDead        : false,
      animations    : {
        type          : 'Monster',
        frameNumber   : 0,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 2,
        totalFrames   : 12,
      }
    })
  }
}