import { StorageGroup } from './StorageGroup';

abstract class StorageCache {
    protected abstract IsStorageEnabled(): boolean;

    protected abstract StorageProvider: Storage;

    protected GetCachedGroupItem = <T>(groupKey: string, itemKey: string): T | undefined => {
        const groupResult = this.StorageProvider.getItem(groupKey);

        if (groupResult) {
            const group = JSON.parse(groupResult) as StorageGroup<T>;

            if (group) {
                if (group.InvalidateAfter < Date.now()) {
                    this.StorageProvider.removeItem(groupKey);
                }

                const obj = group.Items[itemKey];

                if (obj) {
                    return obj;
                }
            }
        }

        return undefined;
    };

    protected GetOrCreateCachedGroup = <T>(groupKey: string, invalidateAfter: number): StorageGroup<T> => {
        const groupResult = this.StorageProvider.getItem(groupKey);
        let group: StorageGroup<T>;

        if (groupResult) {
            group = JSON.parse(groupResult) as StorageGroup<T>;

            if (!group || group.InvalidateAfter < Date.now()) {
                group = {
                    InvalidateAfter: invalidateAfter,
                    Items: {}
                };
                this.StorageProvider.setItem(groupKey, JSON.stringify(group));
            }
        } else {
            group = {
                InvalidateAfter: invalidateAfter,
                Items: {}
            };
            this.StorageProvider.setItem(groupKey, JSON.stringify(group));
        }

        return group;
    };
}

export default StorageCache;
