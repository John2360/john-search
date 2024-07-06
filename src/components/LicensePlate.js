import React, { useState } from "react";
import states from "../assets/states.json";
import { updateLicensePlate, removeLicensePlate } from "../services/db";
import { FaRegTrashAlt } from "react-icons/fa";
function LicensePlate(props) {
  const { docId, gameId, gameData, player1, player2, activePlayer, setCouple } =
    props;
  const [deleteState, setDeleteState] = useState(false);
  return (
    <div className="big-tile game-tile license-plate-container">
      <div className="row">
        <div className="license-plate-map">
          <span
            className={`remove-tool ${deleteState && "active"}`}
            onClick={() => {
              setDeleteState(!deleteState);
            }}
          >
            <FaRegTrashAlt />
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 600"
            style={{
              height: "100%",
              width: "100%",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
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
                    !gameData.player2.includes(state.id) &&
                    !deleteState
                  ) {
                    updateLicensePlate(docId, activePlayer, state.id);
                    setCouple((prev) => {
                      prev[gameId][activePlayer].push(state.id);
                      return { ...prev };
                    });
                  } else if (
                    deleteState &&
                    gameData[activePlayer].includes(state.id)
                  ) {
                    removeLicensePlate(docId, activePlayer, state.id);
                    setCouple((prev) => {
                      prev[gameId][activePlayer] = prev[gameId][
                        activePlayer
                      ].filter((item) => item !== state.id);
                      return { ...prev };
                    });
                  }
                }}
                //
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
              <div className="name">{player1}</div>
            </div>
            <div className="player">
              <div className="score">{gameData.player2.length}</div>
              <div className="name">{player2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicensePlate;
