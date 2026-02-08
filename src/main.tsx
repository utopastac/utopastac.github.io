import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from '@/components/App'
import { SectionBackgroundProvider } from '@/context/SectionBackgroundContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SectionBackgroundProvider>
      <App />
    </SectionBackgroundProvider>
  </StrictMode>,
)