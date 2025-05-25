import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccessErrorComponent from './AccessErrorComponent';

describe('Access Error Component', () => {
    test('Expect access error static message', async () => {
        render(<AccessErrorComponent />);

        await screen.findByText('Account does not have access.');
    });
});
