import { GameSettingsProvider } from "./context/gameSettingsContext";
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
