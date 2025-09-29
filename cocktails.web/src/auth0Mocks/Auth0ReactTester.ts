import {
    Auth0Client,
    GetTokenSilentlyVerboseResponse,
    GetTokenWithPopupOptions,
    LogoutOptions,
    PopupConfigOptions,
    PopupLoginOptions,
    GetTokenSilentlyOptions as Auth0GetTokenSilentlyOptions,
    TokenEndpointResponse,
    User,
    AuthenticationError,
    RedirectLoginOptions,
    GetTokenSilentlyOptions
} from '@auth0/auth0-spa-js';
import { Auth0ReactTesterPlugin, ITestRunner } from './Auth0ReactTesterPlugin';
import { defaultTestUser, defaultTestAuthError, defaultTestAuthenticationResult } from './testerConstants';
/**
 * Auth0-react tester. Useful to test your components requiring to be logged in, using auth0-react
 * @example
 *
 */
class Auth0ReactTester {
    private handleRedirectSpy: any;

    private loginRedirectSpy: any;

    private loginPopupSpy: any;

    private logoutPopupSpy: any;

    private logoutRedirectSpy: any;

    private testUser: User;

    private testAuthenticationResult: GetTokenSilentlyVerboseResponse;

    private testRunner: ITestRunner;

    client: Auth0Client;

    user: User | undefined = undefined;

    error: AuthenticationError | undefined = undefined;

    /**
     * Create a new mock Auth0Client instance
     * @param testUser test user you want to use. A default is created if null
     * @param testAuthenticationResult test authentication result you want to use. A default is created if null
     * @param testAuthError test authentication error you want to use. A default is created if null
     */
    constructor(
        public interationType: 'Redirect' | 'Popup' = 'Redirect',
        testUser: User = defaultTestUser,
        testAuthenticationResult: GetTokenSilentlyVerboseResponse = defaultTestAuthenticationResult,
        testAuthError: AuthenticationError = defaultTestAuthError
    ) {
        this.testRunner = Auth0ReactTesterPlugin.TestRunner;
        this.testUser = testUser;
        this.testAuthenticationResult = testAuthenticationResult;

        this.error = testAuthError;
        this.client = Auth0ReactTester.GetNewClient(testUser, testAuthenticationResult);
    }

    async actAwait(interval?: number): Promise<void> {
        const awaiter = (interval?: number): Promise<void> => new Promise((r, s) => setTimeout(r, interval));
        await awaiter(interval);
    }

    /**
     * Initialize the IPublicClientApplication with an active account.
     */
    async isLogged() {
        this.user = this.testUser;
        // ensuring that render (that should come right after) will not be too fast
        // and raise an error with act() => ....
        await this.actAwait(1);
    }

    /**
     * Initialize the IPublicClientApplication with no active account
     */
    async isNotLogged() {
        this.user = undefined;
        // ensuring that render (that should come right after) will not be too fast
        // and raise an error with act() => ....
        await this.actAwait(1);
    }

    /**
     * Reset all spy / mocks. Should be used in `afterEach` call:
     *
     *  @example
     *  afterEach(() => {
     *   auth0Tester.resetSpyAuth0();
     * });
     */
    resetSpyAuth0() {
        this.testRunner.resetAllMocks();
        this.user = undefined;
    }

    /**
     * Wait for the Auth0 login process to complete.
     * This expects handleRedirectCallback to be called as part of the authentication flow.
     */
    async waitForLogin() {
        // First, we need to trigger the handleRedirectCallback since Auth0 would call this after login
        if (this.handleRedirectSpy) {
            await this.handleRedirectSpy();
        }
        
        await this.testRunner.waitingFor(() => this.testRunner.expect(this.handleRedirectSpy).toHaveBeenCalledTimes(1));
        if (this.interationType === 'Redirect') await this.testRunner.waitingFor(() => this.testRunner.expect(this.loginRedirectSpy).toHaveBeenCalledTimes(1));
        else await this.testRunner.waitingFor(() => this.testRunner.expect(this.loginPopupSpy).toHaveBeenCalledTimes(1));
    }

    /**
     * Wait for the Auth0 redirect process to complete.
     * This expects handleRedirectCallback to be called as part of the redirect flow.
     */
    async waitForRedirect() {
        // First, we need to trigger the handleRedirectCallback since Auth0 would call this after redirect
        if (this.handleRedirectSpy) {
            await this.handleRedirectSpy();
        }
        
        await this.testRunner.waitingFor(() => this.testRunner.expect(this.handleRedirectSpy).toHaveBeenCalledTimes(1));
    }    /**
     * Wait for logout process to be done
     */
    async waitForLogout() {
        await this.testRunner.waitingFor(() => this.testRunner.expect(this.logoutRedirectSpy).toHaveBeenCalledTimes(1));
    }

