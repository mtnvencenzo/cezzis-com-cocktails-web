import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import FullScreenLayout from './FullScreenLayout';

describe('FullScreenLayout', () => {
    beforeEach(() => {
        render(
            <Router>
                <FullScreenLayout />
            </Router>
        );
    });

    test('renders FullScreenLayout', async () => {
        const element = await screen.findByTestId('fullscreen-layout');
        expect(element).toBeDefined();
        expect(element).not.toBeNull();
    });
});
