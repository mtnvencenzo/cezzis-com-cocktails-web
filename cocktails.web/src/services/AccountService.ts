import {
    AccountCocktailRatingsRs,
    AccountOwnedProfileRs,
    ChangeAccountOwnedPasswordRq,
    CocktailsApiClient,
    ManageFavoriteCocktailsRq,
    ProblemDetails,
    RateCocktailRq,
    RateCocktailRs,
    UpdateAccountOwnedAccessibilitySettingsRq,
    UpdateAccountOwnedNotificationSettingsRq,
    UpdateAccountOwnedProfileEmailRq,
    UpdateAccountOwnedProfileRq,
    UploadProfileImageRs
} from '../api/cocktailsApi/cocktailsApiClient';
import LocalStorageService from './LocalStorageService';
import SessionStorageService from './SessionStorageService';

const accountReadScope = `read:owned-account`;
const accountWriteScope = `write:owned-account`;

const getOwnedAccountProfile = async (reload: boolean = false): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    if (!reload) {
        const cached = sessionStorageService.GetOwnedAccountProfileRequestData();

        if (cached) {
            return cached;
        }
    }

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope]);
        const results = await cocktailsApiClient.loginAccountOwnedProfile(undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const loginOwnedAccountProfile = async (): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.loginAccountOwnedProfile(undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const uploadProfileImage = async (blob: Blob, fileName: string): Promise<UploadProfileImageRs | undefined> => {
    let result: UploadProfileImageRs | undefined;

    try {
        const formData = new FormData();
        formData.append('file', blob, fileName);

        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        result = await cocktailsApiClient.customUploadProfileImage(formData);
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }

    return result;
};

const updateOwnedAccountProfile = async (request: UpdateAccountOwnedProfileRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.updateAccountOwnedProfile(request, undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const updateOwnedAccountProfileEmail = async (request: UpdateAccountOwnedProfileEmailRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.updateAccountOwnedProfileEmail(request, undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const changeOwnedAccountProfilePassword = async (request: ChangeAccountOwnedPasswordRq): Promise<void> => {
    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        await cocktailsApiClient.changeAccountOwnedPassword(request, undefined);
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const updateOwnedAccountAccessibilitySettings = async (request: UpdateAccountOwnedAccessibilitySettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.updateAccountOwnedAccessibilitySettings(request, undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const manageOwnedAccountFavoriteCocktails = async (request: ManageFavoriteCocktailsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.manageFavoriteCocktails(request, undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
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
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope]);
        const results = await cocktailsApiClient.getCocktailRatings(undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const rateCocktail = async (request: RateCocktailRq): Promise<RateCocktailRs | undefined> => {
    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const rs = await cocktailsApiClient.rateCocktail(request, undefined);

        // reload the account cocktail ratings
        await getAccountCocktailRatings(true);

        // Clearing out list data so we can refresh
        // the data with whatever the new ratings are
        const localStorageService = new LocalStorageService();
        localStorageService.ClearAllCocktailCaches();
        return rs;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

const sendRecommendation = async (name: string, ingredients: string, directions: string, token: string): Promise<void> => {
    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);

        await cocktailsApiClient.sendCocktailRecommendation(
            {
                recommendation: {
                    name,
                    ingredients,
                    directions
                },
                verificationCode: token
            },
            undefined
        );
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);

        throw error;
    }
};

const updateOwnedAccountNotificationsSettings = async (request: UpdateAccountOwnedNotificationSettingsRq): Promise<AccountOwnedProfileRs | undefined> => {
    const sessionStorageService = new SessionStorageService();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        cocktailsApiClient.setRequiredScopes([accountReadScope, accountWriteScope]);
        const results = await cocktailsApiClient.updateAccountOwnedNotificationSettings(request, undefined);

        if (results) {
            sessionStorageService.SetOwnedAccountProfileRequestData(results);
        }

        return results;
    } catch (e: unknown) {
        const apiError: ProblemDetails = e as ProblemDetails;
        const errorMessage = apiError?.errors?.length > 0 ? apiError.errors[0] : 'unknown error';
        const error = new Error(errorMessage);
        throw error;
    }
};

export {
    getOwnedAccountProfile,
    loginOwnedAccountProfile,
    uploadProfileImage,
    updateOwnedAccountProfile,
    updateOwnedAccountProfileEmail,
    updateOwnedAccountAccessibilitySettings,
    manageOwnedAccountFavoriteCocktails,
    rateCocktail,
    getAccountCocktailRatings,
    sendRecommendation,
    updateOwnedAccountNotificationsSettings,
    changeOwnedAccountProfilePassword
};
