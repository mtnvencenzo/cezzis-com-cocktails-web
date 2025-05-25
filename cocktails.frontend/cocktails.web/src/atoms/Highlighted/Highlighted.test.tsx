import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Highlighted from './Highlighted';

describe('Highlighted', () => {
    test('renders without a match to highlight', async () => {
        render(
            <MemoryRouter>
                <Highlighted testId='highlighted-test' text='my text to highlight' highlight='notmatched' to='/' />
            </MemoryRouter>
        );

        const element = await screen.findByTestId('highlighted-test');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
        expect(element.innerHTML).toBe('<span>my text to highlight</span>');
    });

    test('renders with a match to highlight', async () => {
        render(
            <MemoryRouter>
                <Highlighted testId='highlighted-test' text='my text to highlight' highlight='text' to='/' />
            </MemoryRouter>
        );

        const element = await screen.findByTestId('highlighted-test');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
        expect(element.innerHTML).toBe('<span>my </span><b>text</b><span> to highlight</span>');
    });

    test('renders with multiple matches to highlight', async () => {
        render(
            <MemoryRouter>
                <Highlighted testId='highlighted-test' text='my text to highlight in my text' highlight='my' to='/' />
            </MemoryRouter>
        );

        const element = await screen.findByTestId('highlighted-test');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
        expect(element.innerHTML).toBe('<b>my</b><span> text to highlight in </span><b>my</b><span> text</span>');
    });

    test('renders with a spaced match to highlight', async () => {
        render(
            <MemoryRouter>
                <Highlighted testId='highlighted-test' text='my text to highlight in my text' highlight='text to' to='/' />
            </MemoryRouter>
        );

        const element = await screen.findByTestId('highlighted-test');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
        expect(element.innerHTML).toBe('<span>my </span><b>text to</b><span> highlight in my text</span>');
    });

    test('renders with case insensitive match to highlight', async () => {
        render(
            <MemoryRouter>
                <Highlighted testId='highlighted-test' text='my text to highlight in my text' highlight='TeXT tO' to='/' />
            </MemoryRouter>
        );

        const element = await screen.findByTestId('highlighted-test');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
        expect(element.innerHTML).toBe('<span>my </span><b>text to</b><span> highlight in my text</span>');
    });

    // TODO: Need to fix this
    // test('renders with a diacritic match to highlight', async () => {
    //     render(<Highlighted testId='highlighted-test' text='Absinthe Frappé cocktail' highlight='Frappe' />);

    //     const element = await screen.findByTestId('highlighted-test');
    //     expect(element).toBeDefined();
    //     expect(element).not.toBeNull();
    //     expect(element.innerHTML).toBe('<span>Absinthe </span><b>Frappé</b><span> cocktail</span>');
    // });
});
