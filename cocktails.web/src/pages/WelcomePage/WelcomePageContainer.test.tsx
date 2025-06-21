import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePageContainer from './WelcomePageContainer';
import GlobalContext from '../../components/GlobalContexts';

describe('Welcome Page Container', () => {
    test('renders welcome page container with search box', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <WelcomePageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeDefined();
    });
});
