import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/inter/500.css';
import '@fontsource/geist/400.css';
import '@fontsource/geist/500.css';
import '@fontsource/dancing-script/400.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
