import { CocktailModelOutput } from '../api/aisearchApi';
import { CocktailRs, CocktailsApiClient, CocktailIngredientFiltersRs } from '../api/cocktailsApi/cocktailsApiClient';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const getCocktailsSearchResults = async (callBack: (results?: CocktailModelOutput[]) => void, freeText: string, skip: number, take: number): Promise<void> => {
    const localStorageService = new LocalStorageService();
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    // Only caching the initial , unfiltered search results for now
    if (freeText === '' && skip === 0 && take === DEFAULT_TAKE && searchFilters.length === 0) {
        const cached = localStorageService.GetInitialCocktailsSearchData(freeText, skip, take);

        if (cached) {
            callBack(cached);
            return;
        }
    }

    let results: CocktailModelOutput[] = [];

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const rs = await cocktailsApiClient.getCocktailsList(freeText, skip, take, [], false, [], searchFilters, undefined);
        results = rs.items ?? [];

        // Only caching the initial , unfiltered search results for now
        if (results && results.length > 0 && freeText === '' && skip === 0 && take === DEFAULT_TAKE && searchFilters.length === 0) {
            localStorageService.SetInitialCocktailsSearchData(results, freeText, skip, take);
        }

        callBack(results);
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktails search results', e as Error);
        throw e;
    }
};

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

export { getCocktailsSearchResults, getCocktail, getCocktailsSearchFilters, DEFAULT_TAKE };
