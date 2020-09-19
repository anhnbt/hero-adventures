/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

class Coin extends Sprite {
  constructor(x, y, game) {
    super({
      game          : game,
      src           : './assets/images/Coin.png',
      x             : x,
      y             : y,
      width         : 48,
      height        : 48,
      scale         : 2,
      speedX        : -4,

      isDead        : false,
      type          : 'Coin',
      animations    : {
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