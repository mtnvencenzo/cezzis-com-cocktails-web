export const randomInt = (minimum: number = 0, maximum: number = 9): number => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
