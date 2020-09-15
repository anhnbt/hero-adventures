import Sprite from './Sprite.js';

export default class Bee extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/Bee/Idle.png',
      x             : x,
      y             : y,
      width         : 36,
      height        : 34,
      speedX        : 0.8,
      speedY        : 0.8,
      isDead        : false,

      animations    : {
        type          : 'Bee',
        frameNumber   : 0,
        length        : 1,
        row           : 0,
        tickCount     : 0,
        ticksPerFrame : 8,
        totalFrames   : 6,
      }
    })
  }
}