import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupTelemetry } from './utils/otelConfig';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';
import { auth0ProviderOptions } from './utils/authConfig';
import { Auth0Provider } from './components/Auth0Provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initialize OpenTelemetry
setupTelemetry();

root.render(
    <React.StrictMode>
        <Auth0Provider {...auth0ProviderOptions}>
            <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                <App />
            </AppErrorBoundary>
        </Auth0Provider>
    </React.StrictMode>
);
