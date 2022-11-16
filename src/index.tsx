import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App/App';
import '../src/index.css';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
