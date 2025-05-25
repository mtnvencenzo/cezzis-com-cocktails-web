import { createContext, ReactNode, useMemo, useState, useContext } from 'react';

interface CocktailSearchContextProps {
    noItems: boolean;
    setNoItems: (hasNoItems: boolean) => void;
}

const CocktailSearchContext = createContext({
    noItems: false,
    setNoItems: () => {}
} as CocktailSearchContextProps);

interface CocktailSearchContextProviderProps {
    children: ReactNode;
}

const CocktailSearchContextProvider = ({ children }: CocktailSearchContextProviderProps) => {
    const [hasNoItems, setHasNoItems] = useState(false);

    return <CocktailSearchContext.Provider value={useMemo(() => ({ noItems: hasNoItems, setNoItems: setHasNoItems }), [hasNoItems, setHasNoItems])}>{children}</CocktailSearchContext.Provider>;
};

const useCocktailSearch = (): CocktailSearchContextProps => {
    const context = useContext(CocktailSearchContext);

    if (!context) {
        throw new Error('useCocktailSearch must be used within a CocktailSearchContextProvider');
    }

    return context;
};

export { CocktailSearchContextProvider, useCocktailSearch };
