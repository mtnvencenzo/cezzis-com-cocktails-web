import { CocktailIngredientFiltersRs, CocktailsListRs, CocktailsListModel, CocktailDataIncludeModel } from '../api/cocktailsApi/cocktailsApiClient';
import StorageCache from './StorageCache';

/* eslint-disable class-methods-use-this */
class LocalStorageService extends StorageCache {
    public static CocktailsListGroupCacheKey: string = 'cocktails-list-request-data-group';

    public static CocktailsSearchFiltersGroupCacheKey: string = 'cocktails-search-filters-data-group';

    public static CocktailsInitialSearchGroupCacheKey: string = 'cocktails-initial-search-data-group';

    private static storageEnabled: boolean | undefined = undefined;

    public GetCocktailListRequestData = (skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): CocktailsListRs | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        const inc = include ? `&inc=${include?.join('&inc=')}` : '';

        return this.GetCachedGroupItem<CocktailsListRs>(LocalStorageService.CocktailsListGroupCacheKey, `?skip=${skip}&take=${take}${inc}`);
    };

    public SetCocktailListRequestData = (response: CocktailsListRs, skip: number, take: number, include: CocktailDataIncludeModel[] | undefined): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailsListRs>(LocalStorageService.CocktailsListGroupCacheKey, Date.now() + 86_400_000); // adding one day from now

        const inc = include ? `&inc=${include?.join('&inc=')}` : '';

        group.Items[`?skip=${skip}&take=${take}${inc}`] = response;

        this.StorageProvider.setItem(LocalStorageService.CocktailsListGroupCacheKey, JSON.stringify(group));
    };

    public GetInitialCocktailsSearchData = (freeText: string, skip: number, take: number): CocktailsListModel[] | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<CocktailsListModel[]>(LocalStorageService.CocktailsInitialSearchGroupCacheKey, `?freeText=${freeText}&skip=${skip}&take=${take}`);
    };

    public SetInitialCocktailsSearchData = (response: CocktailsListModel[], freeText: string, skip: number, take: number): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailsListModel[]>(LocalStorageService.CocktailsInitialSearchGroupCacheKey, Date.now() + 86_400_000); // adding one day from now

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
