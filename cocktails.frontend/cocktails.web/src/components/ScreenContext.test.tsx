import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { ScreenContextProvider, useScreenContext } from './ScreenContext';

describe('Screen Context', () => {
    const TestComp = () => {
        const { isFullScreenMode, setIsFullScreenMode } = useScreenContext();

        useEffect(() => {
            if (isFullScreenMode === false) {
                setIsFullScreenMode(true);
            }
        }, [isFullScreenMode, setIsFullScreenMode]);

        return <Box data-testid={isFullScreenMode} />;
    };

    test('Updates is full screen mode within a provider', async () => {
        render(
            <ScreenContextProvider>
                <TestComp />
            </ScreenContextProvider>
        );

        const test = await screen.findByTestId('true');
        expect(test).toBeTruthy();
    });

    test('Doesnt update is full screen mode when not within a provider', async () => {
        render(<TestComp />);

        const test = await screen.findByTestId('false');
        expect(test).toBeTruthy();
    });
});
