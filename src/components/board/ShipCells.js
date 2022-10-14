import React from "react";

const ShipCells = ({ id, currentShip, clickedShip }) => {
  const getShipLength = id.length;
  const shipGridArray = [];

  for (let i = 0; i < getShipLength; i++) {
    shipGridArray.push(1);
  }
  return (
    <div
      className={`h-full w-full small:h-auto ${
        id.name === currentShip.name ? "border border-white" : null
      }`}
    >
      <div
        className="flex flex-col items-center"
        onClick={() => clickedShip(id)}
      >
        {id.name}
        <div className="flex flex-row ">
          {shipGridArray.map(() => {
            return <div className="bg-black shipCells" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ShipCells;
