/**
 * Hero Adventures - https://github.com/anhnbt-it/hero-adventures
 * author: Nguyễn Bá Tuấn Anh
 */

class Sprite {
  constructor(options) {
    this.game          = options.game;
    this.src           = options.src;
    this.width         = options.width;
    this.height        = options.height;
    this.scale         = (options.scale) ? options.scale : 1;
    this.speedX        = (options.speedX) ? options.speedX : 0;
    this.speedY        = (options.speedY) ? options.speedY : 0;
    
    this.gravity       = (options.gravity) ? options.gravity : 0;
    this.gravitySpeed  = (options.gravitySpeed) ? options.gravitySpeed : 0;
    this.isDead        = options.isDead;

    this.image         = new Image();
    this.type          = options.type;
    this.animations    = {
      frameNumber   : options.animations.frameNumber, // Current frame
      currentFrame  : options.animations.frameNumber, // Current frame
      length        : options.animations.length,
      row           : options.animations.row, // Row of sprites
      tickCount     : options.animations.tickCount, // How much time has passed
      ticksPerFrame : options.animations.ticksPerFrame, // Speed of animation
      totalFrames   : options.animations.totalFrames, // Number of Frames in a row
    }

    
    this.x             = options.x;
    this.y             = options.y;
    this.road          = this.y;
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

    if (this.type === 'Coin' || this.type === 'Monster') {
      this.x += this.speed;
      
      if (this.x < -this.game.width) {
        this.x = this.game.width;
        this.dead = false;
      }
    }

    if (this.type === 'Hero') {
      this.gravitySpeed += this.gravity;
      this.y += this.speedY + this.gravitySpeed;

      this.hitRoad();
    }
  }

  draw() {
    this.game.ctx.drawImage(
      this.image,
      this.animations.frameNumber * this.width,
      this.animations.row * this.height,
      this.width,
      this.height,
      this.x-(this.width/this.scale),
      this.y-(this.height/this.scale),
      (this.width/this.scale),
      (this.height/this.scale)
      );
    this.image.src = this.src;
  }

  hitRoad() {
    if (this.y > this.road) {
      this.animations.currentFrame = 1;
      this.animations.totalFrames = 4;
      this.y = this.road;
      this.gravitySpeed = 0;
      this.game.isJumping = false;
    }

    if (this.y < this.game.height/2 - 20) {
      this.y = this.game.height/2 - 20;
      this.game.jumpPressed = false;
      this.gravitySpeed = 0;
      this.accelerate(0.5);
    }
  }

  accelerate(n) {
    this.gravity = n;
  }

  get speed() {
    return this.speedX;
  }

  set speed(value) {
    this.speedX = value;
  }

  get dead() {
    return this.isDead;
  }

  set dead(value) {
    this.isDead = value;
  }
}