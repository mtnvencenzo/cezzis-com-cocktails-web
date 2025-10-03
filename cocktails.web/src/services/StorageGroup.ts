// eslint-disable-next-line import/no-extraneous-dependencies
import { Dictionary } from 'lodash';

export interface StorageGroup<T> {
    InvalidateAfter: number;
    Items: Dictionary<T>;
}
