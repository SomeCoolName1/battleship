import CheckWinner from "./CheckWinner";

const ComputerTurn = ({
  dispatch,
  bothPlayers,
  playSoundEffect,
  playVoice,
  setTurn,
}) => {
  let currentPlayersTurn = bothPlayers.computer;
  let playerBoard = bothPlayers.player.gameBoard.board;
  let sound;

  let unShotCells = [];
  playerBoard.map((cell, index) => {
    if (cell.isShot === false && cell.hasShip === "true") {
      unShotCells.push(index);
      let randomBoardIndex = Math.floor(Math.random() * playerBoard.length);
      if (
        playerBoard[randomBoardIndex].isShot === false &&
        unShotCells.includes(randomBoardIndex)
      ) {
        unShotCells.push(randomBoardIndex);
      }
    }
  });

  let randomShotIndex = Math.floor(Math.random() * unShotCells.length);
  let randomIndex = unShotCells[randomShotIndex];
  let playerShip = playerBoard[randomIndex].ship;

  setTimeout(() => {
    dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "The computer is aiming . . . . . ",
    });
  }, 3000);

  setTimeout(() => {
    playSoundEffect("cannonFire");
    if (playerShip) {
      playerShip.shipHit(randomIndex);
      sound = "cannonHit";

      dispatch({
        type: "DISPLAY_MESSAGE",
        payload: "The computer fires a shot . . . . . and it's a hit!",
      });
      if (playerShip.shipSunk()) {
        dispatch({
          type: "DISPLAY_MESSAGE",
          payload: `The compure fires a shot . . . . . and sinks your ${playerShip.name}`,
        });
        setTimeout(() => {
          dispatch({
            type: "SHIP_SUNK",
            payload: { player: currentPlayersTurn.name, shipSunk: playerShip },
          });
          playVoice(playerShip.name);
        }, 4500);
      }
    } else {
      sound = "cannonMiss";
      dispatch({
        type: "DISPLAY_MESSAGE",
        payload: "The computer fires a shot . . . . . and it misses tragically",
      });
    }

    setTimeout(() => {
      playSoundEffect(sound);

      dispatch({
        type: "FIRE_SHOT",
        payload: { player: "player", index: randomIndex },
      });

      if (
        CheckWinner({ bothPlayers: bothPlayers, shooter: currentPlayersTurn })
      ) {
        dispatch({
          type: "SET_WINDOW",
          payload: "Winner",
        });
        dispatch({
          type: "SET_WINNER",
          payload: currentPlayersTurn,
        });
      }

      setTimeout(() => {
        setTurn(0);
      }, 1500);
    }, 3000);
  }, 6000);
};

export default ComputerTurn;
