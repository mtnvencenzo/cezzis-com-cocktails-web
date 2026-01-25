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
        const results = await accountsApiClient.loginAccountOwnedProfileV1AccountsOwnedProfilePost();

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
        const results = await accountsApiClient.loginAccountOwnedProfileV1AccountsOwnedProfilePost();

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const uploadProfileImage = async (blob: Blob): Promise<UploadProfileImageRs | undefined> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const result = await accountsApiClient.uploadProfileImageV1AccountsOwnedProfileImagePost({ file: blob });
        return result as UploadProfileImageRs;
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountProfile = async (request: UpdateAccountOwnedProfileRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.updateAccountOwnedProfileV1AccountsOwnedProfilePut({ UpdateAccountOwnedProfileRq: request });

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
        const results = await accountsApiClient.changeAccountOwnedEmailV1AccountsOwnedProfileEmailPut({ ChangeAccountOwnedEmailRq: request });

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
        await accountsApiClient.changeAccountOwnedUsernameV1AccountsOwnedProfileUsernamePut({ ChangeAccountOwnedUsernameRq: request });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const changeOwnedAccountProfilePassword = async (request: ChangeAccountOwnedPasswordRq): Promise<void> => {
    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        await accountsApiClient.changeAccountOwnedPasswordV1AccountsOwnedProfilePasswordPut({ ChangeAccountOwnedPasswordRq: request });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountAccessibilitySettings = async (request: UpdateAccountOwnedAccessibilitySettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.updateAccountOwnedAccessibilitySettingsV1AccountsOwnedProfileAccessibilityPut({ UpdateAccountOwnedAccessibilitySettingsRq: request });

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
        const results = await accountsApiClient.manageFavoriteCocktailsV1AccountsOwnedProfileCocktailsFavoritesPut({ ManageFavoriteCocktailsRq: request });

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
        const results = await accountsApiClient.getCocktailRatingsV1AccountsOwnedProfileCocktailsRatingsGet();

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
        const rs = await accountsApiClient.rateCocktailV1AccountsOwnedProfileCocktailsRatingsPost({ RateCocktailRq: request });

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

        await accountsApiClient.sendCocktailRecommendationV1AccountsOwnedProfileCocktailsRecommendationsPost({
            CocktailRecommendationRq: {
                recommendation: {
                    name,
                    ingredients,
                    directions
                },
                verificationCode: token
            }
        });
    } catch (e: unknown) {
        throw new Error(getErrorMessage(e));
    }
};

const updateOwnedAccountNotificationsSettings = async (request: UpdateAccountOwnedNotificationSettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const accountsApiClient = createAccountsApiClient([AccountScopes.read, AccountScopes.write]);
        const results = await accountsApiClient.updateAccountOwnedNotificationSettingsV1AccountsOwnedProfileNotificationsPut({ UpdateAccountOwnedNotificationSettingsRq: request });

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
