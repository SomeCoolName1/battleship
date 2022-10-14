import { useContext } from "react";
import { storage } from "../Context";

const GameZolution = () => {
  const { state, dispatch } = useContext(storage);

  const getWinner = state.winner.name;
  let winningMessage;

  if (getWinner === "human") {
    winningMessage = "Congratulations, you've defeated the computer";
  } else {
    winningMessage = "Un-fucking-believable, you've lost against the computer";
  }

  const restart = () => {
    dispatch({ type: "RESTART_GAME" });
  };

  return (
    <div className="bg-results bg-cover flex flex-col justify-center items-center min-h-screen">
      <div className="h-1/2">
        <span>{winningMessage}</span>
      </div>
      <button
        className="group rounded overflow-hidden relative inline-flex group items-center justify-center px-10 py-5 bg-startButton text-white text-2xl"
        onClick={() => restart()}
      >
        <span className="transition-all absolute w-0 h-0 duration-1000 ease-in-out bg-white rounded-full group-hover:w-screen group-hover:h-screen opacity-10"></span>
        Restart
      </button>
    </div>
  );
};

export default GameZolution;
