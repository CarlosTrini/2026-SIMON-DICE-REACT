import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/styles/index.css'
import App from '@/App'
import { GameProvider } from '@/store/GameContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  </StrictMode>,
)
