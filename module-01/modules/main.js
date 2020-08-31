import Game from './game.js';

let canvas = document.createElement('canvas');
const GAME_WIDTH = canvas.width = 480;
const GAME_HEIGHT = canvas.height = 270;
let context = canvas.getContext('2d');
let start = 0;
document.body.insertBefore(canvas, document.body.childNodes[0]);

let myGameArea = new Game(GAME_WIDTH, GAME_HEIGHT);
myGameArea.start(); // startGame
window.requestAnimationFrame(step); // the image is fully loaded sostart animating

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const progress = (timestamp - start) / 1000;
  
  myGameArea.update(progress);
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // clear canvas
  myGameArea.draw(context);

  start = timestamp;
  window.requestAnimationFrame(step); // the image is fully loaded sostart animating
}