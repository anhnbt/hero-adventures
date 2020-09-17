class Sprite {
  constructor(options) {
    this.game          = options.game;
    this.src           = options.src;
    this.x             = options.x;
    this.y             = options.y;
    this.dx            = options.x;
    this.dy            = options.y;
    this.width         = options.width;
    this.height        = options.height;
    this.scale         = (options.scale) ? options.scale : 1;
    this.speedX        = (options.speedX) ? options.speedX : 0;
    this.speedY        = (options.speedY) ? options.speedY : 0;
    
    this.gravity       = (options.gravity) ? options.gravity : 0;
    this.gravitySpeed  = (options.gravitySpeed) ? options.gravitySpeed : 0;
    this.isDead        = options.isDead;

    this.animations    = {
      type          : options.animations.type,
      frameNumber   : options.animations.frameNumber, // Current frame
      currentFrame  : options.animations.frameNumber, // Current frame
      length        : options.animations.length,
      row           : options.animations.row, // Row of sprites
      tickCount     : options.animations.tickCount, // How much time has passed
      ticksPerFrame : options.animations.ticksPerFrame, // Speed of animation
      totalFrames   : options.animations.totalFrames, // Number of Frames in a row
    }
    this.image         = new Image();
  }

  update() {
    if (!this.game.isRunning) return;
    this.animations.tickCount++;
    if (this.animations.tickCount > this.animations.ticksPerFrame) {
      this.animations.tickCount = 0;
      if (this.animations.frameNumber < this.animations.totalFrames - 1) {
        this.animations.frameNumber++;
      } else {
        this.animations.frameNumber = this.animations.currentFrame;
      }
    }

    if (this.animations.type === 'Coin' || this.animations.type === 'Monster') {
      this.x += this.speedX;
      
      if (this.x < -this.game.width) {
        this.x = this.game.width;
        this.isDead = false;
      }
    }

    if (this.animations.type === 'Hero') {
      
      this.gravitySpeed += this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      
      if (this.x < this.width) {
        this.x = this.width;
      }
      
      if (this.x > this.game.width) {
        this.x = this.game.width;
      }
      this.hitRoad();
    }
  }

  draw() {
    this.image.src = this.src;
    this.game.ctx.save();
    this.game.ctx.drawImage(
      this.image,
      this.animations.frameNumber * this.width, // The x-axis coordinate of the top left corner
      this.animations.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x-(this.width/this.scale), // The x coordinate
      this.y-(this.height/this.scale),// The y coordinate
      (this.width/this.scale), // The width to draw the image
      (this.height/this.scale) // The width to draw the image
      );
    this.game.ctx.restore();
  }

  hitRoad() {
    if (this.y > this.dy) {
      this.animations.currentFrame = 1;
      this.animations.totalFrames = 4;
      this.y = this.dy;
      this.gravitySpeed = 0;
      this.game.isJumping = false;
    }

    if (this.y < this.game.height/2 - 20) {
      this.y = this.game.height/2 - 20;
      this.game.jumpPressed = false;
      this.gravitySpeed = 0;
      this.stopMove();
    }
  }

  stopMove() {
    this.accelerate(0.5);
  }

  accelerate(n) {
    this.gravity = n;
  }
}