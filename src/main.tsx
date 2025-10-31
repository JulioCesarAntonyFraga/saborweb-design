import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { tokensCSS } from "./tokens.css";
import { DesignTokensPage } from './pages/DesignTokensPage';

const style = document.createElement("style");
style.textContent = tokensCSS;
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignTokensPage />
  </StrictMode>,
)
