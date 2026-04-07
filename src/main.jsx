import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Custom cursor tracker
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
