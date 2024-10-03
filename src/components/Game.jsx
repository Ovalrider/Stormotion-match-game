import { useState, useEffect, useCallback } from "react";
import { useGameSettings } from "../context/GameSettings";
import CustomButton from "./Button";
import { GiMatchHead } from "react-icons/gi";
import { Box, Card, CardContent } from "@mui/material";

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
    <div className="p-4" style={{ marginTop: "-75px" }}>
      <h1 className="text-5xl font-bold mb-4">Matchstick Game</h1>
      <div className="flex justify-center mb-4 ">
        <GiMatchHead size={150} color="#1769aa" />
      </div>
      <p className="mb-2 text-3xl">Matches left: {matches}</p>
      <p className="mt-4 text-2xl">Current player: {currentPlayer}</p>
      {gameOver ? (
        <p className="text-xl mt-5">
          {winner === "Player"
            ? "You win!"
            : winner == "Ai"
            ? "Ai wins!"
            : "It's a draw!"}
        </p>
      ) : (
        <p className="text-xl mt-5">&nbsp;</p>
      )}
      <Box
        height="150px"
        className="flex items-center justify-evenly max-h-screen  mt-16 gap-40"
        sx={{ marginTop: -1 }}
      >
        <Card variant="outlined" sx={{ width: 400, height: 500 }}>
          <CardContent>
            <Box className="flex flex-col gap-14 mt-10  " alignItems="center">
              <p className="text-6xl" style={{ fontSize: "11rem" }}>
                🧑‍💻
              </p>
              <p className="text-4xl">Your score</p>
            </Box>
            <p className="text-4xl mt-7">{playerMatches}</p>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ width: 400, height: 500 }}>
          <CardContent>
            <Box className="flex flex-col gap-14 mt-10" alignItems="center">
              <p className="text-6xl " style={{ fontSize: "11rem" }}>
                🖥️
              </p>
              <p className="text-4xl">Ai score</p>
            </Box>
            <p className="text-4xl mt-7">{aiMatches}</p>
          </CardContent>
        </Card>
      </Box>
      <div
        className=" flex flex-col justify-evenly items-center gap-10"
        style={{ marginTop: "-100px" }}
      >
        {[1, 2, 3].map((num) => (
          <CustomButton
            key={num}
            onClick={() => takeMatches(num)}
            disabled={currentPlayer !== "Player" || num > matches}
          >
            Take {num}
          </CustomButton>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 text-center mb-0 p-9 bg-gray-200 border border-solid border-gray-400">
        <CustomButton className="text-2xl" onClick={() => resetGame()}>
          Start again
        </CustomButton>
      </div>
    </div>
  );
};

export default Game;
