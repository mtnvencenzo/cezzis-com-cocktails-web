import { createContext, ReactNode, useState, useContext, useEffect, useMemo } from 'react';
import SessionStorageService from '../services/SessionStorageService';
import { AccountCocktailRatingsRs, AccountOwnedProfileRs } from '../api/accountsApi';

interface OwnedAccountContextProps {
    ownedAccount: AccountOwnedProfileRs | undefined;
    ownedAccountCocktailRatings: AccountCocktailRatingsRs | undefined;
    setOwnedAccount: (account: AccountOwnedProfileRs | undefined) => void;
    setOwnedAccountCocktailRatings: (account: AccountCocktailRatingsRs | undefined) => void;
}

const OwnedAccountContext = createContext({ ownedAccount: undefined, ownedAccountCocktailRatings: undefined } as OwnedAccountContextProps);

interface OwnedAccountContextProviderProps {
    children: ReactNode;
}

const OwnedAccountContextProvider = ({ children }: OwnedAccountContextProviderProps) => {
    const sessionStorageService = useMemo(() => new SessionStorageService(), []);
    const [ownedAccount, setOwnedAccount] = useState<AccountOwnedProfileRs | undefined>(sessionStorageService.GetOwnedAccountProfileRequestData);
    const [ownedAccountCocktailRatings, setOwnedAccountCocktailRatings] = useState<AccountCocktailRatingsRs | undefined>(sessionStorageService.GetOwnedAccountCocktailRatingsRequestData);

    useEffect(() => {
        const handleOwnedAccountStorageChange = () => {
            setOwnedAccount(sessionStorageService.GetOwnedAccountProfileRequestData());
        };

        const handleOwnedAccountCocktailRatingsStorageChange = () => {
            setOwnedAccountCocktailRatings(sessionStorageService.GetOwnedAccountCocktailRatingsRequestData());
        };

        window.addEventListener('owned-account-storage-changed', handleOwnedAccountStorageChange);
        window.addEventListener('owned-account-cocktail-ratings-storage-changed', handleOwnedAccountCocktailRatingsStorageChange);
    }, [sessionStorageService]);

    const providerValue = useMemo(() => {
        const internalSetOwnedAccount = (account: AccountOwnedProfileRs | undefined) => setOwnedAccount(account);
        const internalSetOwnedAccountCocktailRatings = (cocktailRatings: AccountCocktailRatingsRs | undefined) => setOwnedAccountCocktailRatings(cocktailRatings);
        return {
            ownedAccount,
            ownedAccountCocktailRatings,
            setOwnedAccount: internalSetOwnedAccount,
            setOwnedAccountCocktailRatings: internalSetOwnedAccountCocktailRatings
        };
    }, [ownedAccount, setOwnedAccount, ownedAccountCocktailRatings, setOwnedAccountCocktailRatings]);

    return <OwnedAccountContext.Provider value={providerValue}>{children}</OwnedAccountContext.Provider>;
};

const useOwnedAccount = (): OwnedAccountContextProps => {
    const context = useContext(OwnedAccountContext);

    if (!context) {
        throw new Error('useOwnedAccount must be used within a OwnedAccountContextProvider');
    }

    return context;
};

export { OwnedAccountContextProvider, useOwnedAccount };
