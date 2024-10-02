import { useState, useEffect, useCallback } from "react";
import { useGameSettings } from "../context/GameSettings";
import CustomButton from "./Button";
// import { TextField } from "@mui/material";
// import { Fab } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { InputAdornment } from "@mui/material";
// import { Box } from "@mui/material";

const AI_TURN_TIME = 1000;

const Game = () => {
  const { whoGoesFirst, matches, setMatches } = useGameSettings();
  const [currentPlayer, setCurrentPlayer] = useState(whoGoesFirst);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [aiMatches, setAiMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const resetGame = useCallback(() => {
    setMatches(25);
    setPlayerMatches(0);
    setAiMatches(0);
    setCurrentPlayer(whoGoesFirst);
    setGameOver(false);
    setWinner(null);
  }, [setMatches, whoGoesFirst]);
  const takeMatches = (count) => {
    if (currentPlayer === "Player") {
      setMatches(matches - count);
      setPlayerMatches(playerMatches + count);
      setCurrentPlayer("Ai");
    }
  };
  const aiTurn = useCallback(() => {
    let aiNumMatches = 0;
    // Try to leave the Player with a number of matches that is a multiple of 3+ 1
    // because every multiple of 4 is a losing position for 2nd player(who goes second).
    const remainder = matches % 4;
    if (remainder === 0) {
      aiNumMatches = 3;
    } else if (remainder === 1) {
      aiNumMatches = 1;
    } else if (remainder === 2) {
      aiNumMatches = 1;
    } else if (remainder === 3) {
      aiNumMatches = 2;
    }
    setMatches((prev) => prev - aiNumMatches);
    setAiMatches((prev) => prev + aiNumMatches);

    setCurrentPlayer("Player");
  }, [matches, setMatches]);

  const aiCanWin = useCallback(() => {
    if (matches === 0) return 0;
    for (let i = 1; i <= Math.min(3, matches); i++) {
      if ((aiMatches + i) % 2 === 0) {
        return i;
      } else {
        return 0;
      }
    }
  }, [aiMatches, matches]);

  useEffect(() => {
    let winningMove = aiCanWin();
    console.log(winningMove);
    if (matches === 0) {
      setGameOver(true);
      setWinner(
        playerMatches % 2 === 0 && aiMatches % 2 === 0
          ? null
          : aiMatches % 2 === 0
          ? "Ai"
          : "Player"
      );
    } else if (currentPlayer === "Ai" && !winningMove) {
      const timeoutIdAiTurn = setTimeout(aiTurn, AI_TURN_TIME);
      return () => clearTimeout(timeoutIdAiTurn);
    } else if (currentPlayer === "Ai" && winningMove) {
      const timeoutId = setTimeout(() => {
        let aiNumMatches = winningMove;
        setMatches((prev) => prev - aiNumMatches);
        setAiMatches((prev) => prev + aiNumMatches);
        setCurrentPlayer("Player");
      }, AI_TURN_TIME);
      return () => clearTimeout(timeoutId);
    }
  }, [
    matches,
    currentPlayer,
    playerMatches,
    aiTurn,
    aiCanWin,
    setMatches,
    aiMatches,
  ]);
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Match Game</h1>
      <p className="mb-2">Matches left: {matches}</p>
      <p className="mb-2">Player matches: {playerMatches}</p>
      <p className="mb-2">Ai matches: {aiMatches}</p>
      <p className="mb-4">Current player: {currentPlayer}</p>

      <div className="space-x-2">
        {[1, 2, 3].map((num) => (
          <CustomButton
            key={num}
            onClick={() => takeMatches(num)}
            disabled={currentPlayer !== "Player" || num > matches}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 text-3xl"
          >
            Take {num}
          </CustomButton>
        ))}
      </div>
      {gameOver && (
        <p>
          {winner === "Player"
            ? "You win!"
            : winner == "Ai"
            ? "Ai wins!"
            : "It's a draw!"}
        </p>
      )}
      <div className="fixed bottom-0 left-0 right-0 text-center mb-0 p-10 bg-gray-200 border border-solid border-gray-400">
        <CustomButton className="text-4xl" onClick={() => resetGame()}>
          Start again
        </CustomButton>
      </div>
    </div>
  );
};

export default Game;