    /**
	* Spy and Mocks required Auth0 things. Should be used in `beforeEach` call:
	* 
	*  @example
	*    let auth0Tester: Auth0ReactTester;
		 beforeEach(() => {
		   // new instance of auth0 tester for each test
		   auth0Tester = new Auth0ReactTester();
		   // spy all required auth0 things
		   auth0Tester.spyAuth0();
		 });
	* });
	*/
    spyAuth0() {
        // Auth0 uses handleRedirectCallback instead of handleRedirectPromise
        this.handleRedirectSpy = this.testRunner.spyOn(this.client, 'handleRedirectCallback').mockImplementation(() => Promise.resolve({ appState: undefined }));

        // Spy on loginWithRedirect (Auth0 method name)
        this.loginRedirectSpy = this.testRunner.spyOn(this.client, 'loginWithRedirect').mockImplementation(async (options?: any) => {
            // Set user as logged in
            this.user = this.testUser;
            return Promise.resolve();
        });

        // Spy on loginWithPopup (Auth0 method name)
        this.loginPopupSpy = this.testRunner.spyOn(this.client, 'loginWithPopup').mockImplementation(async (options?: any, config?: any) => {
            // Set user as logged in
            this.user = this.testUser;
            return Promise.resolve();
        });

        // Spy on logout
        this.logoutRedirectSpy = this.testRunner.spyOn(this.client, 'logout').mockImplementation(async (options?: any) => {
            // Clear user
            this.user = undefined;
            return Promise.resolve();
        });

        // Note: Auth0 only has one logout method, so we'll use the same spy for both redirect and popup
        this.logoutPopupSpy = this.logoutRedirectSpy;

        // Spy on getUser to return our test user or undefined based on login state
        this.testRunner.spyOn(this.client, 'getUser').mockImplementation(() => Promise.resolve(this.user as any));

        // Spy on isAuthenticated to return based on whether user is set
        this.testRunner.spyOn(this.client, 'isAuthenticated').mockImplementation(() => Promise.resolve(!!this.user));

        // Spy on getTokenSilently
        this.testRunner.spyOn(this.client, 'getTokenSilently').mockImplementation((options?: any) => {
            if (options?.detailedResponse === true) {
                return Promise.resolve(this.testAuthenticationResult);
            }
            return Promise.resolve(this.testAuthenticationResult.access_token);
        });

        // Spy on getTokenWithPopup
        this.testRunner.spyOn(this.client, 'getTokenWithPopup').mockImplementation(() => Promise.resolve(this.testAuthenticationResult.access_token));

        // Spy on getIdTokenClaims
        this.testRunner
            .spyOn(this.client, 'getIdTokenClaims')
            .mockImplementation(() => Promise.resolve(this.testAuthenticationResult.id_token ? JSON.parse(atob(this.testAuthenticationResult.id_token.split('.')[1])) : undefined));
    }

    generateFailure() {
        if (this.interationType === 'Redirect') {
            if (this.loginRedirectSpy) this.loginRedirectSpy.mockClear();

            this.loginRedirectSpy = this.testRunner.spyOn(this.client, 'loginWithRedirect').mockImplementation(async (options?: any) => {
                // Simulate login failure by throwing an error
                throw this.error || new Error('Login failed');
            });
        } else {
            if (this.loginPopupSpy) this.loginPopupSpy.mockClear();

            this.loginPopupSpy = this.testRunner.spyOn(this.client, 'loginWithPopup').mockImplementation(async (options?: any, config?: any) => {
                // Simulate login failure by throwing an error
                throw this.error || new Error('Login failed');
            });
        }
    }

    static GetNewClient = (testUser: User, getTokenResponset: GetTokenSilentlyVerboseResponse): Auth0Client =>
        ({
            // Core authentication methods
            loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise.resolve(),
            loginWithRedirect: <TAppState = any>(options?: RedirectLoginOptions<TAppState>) => Promise.resolve(),
            handleRedirectCallback: <TAppState = any>(url?: string) => Promise.resolve({ appState: undefined as unknown as TAppState }),
            logout: (options?: LogoutOptions | undefined) => Promise.resolve(),

            // User and token methods
            getUser: <TUser extends User>() => Promise.resolve(testUser as TUser | undefined),
            getIdTokenClaims: () => Promise.resolve(undefined),
            getTokenWithPopup: (options?: GetTokenWithPopupOptions, config?: PopupConfigOptions) => Promise.resolve(getTokenResponset.access_token),

            // Handle both overloads of getTokenSilently
            getTokenSilently: ((options?: Auth0GetTokenSilentlyOptions & { detailedResponse?: boolean }) => {
                if (options?.detailedResponse === true) {
                    return Promise.resolve(getTokenResponset);
                }
                return Promise.resolve(getTokenResponset.access_token);
            }) as Auth0Client['getTokenSilently'],

            // Authentication state
            isAuthenticated: () => Promise.resolve(!!testUser),
            checkSession: (options?: GetTokenSilentlyOptions) => Promise.resolve(),

            // Token exchange (for advanced scenarios)
            exchangeToken: (options: any): Promise<TokenEndpointResponse> =>
                Promise.resolve({
                    access_token: getTokenResponset.access_token,
                    id_token: getTokenResponset.id_token || '',
                    token_type: 'Bearer',
                    expires_in: 3600
                }),

            // DPoP methods (for advanced security features)
            getDpopNonce: (id?: string) => Promise.resolve(undefined),
            setDpopNonce: (nonce: string, id?: string) => Promise.resolve(),
            generateDpopProof: (params: any) => Promise.resolve('mock-dpop-proof'),

            // Fetcher creation
            createFetcher: (config?: any) => ({
                fetchWithAuth: (url: string, options?: RequestInit) => fetch(url, options)
            })
        }) as Auth0Client;
}

export default Auth0ReactTester;
