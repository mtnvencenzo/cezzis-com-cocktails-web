import { Configuration, DefaultApi } from '../api/aisearchApi';
import { CocktailsSearchRs, CocktailDataIncludeModel } from '../api/aisearchApi/models';
import { getWindowEnv } from '../utils/envConfig';
import CocktailFiltersLocalStorageService from './CocktailFiltersLocalStorageService';
import logger from './Logger';

const cocktailFilterService = new CocktailFiltersLocalStorageService();
const DEFAULT_TAKE: number = 10;

const searchCocktails = async (freeText: string, skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): Promise<CocktailsSearchRs | undefined> => {
    const searchFilters = cocktailFilterService.GetAllSelectedFilterIds();

    try {
        const config = new Configuration({
            basePath: getWindowEnv().VITE_AISEARCH_API_URL
        });

        const requestParameters = {
            freetext: freeText,
            skip,
            take,
            inc: include,
            fi: searchFilters
        };

        const cocktailsApiClient = new DefaultApi(config);
        const results = await cocktailsApiClient.searchV1CocktailsSearchGet(requestParameters);

        return results;
    } catch (e: unknown) {
        logger.logException('Failed to search cocktails', e as Error);
        throw e;
    }
};

export { searchCocktails, DEFAULT_TAKE };
