import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Main', () => {
    test('renders root', async () => {
        render(<div id='root' data-testid='my-root' />);

        const myRoot = await screen.findByTestId('my-root');
        expect(myRoot).toBeTruthy();
    });
});
