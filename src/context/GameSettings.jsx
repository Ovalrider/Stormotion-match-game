import { createContext, useState, useContext } from "react";

const GameSettingsContext = createContext();

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  return context;
};

export const GameSettingsProvider = ({ children }) => {
  const [whoGoesFirst, setWhoGoesFirst] = useState("Player");
  const [matches, setMatches] = useState(25);

  const reset = () => {
    setWhoGoesFirst("Player");
    setMatches(25);
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
