import { describe, expect, test } from 'vitest';
import { ApiId } from '@azure/msal-browser';
import CustomNavigationClient from './CustomNavigationClient';

describe('Custom Navigation Client', () => {
    test('constructs new custom navigation client', async () => {
        const navigationClient = new CustomNavigationClient(() => {});

        expect(navigationClient).not.toBeNull();
    });

    test('navigates to relative path correctly with options history', async () => {
        let called = false;

        const navigate = () => {
            called = true;
        };

        const navigationClient = new CustomNavigationClient(navigate);

        navigationClient.navigateInternal('https://localhost:0001/route/of/mine?test=1', { noHistory: true, timeout: 1000, apiId: ApiId.ssoSilent });

        expect(called).toBeTruthy();
    });

    test('navigates to relative path correctly without options history', async () => {
        let called = false;

        const navigate = () => {
            called = true;
        };

        const navigationClient = new CustomNavigationClient(navigate);

        navigationClient.navigateInternal('https://localhost:0001/route/of/mine?test=1', { noHistory: false, timeout: 1000, apiId: ApiId.ssoSilent });

        expect(called).toBeTruthy();
    });
});
