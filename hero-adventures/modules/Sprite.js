export default class Sprite {
  constructor(options) {
    this.game          = options.game;
    this.src           = options.src;
    this.x             = options.x;
    this.y             = options.y;
    this.dx            = options.x;
    this.dy            = options.y;
    this.width         = options.width;
    this.height        = options.height;
    this.scale         = options.scale;
    this.speedX        = options.speedX;
    this.speedY        = options.speedY;
    
    this.gravity       = options.gravity;
    this.gravitySpeed  = options.gravitySpeed;

    this.totalFrames   = options.totalFrames; // Number of Frames in a row
    this.frameNumber   = options.frameNumber; // Current frame
    this.row           = options.row; // Row of sprites
    this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
    this.tickCount     = options.tickCount; // How much time has passed

    this.type          = options.type;
    this.status        = options.status;
    this.image         = new Image();
  }

  update() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameNumber < this.totalFrames - 1) {
            this.frameNumber++;
        } else {
            this.frameNumber = 0;
        }
    }

    if (this.type === 'coin') {
      this.x += this.speedX;
      if (this.x <= this.game.width) {
        this.status = true;
      }
    }

    if (this.type === 'monster' && this.status) {
      this.x += this.speedX;
      
      if (this.x < -this.width) {
        this.x = this.game.width;
      }
    }
    if (this.type === 'hero') {
      if (this.y >= this.dy && this.status) {
        this.src = './assets/images/HeroKnight/Run.png';
      }
      this.gravitySpeed += this.gravity;
      this.y += this.speedY + this.gravitySpeed;

      this.hitBottom();
      
      if (this.x < -this.width) {
        this.x = this.game.width-this.width/2;
      }

      if (this.x > this.game.width) {
        this.x = -this.width/2;
      }
    }
    
    if (this.type === 'bee') {
      this.y += this.speedY;
      this.x += this.speedX;

      if(this.x > this.game.width-this.width/2 || this.x < this.width/2) {
        this.speedX = -this.speedX;
      }

      if(this.y > this.game.height/2 || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
  }

  draw(ctx) {
    this.image.src = this.src;
    ctx.save();
    ctx.drawImage(
      this.image,
      this.frameNumber * this.width, // The x-axis coordinate of the top left corner
      this.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x-this.width/this.scale, // The x coordinate
      this.y-this.height/this.scale,// The y coordinate
      this.width/this.scale, // The width to draw the image
      this.height/this.scale // The width to draw the image
      );
    ctx.restore();
  }

  hitBottom() {
    if (this.y > this.dy) {
      this.y = this.dy;
      this.gravitySpeed = 0;
    }

    if (this.y < this.height/2) {
      this.y = this.height/2;
      this.gravitySpeed = 0;
    }
  }
}