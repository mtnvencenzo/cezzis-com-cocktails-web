import { unset } from 'lodash';
import { AccountCocktailRatingsRs, AccountOwnedProfileRs } from '../api/cocktailsApi/cocktailsApiClient';
import StorageCache from './StorageCache';

class SessionStorageService extends StorageCache {
    public static OwnedAccountProfileGroupCacheKey: string = 'account-profile-data-group';

    private static storageEnabled: boolean | undefined = undefined;

    public GetOwnedAccountProfileRequestData = (): AccountOwnedProfileRs | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<AccountOwnedProfileRs>(SessionStorageService.OwnedAccountProfileGroupCacheKey, `owned-account`);
    };

    public SetOwnedAccountProfileRequestData = (response: AccountOwnedProfileRs): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<AccountOwnedProfileRs>(SessionStorageService.OwnedAccountProfileGroupCacheKey, Date.now() + 86_400_000 * 15); // adding 15 days from now

        group.Items[`owned-account`] = response;

        this.StorageProvider.setItem(SessionStorageService.OwnedAccountProfileGroupCacheKey, JSON.stringify(group));
        window.dispatchEvent(new Event('owned-account-storage-changed')); // Dispatch custom event
    };

    public GetOwnedAccountCocktailRatingsRequestData = (): AccountCocktailRatingsRs | undefined => {
        if (!this.IsStorageEnabled()) {
            return undefined;
        }

        return this.GetCachedGroupItem<AccountCocktailRatingsRs>(SessionStorageService.OwnedAccountProfileGroupCacheKey, `owned-account-cocktail-ratings`);
    };

    public SetOwnedAccountCocktailRatingsRequestData = (response: AccountCocktailRatingsRs): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<AccountCocktailRatingsRs>(SessionStorageService.OwnedAccountProfileGroupCacheKey, Date.now() + 86_400_000 * 15); // adding 15 days from now

        group.Items[`owned-account-cocktail-ratings`] = response;

        this.StorageProvider.setItem(SessionStorageService.OwnedAccountProfileGroupCacheKey, JSON.stringify(group));
        window.dispatchEvent(new Event('owned-account-cocktail-ratings-storage-changed')); // Dispatch custom event
    };

    public ClearOwnedAccountProfileRequestData = (): void => {
        if (!this.IsStorageEnabled()) {
            return;
        }

        const group = this.GetOrCreateCachedGroup<AccountOwnedProfileRs>(SessionStorageService.OwnedAccountProfileGroupCacheKey, Date.now() + 86_400_000 * 15); // adding 15 days from now

        unset(group.Items, `owned-account`);
        unset(group.Items, `owned-account-cocktail-ratings`);

        this.StorageProvider.setItem(SessionStorageService.OwnedAccountProfileGroupCacheKey, JSON.stringify(group));
        window.dispatchEvent(new Event('owned-account-storage-changed')); // Dispatch custom event
        window.dispatchEvent(new Event('owned-account-cocktail-ratings-storage-changed')); // Dispatch custom event
    };

    protected StorageProvider: Storage = sessionStorage;

    protected IsStorageEnabled = (): boolean => {
        if (SessionStorageService.storageEnabled === undefined) {
            try {
                this.StorageProvider.setItem('__storage-test__', 'true');
                this.StorageProvider.removeItem('__storage-test__');
                SessionStorageService.storageEnabled = true;
            } catch (e) {
                SessionStorageService.storageEnabled = false;
            }
        }

        return SessionStorageService.storageEnabled;
    };
}

export default SessionStorageService;
