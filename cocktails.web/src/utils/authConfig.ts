import { Auth0Client, AuthorizationParams, RedirectLoginOptions, User } from '@auth0/auth0-spa-js';
import SessionStorageService from '../services/SessionStorageService';
import { getAccountCocktailRatings, loginOwnedAccountProfile } from '../services/AccountService';
import trimWhack from './trimWhack';
import { getWindowEnv } from './envConfig';
import logger from '../services/Logger';
import { AppState, Auth0ProviderOptions } from '../components/Auth0Provider/auth0-provider';
import { LogoutOptions } from '../components/Auth0Provider';

export const clearOwnedAccountLoginSession = () => {
    const sessionStorageService = new SessionStorageService();
    sessionStorageService.ClearOwnedAccountProfileRequestData();
};

export const loadOwnedAccountProfileData = async () => {
    await loginOwnedAccountProfile();
    await getAccountCocktailRatings(true);
};

export const onRedirectCallback = async (_?: AppState, user?: User) => {
    if (user) {
        await loadOwnedAccountProfileData();
    } else {
        clearOwnedAccountLoginSession();
    }
};

export const authParams: AuthorizationParams = {
    redirect_uri: trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)!
};

export const loginAuthorizationScopes = ['openid', 'offline_access', 'profile', 'email'];

export const loginAuthorizationParams: AuthorizationParams = {
    ...authParams,
    returnTo: window.location.href,
    scope: [...loginAuthorizationScopes].join(' ')
};

export const loginWithRedirectOptions = (): RedirectLoginOptions => ({
    authorizationParams: loginAuthorizationParams,
    appState: { targetUrl: window.location.href }
});

export const getAccessToken = async (requiredScopes: string[] = [], audience?: string): Promise<string | undefined> => {
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

    const idTokenClaims = await auth0Client.getIdTokenClaims();
    if (!idTokenClaims) {
        logger.logInformation('No ID token claims found');
        return undefined;
    }

    const authorizationParams: AuthorizationParams = {
        ...authParams,
        scope: [...loginAuthorizationScopes, ...requiredScopes].join(' '),
        audience: audience || getWindowEnv().VITE_AUTH0_COCKTAILS_API_AUDIENCE,
        silent_forms: 'on'
    };
    try {
        return await auth0Client.getTokenSilently({
            detailedResponse: false,
            authorizationParams
        });
    } catch (err1) {
        logger.logException('Unable to retrieve access token through silent flow', err1 as Error);
        try {
            const token = await auth0Client.getTokenWithPopup({ authorizationParams });
            return token;
        } catch (err2) {
            logger.logException('Unable to retrieve access token through popup fallback', err2 as Error);
            return undefined;
        }
    }
};

export const logoutParams: LogoutOptions = {
    logoutParams: {
        returnTo: window.location.origin
    }
};

export const auth0ProviderOptions: Auth0ProviderOptions = {
    domain: getWindowEnv().VITE_AUTH0_DOMAIN,
    clientId: getWindowEnv().VITE_AUTH0_CLIENT_ID,
    authorizationParams: loginAuthorizationParams,
    onRedirectCallback,
    useRefreshTokens: true,
    cacheLocation: 'localstorage'
};
