import React from "react";
import Clock from "./Clock";

function CityTile(props) {
  const { bg, city, temp, timezone } = props;
  return (
    <div
      className="big-tile city-tile"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="tile-cover"></div>
      <div className="tile-content">
        <div className="tile-tempature">{temp}°</div>
        <div className="tile-time">
          <Clock timezone={timezone} />
        </div>
        <div className="tile-location">{city}</div>
      </div>
    </div>
  );
}

export default CityTile;
