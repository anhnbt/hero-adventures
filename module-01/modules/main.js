import Game from './game.js';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let lastRender = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
window.requestAnimationFrame(loop); // the image is fully loaded sostart animating

function update(progress) {
  // Update the state of the world for the elapsed time since last render
  game.update(progress);
}

function draw() {
  // Draw the state of the world
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // clear canvas
  game.draw(ctx);
}

function loop(timestamp) {
  let progress = timestamp - lastRender;
  
  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop); // the image is fully loaded sostart animating
}