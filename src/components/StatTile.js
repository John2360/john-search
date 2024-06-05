import React from "react";

function StatTile(props) {
  const { score, name, click, setCouple } = props;

  const handleClick = () => {
    if (!click) return;
    const { name, val } = click();
    setCouple((prev) => ({ ...prev, name: val }));
  };

  return (
    <div className="small-tile blue" onClick={handleClick}>
      <div className="tile-stat">{score}</div>
      <div className="tile-label">{name}</div>
    </div>
  );
}

export default StatTile;
