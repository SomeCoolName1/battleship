class Gameboard {
  constructor(board) {
    this.board = board || [];
    if (!this.board.length) this.init();
  }

  init() {
    for (let i = 0; i < 100; i++) {
      this.board.push({ hasShip: "false", isShot: false, ship: null });
    }
  }
}

export default Gameboard;
