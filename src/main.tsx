import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import cardConfig from './config/card.config'
import { assertValidCardConfig } from './features/digital-card/utils/validateConfig'
import './index.css'

assertValidCardConfig(cardConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)