import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { setupTelemetry } from './utils/otelConfig';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';
import { getWindowEnv } from './utils/envConfig';
import trimWhack from './utils/trimWhack';
import { onRedirectCallback } from './utils/authConfig';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initialize OpenTelemetry
setupTelemetry();

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={getWindowEnv().VITE_AUTH0_DOMAIN}
            clientId={getWindowEnv().VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)!,
                scope: 'openid offline_access profile email',
            }}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                <App />
            </AppErrorBoundary>
        </Auth0Provider>
    </React.StrictMode>
);
