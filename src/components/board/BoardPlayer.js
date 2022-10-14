import { useContext } from "react";
import { storage } from "../Context";
import GridCells2 from "./GridCells2";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const BoardPlayer = () => {
  const { state, dispatch } = useContext(storage);
  const { players } = state;
  const { name, gameBoard } = players.player;

  let board = gameBoard.board;

  return (
    <div className="small:pt-10">
      <div className="startGrid ">
        {board.map((cell, index) => (
          <GridCells2
            id={cell}
            index={index}
            clickAction={isDisabled}
            mouseOut={isDisabled}
            hoverAction={isDisabled}
            boardOwner={"player"}
          />
        ))}
      </div>
      <div className="flex justify-center">Player</div>
    </div>
  );
};

export default BoardPlayer;
