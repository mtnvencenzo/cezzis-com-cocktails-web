import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPageContainer from './ContactPageContainer';
import GlobalContext from '../../components/GlobalContexts';

describe('Contact Page Container', () => {
    test('renders contact page container with text', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <ContactPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Send us your cocktail recipe!');
        expect(el).toBeTruthy();
    });

    test('renders title', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <ContactPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        expect(document.title).toBe('Contact Cezzis.com');
    });

    test('renders cocktail recommendation form', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <ContactPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const cocktailNameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        expect(cocktailNameEl).toBeDefined();
        expect(cocktailNameEl.hasAttribute('required')).toBeTruthy();
        expect(cocktailNameEl.value).toBe('');
    });
});
