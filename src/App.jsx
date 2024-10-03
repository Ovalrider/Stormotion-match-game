import { GameSettingsProvider } from "./context/GameSettings";
import Select from "./components/Select";

import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <GameSettingsProvider>
      <Select />
      <Game />
    </GameSettingsProvider>
  );
}

export default App;
