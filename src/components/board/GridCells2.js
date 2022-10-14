import OverlayCell from "./OverlayCell";
import missedShot from "../../assets/boardIcons/missedShot.png";
import shipShot from "../../assets/boardIcons/shipShot.png";

const GridCells2 = ({
  id,
  index,
  colour,
  clickAction,
  mouseOut,
  hoverAction,
  boardOwner,
}) => {
  let shipNames = ["Battleship", "Cruiser", "Destroyer", "Submarine"];
  let colourNames = ["black", "black", "black", "black"];
  let mainIndex;

  let overlayCondition;
  if (id.hasShip === "true" && boardOwner === "player") {
    mainIndex = id.ship.mainIndex;

    colour = colourNames[shipNames.indexOf(id.ship.name)];
  }

  if (id.hasShip === "false" && id.isShot === true) {
    overlayCondition = missedShot;
  } else if (id.hasShip === "true" && id.isShot === true) {
    overlayCondition = shipShot;
  }

  return (
    <>
      <div
        className={`gridCells relative bg-${colour}`}
        index={index}
        onClick={() => clickAction(index)}
        onMouseOver={() => hoverAction(index)}
        onMouseOut={() => mouseOut(false)}
        style={id.isShot === true ? { pointerEvents: "none" } : null}
      >
        {mainIndex === index && id.ship.sunk !== true ? (
          <img src={id.ship.idle} className="shipGirl" />
        ) : mainIndex === index && id.ship.sunk === true ? (
          <img src={id.ship.dead} className="shipGirl shipGirlDead" />
        ) : null}
        <OverlayCell condition={overlayCondition} index={id} />
      </div>
    </>
  );
};

export default GridCells2;
