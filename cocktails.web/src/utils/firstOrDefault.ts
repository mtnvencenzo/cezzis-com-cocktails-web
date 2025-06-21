const firstOrDefault = <T>(array: T[], predicate?: (item: T) => boolean, defaultValue: T | null = null): T | null => {
    if (!array || array.length === 0) {
        return defaultValue;
    }
    const result = predicate ? array.find(predicate) : array[0];
    return result ?? defaultValue;
};

export default firstOrDefault;
