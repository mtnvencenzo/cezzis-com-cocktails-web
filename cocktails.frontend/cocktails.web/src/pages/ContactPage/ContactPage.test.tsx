import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';
import GlobalContext from '../../components/GlobalContexts';

describe('Contact Page', () => {
    test('renders contact page with text', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <ContactPage />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Send us your cocktail recipe!');
        expect(el).toBeTruthy();
    });
});
