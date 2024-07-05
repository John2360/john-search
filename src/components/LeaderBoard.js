import React from "react";

function LeaderBoard(props) {
  const { player1, player2, couple } = props;
  const positionText = (player1Score, player2Score) => {
    if (player1Score > player2Score) {
      return "1st";
    } else if (player1Score < player2Score) {
      return "2nd";
    } else {
      return "Tie";
    }
  };
  const fullPlayer1 = {
    name: player1.charAt(0),
    score: couple?.leaderboard?.player1 || 0,
    place: positionText(
      couple?.leaderboard?.player1 || 0,
      couple?.leaderboard?.player2 || 0
    ),
  };

  const fullPlayer2 = {
    name: player2.charAt(0),
    score: couple?.leaderboard?.player2 || 0,
    place: positionText(
      couple?.leaderboard?.player2 || 0,
      couple?.leaderboard?.player1 || 0
    ),
  };

  const score1Data =
    fullPlayer1.score >= fullPlayer2.score ? fullPlayer1 : fullPlayer2;
  const score2Data =
    score1Data.name === fullPlayer1.name ? fullPlayer2 : fullPlayer1;
  return (
    <div className="small-tile leaderboard">
      <div className="players">
        <div className="player-place">
          <div className="position-number">{score1Data.place}</div>
          <div className="player-name">{score1Data.name}</div>
          <div className="player-score">{score1Data.score}</div>
          <div className="player-bar first"></div>
        </div>
        <div className="player-place">
          <div className="position-number">{score2Data.place}</div>
          <div className="player-name">{score2Data.name}</div>
          <div className="player-score">{score2Data.score}</div>
          <div
            className={`player-bar ${
              score2Data.place === "Tie" ? "first" : "second"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
