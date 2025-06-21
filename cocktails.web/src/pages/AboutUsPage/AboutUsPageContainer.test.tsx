import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutUsPageContainer from './AboutUsPageContainer';
import GlobalContext from '../../components/GlobalContexts';

describe('About Us Page Container', () => {
    test('renders about us page container with text', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <AboutUsPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText(
            'Our aim is to provide quick access to cocktail recipes and ingredients, but we also like to provide fun insights and historical roots for cocktails and variations.'
        );
        expect(el).toBeTruthy();
    });

    test('renders title', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <AboutUsPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByText('Our aim is to provide quick access to cocktail recipes and ingredients, but we also like to provide fun insights and historical roots for cocktails and variations.');
        expect(document.title).toBe('About Cezzis.com');
    });
});
