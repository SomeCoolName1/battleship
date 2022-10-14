import { useContext, useEffect, useState } from "react";
import CollisionCheck from "../board/CollisionCheck";
import GridCells2 from "../board/GridCells2";
import ShipCells from "../board/ShipCells";
import { storage } from "../Context";
import ShipProperties from "../factories/ShipFactory";
import shipTypes from "../factories/ShipTypes";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const GameSetup2 = () => {
  const { state, dispatch } = useContext(storage);
  const { players } = state;
  const { gameBoard, name } = players.player;
  let playerBoard = gameBoard.board;

  //Set states for ship setting
  const [selectedShip, setSelectedShip] = useState(shipTypes[0]);
  const [gridRange, setGridRange] = useState(false);
  const [shipList, updateShipList] = useState(shipTypes);

  const CollisionCheck1 = (index) => {
    let collisionResult = CollisionCheck(index, selectedShip, playerBoard);

    if (collisionResult[0]) {
      setGridRange(collisionResult[1]);
    }
  };

  const placeShipOnBoard = (index) => {
    const addShip = new ShipProperties(selectedShip.name, gridRange, index);
    let battle = document.getElementById("startSound");
    battle.src = addShip.startAudio;
    battle.play();

    dispatch({
      type: "SET_SHIP",
      payload: { player: name, ship: addShip, index: gridRange },
    });

    updateShipList(shipList.filter((ship) => selectedShip.name !== ship.name));
    setSelectedShip(
      shipList.filter((ship) => selectedShip.name !== ship.name)[0]
    );
  };

  useEffect(() => {
    if (shipList.length === 0) {
      //Timeout for voice dialogues to finish playing
      setTimeout(() => {
        dispatch({ type: "SET_WINDOW", payload: "GameStart" });
      }, 3000);
    }
  }, [shipList, dispatch]);

  return (
    <div className="gameSetUp flex flex-column w-full h-full items-center justify-evenly small:flex small:flex-col">
      <div className="startGrid">
        {playerBoard.map((cell, index) => {
          if (
            index >= gridRange[0] &&
            index <= gridRange[gridRange.length - 1]
          ) {
            return (
              <GridCells2
                id={cell}
                index={index}
                colour={"black"}
                clickAction={placeShipOnBoard}
                mouseOut={setGridRange}
                hoverAction={CollisionCheck1}
                boardOwner={"player"}
              />
            );
          } else {
            return (
              <GridCells2
                id={cell}
                index={index}
                clickAction={isDisabled}
                mouseOut={setGridRange}
                hoverAction={CollisionCheck1}
                boardOwner={"player"}
              />
            );
          }
        })}
      </div>
      <div className="flex-col justify-evenly items-stretch small:items-start">
        {shipList.map((ship) => (
          <ShipCells
            id={ship}
            currentShip={selectedShip}
            clickedShip={setSelectedShip}
          />
        ))}
      </div>
      <audio id="startSound" />
    </div>
  );
};

export default GameSetup2;
