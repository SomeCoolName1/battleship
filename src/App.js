import "./App.css";
import GameWindow from "./components/GameWindow";
import GameStorage from "./components/Context";
import Header from "./components/Header";

function App() {
  return (
    <GameStorage>
      <div className="Header w-full h-auto absolute">
        <Header />
      </div>
      <div className="w-full h-full bg-main bg-cover small:bg-none">
        <GameWindow />
      </div>
    </GameStorage>
  );
}

export default App;
