import { useEffect } from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { OwnedAccountContextProvider, useOwnedAccount } from './OwnedAccountContext';

describe('Owned Account Context', () => {
    const TestComp = () => {
        const { ownedAccount, setOwnedAccount } = useOwnedAccount();

        useEffect(() => {
            if (!ownedAccount) {
                setOwnedAccount({
                    subjectId: '41598664-1466-4e3e-b28c-dfe9837e462e',
                    email: 'test@tester.com',
                    givenName: 'Ron',
                    familyName: 'Vecchi',
                    avatarUri: 'https://cdn.cezzis.com/account-avatars/41598664-1466-4e3e-b28c-dfe9837e462e/1e4fc827-8e47-4ebb-9f48-a81c979b3686.webp'
                });
            }
        }, [ownedAccount, setOwnedAccount]);

        return <Box data-testid={ownedAccount?.subjectId} />;
    };

    test('Updates account and renders', async () => {
        render(
            <OwnedAccountContextProvider>
                <TestComp />
            </OwnedAccountContextProvider>
        );

        const test = await screen.findByTestId('41598664-1466-4e3e-b28c-dfe9837e462e');
        expect(test).toBeTruthy();
    });
});
