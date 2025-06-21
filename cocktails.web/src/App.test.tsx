import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { reactPlugin } from './services/AppinsightsService';
import { msalInstance } from './utils/authConfig';

describe('App', () => {
    test('renders app', async () => {
        render(
            <React.StrictMode>
                <MsalProvider instance={msalInstance}>
                    <AppInsightsErrorBoundary onError={() => <h1>Something went wrong</h1>} appInsights={reactPlugin}>
                        <App />
                    </AppInsightsErrorBoundary>
                </MsalProvider>
            </React.StrictMode>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeTruthy();
    });
});
