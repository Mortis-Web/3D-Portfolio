import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ScrollProvider } from './context/scrollContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScrollProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ScrollProvider>
  </StrictMode>
);
