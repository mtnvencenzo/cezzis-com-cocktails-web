import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MsalReactTester } from 'msal-react-tester';
import { MsalProvider } from '@azure/msal-react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import GlobalContext from '../../components/GlobalContexts';
import { getTestAccountInfo, getTestCocktails, getTestOwnedAccountCocktailRatings, getTestOwnedAccountProfile, server } from '../../../tests/setup';
import SessionStorageService from '../../services/SessionStorageService';
import CocktailRatingDialog from './CocktailRatingDialog';
import { AccountCocktailRatingsRs, RateCocktailRs } from '../../api/cocktailsApi/cocktailsApiClient';

describe('Cocktail Rating Dialog', () => {
    let msalTester: MsalReactTester;
    const sessionStorageService = new SessionStorageService();
    const cocktails = getTestCocktails();

    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.interationType = 'Redirect';
        msalTester.spyMsal();
    });

    test('renders modal with no matched cocktail rating for account', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(getTestOwnedAccountCocktailRatings([{ cocktailId: 'americano', stars: 1 }]));
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const cocktail = cocktails.find((c) => c.id === 'adonis')!;
        const onCancel = async () => {};
        const onConfirm = async () => {};

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <CocktailRatingDialog
                            open
                            cocktail={cocktail}
                            title={`Rate ${cocktail.title} Cocktail`}
                            content='Help us spread the word about this cocktail recipe.'
                            cancelButtonText='Cancel My Rating'
                            confirmButtonText='Rate My Cocktail'
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                        />
                    </MemoryRouter>
                </MsalProvider>
            </GlobalContext>
        );

        const textEl = await screen.findByText('Help us spread the word about this cocktail recipe.');
        expect(textEl).toBeVisible();
    });

    test('renders modal with matched cocktail rating for account', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(getTestOwnedAccountCocktailRatings([{ cocktailId: 'adonis', stars: 3 }]));
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        let cancelClickCount = 0;

        const cocktail = cocktails.find((c) => c.id === 'adonis')!;
        const onCancel = async () => {
            cancelClickCount += 1;
        };
        const onConfirm = async () => {};

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <CocktailRatingDialog
                            open
                            cocktail={cocktail}
                            title={`Rate ${cocktail.title} Cocktail`}
                            content='Help us spread the word about this cocktail recipe.'
                            cancelButtonText='Cancel My Rating'
                            confirmButtonText='Rate My Cocktail'
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                        />
                    </MemoryRouter>
                </MsalProvider>
            </GlobalContext>
        );

        const el = await screen.findByText('Hmm, it looks like you have already rated this cocktail. Thank you for being an active contributor!');
        expect(el).toBeVisible();

        // Rating was three stars
        const selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(3);
        const unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(2);

        const cancelButton = await screen.getByText('Close');
        fireEvent.click(cancelButton);
        expect(cancelClickCount).toBe(1);

        const submitButton = screen.queryByText('Rate My Cocktail');
        expect(submitButton).toBeNull();
        expect(submitButton).not.toBeInTheDocument();
    });

    test('renders modal and selects all stars one by one', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(getTestOwnedAccountCocktailRatings([{ cocktailId: 'americano', stars: 1 }]));
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const cocktail = cocktails.find((c) => c.id === 'adonis')!;
        const onCancel = async () => {};
        const onConfirm = async () => {};

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <CocktailRatingDialog
                            open
                            cocktail={cocktail}
                            title={`Rate ${cocktail.title} Cocktail`}
                            content='Help us spread the word about this cocktail recipe.'
                            cancelButtonText='Cancel My Rating'
                            confirmButtonText='Rate My Cocktail'
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                        />
                    </MemoryRouter>
                </MsalProvider>
            </GlobalContext>
        );

        const textEl = await screen.findByText('Help us spread the word about this cocktail recipe.');
        expect(textEl).toBeVisible();

        let selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(0);
        let unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(5);

        let starLabelEL = await screen.findByLabelText("1 Star, I wouldn't serve this to my worst enemy!");
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(1);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(4);

        starLabelEL = await screen.findByLabelText("2 Stars, I guess it wasn't horrible.");
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(2);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(3);

        starLabelEL = await screen.findByLabelText("3 Stars, Meh, It's five oclock somewhere.");
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(3);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(2);

        starLabelEL = await screen.findByLabelText("4 Stars, Yes bartender, I'll have another round.");
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(4);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(1);

        starLabelEL = await screen.findByLabelText('5 Stars, One of my favorites!');
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(5);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(0);

        // Now go back to just one star
        starLabelEL = await screen.findByLabelText("1 Star, I wouldn't serve this to my worst enemy!");
        await userEvent.hover(starLabelEL);
        await userEvent.click(starLabelEL);
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(1);
        unSelectedStars = screen.queryAllByTestId('StarBorderIcon');
        expect(unSelectedStars.length).toBe(4);
    });

    test('renders modal with correct buttons', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(getTestOwnedAccountCocktailRatings([]));
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];

        const cocktail = cocktails.find((c) => c.id === 'adonis')!;
        const onCancel = async () => {};
        const onConfirm = async () => {};

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <CocktailRatingDialog
                            open
                            cocktail={cocktail}
                            title={`Rate ${cocktail.title} Cocktail`}
                            content='Help us spread the word about this cocktail recipe.'
                            cancelButtonText='Cancel My Rating'
                            confirmButtonText='Rate My Cocktail'
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                        />
                    </MemoryRouter>
                </MsalProvider>
            </GlobalContext>
        );

        const textEl = await screen.findByText('Help us spread the word about this cocktail recipe.');
        expect(textEl).toBeVisible();

        const selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(0);

        const cancelButton = await screen.getByText('Cancel My Rating');
        expect(cancelButton).not.toBeDisabled();

        const submitButton = screen.getByText('Rate My Cocktail');
        expect(submitButton).toBeDisabled();
    });

    test('renders modal and selects stars and submits rating', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        sessionStorageService.SetOwnedAccountCocktailRatingsRequestData(getTestOwnedAccountCocktailRatings([]));
        await msalTester.isLogged();
        msalTester.accounts = [getTestAccountInfo()];
        const cocktailId = 'adonis';

        const serverRatingRs: RateCocktailRs = {
            cocktailId,
            ratings: [
                {
                    cocktailId,
                    stars: 3
                }
            ],
            cocktailRating: {
                oneStars: 0,
                twoStars: 0,
                threeStars: 1,
                fourStars: 0,
                fiveStars: 0,
                totalStars: 1,
                ratingCount: 0,
                rating: 1
            }
        };

        // For the initial save response
        server.use(
            http.post(
                'http://localhost:0/api/v1/accounts/owned/profile/cocktails/ratings',
                () =>
                    HttpResponse.json<RateCocktailRs>(serverRatingRs, {
                        status: 201,
                        statusText: 'Created'
                    }),
                { once: true }
            )
        );

        // For the subsequent reload of the account cocktail ratings
        server.use(
            http.get(
                'http://localhost:0/api/v1/accounts/owned/profile/cocktails/ratings',
                () =>
                    HttpResponse.json<AccountCocktailRatingsRs>(
                        {
                            ratings: serverRatingRs.ratings
                        },
                        {
                            status: 200,
                            statusText: 'Ok'
                        }
                    ),
                { once: true }
            )
        );

        let changedStars = 0;
        let confirmed = false;

        const cocktail = cocktails.find((c) => c.id === cocktailId)!;
        const onCancel = async () => {};
        const onConfirm = async () => {
            confirmed = true;
        };
        const onChange = (stars: number) => {
            changedStars = stars;
        };

        render(
            <GlobalContext>
                <MsalProvider instance={msalTester.client}>
                    <MemoryRouter>
                        <CocktailRatingDialog
                            open
                            cocktail={cocktail}
                            title={`Rate ${cocktail.title} Cocktail`}
                            content='Help us spread the word about this cocktail recipe.'
                            cancelButtonText='Cancel My Rating'
                            confirmButtonText='Rate My Cocktail'
                            onCancel={onCancel}
                            onChange={onChange}
                            onConfirm={onConfirm}
                        />
                    </MemoryRouter>
                </MsalProvider>
            </GlobalContext>
        );

        const textEl = await screen.findByText('Help us spread the word about this cocktail recipe.');
        expect(textEl).toBeVisible();

        let selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(0);

        const cancelButton = await screen.getByText('Cancel My Rating');
        expect(cancelButton).not.toBeDisabled();

        const submitButton = await screen.findByText('Rate My Cocktail');
        expect(submitButton).toBeDisabled();

        const starLabelEL = await screen.findByLabelText("3 Stars, Meh, It's five oclock somewhere.");
        fireEvent.click(starLabelEL); // using fireEvent here because userEvent was not causing the change event to happen
        selectedStars = screen.queryAllByTestId('StarIcon');
        expect(selectedStars.length).toBe(3);

        expect(changedStars).toBe(3);
        expect(submitButton).toBeEnabled();

        await userEvent.click(submitButton);
        expect(confirmed).toBeTruthy();
    });
});
