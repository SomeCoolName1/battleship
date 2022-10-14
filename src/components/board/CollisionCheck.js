const CollisionCheck = (centerIndex, ship, board) => {
  let shipName = ship.name;
  let shipLength = ship.length;
  let baseCenterIndex = centerIndex % 10;

  //Obtain indexes that hasShip
  let indexHasShip = [];
  for (let i = 0; i < board.length; i++)
    if (board[i].hasShip === "true") {
      indexHasShip.push(i);
    }

  //Sets all indexes within range of ship
  let placeableIndexRange = [];
  if (shipLength % 2 === 0) {
    for (let i = 0; i < shipLength; i++) {
      placeableIndexRange.push(centerIndex - (shipLength - 2) / 2 + i);
    }
  } else {
    for (let i = 0; i < shipLength; i++) {
      placeableIndexRange.push(centerIndex - (shipLength - 1) / 2 + i);
    }
  }

  let collisionCells = [];
  //For x-axis
  if (shipName === "Submarine") {
    collisionCells.push(9);
  } else if (shipName === "Destroyer") {
    collisionCells.push(0, 9);
  } else if (shipName === "Cruiser") {
    collisionCells.push(0, 8, 9);
  } else {
    collisionCells.push(0, 1, 8, 9);
  }

  if (
    collisionCells.includes(baseCenterIndex) ||
    placeableIndexRange.some((i) => indexHasShip.includes(i))
  ) {
    return false;
  } else return [true, placeableIndexRange];
};

export default CollisionCheck;
