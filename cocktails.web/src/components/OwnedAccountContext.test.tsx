import { useEffect } from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { OwnedAccountContextProvider, useOwnedAccount } from './OwnedAccountContext';
import { CocktailUpdatedNotificationModel, DisplayThemeModel } from '../api/accountsApi';

describe('Owned Account Context', () => {
    const TestComp = () => {
        const { ownedAccount, setOwnedAccount } = useOwnedAccount();

        useEffect(() => {
            if (!ownedAccount) {
                setOwnedAccount({
                    subjectId: '41598664-1466-4e3e-b28c-dfe9837e462e',
                    loginEmail: 'test@test.com',
                    displayName: 'Test User',
                    email: 'test@tester.com',
                    givenName: 'Billy',
                    familyName: 'Simms',
                    avatarUri: 'https://cdn.cezzis.com/account-avatars/41598664-1466-4e3e-b28c-dfe9837e462e/1e4fc827-8e47-4ebb-9f48-a81c979b3686.webp',
                    primaryAddress: {
                        addressLine1: '123 Test St',
                        addressLine2: '',
                        city: 'Testville',
                        region: 'TS',
                        subRegion: 'Test Region',
                        postalCode: '12345',
                        country: 'Testland'
                    },
                    accessibility: {
                        theme: DisplayThemeModel.Light
                    },
                    notifications: {
                        onNewCocktailAdditions: CocktailUpdatedNotificationModel.Always
                    },
                    favoriteCocktails: []
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
