import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// For the people who open devtools on portfolios.
console.log(
  '%c> hello, fellow inspector.\n> nothing hidden in here. try typing "help" at the prompt instead.',
  'color:#c3e4ff;background:#04080c;font-family:monospace;padding:6px 10px;line-height:1.6',
)
