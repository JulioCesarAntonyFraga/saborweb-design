import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './tokens.css'
import { DesignTokensPage } from './pages/DesignTokensPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignTokensPage />
  </StrictMode>,
)
