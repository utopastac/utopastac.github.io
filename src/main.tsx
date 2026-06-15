import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from '@/components/App'
import { ModalProvider } from '@/context/ModalContext'
import { SectionBackgroundProvider } from '@/context/SectionBackgroundContext'
import { SettingsProvider } from '@/settings'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <SectionBackgroundProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SectionBackgroundProvider>
    </SettingsProvider>
  </StrictMode>,
)