import Gameboard from "./Gameboard";

class Players {
  constructor(player) {
    this.name = player;
    this.ships = [];
    this.gameBoard = new Gameboard();
  }
}

export default Players;
