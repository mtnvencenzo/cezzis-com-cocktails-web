import { Auth0Client, AuthorizationParams, User } from '@auth0/auth0-spa-js';
import SessionStorageService from '../services/SessionStorageService';
import { getAccountCocktailRatings, loginOwnedAccountProfile } from '../services/AccountService';
import trimWhack from './trimWhack';
import { getWindowEnv } from './envConfig';
import logger from '../services/Logger';
import { AppState, Auth0ProviderOptions } from '../components/Auth0Provider/auth0-provider';

export const onRedirectCallback = async (appState?: AppState, user?: User) => {
    const sessionStorageService = new SessionStorageService();

    if (appState?.returnTo) {
        // window.history.replaceState({}, document.title, appState.returnTo);
    }

    if (user) {
        await loginOwnedAccountProfile();
        await getAccountCocktailRatings(true);
    } else {
        sessionStorageService.ClearOwnedAccountProfileRequestData();
    }
};

export const authParams: AuthorizationParams = {
    redirect_uri: trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)!
};

export const loginAuthorizationScopes = ['openid', 'offline_access', 'profile', 'email'];

export const loginAuthorizationParams: AuthorizationParams = {
    ...authParams,
    scope: [...loginAuthorizationScopes].join(' ')
};

export const loginWithRedirectOptions = {
    authorizationParams: loginAuthorizationParams
};

export const getAccessToken = async (requiredScopes: string[] = []): Promise<string | undefined> => {
    let auth0Client: Auth0Client | null = null;
    auth0Client = new Auth0Client({
        domain: getWindowEnv().VITE_AUTH0_DOMAIN,
        clientId: getWindowEnv().VITE_AUTH0_CLIENT_ID,
        useRefreshTokens: false,
        cacheLocation: 'localstorage'
    });

    if (!auth0Client) {
        logger.logWarning('Auth0 client not initialized');
        return undefined;
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
        logger.logWarning('User not authenticated');
        return undefined;
    }

    const accounts = (await auth0Client.getIdTokenClaims()) ? [auth0Client.getIdTokenClaims()!] : [];
    if (!accounts || accounts.length === 0) {
        logger.logWarning('No accounts found');
        return undefined;
    }

    const user = await auth0Client.getUser();

    if (!user) {
        logger.logWarning('User not found');
        return undefined;
    }

    if (accounts && accounts.length > 0) {
        const authorizationParms: AuthorizationParams = {
            ...authParams,
            scope: [...loginAuthorizationScopes, ...requiredScopes].join(' '),
            audience: getWindowEnv().VITE_AUTH0_COCKTAILS_API_AUDIENCE
        };

        try {
            const accessToken = await auth0Client.getTokenSilently({
                detailedResponse: false,
                authorizationParams: authorizationParms
            });

            return accessToken;
        } catch (error) {
            // Fallback to interaction when silent call fails
            // (e.g. when the session expires)
            try {
                const accessToken = await auth0Client.getTokenWithPopup({
                    authorizationParams: authorizationParms
                });

                logger.logWarning('Acquired access token with popup fallback');
                return accessToken;
            } catch (error) {
                logger.logException('Failed to acquire access token with popup fallback', error as Error);
                return undefined;
            }
        }
    }

    return undefined;
};

export const auth0ProviderOptions: Auth0ProviderOptions = {
    domain: getWindowEnv().VITE_AUTH0_DOMAIN,
    clientId: getWindowEnv().VITE_AUTH0_CLIENT_ID,
    authorizationParams: loginAuthorizationParams,
    onRedirectCallback,
    useRefreshTokens: true,
    cacheLocation: 'localstorage'
};
