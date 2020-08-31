export default class Hero {
  constructor(game) {

    // Variables
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 100;
    this.height = 55;
    this.sidewalk = 195 - this.height/2;

    this.speedY = 0;
    this.speedX = 15;
    this.jumpY = 100;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.sidewalk;
    
    this.image = new Image(); // Create new img element
    this.image.src = './assets/images/Idle/HeroKnight_Idle_0.png'; // Set source path
  }

  jump() {
    this.image.src = './assets/images/Run/HeroKnight_Run_6.png';
    this.accelerate(-0.5);
    console.log("Jump");
  }

  moveLeft() {
    this.image.src = './assets/images/Run/HeroKnight_Run_3.png';
    this.x -= this.speedX;
  }

  moveRight() {
    this.image.src = './assets/images/Run/HeroKnight_Run_3.png';
    this.x += this.speedX;
  }

  stopMove() {
    this.image.src = './assets/images/Idle/HeroKnight_Idle_0.png';
    this.accelerate(0.1);
    // this.speedX = 0;
    // this.speedY = 0;
  }

  hitSideWalk() {
    if (this.y > this.sidewalk) {
      this.y = this.sidewalk;
      this.gravitySpeed = 0;
    }
    
    if (this.y < 0) {
      this.y = 0;
      this.gravitySpeed = 0;
    }
  }

  accelerate(n) {
    this.gravity = n;
  }
  
  draw(ctx) {
    if (ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update(progress) {
    if (!progress) return;

    this.gravitySpeed += this.gravity;
    this.y += this.speedY + this.gravitySpeed;
    this.hitSideWalk();

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.width > this.gameWidth) {
      this.x = this.gameWidth - this.width;
    }


  }
}