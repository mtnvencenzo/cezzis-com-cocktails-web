import { CocktailRs, CocktailIngredientFiltersRs, Configuration, CocktailsApi } from '../api/cocktailsApi';
import { getWindowEnv } from '../utils/envConfig';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const getCocktail = async (id: string): Promise<CocktailRs | undefined> => {
    let result: CocktailRs | undefined;

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_COCKTAILS_API_URL
        });

        const cocktailsApiClient = new CocktailsApi(config);
        result = await cocktailsApiClient.getCocktail(
            {
                id,
                X_Key: getWindowEnv().VITE_COCKTAILS_API_SUBSCRIPTION_KEY
            },
            undefined
        );
        return result;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail', e as Error);
        throw e;
    }
};

const getCocktailsSearchFilters = async (): Promise<CocktailIngredientFiltersRs | undefined> => {
    const localStorageService = new LocalStorageService();
    const cached = localStorageService.GetCocktailsSearchFilters();

    if (cached) {
        return cached;
    }

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_COCKTAILS_API_URL
        });

        const cocktailsApiClient = new CocktailsApi(config);
        const results = await cocktailsApiClient.getCocktailIngredientFilters({
            X_Key: getWindowEnv().VITE_COCKTAILS_API_SUBSCRIPTION_KEY
        });

        if (results) {
            localStorageService.SetCocktailsSearchFilters(results);
        }

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail search filters', e as Error);
        throw e;
    }
};

export { getCocktail, getCocktailsSearchFilters };
