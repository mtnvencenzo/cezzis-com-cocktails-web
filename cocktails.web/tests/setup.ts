import { afterEach, vi, expect, beforeAll, afterAll } from 'vitest';
import { cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import 'vitest-location-mock';
import { User } from '../src/components/Auth0Provider';
import { Auth0ReactTesterPlugin } from '../src/auth0Mocks/Auth0ReactTesterPlugin';
import {
    CocktailSearchModel,
    CocktailSearchGlasswareTypeModel,
    CocktailSearchIngredientApplicationTypeModel,
    CocktailSearchIngredientRequirementTypeModel,
    CocktailSearchIngredientTypeModel,
    CocktailSearchPreparationTypeModel,
    CocktailSearchUofMTypeModel
} from '../src/api/aisearchApi/models';
import { AccountCocktailRatingsModel, AccountCocktailRatingsRs, AccountOwnedProfileRs, CocktailUpdatedNotificationModel, DisplayThemeModel } from '../src/api/accountsApi';
import { CocktailModel, GlasswareTypeModel, IngredientApplicationModel, IngredientRequirementTypeModel, IngredientTypeModel, PreparationTypeModel, UofMTypeModel } from '../src/api/cocktailsApi';

/* eslint-disable arrow-body-style */
vi.mock('../src/utils/envConfig', () => {
    return {
        getWindowEnv: vi.fn(() => ({
            VITE_NODE_ENV: 'test',
            VITE_PORT: '123',

            VITE_TELEMETRY_KEY: '00000000-0000-0000-0000-000000000000',
            VITE_TELEMETRY_URL: '',

            VITE_AUTH0_DOMAIN: 'login.cezzis.com',
            VITE_AUTH0_CLIENT_ID: '00000000000000000000000000000000',
            VITE_AUTH0_REDIRECT_URI: 'https://localhost:0000/iam/auth/redirect/',
            VITE_AUTH0_COCKTAILS_API_AUDIENCE: 'https://cezzis-cocktails-api',
            VITE_AUTH0_ACCOUNTS_API_AUDIENCE: 'https://cezzis-accounts-api',

            VITE_COCKTAILS_API_URL: 'http://localhost:0000',
            VITE_COCKTAILS_IMAGE_URL: 'http://localhost:0000/images',
            VITE_COCKTAILS_APIM_SUBSCRIPTION_KEY: '383hudiudhUJK984jdus7HDY',
            VITE_RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',

            VITE_AISEARCH_API_URL: 'http://localhost:0001',
            VITE_AISEARCH_APIM_SUBSCRIPTION_KEY: '383hudiudhUJK984jdus7HDY',

            VITE_ACCOUNTS_API_URL: 'http://localhost:0002',
            VITE_ACCOUNTS_APIM_SUBSCRIPTION_KEY: '383hudiudhUJK984jdus7HDY'
        }))
    };
});
/* eslint-enable arrow-body-style */

Auth0ReactTesterPlugin.init({
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

export const getTestUser = (): User => ({
    sub: 'auth0|123456789',
    email: 'john.doe@example.com',
    name: 'John Doe',
    picture: 'https://example.com/john-doe.jpg',
    updated_at: '2021-01-01T00:00:00.000Z',
    nickname: 'johnny',
    email_verified: true,
    given_name: 'John',
    family_name: 'Doe',
    locale: 'en-US'
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
        ],
        keywords: {
            keywordsBaseSpirit: ['Spirit'],
            keywordsFlavorProfile: ['Fruity'],
            keywordsOccasion: ['Occasion1'],
            keywordsTechnique: ['Technique1'],
            keywordsCocktailFamily: ['Family1'],
            keywordsMood: ['Mood1'],
            keywordsSearchTerms: ['SearchTerm1', 'SearchTerm2'],
            keywordsSeason: ['Season1'],
            keywordsSpiritSubtype: ['SpiritSubtype1'],
            keywordsStrength: 'Medium',
            keywordsTemperature: 'Cold'
        }
    }
];

export const getTestCocktailsList = (): CocktailSearchModel[] => [
    {
        id: 'absinthe-frappe',
        title: 'Absinthe Frappé',
        descriptiveTitle: 'The Absinthe Frappé: A New Orleans Classic',
        rating: 5,
        ingredients: [
            {
                name: 'Absinthe',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Absinthe',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Simple Syrup',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1/2 oz Simple Syrup',
                units: 0.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Syrup],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Water',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 oz Water',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.Chilled,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Dilution],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Mint Sprig',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Optional,
                display: 'Mint Sprig for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Herb],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-absinthe-frappe-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Rocks, CocktailSearchGlasswareTypeModel.Collins]
    },
    {
        id: 'adonis',
        title: 'Adonis',
        descriptiveTitle: 'The Adonis Cocktail: A New York Legend',
        rating: 5,
        ingredients: [
            {
                name: 'Fino Sherry',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 oz Fino Sherry',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Wine],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Sweet Vermouth',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Orange Bitters',
                uoM: CocktailSearchUofMTypeModel.Dashes,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 dashes Orange Bitters',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: "Preferably Regans'",
                types: [CocktailSearchIngredientTypeModel.Bitters],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Peel',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Orange Peel for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-adonis-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Coupe, CocktailSearchGlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'airmail',
        title: 'AirMail',
        descriptiveTitle: 'The AirMail Cocktail: A Sparkling Tribute to Aviation',
        rating: 5,
        ingredients: [
            {
                name: 'Gold Rum',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Gold Rum',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Preferably Appleton or ElDorado',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Lime Juice',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '3/4 oz Lime Juice',
                units: 0.75,
                preparation: CocktailSearchPreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Juice],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Honey Syrup',
                uoM: CocktailSearchUofMTypeModel.None,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Honey Syrup',
                units: 0.75,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Syrup],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Champagne',
                uoM: CocktailSearchUofMTypeModel.Topoff,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Champagne (top off)',
                units: 0,
                preparation: CocktailSearchPreparationTypeModel.Chilled,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Champagne],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Lime Peel',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Lime Peel for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-airmail-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Collins]
    },
    {
        id: 'americano',
        title: 'Americano',
        descriptiveTitle: 'The Americano Cocktail: A Timeless Italian Classic',
        rating: 0,
        ingredients: [
            {
                name: 'Campari',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Campari',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Sweet Vermouth',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Soda Water',
                uoM: CocktailSearchUofMTypeModel.Topoff,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Soda Water (top off)',
                units: 0,
                preparation: CocktailSearchPreparationTypeModel.Chilled,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Dilution],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Slice',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Orange Slice for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-americano-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Rocks, CocktailSearchGlasswareTypeModel.Collins]
    },
    {
        id: 'aperol-spritz',
        title: 'Aperol Spritz',
        descriptiveTitle: 'The Aperol Spritz: A Taste of Italian Sunshine',
        rating: 5,
        ingredients: [
            {
                name: 'Aperol',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Aperol',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Dry Prosecco',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 oz Dry Prosecco',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Wine],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Soda Water',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Soda Water',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Dilution],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Slice',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Orange Slice for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-aperol-spritz-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.WineGlass, CocktailSearchGlasswareTypeModel.Collins]
    },
    {
        id: 'aviation',
        title: 'Aviation',
        descriptiveTitle: 'The Aviation Cocktail: A Sky-High Elixir',
        rating: 4,
        ingredients: [
            {
                name: 'Gin',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 oz Gin',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Maraschino Liqueur',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1/4 oz Maraschino Liqueur',
                units: 0.25,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Crème de Violette',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1/4 oz Crème de Violette',
                units: 0.25,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Preferably Rothman & Winter',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Lemon Juice',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1/2 oz Lemon Juice',
                units: 0.5,
                preparation: CocktailSearchPreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Juice],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Brandied Cherry',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Brandied Cherry for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-aviation-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Coupe, CocktailSearchGlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bamboo',
        title: 'Bamboo',
        descriptiveTitle: 'The Bamboo Cocktail: A Zen Elixir',
        rating: 5,
        ingredients: [
            {
                name: 'Fino Sherry',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Fino Sherry',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Wine],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Dry Vermouth',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Dry Vermouth',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Rich Simple Syrup',
                uoM: CocktailSearchUofMTypeModel.Teaspoon,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 tsp Rich Simple Syrup',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Syrup],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Angostura Bitters',
                uoM: CocktailSearchUofMTypeModel.Dashes,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 dashes Angostura Bitters',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Bitters],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Bitters',
                uoM: CocktailSearchUofMTypeModel.Dashes,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 dashes Orange Bitters',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Bitters],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Lemon Twist',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Lemon Twist for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bamboo-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Coupe, CocktailSearchGlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bees-knees',
        title: "Bee's Knees",
        descriptiveTitle: "The Bee's Knees Cocktail: A Roaring Twenties Delight",
        rating: 5,
        ingredients: [
            {
                name: 'Gin',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Gin',
                units: 1.5,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Lemon Juice',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '3/4 oz Lemon Juice',
                units: 0.75,
                preparation: CocktailSearchPreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Juice],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Honey Syrup',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '3/4 oz Honey Syrup',
                units: 0.75,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Syrup],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Lemon Wheel',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Lemon Wheel for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bees-knees-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Coupe, CocktailSearchGlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bicicletta',
        title: 'Bicicletta',
        descriptiveTitle: 'The Bicicletta Cocktail: A Breezy Italian Sip',
        rating: 5,
        ingredients: [
            {
                name: 'Campari',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '2 oz Campari',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Dry White Wine',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '3 oz Dry White Wine',
                units: 3,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Pinot Grigio or Sauvignon Blanc',
                types: [CocktailSearchIngredientTypeModel.Wine],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Soda Water',
                uoM: CocktailSearchUofMTypeModel.Topoff,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Soda Water (top off)',
                units: 0,
                preparation: CocktailSearchPreparationTypeModel.Chilled,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Dilution],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Wheels',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Orange Wheels for garnishment',
                units: 2,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bicicletta-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.WineGlass]
    },
    {
        id: 'bijou',
        title: 'Bijou',
        descriptiveTitle: 'Bijou Cocktail: A Jewel of the Bar',
        rating: 0,
        ingredients: [
            {
                name: 'Gin',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Gin',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Spirit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 oz Sweet Vermouth',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Base]
            },
            {
                name: 'Green Chartreuse',
                uoM: CocktailSearchUofMTypeModel.Ounces,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '3/4 oz Green Chartreuse',
                units: 0.75,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Liqueur],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Orange Bitters',
                uoM: CocktailSearchUofMTypeModel.Dashes,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: '1 dash Orange Bitters',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: '',
                types: [CocktailSearchIngredientTypeModel.Bitters],
                applications: [CocktailSearchIngredientApplicationTypeModel.Additional]
            },
            {
                name: 'Brandied Cherry',
                uoM: CocktailSearchUofMTypeModel.Item,
                requirement: CocktailSearchIngredientRequirementTypeModel.Required,
                display: 'Brandied Cherry for garnishment',
                units: 1,
                preparation: CocktailSearchPreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [CocktailSearchIngredientTypeModel.Fruit],
                applications: [CocktailSearchIngredientApplicationTypeModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bijou-cocktail-300x300.webp'],
        glassware: [CocktailSearchGlasswareTypeModel.Coupe, CocktailSearchGlasswareTypeModel.CocktailGlass]
    }
];
