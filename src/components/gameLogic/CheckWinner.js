const CheckWinner = ({ bothPlayers, shooter }) => {
  let checkBoardOfEnemy;

  if (shooter.name === "human") {
    checkBoardOfEnemy = bothPlayers.computer;
  } else {
    checkBoardOfEnemy = bothPlayers.player;
  }

  return checkBoardOfEnemy.ships.every((x) => x.sunk);
};

export default CheckWinner;
