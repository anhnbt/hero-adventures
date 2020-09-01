class Hero extends Sprite {
  constructor(x, y, context) {
    super({
      context: context,
      src: './assets/images/HeroKnight.png',
      x: x,
      y: y,
      width: 100,
      height: 55,
      speedX: -1,
      type: 'hero',
      frameIndex: 0,
      row: 0,
      tickCount: 0,
      ticksPerFrame: 5,
      frames: 8
    })
  }
}