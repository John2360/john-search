import React from "react";
import states from "../assets/states.json";
import { updateLicensePlate } from "../services/db";

function LicensePlate(props) {
  const { docId, gameId, gameData, activePlayer, setCouple } = props;
  return (
    <div className="big-tile game-tile license-plate-container">
      <div className="row">
        <div className="license-plate-map">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
            {states["paths"].map((state) => (
              <path
                key={state.id}
                id={state.id}
                data-name={state.name}
                data-id={state.id}
                d={state.data}
                className={`state ${
                  gameData.player1.includes(state.id) && "state-player-1"
                } ${gameData.player2.includes(state.id) && "state-player-2"}`}
                onClick={() => {
                  if (
                    !gameData.player1.includes(state.id) &&
                    !gameData.player2.includes(state.id)
                  ) {
                    updateLicensePlate(docId, activePlayer, state.id);
                    setCouple((prev) => {
                      prev[gameId][activePlayer].push(state.id);
                      return { ...prev };
                    });
                  }
                }}
              />
            ))}
          </svg>
        </div>
        <div className="license-plate-score">
          <div className="total">
            {gameData.player1.length + gameData.player2.length}
            <span className="small">/50</span>
          </div>
          <div className="player-score">
            <div className="player">
              <div className="score">{gameData.player1.length}</div>
              <div className="name">John</div>
            </div>
            <div className="player">
              <div className="score">{gameData.player2.length}</div>
              <div className="name">Olivia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicensePlate;
