class Sprite {
  constructor(options) {
    this.ctx = options.context;
    this.src = options.src;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.speedX = options.speedX;

    this.frames = options.frames; // Number of frames in a row
    this.frameIndex = options.frameIndex; // Current frame
    this.row = options.row; // Row of sprites
    this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
    this.tickCount = options.tickCount; // How much time has passed

    this.type = options.type;
  }

  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.frames - 1) {
            this.frameIndex += 1;
        } else {
            this.frameIndex = 0;
        }
    }

    if (this.type === 'chicken') {
      this.x += this.speedX;
      
      if (this.x < -this.width) {
        this.x = 480;
      }
    }
    if (this.type === 'hero') {
      this.x += this.speedX;
      
      if(this.x <= 0) {
        this.x = 0;
      }
    }
  }

  render() {
    const image = new Image();
    image.src = this.src;
    this.ctx.drawImage(
      image,
      this.frameIndex * this.width, // The x-axis coordinate of the top left corner
      this.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x, // The x coordinate
      this.y,// The y coordinate
      this.width, // The width to draw the image
      this.height // The width to draw the image
  );
  }
}