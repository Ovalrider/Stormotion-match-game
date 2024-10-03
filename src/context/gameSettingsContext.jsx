import { createContext, useState, useContext } from "react";
import { MAX_MATCHES } from "../util/CONSTANTS";

const GameSettingsContext = createContext();

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  return context;
};

export const GameSettingsProvider = ({ children }) => {
  const [whoGoesFirst, setWhoGoesFirst] = useState("Player");
  const [matches, setMatches] = useState(MAX_MATCHES);

  const reset = () => {
    setWhoGoesFirst("Player");
    setMatches(MAX_MATCHES);
  };

  const value = {
    whoGoesFirst,
    matches,
    setWhoGoesFirst,
    reset,
    setMatches,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
