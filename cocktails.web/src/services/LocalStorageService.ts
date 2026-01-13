import { CocktailsSearchRs, CocktailModelOutput } from '../api/aisearchApi';
import { CocktailIngredientFiltersRs } from '../api/cocktailsApi/cocktailsApiClient';
import StorageCache from './StorageCache';

/* eslint-disable class-methods-use-this */
class LocalStorageService extends StorageCache {
    public static CocktailsListGroupCacheKey: string = 'cocktails-list-request-data-group';

    public static CocktailsSearchFiltersGroupCacheKey: string = 'cocktails-search-filters-data-group';

    public static CocktailsInitialSearchGroupCacheKey: string = 'cocktails-initial-search-data-group';

    private static storageEnabled: boolean | undefined = undefined;

    public GetCocktailListRequestData = (skip: number, take: number): CocktailsSearchRs | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<CocktailsSearchRs>(LocalStorageService.CocktailsListGroupCacheKey, `?skip=${skip}&take=${take}`);
    };

    public SetCocktailListRequestData = (response: CocktailsSearchRs, skip: number, take: number): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailsSearchRs>(LocalStorageService.CocktailsListGroupCacheKey, Date.now() + 86_400_000); // adding one day from now

        group.Items[`?skip=${skip}&take=${take}`] = response;

        this.StorageProvider.setItem(LocalStorageService.CocktailsListGroupCacheKey, JSON.stringify(group));
    };

    public GetInitialCocktailsSearchData = (freeText: string, skip: number, take: number): CocktailModelOutput[] | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<CocktailModelOutput[]>(LocalStorageService.CocktailsInitialSearchGroupCacheKey, `?freeText=${freeText}&skip=${skip}&take=${take}`);
    };

    public SetInitialCocktailsSearchData = (response: CocktailModelOutput[], freeText: string, skip: number, take: number): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailModelOutput[]>(LocalStorageService.CocktailsInitialSearchGroupCacheKey, Date.now() + 86_400_000); // adding one day from now

        group.Items[`?freeText=${freeText}&skip=${skip}&take=${take}`] = response;

        this.StorageProvider.setItem(LocalStorageService.CocktailsInitialSearchGroupCacheKey, JSON.stringify(group));
    };

    public GetCocktailsSearchFilters = (): CocktailIngredientFiltersRs | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<CocktailIngredientFiltersRs>(LocalStorageService.CocktailsSearchFiltersGroupCacheKey, 'all');
    };

    public SetCocktailsSearchFilters = (response: CocktailIngredientFiltersRs): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailIngredientFiltersRs>(LocalStorageService.CocktailsSearchFiltersGroupCacheKey, Date.now() + 86_400_000); // adding one day from now

        group.Items.all = response;

        this.StorageProvider.setItem(LocalStorageService.CocktailsSearchFiltersGroupCacheKey, JSON.stringify(group));
    };

    public ClearAllCocktailCaches = (): void => {
        localStorage.removeItem(LocalStorageService.CocktailsListGroupCacheKey);
        localStorage.removeItem(LocalStorageService.CocktailsInitialSearchGroupCacheKey);
    };

    protected IsStorageEnabled = (): boolean => {
        if (LocalStorageService.storageEnabled === undefined) {
            try {
                this.StorageProvider.setItem('__storage-test__', 'true');
                this.StorageProvider.removeItem('__storage-test__');
                LocalStorageService.storageEnabled = true;
            } catch (e) {
                LocalStorageService.storageEnabled = false;
            }
        }

        return LocalStorageService.storageEnabled;
    };

    protected StorageProvider: Storage = localStorage;
}
/* eslint-enable class-methods-use-this */

export default LocalStorageService;
