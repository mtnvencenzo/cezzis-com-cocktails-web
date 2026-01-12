import { Configuration, DefaultApi, SearchV1CocktailsSearchGetRequest } from '../api/aisearchApi';
import { CocktailsSearchRs, CocktailDataIncludeModel } from '../api/aisearchApi/models';
import { getWindowEnv } from '../utils/envConfig';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import LocalStorageService from './LocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const searchCocktails = async (freeText: string, skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): Promise<CocktailsSearchRs | undefined> => {
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const requestParameters: SearchV1CocktailsSearchGetRequest = {
            freetext: freeText,
            skip,
            take,
            inc: include,
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

const getCocktailsList = async (skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): Promise<CocktailsSearchRs | undefined> => {
    const localStorageService = new LocalStorageService();
    const cached = localStorageService.GetCocktailListRequestData(skip, take, include);
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
            inc: include,
            fi: [],
            m: matches,
            m_ex: false
        };

        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);

        if (results) {
            localStorageService.SetCocktailListRequestData(results, skip, take, include);
        }

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to retrieve cocktail list', e as Error);
        throw e;
    }
};

const getCocktailFavorites = async (
    skip: number,
    take: number,
    include: CocktailDataIncludeModel[] | undefined,
    matches: string[] | undefined,
    matchExclusive: boolean = false
): Promise<CocktailsSearchRs | undefined> => {
    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: '',
            skip,
            take,
            inc: include,
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

const getCocktailsWithRatings = async (
    skip: number,
    take: number,
    include: CocktailDataIncludeModel[] | undefined,
    matches: string[] | undefined,
    matchExclusive: boolean = false
): Promise<CocktailsSearchRs | undefined> => {
    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const cocktailsApiClient = new DefaultApi(config);

        const requestParameters = {
            freetext: '',
            skip,
            take,
            inc: include,
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

export { searchCocktails, getCocktailsList, getCocktailFavorites, getCocktailsWithRatings, DEFAULT_TAKE };
