import { createContext, ReactNode, useMemo, useState, useContext } from 'react';

interface ScreenContextProps {
    isFullScreenMode: boolean;
    setIsFullScreenMode: (fullScreen: boolean) => void;
}

const ScreenContext = createContext({
    isFullScreenMode: false,
    setIsFullScreenMode: () => {}
} as ScreenContextProps);

interface ScreenContextProviderProps {
    children: ReactNode;
}

const ScreenContextProvider = ({ children }: ScreenContextProviderProps) => {
    const [isFullScreenMode, setIsFullScreenMode] = useState(false);

    return <ScreenContext.Provider value={useMemo(() => ({ isFullScreenMode, setIsFullScreenMode }), [isFullScreenMode, setIsFullScreenMode])}>{children}</ScreenContext.Provider>;
};

const useScreenContext = (): ScreenContextProps => {
    const context = useContext(ScreenContext);

    if (!context) {
        throw new Error('useScreenContext must be used within a ScreenContextProvider');
    }

    return context;
};

export { ScreenContextProvider, useScreenContext };
