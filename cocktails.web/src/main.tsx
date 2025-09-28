import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupTelemetry } from './utils/otelConfig';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';
import { getWindowEnv } from './utils/envConfig';
import { loginAuthorizationParams, onRedirectCallback } from './utils/authConfig';
import { Auth0Provider } from './components/Auth0Provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initialize OpenTelemetry
setupTelemetry();

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={getWindowEnv().VITE_AUTH0_DOMAIN}
            clientId={getWindowEnv().VITE_AUTH0_CLIENT_ID}
            authorizationParams={loginAuthorizationParams}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens
            cacheLocation='localstorage'
        >
            <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                <App />
            </AppErrorBoundary>
        </Auth0Provider>
    </React.StrictMode>
);
