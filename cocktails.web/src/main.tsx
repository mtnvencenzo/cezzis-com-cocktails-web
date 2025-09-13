import React from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './utils/authConfig';
import App from './App';
import { setupTelemetry } from './utils/otelConfig';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initialize OpenTelemetry
setupTelemetry();

root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                <App />
            </AppErrorBoundary>
        </MsalProvider>
    </React.StrictMode>
);
