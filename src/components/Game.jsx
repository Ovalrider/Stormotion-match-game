import { useState, useEffect } from "react";
import { useGameSettings } from "../context/GameSettings";
import CustomButton from "./Button";
import { TextField } from "@mui/material";
import { Fab } from "@mui/material";
import {  Add, Remove } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { Box } from "@mui/material";



const Game = () => {
  const {
    whoGoesFirst,
    setWhoGoesFirst,
    nParam,
    mParam,
    setNParam,
    setMParam,
  } = useGameSettings();
  const MATCHES_NUM = 2 * nParam + 1;
  const [matches, setMatches] = useState(MATCHES_NUM);
  const [currentPlayer, setCurrentPlayer] = useState("Human");
  const [humanMatches, setHumanMatches] = useState(0);
  const [humanMatchesToTake, setHumanMatchesToTake] = useState(1);
  const [aiMatches, setAiMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const resetGame = () => {
    // setMatches(MATCHES_NUM);
    // setHumanMatches(0);
    // setAiMatches(0);
    // setCurrentPlayer(whoGoesFirst);
    // setGameOver(false);
    // setWinner(null);
    location.reload();
  };
  const takeMatches = (count) => {
    if (currentPlayer === "Human") {
      setMatches(matches - count);
      setHumanMatches(humanMatches + count);
      setCurrentPlayer("AI");
    }
  };
  const aiTurn = () => {
    // remake, doesnt work
    let aiNumMatches = 0;
    if (matches > mParam) {
      // Try to leave the human with a number of matches that is a multiple of m
      const remainder = matches % mParam;
      if (remainder === 0) {
        aiNumMatches = 1;
      } else {
        aiNumMatches = mParam - remainder;
      }
    } else {
      // Take the maximum number of matches that will leave the human with a number of matches that is a multiple of m
      for (let i = matches; i >= 1; i--) {
        if ((matches - i) % mParam === 0) {
          aiNumMatches = i;
          break;
        }
      }
    }
    setMatches(matches - aiNumMatches);
    setAiMatches(aiMatches + aiNumMatches);

    setCurrentPlayer("Human");
  };

  useEffect(() => {
    if (matches === 0) {
      setGameOver(true);
      setWinner(humanMatches % 2 === 0 ? "Human" : "AI"); // calculate draw later
    } else if (currentPlayer === "AI") {
      setTimeout(aiTurn, 1000);
    }
  }, [matches, currentPlayer]);
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Match Game</h1>
      <p className="mb-2">Matches left: {matches}</p>
      <p className="mb-2">Human matches: {humanMatches}</p>
      <p className="mb-2">AI matches: {aiMatches}</p>
      <p className="mb-4">Current player: {currentPlayer}</p>

      {mParam <= 3 && (
        <div className="space-x-2">
          {[1, 2, 3].map((num) => (
            <CustomButton
              key={num}
              onClick={() => takeMatches(num)}
              disabled={num > matches}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 text-3xl"
            >
              Take {num}
            </CustomButton>
          ))}
        </div>
      )}
      {mParam > 3 && (
        <Box className="flex flex-col justify-center items-center gap-5 mb-10">
          <TextField
            autoFocus
            margin="dense"
            style={{ textAlign: "center" }}
            InputProps={{
              inputProps: { style: { textAlign: "center" } },
              startAdornment: (
                <InputAdornment position="start">
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    style={{ boxShadow: "none" }}
                    disabled={humanMatchesToTake <= 0}
                    onClick={() => setHumanMatchesToTake((prev) => prev - 1)}
                  >
                    <Remove />
                  </Fab>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    style={{ boxShadow: "none" }}
                    disabled={humanMatchesToTake >= mParam}
                    onClick={() => setHumanMatchesToTake((prev) => prev + 1)}
                  >
                    <Add />
                  </Fab>
                </InputAdornment>
              ),
            }}
            value={humanMatchesToTake}
            //   label="Matches to take"
          />
          <CustomButton onClick={() => takeMatches(humanMatchesToTake)}>
            Take {humanMatchesToTake} matches
          </CustomButton>
        </Box>
      )}

      {gameOver && <p>{winner === "Human" ? "You win!" : "AI wins!"}</p>}
      <div className="fixed bottom-0 left-0 right-0 text-center mb-0 p-10 bg-gray-200 border border-solid border-gray-400">
        <CustomButton className="text-4xl" onClick={() => resetGame()}>
          Start again
        </CustomButton>
      </div>
    </div>
  );
};

export default Game;
