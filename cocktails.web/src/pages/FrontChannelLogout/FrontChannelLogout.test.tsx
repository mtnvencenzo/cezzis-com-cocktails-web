import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../components/GlobalContexts';
import FrontChannelLogout from './FrontChannelLogout';
import { server } from '../../../tests/setup';

describe('Front channel logout', () => {
    let msalTester: MsalReactTester;

    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: { assign: vi.fn() }
        });

        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();

        server.use(
            http.get('https://login.cezzis.com/cezzis.onmicrosoft.com/b2c_1_signinsignup_policy/v2.0/.well-known/openid-configuration', () =>
                HttpResponse.json(
                    {
                        issuer: 'https://login.cezzis.com/fb512a9c-5b44-41ab-8042-6465769f16c9/v2.0/',
                        authorization_endpoint: 'https://login.cezzis.com/cezzis.onmicrosoft.com/b2c_1_signinsignup_policy/oauth2/v2.0/authorize',
                        token_endpoint: 'https://login.cezzis.com/cezzis.onmicrosoft.com/b2c_1_signinsignup_policy/oauth2/v2.0/token',
                        end_session_endpoint: 'https://login.cezzis.com/cezzis.onmicrosoft.com/b2c_1_signinsignup_policy/oauth2/v2.0/logout',
                        jwks_uri: 'https://login.cezzis.com/cezzis.onmicrosoft.com/b2c_1_signinsignup_policy/discovery/v2.0/keys',
                        response_modes_supported: ['query', 'fragment', 'form_post'],
                        response_types_supported: ['code', 'code id_token', 'code token', 'code id_token token', 'id_token', 'id_token token', 'token', 'token id_token'],
                        scopes_supported: ['openid'],
                        subject_types_supported: ['pairwise'],
                        id_token_signing_alg_values_supported: ['RS256'],
                        token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic'],
                        claims_supported: [
                            'idp',
                            'idp_access_token',
                            'state',
                            'family_name',
                            'newUser',
                            'oid',
                            'sub',
                            'emails',
                            'postalCode',
                            'streetAddress',
                            'name',
                            'tfp',
                            'isForgotPassword',
                            'iss',
                            'iat',
                            'exp',
                            'aud',
                            'acr',
                            'nonce',
                            'auth_time'
                        ]
                    },
                    {
                        status: 200,
                        statusText: 'OK'
                    }
                )
            )
        );
    });

    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    test('renders account page', async () => {
        window.location.href = '/relative-url';
        await msalTester.isLogged();

        render(
            <MsalProvider instance={msalTester.client}>
                <GlobalContext>
                    <MemoryRouter>
                        <FrontChannelLogout />
                    </MemoryRouter>
                </GlobalContext>
            </MsalProvider>
        );

        await msalTester.waitForRedirect();

        const content = await screen.findByText('Logging out...');
        expect(content).toBeTruthy();
    });
});
