class Sky extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer07_Sky.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: 0,
      type: 'image'
    });
  }
}

class Rocks extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer06_Rocks.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: 0,
      type: 'image'
    });
  }
}

class Hills extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer05_Hills.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: 0,
      type: 'image'
    });
  }
}

class Clouds extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer04_Clouds.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: -0.3,
      type: 'animation'
    });
  }
}

class HillsCastle extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer03_Hills_Castle.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: 0,
      type: 'image'
    });
  }
}

class TreesRocks extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer02_Trees_rocks.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: -1,
      type: 'animation'
    });
  }
}

class Ground extends Background {
  constructor(x, y, width, height, context) {
    super({
      context: context,
      src: './assets/images/Layers/layer01_Ground.png',
      x: x,
      y: y,
      width: width,
      height: height,
      speedX: 0,
      type: 'image'
    });
  }
}