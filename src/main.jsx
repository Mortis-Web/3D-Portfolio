import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ScrollProvider } from './context/scrollContext';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScrollProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ScrollProvider>
  </StrictMode>
);
