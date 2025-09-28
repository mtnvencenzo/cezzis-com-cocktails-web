export { default as Auth0Provider } from './auth0-provider';
export type { Auth0ProviderOptions, AppState } from './auth0-provider';
export { default as useAuth0 } from './use-auth0';
export { default as withAuth0 } from './with-auth0';
export type { WithAuth0Props } from './with-auth0';
export { default as withAuthenticationRequired } from './with-authentication-required';
export type { WithAuthenticationRequiredOptions } from './with-authentication-required';
export { default as Auth0Context, initialContext } from './auth0-context';
export { default as Auth0AuthenticationGuard } from './auth0-authentication-guard';
export type { Auth0ContextInterface, LogoutOptions, RedirectLoginOptions } from './auth0-context';
export {
    User,
    InMemoryCache,
    LocalStorageCache,
    TimeoutError,
    MfaRequiredError,
    PopupCancelledError,
    PopupTimeoutError,
    AuthenticationError,
    MissingRefreshTokenError,
    GenericError,
    UseDpopNonceError,
    type FetcherConfig
} from '@auth0/auth0-spa-js';
export type {
    AuthorizationParams,
    PopupLoginOptions,
    PopupConfigOptions,
    GetTokenWithPopupOptions,
    LogoutUrlOptions,
    CacheLocation,
    GetTokenSilentlyOptions,
    IdToken,
    ICache,
    Cacheable
} from '@auth0/auth0-spa-js';
export { OAuthError } from './errors';
