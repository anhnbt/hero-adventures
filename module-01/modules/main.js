function startGame() {
  game.init();
}

const game = {
  isRunning: true,
  canvas: document.createElement('canvas'),

  init() {
    console.log("Start Game!");
    game.canvas.width = 480;
    game.canvas.height = 270;
    game.context = this.canvas.getContext('2d');

    this.background = new Background(game.context);
    // this.hero = new Hero(game.context);
    
    document.body.insertBefore(game.canvas, document.body.childNodes[0]);
    // Start game
    game.drawingLoop();
  },
  
  drawingLoop() {
    // Clear canvas
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.background.render();
    game.background.update();

    // game.hero.draw();
    // game.hero.update();
    
    if (game.isRunning) {
      requestAnimationFrame(game.drawingLoop());
    }
  }

}
window.addEventListener('load', () => {
  game.init();
})