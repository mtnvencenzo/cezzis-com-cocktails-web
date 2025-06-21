import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import GlobalContext from '../../components/GlobalContexts';

describe('Welcome Page', () => {
    test('renders welcome page', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <WelcomePage />
                </MemoryRouter>
            </GlobalContext>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeTruthy();
    });
});
