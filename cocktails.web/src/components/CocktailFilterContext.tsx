import { createContext, ReactNode, useMemo, useState, useContext } from 'react';

interface CocktailFilterContextProps {
    filtersRevision: number;
    setFiltersRevision: () => void;
}

const CocktailFilterContext = createContext({
    filtersRevision: 0,
    setFiltersRevision: () => {}
} as CocktailFilterContextProps);

interface CocktailFilterContextProviderProps {
    children: ReactNode;
}

const CocktailFilterContextProvider = ({ children }: CocktailFilterContextProviderProps) => {
    const [filtersRevision, setFiltersRevision] = useState(0);

    const providerValue = useMemo(() => {
        const internalSetFiltersRevision = () => setFiltersRevision(filtersRevision + 1);
        return { filtersRevision, setFiltersRevision: internalSetFiltersRevision };
    }, [filtersRevision, setFiltersRevision]);

    return <CocktailFilterContext.Provider value={providerValue}>{children}</CocktailFilterContext.Provider>;
};

const useCocktailFiltering = (): CocktailFilterContextProps => {
    const context = useContext(CocktailFilterContext);

    if (!context) {
        throw new Error('useCocktailFiltering must be used within a CocktailFilterContextProvider');
    }

    return context;
};

export { CocktailFilterContextProvider, useCocktailFiltering };
