import Sprite from './Sprite.js';

export default class Coin extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/coin.png',
      x             : x,
      y             : y,
      width         : 48,
      height        : 48,
      scale         : 2,
      speedX        : -1,

      isDead        : false,
      animations    : {
        type          : 'Coin',
        frameNumber   : 0,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 5,
        totalFrames   : 4,
      }
    })    
  }
}