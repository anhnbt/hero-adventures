class Bg extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer07_Sky.png',
      width  : game.width,
      height : game.width
    });
  }
}

class Rocks extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer06_Rocks.png',
      width  : game.width,
      height : game.height
    });
  }
}

class Hills extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer05_Hills.png',
      width  : game.width,
      height : game.height
    });
  }
}

class Clouds extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer04_Clouds.png',
      width  : game.width,
      height : game.height,
      speedX : -0.3,
      type   : 'animation'
    });
  }
}

class HillsCastle extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer03_Hills_Castle.png',
      width  : game.width,
      height : game.height
    });
  }
}

class TreesRocks extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer02_Trees_rocks.png',
      width  : game.width,
      height : game.height,
      speedX : -0.1,
      type   : 'animation'
    });
  }
}

class Ground extends Background {
  constructor(game) {
    super({
      game   : game,
      src    : './assets/images/Layers/layer01_Ground.png',
      width  : game.width,
      height : game.height,
      speedX : -4,
      type   : 'animation'
    });
  }
}