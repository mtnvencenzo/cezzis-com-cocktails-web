import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { http, HttpResponse } from 'msw';
import CocktailFiltersDialog from './CocktailFiltersDialog';
import { useCocktailSearch } from '../../components/CocktailSearchContext';
import { server } from '../../../tests/setup';
import { IngredientFilterModel, CocktailIngredientFiltersRs } from '../../api/cocktailsApi/cocktailsApiClient';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';
import GlobalContext from '../../components/GlobalContexts';

describe('Cocktail Filters Dialog', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const getEmptyFiltersResponse = (): CocktailIngredientFiltersRs => ({
        glassware: [],
        spirits: [],
        liqueurs: [],
        fruits: [],
        vegetables: [],
        herbsAndFlowers: [],
        syrupsAndSauces: [],
        bitters: [],
        proteins: [],
        juices: [],
        dilutions: [],
        beerWineChampagne: [],
        eras: []
    });

    const getCompleteFiltersResponse = (): CocktailIngredientFiltersRs => ({
        glassware: [
            {
                id: 'glassware-cocktail-glass',
                name: 'Cocktail Glass'
            },
            {
                id: 'glassware-collins',
                name: 'Collins'
            },
            {
                id: 'glassware-copper-mug',
                name: 'Copper Mug'
            },
            {
                id: 'glassware-coupe',
                name: 'Coupe'
            },
            {
                id: 'glassware-double-rocks',
                name: 'Double Rocks'
            },
            {
                id: 'glassware-fizz',
                name: 'Fizz'
            },
            {
                id: 'glassware-flute',
                name: 'Flute'
            },
            {
                id: 'glassware-highball',
                name: 'Highball'
            },
            {
                id: 'glassware-hollowed-pineapple',
                name: 'Hollowed Pineapple'
            },
            {
                id: 'glassware-hurricane',
                name: 'Hurricane'
            },
            {
                id: 'glassware-julep-tin',
                name: 'Julep Tin'
            },
            {
                id: 'glassware-lowball',
                name: 'Lowball'
            },
            {
                id: 'glassware-pint-glass',
                name: 'Pint Glass'
            },
            {
                id: 'glassware-rocks',
                name: 'Rocks'
            },
            {
                id: 'glassware-scorpion-bowl',
                name: 'Scorpion Bowl'
            },
            {
                id: 'glassware-snifter',
                name: 'Snifter'
            },
            {
                id: 'glassware-tiki-mug',
                name: 'Tiki Mug'
            },
            {
                id: 'glassware-wine-glass',
                name: 'Wine Glass'
            }
        ],
        spirits: [
            {
                id: 'spirit-absinthe',
                name: 'Absinthe'
            },
            {
                id: 'spirit-bourbon',
                name: 'Bourbon'
            },
            {
                id: 'spirit-cachaça',
                name: 'Cachaça'
            },
            {
                id: 'spirit-campari',
                name: 'Campari'
            },
            {
                id: 'spirit-cognac',
                name: 'Cognac'
            },
            {
                id: 'spirit-gin',
                name: 'Gin'
            },
            {
                id: 'spirit-peach-brandy',
                name: 'Peach Brandy'
            },
            {
                id: 'spirit-pisco',
                name: 'Pisco'
            },
            {
                id: 'spirit-rum',
                name: 'Rum'
            },
            {
                id: 'spirit-151-proof-rum',
                name: 'Rum (151 Proof)'
            },
            {
                id: 'spirit-aged-rum',
                name: 'Rum (Aged)'
            },
            {
                id: 'spirit-rhum-agricole',
                name: 'Rum (Agricole)'
            },
            {
                id: 'spirit-añejo-rum',
                name: 'Rum (Añejo)'
            },
            {
                id: 'spirit-blackstrap-rum',
                name: 'Rum (Blackstrap)'
            },
            {
                id: 'spirit-dark-caribbean-rum',
                name: 'Rum (Dark Caribbean)'
            },
            {
                id: 'spirit-dark-rum',
                name: 'Rum (Dark)'
            },
            {
                id: 'spirit-demerara-rum',
                name: 'Rum (Demerara)'
            },
            {
                id: 'spirit-gold-rum',
                name: 'Rum (Gold)'
            },
            {
                id: 'spirit-jamaican-rum',
                name: 'Rum (Jamaican)'
            },
            {
                id: 'spirit-light-rum',
                name: 'Rum (Light)'
            },
            {
                id: 'spirit-puerto-rican-rum',
                name: 'Rum (Puerto Rican)'
            },
            {
                id: 'spirit-virgin-islands-rum',
                name: 'Rum (Virgin Islands)'
            },
            {
                id: 'spirit-white-rhum-agricole',
                name: 'Rum (White Agricole)'
            },
            {
                id: 'spirit-white-rum',
                name: 'Rum (White)'
            },
            {
                id: 'spirit-rye',
                name: 'Rye'
            },
            {
                id: 'spirit-scotch',
                name: 'Scotch'
            },
            {
                id: 'spirit-blended-scotch',
                name: 'Scotch (Blended)'
            },
            {
                id: 'spirit-tequila',
                name: 'Tequila'
            },
            {
                id: 'spirit-blanco-tequila',
                name: 'Tequila (Blanco)'
            },
            {
                id: 'spirit-vodka',
                name: 'Vodka'
            }
        ],
        liqueurs: [
            {
                id: 'liqueur-amer-picon',
                name: 'Amer Picon'
            },
            {
                id: 'liqueur-aperol',
                name: 'Aperol'
            },
            {
                id: 'liqueur-bénédictine',
                name: 'Bénédictine'
            },
            {
                id: 'liqueur-cherry-heering',
                name: 'Cherry Heering'
            },
            {
                id: 'liqueur-clément-créole-shrubb',
                name: 'Clément Créole Shrubb'
            },
            {
                id: 'liqueur-cognac',
                name: 'Cognac'
            },
            {
                id: 'liqueur-cointreau',
                name: 'Cointreau'
            },
            {
                id: 'liqueur-crème-de-violette',
                name: 'Crème de Violette'
            },
            {
                id: 'liqueur-dons-mix',
                name: "Don's Mix"
            },
            {
                id: 'liqueur-dry-curaçao',
                name: 'Dry Curaçao'
            },
            {
                id: 'liqueur-dry-vermouth',
                name: 'Dry Vermouth'
            },
            {
                id: 'liqueur-grand-marnier',
                name: 'Grand Marnier'
            },
            {
                id: 'liqueur-green-chartreuse',
                name: 'Green Chartreuse'
            },
            {
                id: 'liqueur-lillet-blanc',
                name: 'Lillet Blanc'
            },
            {
                id: 'liqueur-maraschino-liqueur',
                name: 'Maraschino Liqueur'
            },
            {
                id: 'liqueur-orange-liqueur',
                name: 'Orange Liqueur'
            },
            {
                id: 'liqueur-orgeat',
                name: 'Orgeat'
            },
            {
                id: 'liqueur-pimms-no-1',
                name: "Pimm's No.1"
            },
            {
                id: 'liqueur-sloe-gin',
                name: 'Sloe Gin'
            },
            {
                id: 'liqueur-sweet-vermouth',
                name: 'Sweet Vermouth'
            },
            {
                id: 'liqueur-velvet-falernum',
                name: 'Velvet Falernum'
            }
        ],
        fruits: [
            {
                id: 'fruit-brandied-cherry',
                name: 'Brandied Cherries'
            },
            {
                id: 'fruit-citrus-wheels',
                name: 'Citrus Wheels'
            },
            {
                id: 'fruit-lime-peel',
                name: 'Fresh Limes'
            },
            {
                id: 'fruit-orange-peel',
                name: 'Fresh Oranges'
            },
            {
                id: 'fruit-grapefruit-peel',
                name: 'Grapefruits'
            },
            {
                id: 'fruit-lemon-twist',
                name: 'Lemons'
            },
            {
                id: 'fruit-lime',
                name: 'Limes'
            },
            {
                id: 'fruit-orange-slice',
                name: 'Oranges'
            },
            {
                id: 'fruit-pineapple-wedge',
                name: 'Pineapples'
            },
            {
                id: 'fruit-raspberries',
                name: 'Raspberries'
            },
            {
                id: 'fruit-seasonal-berries',
                name: 'Seasonal Berries'
            }
        ],
        vegetables: [
            {
                id: 'vegetable-celery-stalk',
                name: 'Celery Stalk'
            },
            {
                id: 'vegetable-cocktail-onion',
                name: 'Cocktail Onion'
            },
            {
                id: 'vegetable-cucumber-spear',
                name: 'Fresh Cucumbers'
            }
        ],
        herbsAndFlowers: [
            {
                id: 'herb-black-tea',
                name: 'Black Tea'
            },
            {
                id: 'herb-cinnamon-sticks',
                name: 'Cinnamon Sticks'
            },
            {
                id: 'herb-mint-sprig',
                name: 'Fresh Mint'
            },
            {
                id: 'herb-grated-cinnamon',
                name: 'Grated Cinnamon'
            },
            {
                id: 'herb-grated-nutmeg',
                name: 'Grated Nutmeg'
            },
            {
                id: 'flowers-orchids',
                name: 'Orchids'
            },
            {
                id: 'herb-pepper',
                name: 'Pepper'
            },
            {
                id: 'herb-salt',
                name: 'Salt'
            },
            {
                id: 'herb-sugar',
                name: 'Sugar'
            }
        ],
        syrupsAndSauces: [
            {
                id: 'syrup-agave-nectar',
                name: 'Agave Nectar'
            },
            {
                id: 'syrup-cane-syrup',
                name: 'Cane Syrup'
            },
            {
                id: 'syrup-grenadine',
                name: 'Grenadine'
            },
            {
                id: 'syrup-honey-syrup',
                name: 'Honey Syrup'
            },
            {
                id: 'sauce-hot-sauce',
                name: 'Hot Sauce'
            },
            {
                id: 'syrup-rich-simple-syrup',
                name: 'Rich Simple Syrup'
            },
            {
                id: 'syrup-scant-simple-syrup',
                name: 'Scant Simple Syrup'
            },
            {
                id: 'syrup-simple-syrup',
                name: 'Simple Syrup'
            },
            {
                id: 'sauce-worcestershire',
                name: 'Worcestershire'
            }
        ],
        bitters: [
            {
                id: 'bitters-angostura-bitters',
                name: 'Angostura Bitters'
            },
            {
                id: 'bitters-grapefruit-bitters',
                name: 'Grapefruit Bitters'
            },
            {
                id: 'bitters-orange-bitters',
                name: 'Orange Bitters'
            },
            {
                id: 'bitters-peychauds-bitters',
                name: "Peychaud's Bitters"
            }
        ],
        proteins: [
            {
                id: 'protein-egg-white',
                name: 'Egg White'
            },
            {
                id: 'protein-whole-egg',
                name: 'Whole Egg'
            }
        ],
        juices: [
            {
                id: 'juice-apple-cider',
                name: 'Apple Cider'
            },
            {
                id: 'juice-coconut-cream',
                name: 'Coconut Cream'
            },
            {
                id: 'juice-coconut-milk',
                name: 'Coconut Milk'
            },
            {
                id: 'juice-cream',
                name: 'Cream'
            },
            {
                id: 'juice-grapefruit-juice',
                name: 'Grapefruit Juice'
            },
            {
                id: 'juice-lemon-juice',
                name: 'Lemon Juice'
            },
            {
                id: 'juice-lime-juice',
                name: 'Lime Juice'
            },
            {
                id: 'juice-orange-flower-water',
                name: 'Orange Flower Water'
            },
            {
                id: 'juice-orange-juice',
                name: 'Orange Juice'
            },
            {
                id: 'juice-pineapple-juice',
                name: 'Pineapple Juice'
            },
            {
                id: 'juice-tomato-juice',
                name: 'Tomato Juice'
            }
        ],
        dilutions: [
            {
                id: 'dilution-soda-water',
                name: 'Soda Water'
            },
            {
                id: 'dilution-tonic-water',
                name: 'Tonic Water'
            },
            {
                id: 'dilution-water',
                name: 'Water'
            }
        ],
        beerWineChampagne: [
            {
                id: 'champagne-champagne',
                name: 'Champagne'
            },
            {
                id: 'wine-dry-oloroso-sherry',
                name: 'Dry Oloroso Sherry'
            },
            {
                id: 'wine-dry-prosecco',
                name: 'Dry Prosecco'
            },
            {
                id: 'wine-dry-white-wine',
                name: 'Dry White Wine'
            },
            {
                id: 'beer-dry-spicy-ginger-beer',
                name: 'Dry, Spicy Ginger Beer'
            },
            {
                id: 'wine-fino-sherry',
                name: 'Fino Sherry'
            },
            {
                id: 'beer-ginger-ale',
                name: 'Ginger Ale'
            },
            {
                id: 'beer-ginger-beer',
                name: 'Ginger Beer'
            },
            {
                id: 'beer-guiness',
                name: 'Guiness'
            },
            {
                id: 'wine-lillet-blanc',
                name: 'Lillet Blanc'
            },
            {
                id: 'beer-mexican-beer',
                name: 'Mexican Beer'
            },
            {
                id: 'wine-oloroso-sherry',
                name: 'Oloroso Sherry'
            },
            {
                id: 'wine-prosecco',
                name: 'Prosecco'
            },
            {
                id: 'wine-red-wine',
                name: 'Red Wine'
            },
            {
                id: 'wine-sherry',
                name: 'Sherry'
            }
        ],
        eras: [
            {
                id: 'era-traditional',
                name: 'Traditional'
            }
        ]
    });

    test('renders with default props', async () => {
        render(
            <MemoryRouter>
                <CocktailFiltersDialog testId='cocktail-search-filters' />
            </MemoryRouter>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');
        expect(icon).toHaveRole('button');
        expect(icon).toHaveClass('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium');

        const svg = icon.firstChild as SVGElement;
        expect(svg).toBeTruthy();
        expect(svg).toHaveClass('MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeSmall');
        expect(svg).not.toHaveClass('pulse');
        expect(svg).toHaveAttribute('data-testid', 'FilterListIcon');

        // no popup should be rendered yet
        const dialog = screen.queryByTestId('cocktail-search-filters-dialog');
        expect(dialog).toBeFalsy();
    });

    test.each([
        ['small', 'MuiSvgIcon-fontSizeSmall'],
        ['medium', 'MuiSvgIcon-fontSizeMedium'],
        ['large', 'MuiSvgIcon-fontSizeLarge']
    ])('renders dialog with different icon size -> %s', async (size: string, expectedClassName: string) => {
        render(
            <MemoryRouter>
                <CocktailFiltersDialog testId='cocktail-search-filters' iconFontSize={size as 'small' | 'medium' | 'large'} />
            </MemoryRouter>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');
        expect(icon).toHaveRole('button');
        expect(icon).toHaveClass('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium');

        const svg = icon.firstChild as SVGElement;
        expect(svg).toBeTruthy();
        expect(svg).toHaveClass(`MuiSvgIcon-root MuiSvgIcon-colorPrimary ${expectedClassName}`);
        expect(svg).not.toHaveClass('pulse');
        expect(svg).toHaveAttribute('data-testid', 'FilterListIcon');

        // no popup should be rendered yet
        const dialog = screen.queryByTestId('cocktail-search-filters-dialog');
        expect(dialog).toBeFalsy();
    });

    test('renders dialog with pulsating animation when enabled and no search items available', async () => {
        // test comp to alter has items
        const TestComp = () => {
            const { noItems, setNoItems } = useCocktailSearch();

            useEffect(() => {
                if (noItems === false) {
                    setNoItems(true);
                }
            }, [noItems, setNoItems]);

            return <Box data-testid={noItems} />;
        };

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' enablePulsate />
                    <TestComp />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');
        expect(icon).toHaveRole('button');
        expect(icon).toHaveClass('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium');

        const svg = icon.firstChild as SVGElement;
        expect(svg).toBeTruthy();
        expect(svg).toHaveClass('MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeSmall pulse');
        expect(svg).toHaveAttribute('data-testid', 'FilterListIcon');

        // no popup should be rendered yet
        const dialog = await screen.queryByTestId('cocktail-search-filters-dialog');
        expect(dialog).toBeFalsy();
    });

    test('renders dialog without pulsating animation when enabled but search items are available', async () => {
        // test comp to alter has items
        const TestComp = () => {
            const { noItems, setNoItems } = useCocktailSearch();

            useEffect(() => {
                if (noItems === true) {
                    setNoItems(false);
                }
            }, [noItems, setNoItems]);

            return <Box data-testid={noItems} />;
        };

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' enablePulsate />
                    <TestComp />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');
        expect(icon).toHaveRole('button');
        expect(icon).toHaveClass('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium');

        const svg = icon.firstChild as SVGElement;
        expect(svg).toBeTruthy();
        expect(svg).toHaveClass('MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeSmall');
        expect(svg).not.toHaveClass('pulse');
        expect(svg).toHaveAttribute('data-testid', 'FilterListIcon');

        // no popup should be rendered yet
        const dialog = screen.queryByTestId('cocktail-search-filters-dialog');
        expect(dialog).toBeFalsy();
    });

    test('renders dialog when icon clicked', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(getEmptyFiltersResponse(), {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');
        expect(icon).toHaveRole('button');
        expect(icon).toHaveClass('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium');

        // no popup should be rendered yet
        let dialog = screen.queryByTestId('cocktail-search-filters-dialog');
        expect(dialog).toBeFalsy();

        fireEvent.mouseDown(icon);

        dialog = await screen.findByTestId('cocktail-search-filters-dialog');

        const closeButton = (await screen.findByText('Close')) as HTMLButtonElement;
        expect(closeButton).toBeTruthy();
    });

    test('renders dialog title', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(getEmptyFiltersResponse(), {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        await screen.findByTestId('cocktail-search-filters-dialog');
        await screen.findByText('Cocktail Search filters');
    });

    test('renders dialog with no filters', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(getEmptyFiltersResponse(), {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const verifyOnlyDefaultFilters = (p: HTMLParagraphElement): void => {
            expect(p).toBeTruthy();
            const chipContainer = p.nextSibling as HTMLDivElement;
            expect(chipContainer).toBeTruthy();
            expect(chipContainer.children.length).toBe(1);
            const allIcon = chipContainer.firstChild as HTMLDivElement;
            const allText = allIcon.firstChild as HTMLSpanElement;
            expect(allText).toHaveTextContent('(All)');
        };

        const groupContainer = (await screen.findByTestId('cocktail-search-filters-groups')) as HTMLDivElement;
        expect(groupContainer).toBeTruthy();

        const headings = Array.from(groupContainer.getElementsByTagName('p'));
        let heading = headings.filter((x) => x.textContent === 'Spirits')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Liqueurs')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Fresh Fruits')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Juices')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Herbs and Spices')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Dilutions')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Syrups and Sauces')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Bitters')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Beers, Wines and Champagnes')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Vegetables')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Proteins')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Recommended Glassware')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        heading = headings.filter((x) => x.textContent === 'Eras')[0] as HTMLParagraphElement;
        verifyOnlyDefaultFilters(heading);

        const closeButton = (await screen.findByText('Close')) as HTMLButtonElement;
        expect(closeButton).toBeTruthy();
    });

    test('renders dialog reset button', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(getEmptyFiltersResponse(), {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        await screen.findByTestId('cocktail-search-filters-dialog');
        const resetButton = (await screen.findByText('Reset All Filters')) as HTMLButtonElement;
        expect(resetButton).toBeTruthy();
        expect(resetButton).not.toHaveAttribute('disabled');
        expect(resetButton).toHaveClass('MuiButton-colorPrimary');
        expect(resetButton).toHaveClass('MuiButton-outlined');
        expect(resetButton).toHaveClass('MuiButton-outlinedPrimary');
    });

    test('renders chip groups for all filters', async () => {
        const rs = getCompleteFiltersResponse();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const verifyFilters = (p: HTMLParagraphElement, m: IngredientFilterModel[]): void => {
            expect(p).toBeTruthy();
            const chipContainer = p.nextSibling as HTMLDivElement;
            expect(chipContainer).toBeTruthy();
            expect(chipContainer.children.length).toBe(m.length + 1);
            const allIcon = chipContainer.firstChild as HTMLDivElement;
            const allText = allIcon.firstChild as HTMLSpanElement;
            expect(allText).toHaveTextContent('(All)');

            let previous = allIcon;

            m.forEach((x) => {
                const chip = previous.nextSibling as HTMLDivElement;
                expect(chip).toBeTruthy();
                expect(chip.firstChild).toHaveTextContent(x.name ?? '');
                previous = chip;
            });
        };

        const groupContainer = (await screen.findByTestId('cocktail-search-filters-groups')) as HTMLDivElement;
        expect(groupContainer).toBeTruthy();
        const headings = Array.from(groupContainer.getElementsByTagName('p'));

        let heading = headings.filter((x) => x.textContent === 'Spirits')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.spirits ?? []);

        heading = headings.filter((x) => x.textContent === 'Liqueurs')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.liqueurs ?? []);

        heading = headings.filter((x) => x.textContent === 'Fresh Fruits')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.fruits ?? []);

        heading = headings.filter((x) => x.textContent === 'Juices')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.juices ?? []);

        heading = headings.filter((x) => x.textContent === 'Herbs and Spices')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.herbsAndFlowers ?? []);

        heading = headings.filter((x) => x.textContent === 'Dilutions')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.dilutions ?? []);

        heading = headings.filter((x) => x.textContent === 'Syrups and Sauces')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.syrupsAndSauces ?? []);

        heading = headings.filter((x) => x.textContent === 'Bitters')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.bitters ?? []);

        heading = headings.filter((x) => x.textContent === 'Beers, Wines and Champagnes')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.beerWineChampagne ?? []);

        heading = headings.filter((x) => x.textContent === 'Vegetables')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.vegetables ?? []);

        heading = headings.filter((x) => x.textContent === 'Proteins')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.proteins ?? []);

        heading = headings.filter((x) => x.textContent === 'Recommended Glassware')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.glassware ?? []);

        heading = headings.filter((x) => x.textContent === 'Eras')[0] as HTMLParagraphElement;
        verifyFilters(heading, rs.eras ?? []);

        const closeButton = (await screen.findByText('Close')) as HTMLButtonElement;
        expect(closeButton).toBeTruthy();
    });

    test('reset button click resets all chips', async () => {
        const rs = getCompleteFiltersResponse();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const verifyChips = (p: HTMLParagraphElement, m: IngredientFilterModel[], performClick: boolean, expectToBeSelected: boolean): void => {
            expect(p).toBeTruthy();
            const chipContainer = p.nextSibling as HTMLDivElement;
            const allIcon = chipContainer.firstChild as HTMLDivElement;

            let previous = allIcon;

            m.forEach(() => {
                const chip = previous.nextSibling as HTMLDivElement;
                expect(chip).toBeTruthy();
                expect(chip).toHaveClass(expectToBeSelected ? 'MuiChip-colorPrimary' : 'MuiChip-colorSecondary');

                if (performClick) {
                    fireEvent.click(chip);
                    expect(chip).toHaveClass(expectToBeSelected ? 'MuiChip-colorSecondary' : 'MuiChip-colorPrimary');
                }

                previous = chip;
            });
        };

        const groupContainer = (await screen.findByTestId('cocktail-search-filters-groups')) as HTMLDivElement;
        expect(groupContainer).toBeTruthy();
        const headings = Array.from(groupContainer.getElementsByTagName('p'));

        let heading = headings.filter((x) => x.textContent === 'Spirits')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.spirits ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Liqueurs')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.liqueurs ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Fresh Fruits')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.fruits ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Juices')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.juices ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Herbs and Spices')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.herbsAndFlowers ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Dilutions')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.dilutions ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Syrups and Sauces')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.syrupsAndSauces ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Bitters')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.bitters ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Beers, Wines and Champagnes')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.beerWineChampagne ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Vegetables')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.vegetables ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Proteins')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.proteins ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Recommended Glassware')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.glassware ?? [], true, false);

        heading = headings.filter((x) => x.textContent === 'Eras')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.eras ?? [], true, false);

        // ----------------------
        // Click the reset button
        // ----------------------

        const resetButton = (await screen.findByText('Reset All Filters')) as HTMLButtonElement;
        fireEvent.click(resetButton);

        heading = headings.filter((x) => x.textContent === 'Spirits')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.spirits ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Liqueurs')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.liqueurs ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Fresh Fruits')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.fruits ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Juices')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.juices ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Herbs and Spices')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.herbsAndFlowers ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Dilutions')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.dilutions ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Syrups and Sauces')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.syrupsAndSauces ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Bitters')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.bitters ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Beers, Wines and Champagnes')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.beerWineChampagne ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Vegetables')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.vegetables ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Proteins')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.proteins ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Recommended Glassware')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.glassware ?? [], false, true);

        heading = headings.filter((x) => x.textContent === 'Eras')[0] as HTMLParagraphElement;
        verifyChips(heading, rs.eras ?? [], false, true);
    });

    test('reset button click registers change when close button click and sets context filter revision', async () => {
        const TestComp = () => {
            const { filtersRevision } = useCocktailFiltering();
            return <Box data-testid={`test-comp-${filtersRevision}`} />;
        };

        const rs = getCompleteFiltersResponse();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                    <TestComp />
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByTestId('test-comp-0');
        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const resetButton = (await screen.findByText('Reset All Filters')) as HTMLButtonElement;
        fireEvent.click(resetButton);

        await screen.findByTestId('test-comp-1');
    });

    test('close button click doesnt set context filter revision when no changes', async () => {
        const TestComp = () => {
            const { filtersRevision } = useCocktailFiltering();
            return <Box data-testid={`test-comp-${filtersRevision}`} />;
        };

        const rs = getCompleteFiltersResponse();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                    <TestComp />
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByTestId('test-comp-0');
        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const closeButton = (await screen.findByText('Close')) as HTMLButtonElement;
        fireEvent.click(closeButton);

        await screen.findByTestId('test-comp-0');
    });

    test('chip click registers change when close button click and sets context filter revision', async () => {
        const TestComp = () => {
            const { filtersRevision } = useCocktailFiltering();
            return <Box data-testid={`test-comp-${filtersRevision}`} />;
        };

        const rs = getCompleteFiltersResponse();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                    <TestComp />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const chip = (await screen.findByText('Oloroso Sherry')) as HTMLDivElement;
        fireEvent.click(chip);

        const closeButton = (await screen.findByText('Apply Filters')) as HTMLButtonElement;
        fireEvent.click(closeButton);

        await screen.findByTestId('test-comp-1');
    });

    test('renders chip as selected on initial render', async () => {
        const rs = getCompleteFiltersResponse();
        const filtersService = new CocktailFiltersLocalStorageService();

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/ingredients/filters',
                () =>
                    HttpResponse.json<CocktailIngredientFiltersRs>(rs, {
                        status: 200,
                        statusText: 'OK'
                    }),
                { once: true }
            )
        );

        filtersService.SetSelected('wine-oloroso-sherry', true);

        render(
            <GlobalContext>
                <MemoryRouter>
                    <CocktailFiltersDialog testId='cocktail-search-filters' />
                </MemoryRouter>
            </GlobalContext>
        );

        const icon = await screen.findByTestId('cocktail-search-filters-icon');

        fireEvent.mouseDown(icon);

        const chip = (await screen.findByText('Oloroso Sherry')) as HTMLSpanElement;
        expect(chip.parentElement).toHaveClass('MuiChip-colorPrimary');
    });
});
