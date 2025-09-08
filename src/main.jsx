import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ScrollProvider } from './context/scrollContext';
import './index.css';
import {HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScrollProvider>
      <HashRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </HashRouter>
    </ScrollProvider>
  </StrictMode>
);
