import { CocktailRs, CocktailsApiClient, CocktailsListRs, CocktailIngredientFiltersRs, CocktailDataIncludeModel, CocktailsListModel } from '../api/cocktailsApi/cocktailsApiClient';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const getCocktailsSearchResults = async (callBack: (results?: CocktailsListModel[]) => void, freeText: string, skip: number, take: number): Promise<void> => {
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

    let results: CocktailsListModel[] = [];

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const rs = await cocktailsApiClient.getCocktailsList(freeText, skip, take, [], false, [], searchFilters, undefined);
        results = rs.items ?? [];

        // Only caching the initial , unfiltered search results for now
        if (results && results.length > 0 && freeText === '' && skip === 0 && take === DEFAULT_TAKE && searchFilters.length === 0) {
            localStorageService.SetInitialCocktailsSearchData(results, freeText, skip, take);
        }
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
        results = [];
    }

    callBack(results);
};

const getCocktail = async (id: string): Promise<CocktailRs | undefined> => {
    let result: CocktailRs | undefined;

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        result = await cocktailsApiClient.getCocktail(id, undefined);
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
    }

    return result;
};

const getCocktailsList = async (skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): Promise<CocktailsListRs | undefined> => {
    const localStorageService = new LocalStorageService();
    const cached = localStorageService.GetCocktailListRequestData(skip, take, include);
    const matches: string[] | undefined = undefined; // must send null for not taking matches into account, empty string would result in empty list

    if (cached) {
        return cached;
    }

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const results = await cocktailsApiClient.getCocktailsList('', skip, take, matches, false, include, [], undefined);

        if (results) {
            localStorageService.SetCocktailListRequestData(results, skip, take, include);
        }

        return results;
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
    }

    return undefined;
};

const getCocktailFavorites = async (
    skip: number,
    take: number,
    include: CocktailDataIncludeModel[] | undefined,
    matches: string[] | undefined,
    matchExclusive: boolean = false
): Promise<CocktailsListRs | undefined> => {
    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const results = await cocktailsApiClient.getCocktailsList('', skip, take, matches ?? [], matchExclusive, include, [], undefined);
        return results;
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
    }

    return undefined;
};

const getCocktailsWithRatings = async (
    skip: number,
    take: number,
    include: CocktailDataIncludeModel[] | undefined,
    matches: string[] | undefined,
    matchExclusive: boolean = false
): Promise<CocktailsListRs | undefined> => {
    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const results = await cocktailsApiClient.getCocktailsList('', skip, take, matches ?? [], matchExclusive, include, [], undefined);
        return results;
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
    }

    return undefined;
};

const searchCocktails = async (freeText: string, skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): Promise<CocktailsListRs | undefined> => {
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    try {
        const cocktailsApiClient = new CocktailsApiClient();
        const results = await cocktailsApiClient.getCocktailsList(freeText, skip, take, [], false, include, searchFilters, undefined);

        return results;
    } catch (e: unknown) {
        logger.logException({ exception: e as Error });
    }

    return undefined;
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
        logger.logException({ exception: e as Error });
    }

    return undefined;
};

export { getCocktailsSearchResults, getCocktail, getCocktailsList, searchCocktails, getCocktailsSearchFilters, getCocktailFavorites, getCocktailsWithRatings, DEFAULT_TAKE };
