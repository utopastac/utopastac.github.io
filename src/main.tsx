import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SectionBackgroundProvider } from './context/SectionBackgroundContext'
import { App } from './components/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SectionBackgroundProvider>
      <App />
    </SectionBackgroundProvider>
  </StrictMode>,
)