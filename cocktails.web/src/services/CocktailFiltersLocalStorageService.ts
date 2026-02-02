// eslint-disable-next-line import/no-extraneous-dependencies
import { Dictionary } from 'lodash';
import { CocktailIngredientFiltersRs } from '../api/cocktailsApi';
import LocalStorageService from './LocalStorageService';

export interface CocktailFiltersStorageItem {
    selected: boolean;
}

class CocktailFiltersLocalStorageService extends LocalStorageService {
    public static CocktailsFilterSelectionsGroupCacheKey: string = 'cocktails-search-filters-selections-group';

    public InitializeStorage = (searchFiltersRs: CocktailIngredientFiltersRs | undefined): Dictionary<CocktailFiltersStorageItem> => {
        if (!this.IsStorageEnabled() || !searchFiltersRs) {
            return {};
        }

        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        const allFilters = [
            ...(searchFiltersRs.beerWineChampagne ?? []),
            ...(searchFiltersRs.bitters ?? []),
            ...(searchFiltersRs.dilutions ?? []),
            ...(searchFiltersRs.eras ?? []),
            ...(searchFiltersRs.fruits ?? []),
            ...(searchFiltersRs.glassware ?? []),
            ...(searchFiltersRs.herbsAndFlowers ?? []),
            ...(searchFiltersRs.juices ?? []),
            ...(searchFiltersRs.liqueurs ?? []),
            ...(searchFiltersRs.proteins ?? []),
            ...(searchFiltersRs.spirits ?? []),
            ...(searchFiltersRs.syrupsAndSauces ?? []),
            ...(searchFiltersRs.vegetables ?? [])
        ];

        allFilters.forEach((x) => {
            if (!group.Items[x.id ?? '']) {
                group.Items[x.id ?? ''] = {
                    selected: false
                };
            }
        });

        // Cleanup any that used to be there but no longer are available filters
        Object.keys(group.Items).forEach((x) => {
            if (allFilters.filter((f) => f.id === x).length === 0) {
                delete group.Items[x];
            }
        });

        this.StorageProvider.setItem(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, JSON.stringify(group));

        return {};
    };

    public GetAllFilterSelections = (): Dictionary<CocktailFiltersStorageItem> => {
        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        return group.Items;
    };

    public GetAllSelectedFilterIds = (): string[] => {
        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        return Object.keys(group.Items)
            .filter((x) => group.Items[x].selected)
            .map((x) => x);
    };

    public SetAllFilterSelections = (items: Dictionary<CocktailFiltersStorageItem>): void => {
        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        group.Items = items;

        this.StorageProvider.setItem(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, JSON.stringify(group));
    };

    public ClearAllSelections = (): Dictionary<CocktailFiltersStorageItem> => {
        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        // Cleanup any that used to be there but no longer are available filters
        Object.keys(group.Items).forEach((x) => {
            group.Items[x].selected = false;
        });

        this.StorageProvider.setItem(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, JSON.stringify(group));

        return group.Items;
    };

    public IsSelected = (id: string): boolean => {
        if (!this.IsStorageEnabled() || !id) {
            return false;
        }

        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        if (group.Items[id]?.selected === true) {
            return true;
        }

        return false;
    };

    public AnySelected = (prefix: string): boolean => {
        if (!this.IsStorageEnabled()) {
            return false;
        }

        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        const keys = Object.keys(group.Items).filter((x) => x.startsWith(prefix) && group.Items[x].selected);

        return keys.length > 0;
    };

    public SetSelected = (id: string, selected: boolean): void => {
        if (!this.IsStorageEnabled() || !id) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<CocktailFiltersStorageItem>(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, Date.now() + 86_400_000 * 365); // adding one year from now

        group.Items[id] = { selected };

        this.StorageProvider.setItem(CocktailFiltersLocalStorageService.CocktailsFilterSelectionsGroupCacheKey, JSON.stringify(group));
    };
}

export default CocktailFiltersLocalStorageService;
