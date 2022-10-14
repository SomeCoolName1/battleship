//update state in immutable manner

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHECK_SHOTS": {
      let board = state.players["player"].gameBoard.board;
      console.log(board);
      return { board };
    }

    case "CLEAR_MESSAGE": {
      return { ...state, message: "" };
    }

    case "DISPLAY_MESSAGE": {
      return { ...state, message: payload };
    }
    case "SET_PLAYERS": {
      return { ...state, players: payload };
    }

    case "SET_SHIP": {
      const { player, ship, index } = payload;

      let name = player === "human" ? "player" : "computer";

      //GAMEBOARD PROPERTIES MANIPULATION
      for (let i = 0; i < index.length; i++) {
        state.players[name].gameBoard.board[index[i]].ship = ship;
        state.players[name].gameBoard.board[index[i]].hasShip = "true";
      }

      //PLAYER PROPERTIES MANIPULATION
      const getPlayerShips = state.players[name].ships;
      getPlayerShips.push(ship);

      return { ...state };
    }

    case "SET_WINDOW": {
      //Initial => GameSetup => GameStart=> Winner
      return { ...state, window: payload };
    }
    case "SET_WINNER": {
      return { ...state, winner: payload };
    }

    case "SHIP_SUNK": {
      const { player, shipSunk } = payload;

      //Switch current player to opposition
      let name = player === "human" ? "computer" : "player";

      console.log(player);

      const getPlayerShips = state.players[name].ships;
      const index = getPlayerShips
        .map((ship) => ship.name)
        .indexOf(shipSunk.name);

      state.players[name].ships[index].sunk = true;

      return { ...state };
    }
    case "FIRE_SHOT": {
      const { player, index } = payload;
      let name = player === "player" ? "player" : "computer";
      state.players[name].gameBoard.board[index].isShot = true;
      return { ...state };
    }

    case "RESTART_GAME": {
      const initialState = {
        turn: 0,
        players: {},
        window: "Initial",
        message: "",
        winner: "",
      };
      return { ...initialState };
    }

    default:
      return state;
  }
};

export default reducer;
