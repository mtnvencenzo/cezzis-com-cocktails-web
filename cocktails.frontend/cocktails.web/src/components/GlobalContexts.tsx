import { ScreenContextProvider } from './ScreenContext';
import { CocktailFilterContextProvider } from './CocktailFilterContext';
import { CocktailSearchContextProvider } from './CocktailSearchContext';
import { OwnedAccountContextProvider } from './OwnedAccountContext';

export interface GlobalContextProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
}

const GlobalContext = ({ children }: GlobalContextProps) => (
    <OwnedAccountContextProvider>
        <ScreenContextProvider>
            <CocktailFilterContextProvider>
                <CocktailSearchContextProvider>{children}</CocktailSearchContextProvider>
            </CocktailFilterContextProvider>
        </ScreenContextProvider>
    </OwnedAccountContextProvider>
);

export default GlobalContext;
