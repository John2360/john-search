import React from "react";
import { incrementGameScore, decrementGameScore } from "../services/db";

function GameTile(props) {
  const {
    gameName,
    gameId,
    player1,
    player2,
    score1,
    score2,
    activePlayer,
    setCouple,
    couple,
  } = props;

  const handleDecrement = () => {
    decrementGameScore(couple.id, gameId, activePlayer);
    setCouple((prev) => {
      prev[gameId][activePlayer] -= 1;
      return { ...prev };
    });
  };

  const handleIncrement = () => {
    incrementGameScore(couple.id, gameId, activePlayer);
    setCouple((prev) => {
      prev[gameId][activePlayer] += 1;
      return { ...prev };
    });
  };

  return (
    <div className="big-tile game-tile">
      <div className="game-title">{gameName}</div>
      <div className="game-score-container">
        <div className="player-1">
          <div className="player-score">{score1}</div>
          <div className="player-name">{player1}</div>
        </div>
        <div>
          <div className="game-score-separator">-</div>
        </div>
        <div className="player-2">
          <div className="player-score">{score2}</div>
          <div className="player-name">{player2}</div>
        </div>
      </div>
      <div className="game-controls">
        <span onClick={handleDecrement}>-</span>
        <span onClick={handleIncrement}>+</span>
      </div>
    </div>
  );
}

export default GameTile;
