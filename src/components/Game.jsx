import { useState, useEffect, useCallback } from "react";
import { useGameSettings } from "../context/gameSettingsContext";
import CustomButton from "./Button";
import { GiMatchHead } from "react-icons/gi";
import { Box } from "@mui/material";
import CustomCard from "./Card";
import Footer from "./Footer";
import { AI_TURN_TIME, ANIM_TIME, MAX_MATCHES, MAX_TAKE_MATCHES } from "../util/CONSTANTS";



const Game = () => {
  const { whoGoesFirst, matches, setMatches } = useGameSettings();
  const [currentPlayer, setCurrentPlayer] = useState(whoGoesFirst);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [aiMatches, setAiMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const resetGame = useCallback(() => {
    setMatches(MAX_MATCHES);
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
    } else throw new Error("It's not the player's turn");
  };
  const aiTurn = useCallback(() => {
    let aiNumMatches = 0;
    // Try to leave the Player with a number of matches that is a multiple of 3+ 1
    // because every multiple of 4 is a losing position for 2nd player(who goes second).
    const remainder = matches % (MAX_TAKE_MATCHES+1);
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
    for (let i = 1; i <= Math.min(MAX_TAKE_MATCHES, matches); i++) {
      if ((aiMatches + i) % 2 === 0) {
        return i;
      }
    }
    return 0;
  }, [aiMatches, matches]);

  useEffect(() => {
    const winningMove = aiCanWin();
    if (matches === 0) {
      setGameOver(true);
      setWinner(
        playerMatches % 2 === 0 && aiMatches % 2 === 0
          ? null
          : aiMatches % 2 === 0
          ? "Ai"
          : "Player"
      );
    } else if (currentPlayer === "Ai") {
      if(!winningMove){
        const timeoutIdAiTurn = setTimeout(aiTurn, AI_TURN_TIME);
        return () => clearTimeout(timeoutIdAiTurn);
      }else{
        const timeoutId = setTimeout(() => {
          let aiNumMatches = winningMove;
          setMatches((prev) => prev - aiNumMatches);
          setAiMatches((prev) => prev + aiNumMatches);
          setCurrentPlayer("Player");
        }, AI_TURN_TIME + ANIM_TIME);
        return () => clearTimeout(timeoutId);
      }
      
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
      <h1 className="text-3xl font-bold mb-4">Matchstick Game</h1>
      <div className="flex justify-center mb-4 ">
        <GiMatchHead size={110} color="#1976d2" />
      </div>
      <p className="mb-2 text-2xl">Matches left: {matches}</p>
      <p className="mt-4 text-xl">Current player: {currentPlayer}</p>
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
        className="flex items-center justify-evenly max-h-screen  mt-16 gap-56"
        sx={{ marginTop: -1 }}
      >
        <CustomCard icon={"🧑‍💻"} score={playerMatches} text="Your score" />
        <CustomCard icon={"🖥️"} score={aiMatches} text="Ai score" />
      </Box>
      <div
        className=" flex flex-col justify-evenly items-center gap-12"
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

      <Footer onClick={resetGame} />
    </div>
  );
};

export default Game;
