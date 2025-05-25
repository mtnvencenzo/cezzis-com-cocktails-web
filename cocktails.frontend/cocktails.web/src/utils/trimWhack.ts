const trimWhack = (str: string | null | undefined): string | null | undefined => {
    if (!str) {
        return str;
    }

    if (str.endsWith('/')) {
        return str.slice(0, -1);
    }

    return str;
};

export default trimWhack;
