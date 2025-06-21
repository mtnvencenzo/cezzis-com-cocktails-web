import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';
import GlobalContext from '../../components/GlobalContexts';

describe('About Us Page', () => {
    test('renders about us page with text', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <AboutUsPage />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText(
            'Our aim is to provide quick access to cocktail recipes and ingredients, but we also like to provide fun insights and historical roots for cocktails and variations.'
        );
        expect(el).toBeTruthy();
    });
});
