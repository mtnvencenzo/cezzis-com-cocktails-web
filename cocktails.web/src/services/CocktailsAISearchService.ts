import { Configuration, DefaultApi, SearchV1CocktailsSearchGetRequest } from '../api/aisearchApi';
import { CocktailsSearchRs, CocktailModelOutput } from '../api/aisearchApi/models';
import { getWindowEnv } from '../utils/envConfig';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const searchCocktails = async (freeText: string, skip: number, take: number): Promise<CocktailsSearchRs | undefined> => {
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const requestParameters: SearchV1CocktailsSearchGetRequest = {
            freetext: freeText,
            skip,
            take,
            inc: undefined,
            fi: searchFilters,
            m: undefined, // must send null for not taking matches into account, empty string would result in empty list
            m_ex: false
        };

        const cocktailsApiClient = new DefaultApi(config);
        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to search cocktails', e as Error);
        throw e;
    }
};

const getCocktailsList = async (skip: number, take: number): Promise<CocktailsSearchRs | undefined> => {
    const localStorageService = new LocalStorageService();
    const cached = localStorageService.GetCocktailListRequestData(skip, take);
    const matches: string[] | undefined = undefined; // must send null for not taking matches into account, empty string would result in empty list

    if (cached) {
        return cached;
    }

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches,
            m_ex: false
        };

        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);

        if (results) {
            localStorageService.SetCocktailListRequestData(results, skip, take);
        }

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail list', e as Error);
        throw e;
    }
};

const getCocktailFavorites = async (skip: number, take: number, matches: string[] | undefined, matchExclusive: boolean = false): Promise<CocktailsSearchRs | undefined> => {
    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches ?? [],
            m_ex: matchExclusive
        };

        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);
        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail favorites', e as Error);
        throw e;
    }
};

const getCocktailsWithRatings = async (skip: number, take: number, matches: string[] | undefined, matchExclusive: boolean = false): Promise<CocktailsSearchRs | undefined> => {
    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches ?? [],
            m_ex: matchExclusive
        };

        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);
        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktails with ratings', e as Error);
        throw e;
    }
};

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
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: freeText,
            skip,
            take,
            fi: []
        };

        const rs = await cocktailsApiClient.typeaheadV1CocktailsTypeaheadGet(requestParameters);
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

export { getCocktailsSearchResults, searchCocktails, getCocktailsList, getCocktailFavorites, getCocktailsWithRatings, DEFAULT_TAKE };
