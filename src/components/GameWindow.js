import React, { useContext, useEffect, useState } from "react";
import StartUp from "./game/ALoadUp";
import { storage } from "./Context";
import GameStart from "./game/GameStart";
import portBGM from "../assets/BGM/Port.mp3";
import battleBGM from "../assets/BGM/Battle.mp3";
import GameSetup2 from "./game/GameSetup2";
import CannonFire from "../assets/soundEffects/Cannon_Fire.mp3";
import CannonHit from "../assets/soundEffects/Cannon_Hit.mp3";
import CannonMiss from "../assets/soundEffects/Cannon_Miss.mp3";
import BattleshipDeath from "../assets/voice/Battleship_Dead.wav";
import DestroyerDeath from "../assets/voice/Destroyer_Dead.wav";
import CruiserDeath from "../assets/voice/Cruiser_Dead.wav";
import SubmarineDeath from "../assets/voice/Submarine_Dead.wav";
import GameZolution from "./game/GameZolution";

const GameWindow = () => {
  const { state, dispatch } = useContext(storage);
  const { players, window, turn } = state;

  let port = document.getElementById("portBGM");
  let battle = document.getElementById("battleBGM");

  let fadeTimer = false;

  const fadeOut = () => {
    clearTimeout(fadeTimer);
    if (port.volume > 0.1) {
      port.volume -= 0.1;
      fadeTimer = setTimeout(fadeOut, 300);
    } else {
      port.volume = 0;
      port.pause();
      port.currentTime = 0;
    }
  };

  const volume = () => {
    let allBGMs = document.querySelectorAll("audio");
    allBGMs.forEach((BGM) => (BGM.muted = !BGM.muted));
  };

  const playVoice = (sound) => {
    let getVoice = document.getElementById("deathVoice");

    if (sound === "Battleship") {
      getVoice.src = BattleshipDeath;
    } else if (sound === "Destroyer") {
      getVoice.src = DestroyerDeath;
    } else if (sound === "Cruiser") {
      getVoice.src = CruiserDeath;
    } else if (sound === "Submarine") {
      getVoice.src = SubmarineDeath;
    }
    getVoice.play();
  };

  const playSoundEffect = (sound) => {
    let getSoundEffect = document.getElementById("soundEffects");

    if (sound === "cannonFire") {
      getSoundEffect.src = CannonFire;
    } else if (sound === "cannonHit") {
      getSoundEffect.src = CannonHit;
    } else if (sound === "cannonMiss") {
      getSoundEffect.src = CannonMiss;
    }

    getSoundEffect.play();
  };

  useEffect(() => {
    if (window === "GameSetup") {
      port.play();
      port.loop = true;
    } else if (window === "GameStart") {
      fadeOut();
      setTimeout(() => {
        battle.play();
        battle.loop = true;
      }, 900);
    }
  }, [window]);

  const renderGameWindow = (window) => {
    return window === "Initial" ? (
      <StartUp />
    ) : window === "GameSetup" ? (
      <GameSetup2 />
    ) : window === "GameStart" ? (
      <GameStart playSoundEffect={playSoundEffect} playVoice={playVoice} />
    ) : window === "Winner" ? (
      <GameZolution />
    ) : null;
  };

  const restart = () => {
    alert("Press F5 Numbskull");
  };

  return (
    <>
      <div>
        {" "}
        <div className="absolute right-0 top-5 justify-end">
          <button className="pr-10" onClick={() => volume()}>
            Mute
          </button>
          <button className="pr-10" onClick={() => restart()}>
            Restart
          </button>
        </div>
        <div className="h-screen">{renderGameWindow(window)}</div>
      </div>
      <audio id="portBGM" src={portBGM} />
      <audio id="battleBGM" src={battleBGM} />
      <audio id="soundEffects" />
      <audio id="deathVoice" />
    </>
  );
};

export default GameWindow;
