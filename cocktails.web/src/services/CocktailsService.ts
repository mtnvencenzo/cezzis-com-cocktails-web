import { CocktailRs, CocktailsApiClient, CocktailIngredientFiltersRs } from '../api/cocktailsApi/cocktailsApiClient';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const DEFAULT_TAKE: number = 10;

const getCocktail = async (id: string): Promise<CocktailRs | undefined> => {
    let result: CocktailRs | undefined;

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        result = await cocktailsApiClient.getCocktail(id, undefined);
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
        const cocktailsApiClient = new CocktailsApiClient();
        const results = await cocktailsApiClient.getCocktailIngredientFilters(undefined);

        if (results) {
            localStorageService.SetCocktailsSearchFilters(results);
        }

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail search filters', e as Error);
        throw e;
    }
};

export { getCocktail, getCocktailsSearchFilters, DEFAULT_TAKE };
