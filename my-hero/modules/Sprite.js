export default class Sprite {
  constructor(options) {
    this.sort        = options.sort;
    this.ctx           = options.context;
    this.src           = options.src;
    this.x             = options.x;
    this.y             = options.y;
    this.width         = options.width;
    this.height        = options.height;
    this.speedX        = options.speedX;
    this.speedY        = options.speedY;
    
    this.gravity       = options.gravity;
    this.gravitySpeed  = options.gravitySpeed;

    this.frames        = options.frames; // Number of frames in a row
    this.frameIndex    = options.frameIndex; // Current frame
    this.row           = options.row; // Row of sprites
    this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
    this.tickCount     = options.tickCount; // How much time has passed

    this.type          = options.type;
    this.image         = new Image();
    this.self = this;
  }

  update() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.frames - 1) {
            this.frameIndex++;
        } else {
            this.frameIndex = 0;
        }
    }

    if (this.type === 'chicken') {
      this.x += this.speedX;
      
      if (this.x < -this.width) {
        if (this.sort === 1) {
          this.x = 480;
        } else if (this.sort === 2) {
          this.x = 480*2/2;
        } else {
          this.x = 480*3/2;
        }
      }
    }
    if (this.type === 'hero') {
      this.gravitySpeed += this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      // this.x += this.speedX;

      this.hitBottom();
      
      if (this.x < -this.width) {
        this.x = 480-this.width/2;
      }

      if (this.x > 480) {
        this.x = -this.width/2;
      }
    }
  }

  render() {
    this.image.src = this.src;
    this.ctx.drawImage(
      this.image,
      this.frameIndex * this.width, // The x-axis coordinate of the top left corner
      this.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x-this.width/2, // The x coordinate
      this.y-this.height/2,// The y coordinate
      this.width, // The width to draw the image
      this.height // The width to draw the image
    );
  }

  hitBottom() {
    if (this.y > 200-8) {
      this.y = 200-8;
      this.gravitySpeed = 0;
    }

    if (this.y < this.height/2) {
      this.y = this.height/2;
      this.gravitySpeed = 0;
    }
  }

  stopMove() {
    this.row = 0;
    this.accelerate(0.2);
  }

  accelerate(n) {
    this.gravity = n;
  }

  jump() {
    this.accelerate(-0.6);
  }

  moveLeft() {
    // this.frameIndex = 0;
    this.row = 1;
    this.ticksPerFrame = 8;
    this.x -= this.speedX;
  }

  moveRight() {
    this.row = 1;
    this.ticksPerFrame = 8;
    this.x += this.speedX;
  }
}