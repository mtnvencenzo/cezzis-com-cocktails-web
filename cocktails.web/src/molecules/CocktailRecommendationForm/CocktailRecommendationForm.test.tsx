import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { http, HttpResponse } from 'msw';
import { ToastContainer } from 'react-toastify';
import CocktailRecommendationForm from './CocktailRecommendationForm';
import GlobalContext from '../../components/GlobalContexts';
import { getTestOwnedAccountProfile, getTestUser, requestSpy, server } from '../../../tests/setup';
import { CocktailRecommendationRq } from '../../api/cocktailsApi/cocktailsApiClient';
import { executeRecaptcha, resetRecaptcha } from '../../services/RecaptchaService';
import SessionStorageService from '../../services/SessionStorageService';
import { Auth0ReactTester } from '../../auth0Mocks';
import { auth0ProviderOptions } from '../../utils/authConfig';
import { Auth0Provider } from '../../components/Auth0Provider';

vi.mock('../../services/RecaptchaService.ts');
vi.mocked(resetRecaptcha).mockImplementation(() => vi.fn());

describe('Cocktail Recommendation Form', () => {
    let auth0Tester: Auth0ReactTester;
    const sessionStorageService = new SessionStorageService();

    const expectProgress = async (inProgress: boolean = true) => {
        if (inProgress) {
            const progress = await screen.findByTestId('submitProgress');
            expect(progress).toHaveClass('MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary');
        } else {
            const progress = screen.queryByTestId('submitProgress');
            expect(progress).toBeFalsy();
        }
    };

    beforeEach(() => {
        auth0Tester = new Auth0ReactTester('Redirect');
        auth0Tester.spyAuth0();

        server.use(
            http.post('http://localhost:0/api/v1/accounts/owned/profile/cocktails/recommendations', async ({ request }) => {
                await expectProgress(true);
                const body: CocktailRecommendationRq = (await request.json()) as CocktailRecommendationRq;

                if (body.recommendation.name === 'failed') {
                    return HttpResponse.json(
                        { errors: ['Cocktail name is required'] },
                        {
                            status: 400,
                            statusText: 'BadRequest'
                        }
                    );
                }

                if (body.recommendation.ingredients === 'failed') {
                    return HttpResponse.json(
                        { errors: ['Ingredients are required'] },
                        {
                            status: 400,
                            statusText: 'BadRequest'
                        }
                    );
                }

                if (body.recommendation.directions === 'failed') {
                    return HttpResponse.json(
                        { errors: ['Directions are required'] },
                        {
                            status: 400,
                            statusText: 'BadRequest'
                        }
                    );
                }

                return HttpResponse.json(null, {
                    status: 202,
                    statusText: 'Accepted'
                });
            })
        );
    });

    test('renders default cocktail name textbox form state', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const cocktailNameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        expect(cocktailNameEl).toBeDefined();
        expect(cocktailNameEl.hasAttribute('required')).toBeTruthy();
        expect(cocktailNameEl.value).toBe('');

        const cocktailNameDivEl = (await screen.findByTestId('divCocktailName')).getElementsByTagName('div')[0];
        expect(cocktailNameDivEl).toBeDefined();
        expect(cocktailNameDivEl.classList.contains('Mui-error')).toBeFalsy();

        const cocktailNameLabelEl = (await screen.findByTestId('divCocktailName')).getElementsByTagName('label')[0];
        expect(cocktailNameLabelEl).toBeDefined();
        expect(cocktailNameLabelEl.classList.contains('Mui-error')).toBeFalsy();
        expect(cocktailNameLabelEl).toBeDefined();
        expect(cocktailNameLabelEl.textContent).toBe('Name of cocktail *');

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders default cocktail ingredients textbox form state', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const cocktailIngredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        expect(cocktailIngredientsEl).toBeDefined();
        expect(cocktailIngredientsEl.hasAttribute('required')).toBeTruthy();
        expect(cocktailIngredientsEl.value).toBe('');

        const cocktailIngredientsDivEl = (await screen.findByTestId('divCocktailIngredients')).getElementsByTagName('div')[0];
        expect(cocktailIngredientsDivEl).toBeDefined();
        expect(cocktailIngredientsDivEl.classList.contains('Mui-error')).toBeFalsy();

        const cocktailIngredientsLabelEl = (await screen.findByTestId('divCocktailIngredients')).getElementsByTagName('label')[0];
        expect(cocktailIngredientsLabelEl).toBeDefined();
        expect(cocktailIngredientsLabelEl.classList.contains('Mui-error')).toBeFalsy();
        expect(cocktailIngredientsLabelEl.textContent).toBe('Ingredients *');

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders default cocktail directions textbox form state', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const cocktailIngredientsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        expect(cocktailIngredientsEl).toBeDefined();
        expect(cocktailIngredientsEl.hasAttribute('required')).toBeTruthy();
        expect(cocktailIngredientsEl.value).toBe('');

        const cocktailDirectionsDivEl = (await screen.findByTestId('divCocktailDirections')).getElementsByTagName('div')[0];
        expect(cocktailDirectionsDivEl).toBeDefined();
        expect(cocktailDirectionsDivEl.classList.contains('Mui-error')).toBeFalsy();

        const cocktailDirectionsLabelEl = (await screen.findByTestId('divCocktailDirections')).getElementsByTagName('label')[0];
        expect(cocktailDirectionsLabelEl).toBeDefined();
        expect(cocktailDirectionsLabelEl.classList.contains('Mui-error')).toBeFalsy();
        expect(cocktailDirectionsLabelEl.textContent).toBe('Directions *');

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders cocktail name textbox in errored state when modified to blank', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const inputEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        const inputDivEl = (await screen.findByTestId('divCocktailName')).getElementsByTagName('div')[0];

        await userEvent.type(inputEl, 'a');
        expect(inputEl.value).toBe('a');
        expect(inputDivEl.classList.contains('Mui-error')).toBeFalsy();

        await userEvent.type(inputEl, '{backspace}');
        expect(inputEl.value).toBe('');
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders cocktail ingredients textbox in errored state when modified to blank', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const inputEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        const inputDivEl = (await screen.findByTestId('divCocktailIngredients')).getElementsByTagName('div')[0];

        await userEvent.type(inputEl, 'a');
        expect(inputEl.value).toBe('a');
        expect(inputDivEl.classList.contains('Mui-error')).toBeFalsy();

        await userEvent.type(inputEl, '{backspace}');
        expect(inputEl.value).toBe('');
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders cocktail directions textbox in errored state when modified to blank', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const inputEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        const inputDivEl = (await screen.findByTestId('divCocktailDirections')).getElementsByTagName('div')[0];

        await userEvent.type(inputEl, 'a');
        expect(inputEl.value).toBe('a');
        expect(inputDivEl.classList.contains('Mui-error')).toBeFalsy();

        await userEvent.type(inputEl, '{backspace}');
        expect(inputEl.value).toBe('');
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('renders cocktail submit button in default disabled form state', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn.textContent).toBe('Submit');
        expect(btn.hasAttribute('disabled')).toBeTruthy();

        await expectProgress(false);
    });

    test('renders cocktail submit button in enabled state only after all fields have values', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = await screen.findByTestId('btnSubmitRecommendation');
        expect(btn).toHaveAttribute('disabled');

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'a');
        expect(btn.hasAttribute('disabled')).toBeTruthy();

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'a');
        expect(btn.hasAttribute('disabled')).toBeTruthy();

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'a');
        expect(btn.hasAttribute('disabled')).toBeFalsy();

        expect(btn).not.toHaveAttribute('disabled');

        await expectProgress(false);
    });

    test('calls recommendation api successfully and resets form when recaptcha token retrieved', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        vi.mocked(executeRecaptcha).mockImplementation(async (_recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
            callback!('my-token');
            await Promise.resolve();
        });

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = (await screen.findByTestId('btnSubmitRecommendation')) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'success');

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'b');

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'c');

        expect(btn.disabled).toBe(false);

        await userEvent.click(btn);

        expect(btn.disabled).toBe(true);

        // check the toast
        const toast = await screen.findByText('Cocktail recommendation sent!');
        expect(toast).toBeTruthy();

        // Since we successfully called and the api waas success full
        // the form should be cleared out and reset
        expect(nameEl).toHaveValue('');
        expect(ingredientsEl).toHaveValue('');
        expect(directionsEl).toHaveValue('');
        expect(btn.disabled).toBe(true);

        expect(executeRecaptcha).toHaveBeenCalledOnce();
        expect(resetRecaptcha).toHaveBeenCalledTimes(2);
        expect(requestSpy).toHaveBeenCalledOnce();

        await expectProgress(false);
    });

    test('sets cocktail name required error when recommendation api fails with name error', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        vi.mocked(executeRecaptcha).mockImplementation(async (_recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
            callback!('my-token');
            await Promise.resolve();
        });

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = (await screen.findByTestId('btnSubmitRecommendation')) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'failed');

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'b');

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'c');

        expect(btn.disabled).toBe(false);

        await userEvent.click(btn);

        // check the toast
        const toast = await screen.findByText('Cocktail name is required');
        expect(toast).toBeTruthy();

        // Since the api was failed because of name issue
        // the form should not be cleared out and the name error label should be visible
        expect(nameEl).toHaveValue('failed');
        const inputDivEl = (await screen.findByTestId('divCocktailName')).getElementsByTagName('div')[0];
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        expect(ingredientsEl).toHaveValue('b');
        expect(directionsEl).toHaveValue('c');
        expect(btn.disabled).toBe(false);

        expect(executeRecaptcha).toHaveBeenCalledOnce();
        expect(resetRecaptcha).toHaveBeenCalledTimes(2);
        expect(requestSpy).toHaveBeenCalledOnce();

        await expectProgress(false);
    });

    test('sets cocktail ingredients required error when recommendation api fails with error', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        vi.mocked(executeRecaptcha).mockImplementation(async (_recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
            callback!('my-token');
            await Promise.resolve();
        });

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = (await screen.findByTestId('btnSubmitRecommendation')) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'a');

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'failed');

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'c');

        expect(btn.disabled).toBe(false);

        await userEvent.click(btn);

        // check the toast
        const toast = await screen.findByText('Ingredients are required');
        expect(toast).toBeTruthy();

        // Since the api was failed because of name issue
        // the form should not be cleared out and the name error label should be visible
        expect(nameEl).toHaveValue('a');

        expect(ingredientsEl).toHaveValue('failed');
        const inputDivEl = (await screen.findByTestId('divCocktailIngredients')).getElementsByTagName('div')[0];
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        expect(directionsEl).toHaveValue('c');
        expect(btn.disabled).toBe(false);

        expect(executeRecaptcha).toHaveBeenCalledOnce();
        expect(resetRecaptcha).toHaveBeenCalledTimes(2);
        expect(requestSpy).toHaveBeenCalledOnce();

        await expectProgress(false);
    });

    test('sets cocktail directions required error when recommendation api fails with name error', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        vi.mocked(executeRecaptcha).mockImplementation(async (_recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
            callback!('my-token');
            await Promise.resolve();
        });

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = (await screen.findByTestId('btnSubmitRecommendation')) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'a');

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'b');

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'failed');

        expect(btn.disabled).toBe(false);

        await userEvent.click(btn);

        // check the toast
        const toast = await screen.findByText('Directions are required');
        expect(toast).toBeTruthy();

        // Since the api was failed because of name issue
        // the form should not be cleared out and the name error label should be visible
        expect(nameEl).toHaveValue('a');
        expect(ingredientsEl).toHaveValue('b');

        expect(directionsEl).toHaveValue('failed');
        const inputDivEl = (await screen.findByTestId('divCocktailDirections')).getElementsByTagName('div')[0];
        expect(inputDivEl.classList.contains('Mui-error')).toBeTruthy();

        expect(btn.disabled).toBe(false);

        expect(executeRecaptcha).toHaveBeenCalledOnce();
        expect(resetRecaptcha).toHaveBeenCalledTimes(2);

        expect(requestSpy).toHaveBeenCalledOnce();

        await expectProgress(false);
    });

    test('doesnt call api when recaptcha token comes back empty', async () => {
        sessionStorageService.SetOwnedAccountProfileRequestData(getTestOwnedAccountProfile());
        await auth0Tester.isLogged();
        auth0Tester.user = [getTestUser()];

        vi.mocked(executeRecaptcha).mockImplementation(async (_recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
            callback!('');
            await Promise.resolve();
        });

        render(
            <GlobalContext>
                <Auth0Provider {...auth0ProviderOptions} onClientCreated={() => auth0Tester.client}>
                    <MemoryRouter>
                        <CocktailRecommendationForm />
                        <ToastContainer />
                    </MemoryRouter>
                </Auth0Provider>
            </GlobalContext>
        );

        const btn = (await screen.findByTestId('btnSubmitRecommendation')) as HTMLButtonElement;
        expect(btn.disabled).toBe(true);

        const nameEl = (await screen.findByTestId('txtCocktailName')) as HTMLInputElement;
        await userEvent.type(nameEl, 'a');

        const ingredientsEl = (await screen.findByTestId('txtCocktailIngredients')) as HTMLTextAreaElement;
        await userEvent.type(ingredientsEl, 'b');

        const directionsEl = (await screen.findByTestId('txtCocktailDirections')) as HTMLTextAreaElement;
        await userEvent.type(directionsEl, 'c');

        expect(btn.disabled).toBe(false);

        await userEvent.click(btn);

        // check the toast
        const toast = await screen.findByText('Token is invalid');
        expect(toast).toBeTruthy();

        // Since the api was failed because of name issue
        // the form should not be cleared out and the name error label should be visible
        expect(nameEl).toHaveValue('a');
        expect(ingredientsEl).toHaveValue('b');
        expect(directionsEl).toHaveValue('c');
        expect(btn.disabled).toBe(false);

        expect(executeRecaptcha).toHaveBeenCalledOnce();
        expect(resetRecaptcha).toHaveBeenCalledOnce();
        expect(requestSpy).not.toHaveBeenCalled();

        await expectProgress(false);
    });
});
