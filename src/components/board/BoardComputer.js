import { useContext, useEffect, useState } from "react";
import PlayerTurn from "../gameLogic/PlayerTurn";
import { storage } from "../Context";
import shipTypes from "../factories/ShipTypes";
import ShipProperties from "../factories/ShipFactory";
import GridCells2 from "./GridCells2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import CollisionCheck from "./CollisionCheck";

const BoardComputer = ({ playSoundEffect, playVoice }) => {
  const { state, dispatch } = useContext(storage);
  const { players, window } = state;
  const [currentTurn, setTurn] = useState(0);
  let computerBoard = players["computer"].gameBoard.board;

  /////////////////////////////////////////////////////

  function findAvailablecells(cycleShips) {
    let available = [];

    computerBoard.map((cell, index) => {
      let collisionResult = CollisionCheck(index, cycleShips, computerBoard);
      if (collisionResult[0]) {
        available.push({
          centerIndex: index,
          placeableRange: collisionResult[1],
        });
      }
    });

    return available;
  }

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      let cycleShips = shipTypes[i];
      let availableShipCells = findAvailablecells(cycleShips);

      let randomIndex =
        availableShipCells[
          Math.floor(Math.random() * availableShipCells.length)
        ];

      let gridRange = randomIndex.placeableRange;
      for (let i = gridRange[0] + 1; i < gridRange[1]; i++) {
        gridRange.push(i);
      }

      const addShip = new ShipProperties(cycleShips.name, gridRange);

      dispatch({
        type: "SET_SHIP",
        payload: {
          player: "computer",
          ship: addShip,
          index: gridRange,
        },
      });
    }
  }, []);

  const changeTurns = (number) => {
    setTurn(number);
  };

  const handleClick = (index) => {
    setTurn(1);
    if (currentTurn % 2 === 1) {
      alert("Wait your fucking turn");
      return isDisabled;
    } else {
      dispatch({ type: "CLEAR_MESSAGE" });
      PlayerTurn({
        dispatch: dispatch,
        index: index,
        bothPlayers: players,
        window: window,
        playSoundEffect: playSoundEffect,
        playVoice: playVoice,
        setTurn: changeTurns,
      });
    }
  };

  const [mainIndex, setIndex] = useState("");

  const targetOverlay = (index) => {
    if (currentTurn % 2 === 1) {
      return isDisabled;
    } else {
      setIndex(index);
    }
  };

  //////////////////////////////////////////////////

  return (
    <div className="small:pt-10">
      <div className="startGrid">
        {computerBoard.map((cell, index) => {
          if (index === mainIndex) {
            return (
              <GridCells2
                id={cell}
                colour={"black"}
                index={index}
                clickAction={() => handleClick(index)}
                mouseOut={() => targetOverlay(null)}
                hoverAction={() => targetOverlay(index)}
              />
            );
          } else
            return (
              <GridCells2
                id={cell}
                index={index}
                clickAction={() => handleClick(index)}
                mouseOut={() => targetOverlay(null)}
                hoverAction={() => targetOverlay(index)}
              />
            );
        })}
      </div>
      <div className="flex justify-center">Computer</div>
    </div>
  );
};

export default BoardComputer;
