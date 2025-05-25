import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import PathNotFound from './PathNotFound';

describe('Path Not Found', () => {
    test('Expect not found static message', async () => {
        render(<PathNotFound />);

        await screen.findByText('Page Not Found');
    });
});
