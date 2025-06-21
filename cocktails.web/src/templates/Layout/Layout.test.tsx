import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
    beforeEach(() => {
        render(
            <Router>
                <Layout />
            </Router>
        );
    });

    test('renders layout', async () => {
        const element = await screen.findByTestId('layout');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
    });
});
