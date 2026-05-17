import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {PrivacyPolicyPage} from './PrivacyPolicyPage.tsx';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/privacidad' ? <PrivacyPolicyPage /> : <App />}
  </StrictMode>,
);
