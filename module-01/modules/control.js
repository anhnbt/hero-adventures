export default class InputHandler {
  constructor(hero) {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          hero.moveLeft();
          break;
        case 38:
          hero.moveUp();
          break;
        case 39:
          hero.moveRight();
          break;
        case 40:
          hero.moveDown();
          break;
      }
    });

    // document.addEventListener('keyup', event => {
    //   switch (event.keyCode) {
    //     case 37:
    //     case 38:
    //     case 39:
    //     case 40:
    //       hero.stop();
    //       break;
    //   }
    // });
  }
}