const OverlayCell = ({ condition, index }) => {
  let isSunken;

  if (index.ship) {
    if (index.ship.sunk) {
      isSunken = true;
    }
  }

  return (
    <div className="">
      <div
        className={`overlay w-full h-full absolute top-0 left-0 opacity-40 `}
        style={isSunken === true ? { backgroundColor: "red" } : null}
      >
        <img src={condition}></img>
      </div>
    </div>
  );
};

export default OverlayCell;
