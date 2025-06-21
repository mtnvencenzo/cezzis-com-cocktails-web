import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FooterLink from './FooterLink';

describe('Footer Link', () => {
    test('renders footer link with text', async () => {
        render(
            <MemoryRouter>
                <FooterLink text='Hello World' testId='footer-link' navigatePath='/' />
            </MemoryRouter>
        );

        const searchBox = await screen.findByText('Hello World');
        expect(searchBox).toBeTruthy();
    });
});
