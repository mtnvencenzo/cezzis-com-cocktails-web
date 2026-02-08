import { Configuration, GetV1CocktailsSearchRequest, GetV1CocktailsTypeaheadRequest, SemanticSearchApi } from '../api/aisearchApi';
import { CocktailSearchModel, CocktailsSearchRs } from '../api/aisearchApi/models';
import { getWindowEnv } from '../utils/envConfig';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const searchCocktails = async (freeText: string, skip: number, take: number): Promise<CocktailsSearchRs | undefined> => {
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    try {
        const requestParameters: GetV1CocktailsSearchRequest = {
            freetext: freeText,
            skip,
            take,
            inc: undefined,
            fi: searchFilters,
            m: undefined, // must send null for not taking matches into account, empty string would result in empty list
            m_ex: false,
            X_Key: getWindowEnv().VITE_AISEARCH_APIM_SUBSCRIPTION_KEY
        };

        const aisearchApiClient = new SemanticSearchApi(
            new Configuration({
                basePath: getWindowEnv().VITE_AISEARCH_API_URL
            })
        );

        const results = await aisearchApiClient.getV1CocktailsSearch(requestParameters);

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
        const aisearchApiClient = new SemanticSearchApi(
            new Configuration({
                basePath: getWindowEnv().VITE_AISEARCH_API_URL
            })
        );

        const requestParameters: GetV1CocktailsSearchRequest = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches,
            m_ex: false,
            X_Key: getWindowEnv().VITE_AISEARCH_APIM_SUBSCRIPTION_KEY
        };

        const results = await aisearchApiClient.getV1CocktailsSearch(requestParameters);

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
        const aisearchApiClient = new SemanticSearchApi(
            new Configuration({
                basePath: getWindowEnv().VITE_AISEARCH_API_URL
            })
        );

        const requestParameters: GetV1CocktailsSearchRequest = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches ?? [],
            m_ex: matchExclusive,
            X_Key: getWindowEnv().VITE_AISEARCH_APIM_SUBSCRIPTION_KEY
        };

        const results = await aisearchApiClient.getV1CocktailsSearch(requestParameters);
        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail favorites', e as Error);
        throw e;
    }
};

const getCocktailsWithRatings = async (skip: number, take: number, matches: string[] | undefined, matchExclusive: boolean = false): Promise<CocktailsSearchRs | undefined> => {
    try {
        const aisearchApiClient = new SemanticSearchApi(
            new Configuration({
                basePath: getWindowEnv().VITE_AISEARCH_API_URL
            })
        );

        const requestParameters: GetV1CocktailsSearchRequest = {
            freetext: '',
            skip,
            take,
            inc: undefined,
            fi: [],
            m: matches ?? [],
            m_ex: matchExclusive,
            X_Key: getWindowEnv().VITE_AISEARCH_APIM_SUBSCRIPTION_KEY
        };

        const results = await aisearchApiClient.getV1CocktailsSearch(requestParameters);
        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktails with ratings', e as Error);
        throw e;
    }
};

const getCocktailsSearchResults = async (callBack: (results?: CocktailSearchModel[]) => void, freeText: string, skip: number, take: number): Promise<void> => {
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

    let results: CocktailSearchModel[] = [];

    try {
        const aisearchApiClient = new SemanticSearchApi(
            new Configuration({
                basePath: getWindowEnv().VITE_AISEARCH_API_URL
            })
        );

        const requestParameters: GetV1CocktailsTypeaheadRequest = {
            freetext: freeText,
            skip,
            take,
            fi: [],
            X_Key: getWindowEnv().VITE_AISEARCH_APIM_SUBSCRIPTION_KEY
        };

        const rs = await aisearchApiClient.getV1CocktailsTypeahead(requestParameters);
        results = rs.items ?? [];

        // Only caching the initial , unfiltered search results for now
        if (results && results.length > 0 && freeText === '' && skip === 0 && take === DEFAULT_TAKE && searchFilters.length === 0) {
            localStorageService.SetInitialCocktailsSearchData(results, freeText, skip, take);
        }

        callBack(results);
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktails search results', e as Error);
        // For typeahead/search, we gracefully handle errors by returning empty results
        // rather than propagating the error to the UI component
        callBack([]);
    }
};

export { getCocktailsSearchResults, searchCocktails, getCocktailsList, getCocktailFavorites, getCocktailsWithRatings, DEFAULT_TAKE };
