class Chicken extends Sprite {
  constructor(x, y, context) {
    super({
      context: context,
      src: './assets/images/Run.png',
      x: x,
      y: y,
      width: 32,
      height: 34,
      speedX: -1,
      type: 'chicken',
      frameIndex: 0,
      row: 0,
      tickCount: 0,
      ticksPerFrame: 2,
      frames: 14
    })
  }
}