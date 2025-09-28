import { AppState, User } from '@auth0/auth0-react';
import SessionStorageService from '../services/SessionStorageService';
import { getAccountCocktailRatings, loginOwnedAccountProfile } from '../services/AccountService';
import { Auth0Client, AuthorizationParams } from '@auth0/auth0-spa-js';
import trimWhack from './trimWhack';
import { getWindowEnv } from './envConfig';
import logger from '../services/Logger';

export const onRedirectCallback = async (appState?: AppState, user?: User) => {
    const sessionStorageService = new SessionStorageService();
    console.log('onRedirectCallback', appState);

    if (appState) {
        console.log('AppState', appState);
    }

    if (user) {
        await loginOwnedAccountProfile();
        await getAccountCocktailRatings(true);
    } else {
        sessionStorageService.ClearOwnedAccountProfileRequestData();
    }
};

export const authParams: AuthorizationParams = {
    redirect_uri: trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)!,
}

export const loginWithRedirectOptions = {
    authorizationParams: {
        ...authParams,
        // audience: getWindowEnv().VITE_AUTH0_COCKTAILS_API_AUDIENCE,
        scope: 'openid offline_access profile email'
    }
};

export const getAccessToken = async (requiredScopes: string[] = []): Promise<string | undefined> => {
    let auth0Client: Auth0Client | null = null;
    auth0Client = new Auth0Client({
        domain: getWindowEnv().VITE_AUTH0_DOMAIN,
        clientId: getWindowEnv().VITE_AUTH0_CLIENT_ID,
        useRefreshTokens: false,
        cacheLocation: "localstorage"
    });

    if (!auth0Client) {
        console.log("Auth0 client not initialized");
        return undefined;
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
        console.log("User not authenticated");
        return undefined;
    }

    const accounts = await auth0Client.getIdTokenClaims() ? [auth0Client.getIdTokenClaims()!] : [];
    if (!accounts || accounts.length === 0) {
        console.log("No accounts found");
        return undefined;
    }

    const user = await auth0Client.getUser();

    if (!user) {
        console.log("User not found");
        return undefined;
    }

    if (accounts && accounts.length > 0) {
        const authorizationParms: AuthorizationParams = {
            ...authParams,
            scope: ['openid', 'offline_access', 'profile', 'email', ...requiredScopes].join(' '),
            audience: getWindowEnv().VITE_AUTH0_COCKTAILS_API_AUDIENCE
        };

        try {
            const accessToken = await auth0Client.getTokenSilently({
                detailedResponse: false,
                authorizationParams: authorizationParms,
            });

            return accessToken;

        } catch (error) {
            // Fallback to interaction when silent call fails
            // (e.g. when the session expires)
            try {
                const accessToken = await auth0Client.getTokenWithPopup({
                    authorizationParams: authorizationParms,
                });

                console.log("Acquired access token with popup fallback", accessToken);

                return accessToken;


            } catch (error) {
                console.error("Error acquiring access token: ", error);
                logger.logException(error as Error);
                return undefined;
            }
        }
    }
};


// msalInstance.addEventCallback(async (event: EventMessage) => {
//     const sessionStorageService = new SessionStorageService();

//     if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) {
//         if ((event.payload as AuthenticationResult).account) {
//             const activeAccount = (event.payload as AuthenticationResult).account;
//             msalInstance.setActiveAccount(activeAccount);
//             idToken = (event.payload as AuthenticationResult).idToken;

//             if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) {
//                 if (activeAccount && activeAccount.idTokenClaims && activeAccount.idTokenClaims.sub) {
//                     await loginOwnedAccountProfile();
//                     await getAccountCocktailRatings(true);
//                 }
//             }
//         }
//     } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
//         sessionStorageService.ClearOwnedAccountProfileRequestData();
//         msalInstance.setActiveAccount(null);
//         idToken = '';
//     }
// });

// export const resetPassword = async () => {
//     await msalInstance
//         .loginRedirect({
//             authority: ciamPolicies.authorities.passwordReset.authority,
//             scopes: [ciamPolicies.authorities.passwordReset.scope],
//             redirectUri: ciamPolicies.authorities.passwordReset.redirectUri
//         })
//         .catch((error) => {
//             logger.logException(error as Error);
//         });
//};
