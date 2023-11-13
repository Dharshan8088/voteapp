import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider} from '@auth0/auth0-react';

const domain = "dev-j26fy1koopr4d1qe.us.auth0.com";
const clientId = "2UcwPHZKAuJeP2QZdbqMduPYaKyuobfX";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        useRefreshTokens
        cacheLocation="localstorage"
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);


