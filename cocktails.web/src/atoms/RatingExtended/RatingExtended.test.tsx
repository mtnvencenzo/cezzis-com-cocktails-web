import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RatingExtended from './RatingExtended';

describe('RatingExtended', () => {
    test.each([
        { indicatorValue: 0, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 0, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: -1, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 0, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: -1, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 0, indicatorPosition: 'Bottom', size: 'large' },
        { indicatorValue: -1, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 0, indicatorPosition: 'Bottom', size: 'small' }
    ])('renders correctly without an indicator', async ({ indicatorValue, indicatorPosition, size }) => {
        render(
            <MemoryRouter>
                <RatingExtended
                    testId='rating-cocktail-3'
                    value={3}
                    indicatorValue={indicatorValue}
                    indicatorPosition={indicatorPosition as 'Top' | 'Bottom'}
                    precision={1.0}
                    max={5}
                    readOnly
                    size={size as 'small' | 'medium' | 'large'}
                />
            </MemoryRouter>
        );

        const starsEl = await screen.findByTestId(`rating-cocktail-3`);
        expect(starsEl).toBeDefined();
        expect(starsEl).not.toBeNull();

        let el = screen.queryByTestId('rating-indicator-1');
        expect(el).toBeNull();

        el = screen.queryByTestId('rating-indicator-2');
        expect(el).toBeNull();

        el = screen.queryByTestId('rating-indicator-3');
        expect(el).toBeNull();

        el = screen.queryByTestId('rating-indicator-4');
        expect(el).toBeNull();

        el = screen.queryByTestId('rating-indicator-5');
        expect(el).toBeNull();
    });

    test.each([
        { indicatorValue: 1, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 1, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: 1, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 1, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: 1, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 1, indicatorPosition: 'Bottom', size: 'large' },
        { indicatorValue: 2, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 2, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: 2, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 2, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: 2, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 2, indicatorPosition: 'Bottom', size: 'large' },
        { indicatorValue: 3, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 3, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: 3, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 3, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: 3, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 3, indicatorPosition: 'Bottom', size: 'large' },
        { indicatorValue: 4, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 4, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: 4, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 4, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: 4, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 4, indicatorPosition: 'Bottom', size: 'large' },
        { indicatorValue: 5, indicatorPosition: 'Top', size: 'small' },
        { indicatorValue: 5, indicatorPosition: 'Bottom', size: 'small' },
        { indicatorValue: 5, indicatorPosition: 'Top', size: 'medium' },
        { indicatorValue: 5, indicatorPosition: 'Bottom', size: 'medium' },
        { indicatorValue: 5, indicatorPosition: 'Top', size: 'large' },
        { indicatorValue: 5, indicatorPosition: 'Bottom', size: 'large' }
    ])('renders correctly with an indicator', async ({ indicatorValue, indicatorPosition, size }) => {
        render(
            <MemoryRouter>
                <RatingExtended
                    testId='rating-cocktail-3'
                    value={3}
                    indicatorValue={indicatorValue}
                    indicatorPosition={indicatorPosition as 'Top' | 'Bottom'}
                    precision={1.0}
                    max={5}
                    readOnly
                    size={size as 'small' | 'medium' | 'large'}
                />
            </MemoryRouter>
        );

        const el = await screen.findByTestId(`rating-indicator-${indicatorValue}`);
        expect(el).toBeDefined();
        expect(el).not.toBeNull();

        const starsEl = await screen.findByTestId(`rating-cocktail-3`);
        expect(starsEl).toBeDefined();
        expect(starsEl).not.toBeNull();
    });
});
