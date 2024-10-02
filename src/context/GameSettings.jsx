import { createContext, useState, useContext } from "react";

const defaultState = {
  whoGoesFirst: "Player",
  nParam: 25,
  mParam: 3,
  setWhoGoesFirst: () => {},
  setNParam: () => {},
  setMParam: () => {},
};
const GameSettingsContext = createContext();

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  //   if (context === undefined) {
  //     throw new Error('useGameSettings must be used within a GameSettingsProvider');
  //   }
  return context;
};

export const GameSettingsProvider = ({ children }) => {
  const [whoGoesFirst, setWhoGoesFirst] = useState("Player");
  // const [nParam, setNParam] = useState(12);
  // const [mParam, setMParam] = useState(3);
  const [matches, setMatches] = useState(25);
  // useEffect(() => {
  //   setMatches(2 * nParam + 1);
  // }, [nParam]);
  const reset = () => {
    setWhoGoesFirst("Player");
    // setNParam(12);
    // setMParam(3);
    setMatches(25);
  };

  const value = {
    whoGoesFirst,
    // nParam,
    // mParam,
    matches,
    setWhoGoesFirst,
    // setNParam,
    // setMParam,
    reset,
    setMatches,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
