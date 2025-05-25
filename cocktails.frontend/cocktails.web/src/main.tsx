import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import { MsalProvider } from '@azure/msal-react';
import { reactPlugin } from './services/AppinsightsService';
import { msalInstance } from './utils/authConfig';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AppInsightsErrorBoundary onError={() => <h1>Something went wrong</h1>} appInsights={reactPlugin}>
                <App />
            </AppInsightsErrorBoundary>
        </MsalProvider>
    </React.StrictMode>
);
