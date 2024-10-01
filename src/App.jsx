// import { useState } from 'react'
import Settings from './components/Settings'
import { GameSettingsProvider } from './context/GameSettings'

import './App.css'
import Game from './components/Game'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <GameSettingsProvider>
      <Game/>
      <Settings />
    </GameSettingsProvider>
    </>
  )
}

export default App
