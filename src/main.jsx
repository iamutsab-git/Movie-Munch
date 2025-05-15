import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './components/Context/FavoriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Movie-Munch">
    <FavoritesProvider>
    <App />
    </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
