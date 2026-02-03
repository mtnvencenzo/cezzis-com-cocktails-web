import {
    AccountCocktailRatingsRs,
    AccountOwnedProfileRs,
    ChangeAccountOwnedEmailRq,
    ChangeAccountOwnedPasswordRq,
    ChangeAccountOwnedUsernameRq,
    Configuration,
    ManageFavoriteCocktailsRq,
    ProblemDetails,
    RateCocktailRq,
    RateCocktailRs,
    UpdateAccountOwnedAccessibilitySettingsRq,
    UpdateAccountOwnedNotificationSettingsRq,
    UpdateAccountOwnedProfileRq,
    UploadProfileImageRs,
    AccountsApi
} from '../api/accountsApi';
import { createAuthMiddleware, AccountScopes } from '../api/accountsApi/accountsApiMiddleware';
import { getWindowEnv } from '../utils/envConfig';
import LocalStorageService from './LocalStorageService';
import SessionStorageService from './SessionStorageService';

const getErrorMessage = (e: unknown): string => {
    const apiError = e as ProblemDetails;

    if (apiError?.detail) {
        return apiError.detail;
    }

    if (apiError?.errors) {
        const firstKey = Object.keys(apiError.errors)[0];
        if (firstKey && apiError.errors[firstKey]?.length > 0) {
            return apiError.errors[firstKey][0];
        }
    }

    if (apiError?.title) {
        return apiError.title;
    }

    return 'unknown error';
};

const createAccountsApiClient = (scopes: string[]): AccountsApi => {
    const config = new Configuration({
        basePath: getWindowEnv().VITE_ACCOUNTS_API_URL,
        middleware: [createAuthMiddleware(scopes)]
    });
    return new AccountsApi(config);
};

const getOwnedAccountProfile = async (reload: boolean = false): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    if (!reload) {
        const cached = sessionStorageService.GetOwnedAccountProfileRequestData();

        if (cached) {
            return cached;
        }
    }

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read]);
        const results = await accountsApiClient.getV1AccountsOwnedProfile({
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const loginOwnedAccountProfile = async (): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.postV1AccountsOwnedProfile({
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const uploadProfileImage = async (file: File): Promise<UploadProfileImageRs | undefined> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const result = await accountsApiClient.postV1AccountsOwnedProfileImage({
            file,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });
        return result as UploadProfileImageRs;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountProfile = async (request: UpdateAccountOwnedProfileRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.putV1AccountsOwnedProfile({
            UpdateAccountOwnedProfileRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const changeOwnedAccountProfileEmail = async (request: ChangeAccountOwnedEmailRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.putV1AccountsOwnedProfileEmail({
            ChangeAccountOwnedEmailRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const changeOwnedAccountProfileUsername = async (request: ChangeAccountOwnedUsernameRq): Promise<void> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        await accountsApiClient.putV1AccountsOwnedProfileUsername({
            ChangeAccountOwnedUsernameRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const changeOwnedAccountProfilePassword = async (request: ChangeAccountOwnedPasswordRq): Promise<void> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        await accountsApiClient.putV1AccountsOwnedProfilePassword({
            ChangeAccountOwnedPasswordRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountAccessibilitySettings = async (request: UpdateAccountOwnedAccessibilitySettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.putV1AccountsOwnedProfileAccessibility({
            UpdateAccountOwnedAccessibilitySettingsRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const manageOwnedAccountFavoriteCocktails = async (request: ManageFavoriteCocktailsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.putV1AccountsOwnedProfileCocktailsFavorites({
            ManageFavoriteCocktailsRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const getAccountCocktailRatings = async (reload: boolean = false): Promise<AccountCocktailRatingsRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    if (!reload) {
        const cached = sessionStorageService.GetOwnedAccountCocktailRatingsRequestData();

        if (cached) {
            return cached;
        }
    }

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read]);
        const results = await accountsApiClient.getV1AccountsOwnedProfileCocktailsRatings({
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const rateCocktail = async (request: RateCocktailRq): Promise<RateCocktailRs | undefined> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const rs = await accountsApiClient.postV1AccountsOwnedProfileCocktailsRatings({
            RateCocktailRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        // reload the account cocktail ratings
        await getAccountCocktailRatings(true);

        // Clearing out list data so we can refresh
        // the data with whatever the new ratings are
        const localStorageService = new LocalStorageService();
        localStorageService.ClearAllCocktailCaches();
        return rs as RateCocktailRs;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const sendRecommendation = async (name: string, ingredients: string, directions: string, token: string): Promise<void> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);

        await accountsApiClient.postV1AccountsOwnedProfileCocktailsRecommendations({
            CocktailRecommendationRq: {
                recommendation: {
                    name,
                    ingredients,
                    directions
                },
                verificationCode: token
            },
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountNotificationsSettings = async (request: UpdateAccountOwnedNotificationSettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.putV1AccountsOwnedProfileNotifications({
            UpdateAccountOwnedNotificationSettingsRq: request,
            X_Key: getWindowEnv().VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY
        });

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

export {
    getOwnedAccountProfile,
    loginOwnedAccountProfile,
    uploadProfileImage,
    updateOwnedAccountProfile,
    changeOwnedAccountProfileEmail,
    updateOwnedAccountAccessibilitySettings,
    manageOwnedAccountFavoriteCocktails,
    rateCocktail,
    getAccountCocktailRatings,
    sendRecommendation,
    updateOwnedAccountNotificationsSettings,
    changeOwnedAccountProfilePassword,
    changeOwnedAccountProfileUsername
};
