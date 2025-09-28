import { afterEach, vi, expect, beforeAll, afterAll } from 'vitest';
import { cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import 'vitest-location-mock';
import {
    AccountCocktailRatingsModel,
    AccountCocktailRatingsRs,
    AccountOwnedProfileRs,
    CocktailModel,
    CocktailsListModel,
    CocktailUpdatedNotificationModel,
    DisplayThemeModel,
    GlasswareTypeModel,
    IngredientApplicationModel,
    IngredientRequirementTypeModel,
    IngredientTypeModel,
    PreparationTypeModel,
    UofMTypeModel
} from '../src/api/cocktailsApi/cocktailsApiClient';
import { User } from '../src/components/Auth0Provider';
import { Auth0ReactTesterPlugin } from '../src/auth0Mocks/Auth0ReactTesterPlugin';

/* eslint-disable arrow-body-style */
vi.mock('../src/utils/envConfig', () => {
    return {
        getWindowEnv: vi.fn(() => ({
            VITE_NODE_ENV: 'test',
            VITE_PORT: '123',
            VITE_AUTH0_REDIRECT_URI: 'http://localhost:123/',

            VITE_TELEMETRY_KEY: '00000000-0000-0000-0000-000000000000',
            VITE_TELEMETRY_URL: '',

            VITE_COCKTAILS_API_URL: 'http://localhost:0000',
            VITE_COCKTAILS_IMAGE_URL: 'http://localhost:0000/images',
            VITE_COCKTAILS_APIM_SUBSCRIPTION_KEY: '383hudiudhUJK984jdus7HDY',

            VITE_RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            VITE_LOGIN_SUBDOMAIN: 'login'
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
        ]
    }
];

export const getTestCocktailsList = (): CocktailsListModel[] => [
    {
        id: 'absinthe-frappe',
        title: 'Absinthe Frappé',
        descriptiveTitle: 'The Absinthe Frappé: A New Orleans Classic',
        rating: 5,
        ingredients: [
            {
                name: 'Absinthe',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Absinthe',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Simple Syrup',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1/2 oz Simple Syrup',
                units: 0.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Syrup],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Water',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 oz Water',
                units: 2,
                preparation: PreparationTypeModel.Chilled,
                suggestions: '',
                types: [IngredientTypeModel.Dilution],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Mint Sprig',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Optional,
                display: 'Mint Sprig for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Herb],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-absinthe-frappe-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Rocks, GlasswareTypeModel.Collins]
    },
    {
        id: 'adonis',
        title: 'Adonis',
        descriptiveTitle: 'The Adonis Cocktail: A New York Legend',
        rating: 5,
        ingredients: [
            {
                name: 'Fino Sherry',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 oz Fino Sherry',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Wine],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Sweet Vermouth',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Orange Bitters',
                uoM: UofMTypeModel.Dashes,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 dashes Orange Bitters',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: "Preferably Regans'",
                types: [IngredientTypeModel.Bitters],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Peel',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Orange Peel for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-adonis-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'airmail',
        title: 'AirMail',
        descriptiveTitle: 'The AirMail Cocktail: A Sparkling Tribute to Aviation',
        rating: 5,
        ingredients: [
            {
                name: 'Gold Rum',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Gold Rum',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: 'Preferably Appleton or ElDorado',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Lime Juice',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '3/4 oz Lime Juice',
                units: 0.75,
                preparation: PreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [IngredientTypeModel.Juice],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Honey Syrup',
                uoM: UofMTypeModel.None,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Honey Syrup',
                units: 0.75,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Syrup],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Champagne',
                uoM: UofMTypeModel.Topoff,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Champagne (top off)',
                units: 0,
                preparation: PreparationTypeModel.Chilled,
                suggestions: '',
                types: [IngredientTypeModel.Champagne],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Lime Peel',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Lime Peel for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-airmail-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Collins]
    },
    {
        id: 'americano',
        title: 'Americano',
        descriptiveTitle: 'The Americano Cocktail: A Timeless Italian Classic',
        rating: 0,
        ingredients: [
            {
                name: 'Campari',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Campari',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Sweet Vermouth',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Soda Water',
                uoM: UofMTypeModel.Topoff,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Soda Water (top off)',
                units: 0,
                preparation: PreparationTypeModel.Chilled,
                suggestions: '',
                types: [IngredientTypeModel.Dilution],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Slice',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Orange Slice for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-americano-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Rocks, GlasswareTypeModel.Collins]
    },
    {
        id: 'aperol-spritz',
        title: 'Aperol Spritz',
        descriptiveTitle: 'The Aperol Spritz: A Taste of Italian Sunshine',
        rating: 5,
        ingredients: [
            {
                name: 'Aperol',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Aperol',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Dry Prosecco',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 oz Dry Prosecco',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Wine],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Soda Water',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Soda Water',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Dilution],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Slice',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Orange Slice for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-aperol-spritz-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.WineGlass, GlasswareTypeModel.Collins]
    },
    {
        id: 'aviation',
        title: 'Aviation',
        descriptiveTitle: 'The Aviation Cocktail: A Sky-High Elixir',
        rating: 4,
        ingredients: [
            {
                name: 'Gin',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 oz Gin',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Maraschino Liqueur',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1/4 oz Maraschino Liqueur',
                units: 0.25,
                preparation: PreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Crème de Violette',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1/4 oz Crème de Violette',
                units: 0.25,
                preparation: PreparationTypeModel.None,
                suggestions: 'Preferably Rothman & Winter',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Lemon Juice',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1/2 oz Lemon Juice',
                units: 0.5,
                preparation: PreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [IngredientTypeModel.Juice],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Brandied Cherry',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Brandied Cherry for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-aviation-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bamboo',
        title: 'Bamboo',
        descriptiveTitle: 'The Bamboo Cocktail: A Zen Elixir',
        rating: 5,
        ingredients: [
            {
                name: 'Fino Sherry',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Fino Sherry',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Wine],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Dry Vermouth',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Dry Vermouth',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Rich Simple Syrup',
                uoM: UofMTypeModel.Teaspoon,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 tsp Rich Simple Syrup',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Syrup],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Angostura Bitters',
                uoM: UofMTypeModel.Dashes,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 dashes Angostura Bitters',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Bitters],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Bitters',
                uoM: UofMTypeModel.Dashes,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 dashes Orange Bitters',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Bitters],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Lemon Twist',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Lemon Twist for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bamboo-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bees-knees',
        title: "Bee's Knees",
        descriptiveTitle: "The Bee's Knees Cocktail: A Roaring Twenties Delight",
        rating: 5,
        ingredients: [
            {
                name: 'Gin',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 1/2 oz Gin',
                units: 1.5,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Lemon Juice',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '3/4 oz Lemon Juice',
                units: 0.75,
                preparation: PreparationTypeModel.FreshlySqueezed,
                suggestions: '',
                types: [IngredientTypeModel.Juice],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Honey Syrup',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '3/4 oz Honey Syrup',
                units: 0.75,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Syrup],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Lemon Wheel',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Lemon Wheel for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: true,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bees-knees-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass]
    },
    {
        id: 'bicicletta',
        title: 'Bicicletta',
        descriptiveTitle: 'The Bicicletta Cocktail: A Breezy Italian Sip',
        rating: 5,
        ingredients: [
            {
                name: 'Campari',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '2 oz Campari',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Dry White Wine',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '3 oz Dry White Wine',
                units: 3,
                preparation: PreparationTypeModel.None,
                suggestions: 'Pinot Grigio or Sauvignon Blanc',
                types: [IngredientTypeModel.Wine],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Soda Water',
                uoM: UofMTypeModel.Topoff,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Soda Water (top off)',
                units: 0,
                preparation: PreparationTypeModel.Chilled,
                suggestions: '',
                types: [IngredientTypeModel.Dilution],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Wheels',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Orange Wheels for garnishment',
                units: 2,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bicicletta-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.WineGlass]
    },
    {
        id: 'bijou',
        title: 'Bijou',
        descriptiveTitle: 'Bijou Cocktail: A Jewel of the Bar',
        rating: 0,
        ingredients: [
            {
                name: 'Gin',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Gin',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Spirit],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Sweet Vermouth',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 oz Sweet Vermouth',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Base]
            },
            {
                name: 'Green Chartreuse',
                uoM: UofMTypeModel.Ounces,
                requirement: IngredientRequirementTypeModel.Required,
                display: '3/4 oz Green Chartreuse',
                units: 0.75,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Liqueur],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Orange Bitters',
                uoM: UofMTypeModel.Dashes,
                requirement: IngredientRequirementTypeModel.Required,
                display: '1 dash Orange Bitters',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: '',
                types: [IngredientTypeModel.Bitters],
                applications: [IngredientApplicationModel.Additional]
            },
            {
                name: 'Brandied Cherry',
                uoM: UofMTypeModel.Item,
                requirement: IngredientRequirementTypeModel.Required,
                display: 'Brandied Cherry for garnishment',
                units: 1,
                preparation: PreparationTypeModel.None,
                suggestions: 'Preferably Luxardo',
                types: [IngredientTypeModel.Fruit],
                applications: [IngredientApplicationModel.Garnishment]
            }
        ],
        isIba: false,
        serves: 1,
        prepTimeMinutes: 10,
        mainImages: [],
        searchTiles: ['https://cdn.cezzis.com/cocktails/traditional-bijou-cocktail-300x300.webp'],
        glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass]
    }
];
