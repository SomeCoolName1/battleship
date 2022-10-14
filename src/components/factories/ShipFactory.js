import BattleshipIdle from "../../assets/shipIcons/Battleship_Idle.gif";
import BattleshipDead from "../../assets/shipIcons/Battleship_Dead.gif";
import BattleshipStart from "../../assets/voice/Battleship_Start.wav";
import CruiserIdle from "../../assets/shipIcons/Cruiser_Idle.gif";
import CruiserDead from "../../assets/shipIcons/Cruiser_Dead.gif";
import CruiserStart from "../../assets/voice/Cruiser_Start.wav";
import DestroyerIdle from "../../assets/shipIcons/Destroyer_Idle.gif";
import DestroyerDead from "../../assets/shipIcons/Destroyer_Dead.gif";
import DestroyerStart from "../../assets/voice/Destroyer_Start.wav";
import SubmarineIdle from "../../assets/shipIcons/Submarine_Idle.gif";
import SubmarineDead from "../../assets/shipIcons/Submarine_Dead.gif";
import SubmarineStart from "../../assets/voice/Submarine_Start.wav";

class ShipProperties {
  constructor(name, indexArray, index) {
    this.name = name;
    this.cells = indexArray;
    this.mainIndex = index;
    this.hits = [];
    this.sunk = false;
    if (name === "Battleship") {
      this.idle = BattleshipIdle;
      this.dead = BattleshipDead;
      this.startAudio = BattleshipStart;
    } else if (name === "Cruiser") {
      this.idle = CruiserIdle;
      this.dead = CruiserDead;
      this.startAudio = CruiserStart;
    } else if (name === "Destroyer") {
      this.idle = DestroyerIdle;
      this.dead = DestroyerDead;
      this.startAudio = DestroyerStart;
    } else {
      this.idle = SubmarineIdle;
      this.dead = SubmarineDead;
      this.startAudio = SubmarineStart;
    }
  }
  shipHit(index) {
    this.hits.push(index);
  }
  shipSunk() {
    return this.cells.every((cell) => this.hits.includes(cell));
  }
}

export default ShipProperties;

//Put the cells it is in
//Hits pushes the cells it is in
