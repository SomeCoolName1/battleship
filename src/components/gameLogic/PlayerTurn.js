import CheckWinner from "./CheckWinner";
import ComputerTurn from "./ComputerTurn";

//On Player Turn, manipulate computer board
const PlayerTurn = ({
  dispatch,
  index,
  bothPlayers,
  playSoundEffect,
  playVoice,
  setTurn,
}) => {
  let currentPlayersTurn = bothPlayers.player;
  let computerShip = bothPlayers.computer.gameBoard.board[index].ship;
  let sound;

  playSoundEffect("cannonFire");

  //if a ship on computer board was hit:
  if (computerShip) {
    computerShip.shipHit(index);
    sound = "cannonHit";
    dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "You fire a shot . . . . . and it's a hit",
    });
    if (computerShip.shipSunk()) {
      dispatch({
        type: "SHIP_SUNK",
        payload: { player: currentPlayersTurn.name, shipSunk: computerShip },
      });
      dispatch({
        type: "DISPLAY_MESSAGE",
        payload: `You fire a shot . . . . . and sunk the opponent's ${computerShip.name}`,
      });
    }
  } else {
    sound = "cannonMiss";
    dispatch({
      type: "DISPLAY_MESSAGE",
      payload: "You fire a shot . . . . . and you fucking miss",
    });
  }

  setTimeout(() => {
    playSoundEffect(sound);
    dispatch({
      type: "FIRE_SHOT",
      payload: { player: "computer", index: index },
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
    } else {
      ComputerTurn({
        dispatch: dispatch,
        bothPlayers: bothPlayers,
        playSoundEffect: playSoundEffect,
        playVoice: playVoice,
        setTurn: setTurn,
      });
    }
  }, 2000);
};

export default PlayerTurn;
