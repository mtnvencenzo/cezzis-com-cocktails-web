import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { msalInstance } from './utils/authConfig';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';

describe('App', () => {
    test('renders app', async () => {
        render(
            <React.StrictMode>
                <MsalProvider instance={msalInstance}>
                    <AppErrorBoundary onError={() => <h1>Something went wrong</h1>}>
                        <App />
                    </AppErrorBoundary>
                </MsalProvider>
            </React.StrictMode>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeTruthy();
    });
});
