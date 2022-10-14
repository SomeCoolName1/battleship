import Players from "../factories/PlayerFactory";
import { useContext, useEffect } from "react";
import { storage } from "../Context";

const StartUp = () => {
  const { dispatch } = useContext(storage);

  useEffect(() => {
    const player = new Players("human");
    const computer = new Players("computer");
    dispatch({ type: "SET_PLAYERS", payload: { computer, player } });
  }, []);

  const startGame = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_WINDOW", payload: "GameSetup" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <button
        className="group rounded overflow-hidden relative inline-flex group items-center justify-center px-10 py-5 bg-startButton text-white text-2xl"
        onClick={startGame}
      >
        <span className="transition-all absolute w-0 h-0 duration-1000 ease-in-out bg-white rounded-full group-hover:w-screen group-hover:h-screen opacity-10"></span>
        START MATCH
      </button>
    </div>
  );
};

export default StartUp;
