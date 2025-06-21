import { LogLevel, PublicClientApplication, EventType, EventMessage, AuthenticationResult, InteractionRequiredAuthError, AccountInfo, BrowserCacheLocation } from '@azure/msal-browser';
import { getWindowEnv } from './envConfig';
import logger from '../services/Logger';
import SessionStorageService from '../services/SessionStorageService';
import { getAccountCocktailRatings, getOwnedAccountProfile } from '../services/AccountService';

let idToken = '';

const b2cPolicies = {
    names: {
        signIn: getWindowEnv().VITE_B2C_POLICY,
        resetPassword: getWindowEnv().VITE_B2C_RESET_PASSWORD_POLICY
    },
    authorities: {
        signIn: {
            authority: `https://${getWindowEnv().VITE_LOGIN_SUBDOMAIN}.cezzis.com/${getWindowEnv().VITE_B2C_TENANT}.onmicrosoft.com/${getWindowEnv().VITE_B2C_POLICY}`
        },
        passwordReset: {
            authority: `https://${getWindowEnv().VITE_LOGIN_SUBDOMAIN}.cezzis.com/${getWindowEnv().VITE_B2C_TENANT}.onmicrosoft.com/${getWindowEnv().VITE_B2C_RESET_PASSWORD_POLICY}`,
            scope: 'openid',
            redirectUri: getWindowEnv().VITE_RESET_PASSWORD_REDIRECT_URI
        }
    },
    authorityDomain: `${getWindowEnv().VITE_LOGIN_SUBDOMAIN}.cezzis.com`
};

const msalConfig = {
    auth: {
        clientId: getWindowEnv().VITE_B2C_CLIENT_ID,
        redirectUri: getWindowEnv().VITE_REDIRECT_URI,
        authority: b2cPolicies.authorities.signIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false
    },
    system: {
        allowRedirectInIframe: false,
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }

                if (level === LogLevel.Error) {
                    const dontlogEx = getWindowEnv().VITE_NODE_ENV === 'test' && message.includes('Clearing keystore failed with error');

                    if (!dontlogEx) {
                        logger.logException({
                            exception: new Error(`Login failed.  Please check your username and or password. ${message}`),
                            properties: { message }
                        });
                    }
                }
            }
        }
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();
msalInstance.enableAccountStorageEvents();

msalInstance
    .handleRedirectPromise()
    .then(() => {})
    .catch(() => {
        sessionStorage.removeItem('msal.interaction.status');
        return undefined;
    });

msalInstance.addEventCallback(async (event: EventMessage) => {
    const sessionStorageService = new SessionStorageService();

    if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) {
        if ((event.payload as AuthenticationResult).account) {
            const activeAccount = (event.payload as AuthenticationResult).account;
            msalInstance.setActiveAccount(activeAccount);
            idToken = (event.payload as AuthenticationResult).idToken;

            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) {
                if (activeAccount && activeAccount.idTokenClaims && activeAccount.idTokenClaims.sub) {
                    const getProfilePromise = getOwnedAccountProfile(true);
                    const getProfileCocktailRatingsPromise = getAccountCocktailRatings(true);

                    await Promise.all([getProfilePromise, getProfileCocktailRatingsPromise]);
                }
            }
        }
    } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
        sessionStorageService.ClearOwnedAccountProfileRequestData();
        msalInstance.setActiveAccount(null);
        idToken = '';
    }
});

export const getAccessToken = async (requiredScopes: string[] = []): Promise<string | undefined> => {
    const accounts = msalInstance.getAllAccounts();

    if (accounts && accounts.length > 0) {
        const request = {
            scopes: requiredScopes ?? [],
            account: accounts[0]
        };

        const accessToken = await msalInstance
            .acquireTokenSilent(request)
            .then((response) => response.accessToken)
            .catch((error) => {
                logger.logException({
                    error
                });

                if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return msalInstance.acquireTokenPopup({ ...request }).catch((err) => {
                        logger.logException({ error: err });
                    });
                }
                return undefined;
            });

        if (accessToken === undefined) {
            msalInstance.logoutRedirect();
            throw new Error('acquireTokenSilent return undefined!');
        }

        return accessToken as string;
    }

    return undefined;
};

export const resetPassword = async () => {
    await msalInstance
        .loginRedirect({
            authority: b2cPolicies.authorities.passwordReset.authority,
            scopes: [b2cPolicies.authorities.passwordReset.scope],
            redirectUri: b2cPolicies.authorities.passwordReset.redirectUri
        })
        .catch((error) => {
            logger.logException({
                error
            });
        });
};

export const logout = async () => {
    const sessionStorageService = new SessionStorageService();
    sessionStorageService.ClearOwnedAccountProfileRequestData();

    await msalInstance.logoutRedirect({
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        account: msalInstance.getActiveAccount(),
        idTokenHint: idToken
    });
};

export const login = async () => {
    await msalInstance.loginRedirect();
};

export const getSubjectId = (accounts: AccountInfo[]): string | undefined => {
    if (accounts && accounts.length > 0 && accounts[0].idTokenClaims?.sub) {
        return accounts[0].idTokenClaims.sub;
    }

    return undefined;
};

export const getGivenName = (accounts: AccountInfo[]): string => {
    if (accounts && accounts.length > 0 && accounts[0].idTokenClaims) {
        return ((accounts[0].idTokenClaims.given_name ?? '') as string).trim();
    }

    return '';
};

export const getFamilyName = (accounts: AccountInfo[]): string => {
    if (accounts && accounts.length > 0 && accounts[0].idTokenClaims) {
        return ((accounts[0].idTokenClaims.family_name ?? '') as string).trim();
    }

    return '';
};

export const getDisplayName = (accounts: AccountInfo[]): string => `${getGivenName(accounts)} ${getFamilyName(accounts)}`.trim();

export const getInitials = (accounts: AccountInfo[]): string => (`${getGivenName(accounts)} `.substring(0, 1) + `${getFamilyName(accounts)} `.substring(0, 1)).trim();
