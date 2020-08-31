export default class InputHandler {
  constructor(hero) {
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 32:
          hero.jump();
          break;
        case 37:
          hero.moveLeft();
          break;
        case 39:
          hero.moveRight();
          break;
      }
    });

    document.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 32:
        case 37:
        case 39:
          hero.stopMove();
          break;
      }
    });
  }
}