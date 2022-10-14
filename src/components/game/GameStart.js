import BoardComputer from "../board/BoardComputer";
import BoardPlayer from "../board/BoardPlayer";
import MessageBoard from "../board/MessageBoard";

const GameStart = ({ playSoundEffect, playVoice }) => {
  return (
    <div className="h-full">
      <div className="w-full text-center p-20 h-1/5">
        <MessageBoard />
      </div>
      <div className="flex max-h-screen flex-row justify-evenly items-center small:flex small:flex-col small:h-auto">
        <BoardPlayer />
        <BoardComputer
          playSoundEffect={playSoundEffect}
          playVoice={playVoice}
        />
      </div>
    </div>
  );
};

export default GameStart;
