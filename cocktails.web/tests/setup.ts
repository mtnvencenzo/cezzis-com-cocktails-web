import { afterEach, vi, expect, beforeAll, afterAll } from 'vitest';
import { cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MsalReactTesterPlugin } from 'msal-react-tester';
import { setupServer } from 'msw/node';
import 'vitest-location-mock';
import { AccountInfo } from '@azure/msal-browser';
import {
    AccountCocktailRatingsModel,
    AccountCocktailRatingsRs,
    AccountOwnedProfileRs,
    CocktailModel,
    CocktailUpdatedNotificationModel,
    DisplayThemeModel,
    GlasswareTypeModel,
    IngredientApplicationModel,
    IngredientRequirementTypeModel,
    IngredientTypeModel,
    PreparationTypeModel,
    UofMTypeModel
} from '../src/api/cocktailsApi/cocktailsApiClient';

/* eslint-disable arrow-body-style */
vi.mock('../src/utils/envConfig', () => {
    return {
        getWindowEnv: vi.fn(() => ({
            VITE_NODE_ENV: 'test',
            VITE_PORT: '123',
            VITE_REDIRECT_URI: 'http://localhost:123/',
            VITE_RESET_PASSWORD_REDIRECT_URI: 'https://localhost:123/account/profile-center/',
            VITE_INSTRUMENTATION_KEY: '00000000-0000-0000-0000-000000000000',
            VITE_B2C_TENANT: 'cezzis',
            VITE_B2C_CLIENT_ID: '00000000-0000-0000-0000-000000000000',
            VITE_B2C_POLICY: 'B2C_1_SignInSignUp_Policy',
            VITE_B2C_RESET_PASSWORD_POLICY: 'B2C_1_ResetPassword_Policy',
            VITE_COCKTAILS_API_URL: 'http://localhost:0000',
            VITE_COCKTAILS_IMAGE_URL: 'http://localhost:0000/images',
            VITE_RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            VITE_COCKTAILS_APIM_SUBSCRIPTION_KEY: '383hudiudhUJK984jdus7HDY',
            VITE_LOGIN_SUBDOMAIN: 'login'
        }))
    };
});
/* eslint-enable arrow-body-style */

MsalReactTesterPlugin.init({
    spyOn: vi.spyOn,
    expect,
    resetAllMocks: vi.resetAllMocks,
    waitingFor: waitFor
});

Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true
});

export const server = setupServer();
export const requestSpy = vi.fn();

server.events.on('request:start', requestSpy);

afterEach(() => {
    cleanup();
    server.resetHandlers();
    vi.clearAllMocks();
});

beforeAll(() => server.listen());
afterAll(() => server.close());

export const getTestOwnedAccountProfile = (): AccountOwnedProfileRs => ({
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

export const getTestOwnedAccountCocktailRatings = (ratings: AccountCocktailRatingsModel[] = []): AccountCocktailRatingsRs => ({
    ratings: ratings ?? []
});

export const getTestAccountInfo = (): AccountInfo => ({
    homeAccountId: '',
    username: '',
    localAccountId: '',
    environment: '',
    tenantId: '',
    idTokenClaims: {
        given_name: 'Billy',
        family_name: 'Simms'
    }
});

export const getTestCocktails = (): CocktailModel[] => [
    {
        id: 'adonis',
        content: 'The Adonis',
        title: '',
        searchableTitles: ['The Adonis'],
        tags: ['tag1', 'tag2'],
        rating: {
            oneStars: 1,
            twoStars: 2,
            threeStars: 3,
            fourStars: 5,
            fiveStars: 1,
            totalStars: 39,
            rating: 3,
            ratingCount: 12
        },
        ingredients: [
            {
                name: 'Ingredient 1',
                units: 1,
                uoM: UofMTypeModel.Ounces,
                types: [IngredientTypeModel.Fruit, IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Additional],
                preparation: PreparationTypeModel.None,
                suggestions: 'Some friendly suggestions',
                requirement: IngredientRequirementTypeModel.Optional,
                display: '1 oz Ingredient 1'
            },
            {
                name: 'Ingredient 2',
                units: 2,
                uoM: UofMTypeModel.Dashes,
                types: [IngredientTypeModel.Protein, IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Additional],
                preparation: PreparationTypeModel.None,
                suggestions: 'Some friendly suggestions for ingredient 2',
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 dashes Ingredient 2'
            }
        ],
        serves: 1,
        glassware: [GlasswareTypeModel.WineGlass, GlasswareTypeModel.Coupe],
        descriptiveTitle: 'This is the Adonis',
        description: 'The adonis is a cocktail',
        isIba: true,
        publishedOn: new Date(),
        modifiedOn: new Date(),
        searchTiles: [],
        mainImages: [],
        prepTimeMinutes: 10,
        instructions: [
            {
                display: 'instruction 1',
                order: 0
            },
            {
                display: 'instruction 2',
                order: 1
            }
        ]
    }
];
