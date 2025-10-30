import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import css from "./tokens.css.ts";
import { DesignTokensPage } from './pages/DesignTokensPage.tsx';

const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignTokensPage />
  </StrictMode>,
)
