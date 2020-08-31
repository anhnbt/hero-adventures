export default class Background {
  constructor(game) {
    
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 480;
    this.height = 270;

    this.sky = new Image();
    this.rocks = new Image();
    this.hills = new Image();
    this.clouds = new Image();
    this.hillsCastle = new Image();
    this.treesRocks = new Image();
    this.ground = new Image();
    
    this.skyPos = {x: 0, y: 0},
    this.rocksPos = {x: 0, y: 0},
    this.hillsPos = {x: 0, y: 0},
    this.cloudsPos = {x: 0, y: 0},
    this.hillsCastlePos = {x: 0, y: 0},
    this.treesRocksPos = {x: 0, y: 0},
    this.groundPos = {x: 0, y: 0}
    
    this.speedX = -5;
  }

  update(progress) {
    if (!progress) return;

    this.treesRocksPos.x += -1;
    this.cloudsPos.x += -0.3;
    this.rocksPos.x += -0.1;
    if (this.cloudsPos.x === -(this.width)) {
      this.cloudsPos.x = 0;
    }
    if (this.rocksPos.x === -(this.width)) {
      this.rocksPos.x = 0;
    }
    if (this.treesRocksPos.x === -(this.width)) {
      this.treesRocksPos.x = 0;
    }
  }

  draw(ctx) {
    if (ctx) {
      this.sky.src = './assets/images/Layers/layer07_Sky.png';
      this.rocks.src = './assets/images/Layers/layer06_Rocks.png';
      this.hills.src = './assets/images/Layers/layer05_Hills.png';
      this.clouds.src = './assets/images/Layers/layer04_Clouds.png';
      this.hillsCastle.src = './assets/images/Layers/layer03_Hills_Castle.png';
      this.treesRocks.src = './assets/images/Layers/layer02_Trees_rocks.png';
      this.ground.src = './assets/images/Layers/layer01_Ground.png';
      ctx.drawImage(this.sky, this.skyPos.x, this.skyPos.y, this.width, this.height);
      ctx.drawImage(this.rocks, this.rocksPos.x, this.rocksPos.y, this.width, this.height);
      ctx.drawImage(this.rocks, this.rocksPos.x + this.width, this.rocksPos.y, this.width, this.height);
      ctx.drawImage(this.hills, this.hillsPos.x, this.hillsPos.y, this.width, this.height);
      ctx.drawImage(this.clouds, this.cloudsPos.x, this.cloudsPos.y, this.width, this.height);
      ctx.drawImage(this.clouds, this.cloudsPos.x + this.width, this.cloudsPos.y, this.width, this.height);
      ctx.drawImage(this.hillsCastle, this.hillsCastlePos.x, this.hillsCastlePos.y, this.width, this.height);
      ctx.drawImage(this.treesRocks, this.treesRocksPos.x, this.treesRocksPos.y, this.width, this.height);
      ctx.drawImage(this.treesRocks, this.treesRocksPos.x + this.width, this.treesRocksPos.y, this.width, this.height);
      ctx.drawImage(this.ground, this.groundPos.x, this.groundPos.y, this.width, this.height);
    }
  }

}