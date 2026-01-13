import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';
import { GlasswareTypeModel, IngredientApplicationModel, IngredientRequirementTypeModel, IngredientTypeModel, PreparationTypeModel, UofMTypeModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';
import { CocktailModelOutput, CocktailsSearchRs } from '../../api/aisearchApi';

const defaultSearchRs = (): CocktailsSearchRs => ({
    items: [
        {
            id: 'absinthe-frappe',
            title: 'Absinthe Frappé',
            ingredients: [
                {
                    name: 'Absinthe',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Absinthe'
                },
                {
                    name: 'Simple Syrup',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Simple Syrup'
                },
                {
                    name: 'Water',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Dilution],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.Chilled,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Water'
                },
                {
                    name: 'Mint Sprig',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Optional,
                    display: 'Mint Sprig for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Rocks, GlasswareTypeModel.Collins],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'adonis',
            title: 'Adonis',
            ingredients: [
                {
                    name: 'Fino Sherry',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Wine],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Fino Sherry'
                },
                {
                    name: 'Sweet Vermouth',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Sweet Vermouth'
                },
                {
                    name: 'Orange Bitters',
                    units: 2,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: "Preferably Regans'",
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 dashes Orange Bitters'
                },
                {
                    name: 'Orange Peel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Peel for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            rating: 0,
            descriptiveTitle: '',
            searchTiles: []
        },
        {
            id: 'airmail',
            title: 'AirMail',
            ingredients: [
                {
                    name: 'Gold Rum',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Appleton or ElDorado',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Gold Rum'
                },
                {
                    name: 'Lime Juice',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Lime Juice'
                },
                {
                    name: 'Honey Syrup',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Honey Syrup'
                },
                {
                    name: 'Champagne',
                    units: 0,
                    uoM: UofMTypeModel.Topoff,
                    types: [IngredientTypeModel.Champagne],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.Chilled,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Champagne (top off)'
                },
                {
                    name: 'Lime Peel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lime Peel for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Collins],
            prepTimeMinutes: 10,
            rating: 0,
            descriptiveTitle: '',
            searchTiles: []
        },
        {
            id: 'americano',
            title: 'Americano',
            ingredients: [
                {
                    name: 'Campari',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Campari'
                },
                {
                    name: 'Sweet Vermouth',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Sweet Vermouth'
                },
                {
                    name: 'Soda Water',
                    units: 0,
                    uoM: UofMTypeModel.Topoff,
                    types: [IngredientTypeModel.Dilution],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.Chilled,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Soda Water (top off)'
                },
                {
                    name: 'Orange Slice',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Slice for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Collins, GlasswareTypeModel.Rocks],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'aviation',
            title: 'Aviation',
            ingredients: [
                {
                    name: 'Gin',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Gin'
                },
                {
                    name: 'Maraschino Liqueur',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Luxardo',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Maraschino Liqueur'
                },
                {
                    name: 'Crème de Violette',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Rothman & Winter',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Crème de Violette'
                },
                {
                    name: 'Lemon Juice',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Lemon Juice'
                },
                {
                    name: 'Brandied Cherry',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Luxardo',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Brandied Cherry for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'bamboo',
            title: 'Bamboo',
            ingredients: [
                {
                    name: 'Fino Sherry',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Wine],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Fino Sherry'
                },
                {
                    name: 'Dry Vermouth',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Dry Vermouth'
                },
                {
                    name: 'Rich Simple Syrup',
                    units: 1.5,
                    uoM: UofMTypeModel.Teaspoon,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 tsp Rich Simple Syrup'
                },
                {
                    name: 'Angostura Bitters',
                    units: 2,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 dashes Angostura Bitters'
                },
                {
                    name: 'Orange Bitters',
                    units: 2,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 dashes Orange Bitters'
                },
                {
                    name: 'Lemon Twist',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lemon Twist for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'bees-knees',
            title: "Bee's Knees",
            ingredients: [
                {
                    name: 'Gin',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Gin'
                },
                {
                    name: 'Lemon Juice',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Lemon Juice'
                },
                {
                    name: 'Honey Syrup',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Honey Syrup'
                },
                {
                    name: 'Lemon Wheel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lemon Wheel for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'bicicletta',
            title: 'Bicicletta',
            ingredients: [
                {
                    name: 'Campari',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Campari'
                },
                {
                    name: 'Dry White Wine',
                    units: 3,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Wine],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Pinot Grigio or Sauvignon Blanc',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 oz Dry White Wine'
                },
                {
                    name: 'Soda Water',
                    units: 0,
                    uoM: UofMTypeModel.Topoff,
                    types: [IngredientTypeModel.Dilution],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.Chilled,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Soda Water (top off)'
                },
                {
                    name: 'Orange Wheels',
                    units: 2,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Wheels for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.WineGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'bijou',
            title: 'Bijou',
            ingredients: [
                {
                    name: 'Gin',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Gin'
                },
                {
                    name: 'Sweet Vermouth',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Sweet Vermouth'
                },
                {
                    name: 'Green Chartreuse',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Green Chartreuse'
                },
                {
                    name: 'Orange Bitters',
                    units: 1,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 dash Orange Bitters'
                },
                {
                    name: 'Brandied Cherry',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Luxardo',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Brandied Cherry for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'black-velvet',
            title: 'Black Velvet',
            ingredients: [
                {
                    name: 'Guiness',
                    units: 3,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Beer],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 oz Guiness'
                },
                {
                    name: 'Champagne',
                    units: 3,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Champagne],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 oz Champagne'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.Flute, GlasswareTypeModel.Collins],
            prepTimeMinutes: 10,
            rating: 0,
            descriptiveTitle: '',
            searchTiles: []
        },
        {
            id: 'blood-and-sand',
            title: 'Blood and Sand',
            ingredients: [
                {
                    name: 'Blended Scotch',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Blended Scotch'
                },
                {
                    name: 'Cherry Heering',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Cherry Heering'
                },
                {
                    name: 'Sweet Vermouth',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Sweet Vermouth'
                },
                {
                    name: 'Orange Juice',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Orange Juice'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.Collins],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'bloody-mary',
            title: 'Bloody Mary',
            ingredients: [
                {
                    name: 'Vodka',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Vodka'
                },
                {
                    name: 'Tomato Juice',
                    units: 4,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '4 oz Tomato Juice'
                },
                {
                    name: 'Lemon Juice',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Lemon Juice'
                },
                {
                    name: 'Worcestershire',
                    units: 0.5,
                    uoM: UofMTypeModel.Teaspoon,
                    types: [IngredientTypeModel.Sauce],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 tsp Worcestershire'
                },
                {
                    name: 'Hot Sauce',
                    units: 2,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Sauce],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 dashes Hot Sauce'
                },
                {
                    name: 'Salt',
                    units: 0,
                    uoM: UofMTypeModel.ToTaste,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Salt to taste'
                },
                {
                    name: 'Pepper',
                    units: 0,
                    uoM: UofMTypeModel.ToTaste,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Pepper to taste'
                },
                {
                    name: 'Celery Stalk',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Vegetable],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Celery Stalk for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Collins, GlasswareTypeModel.Highball],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'boulevardier',
            title: 'Boulevardier',
            ingredients: [
                {
                    name: 'Bourbon',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Rye can be substituted',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Bourbon'
                },
                {
                    name: 'Campari',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Campari'
                },
                {
                    name: 'Sweet Vermouth',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Sweet Vermouth'
                },
                {
                    name: 'Orange Peel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Peel for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Rocks, GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'brooklyn',
            title: 'Brooklyn',
            ingredients: [
                {
                    name: 'Rye',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Rye'
                },
                {
                    name: 'Maraschino Liqueur',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Maraschino Liqueur'
                },
                {
                    name: 'Amer Picon',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Amer Picon'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'brown-derby',
            title: 'Brown Derby',
            ingredients: [
                {
                    name: 'Bourbon',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Bourbon'
                },
                {
                    name: 'Grapefruit Juice',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshPressed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Grapefruit Juice'
                },
                {
                    name: 'Honey Syrup',
                    units: 0.75,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 oz Honey Syrup'
                },
                {
                    name: 'Grapefruit Peel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.FreshlyGrated,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Grapefruit Peel for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'caipirinha',
            title: 'Caipirinha',
            ingredients: [
                {
                    name: 'Cachaça',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Cachaça'
                },
                {
                    name: 'Sugar',
                    units: 2,
                    uoM: UofMTypeModel.Teaspoon,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.Quartered,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 tsp Sugar'
                },
                {
                    name: 'Lime',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Muddle],
                    preparation: PreparationTypeModel.PeeledAndJuiced,
                    suggestions: 'Quartered',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 Lime (quartered)'
                },
                {
                    name: 'Lime Wheel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lime Wheel for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Rocks],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'champagne-cocktail',
            title: 'Champagne Cocktail',
            ingredients: [
                {
                    name: 'Champagne',
                    units: 0,
                    uoM: UofMTypeModel.None,
                    types: [IngredientTypeModel.Champagne],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Champagne'
                },
                {
                    name: 'Sugar',
                    units: 1,
                    uoM: UofMTypeModel.Barspoon,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 barspoon Sugar'
                },
                {
                    name: 'Angostura Bitters',
                    units: 3,
                    uoM: UofMTypeModel.Dashes,
                    types: [IngredientTypeModel.Bitters],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 dashes Angostura Bitters'
                },
                {
                    name: 'Lemon Peel',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Use a long and curly lemon peel',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lemon Peel for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Flute],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'charles-Dickenss-punch',
            title: "Charles Dickens's Punch",
            ingredients: [
                {
                    name: 'Rum',
                    units: 2,
                    uoM: UofMTypeModel.Cups,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 cups Rum'
                },
                {
                    name: 'Cognac',
                    units: 1.5,
                    uoM: UofMTypeModel.Cups,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Perferably Courvoisier VSOP',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 cups Cognac'
                },
                {
                    name: 'Black Tea',
                    units: 5,
                    uoM: UofMTypeModel.Cups,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '5 cups Black Tea'
                },
                {
                    name: 'Sugar',
                    units: 0.75,
                    uoM: UofMTypeModel.Cups,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Demerara',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3/4 cup Sugar'
                },
                {
                    name: 'Lemon Juice',
                    units: 3,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 Lemon Juice'
                },
                {
                    name: 'Lemon Slices',
                    units: 0,
                    uoM: UofMTypeModel.None,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Lemon Slices for garnishment'
                },
                {
                    name: 'Orange Slices',
                    units: 0,
                    uoM: UofMTypeModel.None,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Slices for garnishment'
                },
                {
                    name: 'Grated Nutmeg',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Herb],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Grated Nutmeg for garnishment'
                }
            ],
            isIba: false,
            serves: 10,
            glassware: [],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        },
        {
            id: 'clover-club',
            title: 'Clover Club',
            ingredients: [
                {
                    name: 'Gin',
                    units: 1.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Plymouth',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 1/2 oz Gin'
                },
                {
                    name: 'Dry Vermouth',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Dry Vermouth'
                },
                {
                    name: 'Scant Simple Syrup',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Syrup],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Scant Simple Syrup'
                },
                {
                    name: 'Lemon Juice',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Lemon Juice'
                },
                {
                    name: 'Egg White',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Protein],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Egg White'
                },
                {
                    name: 'Raspberries',
                    units: 3,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '3 Raspberries'
                },
                {
                    name: 'Raspberries',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Raspberries for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        }
    ]
});

const typedAsSearchRs = (): CocktailsSearchRs => ({
    items: [
        {
            id: 'aperol-spritz',
            title: 'Aperol Spritz',
            ingredients: [
                {
                    name: 'Aperol',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Aperol'
                },
                {
                    name: 'Dry Prosecco',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Wine],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Dry Prosecco'
                },
                {
                    name: 'Soda Water',
                    units: 1,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Dilution],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1 oz Soda Water'
                },
                {
                    name: 'Orange Slice',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Orange Slice for garnishment'
                }
            ],
            isIba: false,
            serves: 1,
            glassware: [GlasswareTypeModel.Collins, GlasswareTypeModel.WineGlass],
            prepTimeMinutes: 10,
            rating: 0,
            descriptiveTitle: '',
            searchTiles: []
        },
        {
            id: 'aviation',
            title: 'Aviation',
            ingredients: [
                {
                    name: 'Gin',
                    units: 2,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Spirit],
                    applications: [IngredientApplicationModel.Base],
                    preparation: PreparationTypeModel.None,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '2 oz Gin'
                },
                {
                    name: 'Maraschino Liqueur',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Luxardo',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Maraschino Liqueur'
                },
                {
                    name: 'Crème de Violette',
                    units: 0.25,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Liqueur],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Rothman & Winter',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/4 oz Crème de Violette'
                },
                {
                    name: 'Lemon Juice',
                    units: 0.5,
                    uoM: UofMTypeModel.Ounces,
                    types: [IngredientTypeModel.Juice],
                    applications: [IngredientApplicationModel.Additional],
                    preparation: PreparationTypeModel.FreshlySqueezed,
                    suggestions: '',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: '1/2 oz Lemon Juice'
                },
                {
                    name: 'Brandied Cherry',
                    units: 1,
                    uoM: UofMTypeModel.Item,
                    types: [IngredientTypeModel.Fruit],
                    applications: [IngredientApplicationModel.Garnishment],
                    preparation: PreparationTypeModel.None,
                    suggestions: 'Preferably Luxardo',
                    requirement: IngredientRequirementTypeModel.Required,
                    display: 'Brandied Cherry for garnishment'
                }
            ],
            isIba: true,
            serves: 1,
            glassware: [GlasswareTypeModel.Coupe, GlasswareTypeModel.CocktailGlass],
            prepTimeMinutes: 10,
            descriptiveTitle: '',
            rating: 0,
            searchTiles: []
        }
    ]
});

describe('SearchBox', () => {
    beforeEach(() => {
        localStorage.clear();

        server.use(
            http.get('http://localhost:1/v1/cocktails/typeahead', ({ request }) => {
                const url = new URL(request.url);

                if (url.searchParams.get('freetext') === '') {
                    return HttpResponse.json<CocktailsSearchRs>(defaultSearchRs(), {
                        status: 200,
                        statusText: 'OK'
                    });
                }
                if (url.searchParams.get('freetext') === 'Aper') {
                    return HttpResponse.json<CocktailsSearchRs>(typedAsSearchRs(), {
                        status: 200,
                        statusText: 'OK'
                    });
                }
                if (url.searchParams.get('freetext') === 'zzz') {
                    return HttpResponse.json<CocktailsSearchRs>(
                        { items: [] },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    );
                }

                return HttpResponse.json<CocktailsSearchRs>(typedAsSearchRs(), {
                    status: 200,
                    statusText: 'OK'
                });
            })
        );
    });

    const assertOption = async (x: CocktailModelOutput, i: number, ul: HTMLUListElement) => {
        const li = ul.querySelector(`#global-search-box-option-${i}`) as HTMLLIElement;
        expect(li).toBeTruthy();
        expect(li).toHaveClass('MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiAutocomplete-option');
        expect(li).not.toHaveClass('Mui-focused');

        const link = li.firstChild as HTMLAnchorElement;
        expect(link).toBeTruthy();
        expect(link).toHaveClass('MuiTypography-root MuiTypography-body1');
        expect(link.href).toBe(`http://localhost:3000/cocktails/${x.id}`);

        const span = link.firstChild as HTMLSpanElement;
        expect(span).toBeTruthy();
        expect(span).toHaveTextContent(x.title);

        const ingDiv = li.lastChild as HTMLDivElement;
        expect(ingDiv).toBeTruthy();

        const ingLink = ingDiv.firstChild as HTMLAnchorElement;
        expect(ingLink).toBeTruthy();
        expect(ingLink).toHaveClass('MuiTypography-root MuiTypography-body1');
        expect(ingLink.href).toBe(`http://localhost:3000/cocktails/${x.id}`);

        const ingSpan = ingLink.firstChild as HTMLSpanElement;
        expect(ingSpan).toBeTruthy();
        expect(ingSpan).toHaveTextContent(
            x?.ingredients
                .map((i) => i.display)
                .join(', ')
                .trim()
        );
    };

    test('renders without error', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = screen.getByTestId('sb-testid');
        expect(el).toBeDefined();
    });

    test('renders correct placeholder text', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = screen.getByTestId('sb-testid');
        expect(el).toBeDefined();
        expect(el?.querySelector('input')?.placeholder, 'Search cocktails...');
    });

    test('renders correct no options text when enableFiltering enabled', async () => {
        server.use(
            http.get(
                'http://localhost:1/v1/cocktails/typeahead',
                () =>
                    HttpResponse.json<CocktailsSearchRs>(
                        { items: [] },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    ),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = screen.getByTestId('sb-testid');
        expect(el).toBeDefined();

        const textbox = el.querySelector('#global-search-box') as HTMLInputElement;
        expect(textbox).toBeTruthy();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        await userEvent.type(textbox, 'zzz');

        await waitFor(() => {
            expect(textbox.value).toBe('zzz');
        });

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await screen.findByText('No matches found. Try reducing your search filters and search term');
    });

    test('doesnt render no options text when enableFiltering disabled', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = screen.getByTestId('sb-testid');
        expect(el).toBeDefined();

        const textbox = el.querySelector('#global-search-box') as HTMLInputElement;
        expect(textbox).toBeTruthy();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        await userEvent.type(textbox, 'zzz');

        await waitFor(() => {
            expect(textbox.value).toBe('zzz');
        });

        const ul = screen.queryByTestId('searchbox-autocomplete-paper') as HTMLUListElement;
        expect(ul).toBeFalsy();
    });

    test('renders search item options', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = (await screen.findByTestId('sb-testid')) as HTMLDivElement;

        const textbox = el.querySelector('#global-search-box') as HTMLInputElement;
        expect(textbox).toBeTruthy();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul)));
    });

    test('renders search item options as focused when hovered over', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const item = defaultSearchRs().items[3];
        const el = (await screen.findByTestId('sb-testid')) as HTMLDivElement;

        const textbox = el.querySelector('#global-search-box') as HTMLInputElement;
        expect(textbox).toBeTruthy();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        const li = ul.querySelector(`#global-search-box-option-3`) as HTMLLIElement;
        expect(li).toHaveClass('MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiAutocomplete-option');
        expect(li).not.toHaveClass('Mui-focused');
        expect(li).toBeTruthy();

        // ------------------------------------------------------------
        // Force mouse hover
        // ------------------------------------------------------------
        // For some reason fireEvent.MouseEnter / MouseOver didn't work
        // needed to use userEvent instead. ¯\_(ツ)_/¯
        // ------------------------------------------------------------
        await userEvent.hover(li);

        await waitFor(() => {
            expect(li).toHaveClass('MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiAutocomplete-option');
            expect(li).toHaveClass('Mui-focused');
        });

        const link = li.firstChild as HTMLAnchorElement;
        expect(link).toBeTruthy();
        expect(link).toHaveClass('MuiTypography-root MuiTypography-body1');
        expect(link.href).toBe(`http://localhost:3000/cocktails/${item.id}`);

        const span = link.firstChild as HTMLSpanElement;
        expect(span).toBeTruthy();
        expect(span).toHaveTextContent(item.title);

        const ingDiv = li.lastChild as HTMLDivElement;
        expect(ingDiv).toBeTruthy();

        const ingLink = ingDiv.firstChild as HTMLAnchorElement;
        expect(ingLink).toBeTruthy();
        expect(ingLink).toHaveClass('MuiTypography-root MuiTypography-body1');
        expect(ingLink.href).toBe(`http://localhost:3000/cocktails/${item.id}`);

        const ingSpan = ingLink.firstChild as HTMLSpanElement;
        expect(ingSpan).toBeTruthy();
        expect(ingSpan).toHaveTextContent(
            item?.ingredients
                .map((i) => i.display)
                .join(', ')
                .trim()
        );

        // ------------------------------------------------------------
        // Force mouse unhover by hovering over a different li item
        // ------------------------------------------------------------
        // For some reason fireEvent.MouseEnter / MouseOver didn't work
        // needed to use userEvent instead. ¯\_(ツ)_/¯
        // ------------------------------------------------------------
        const li2 = ul.querySelector(`#global-search-box-option-4`) as HTMLLIElement;
        await userEvent.hover(li2);

        await waitFor(() => {
            expect(li2).toHaveClass('MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiAutocomplete-option');
            expect(li2).toHaveClass('Mui-focused');
        });
    });

    test('closes search popup on blur', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = (await screen.findByTestId('sb-testid')) as HTMLDivElement;

        const textbox = el.querySelector('#global-search-box') as HTMLInputElement;
        expect(textbox).toBeTruthy();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        const li = ul.querySelector(`#global-search-box-option-3`) as HTMLLIElement;
        expect(li).toHaveClass('MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiAutocomplete-option');

        // -----------------
        // Force Blur
        // -----------------
        fireEvent.blur(textbox);

        await waitFor(() => {
            const ulblured = screen.queryByTestId('searchbox-autocomplete-paper') as HTMLUListElement;
            expect(ulblured).toBeFalsy();
        });
    });

    test('updates text value when typed', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const autocomplete = (await screen.findByTestId('sb-testid')) as HTMLDivElement;
        const textbox = within(autocomplete).queryByRole('combobox') as HTMLInputElement;
        expect(textbox).toBeDefined();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul)));

        await userEvent.type(textbox, 'As');

        await waitFor(() => {
            expect(textbox.value).toBe('As');
        });
    });

    test('re-searches cocktails when text typed in no banner embeded', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering />
                </MemoryRouter>
            </GlobalContext>
        );

        const autocomplete = (await screen.findByTestId('sb-testid')) as HTMLDivElement;
        const textbox = within(autocomplete).queryByRole('combobox') as HTMLInputElement;
        expect(textbox).toBeDefined();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul)));

        await userEvent.type(textbox, 'Aper');

        await waitFor(() => {
            expect(textbox.value).toBe('Aper');
        });

        await waitFor(() => {
            const boldedE = screen.queryByText('Aper');
            expect(boldedE).toBeTruthy();
            expect(boldedE?.tagName).toBe('B');

            const unboldedE = screen.queryByText('ol Spritz');
            expect(unboldedE).toBeTruthy();
            expect(unboldedE?.tagName).toBe('SPAN');
        });
    });

    test('re-searches cocktails when text typed in with banner embeded', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering bannerEmbeded />
                </MemoryRouter>
            </GlobalContext>
        );

        const autocomplete = (await screen.findByTestId('sb-testid')) as HTMLDivElement;
        const textbox = within(autocomplete).queryByRole('combobox') as HTMLInputElement;
        expect(textbox).toBeDefined();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul)));

        await userEvent.type(textbox, 'Aper');

        await waitFor(() => {
            expect(textbox.value).toBe('Aper');
        });

        await waitFor(() => {
            const boldedE = screen.queryByText('Aper');
            expect(boldedE).toBeTruthy();
            expect(boldedE?.tagName).toBe('B');

            const unboldedE = screen.queryByText('ol Spritz');
            expect(unboldedE).toBeTruthy();
            expect(unboldedE?.tagName).toBe('SPAN');
        });
    });

    test('clears input and re-searches when esacpe key is pressed', async () => {
        render(
            <GlobalContext>
                <MemoryRouter>
                    <SearchBox testId='sb-testid' enableFiltering bannerEmbeded />
                </MemoryRouter>
            </GlobalContext>
        );

        const autocomplete = (await screen.findByTestId('sb-testid')) as HTMLDivElement;
        const textbox = within(autocomplete).queryByRole('combobox') as HTMLInputElement;
        expect(textbox).toBeDefined();

        // give focus to invoke the api call and pop the popper
        fireEvent.focus(textbox);

        const ul = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul)));

        await userEvent.type(textbox, 'Aper');

        await waitFor(() => {
            expect(textbox.value).toBe('Aper');
        });

        await waitFor(() => {
            const boldedE = screen.queryByText('Aper');
            expect(boldedE).toBeTruthy();
            expect(boldedE?.tagName).toBe('B');

            const unboldedE = screen.queryByText('ol Spritz');
            expect(unboldedE).toBeTruthy();
            expect(unboldedE?.tagName).toBe('SPAN');
        });

        await userEvent.type(textbox, '{Escape}');

        await screen.findByText('Bicicletta');

        const aperol = screen.queryByText('Aperol Spritz');
        expect(aperol).toBeFalsy();

        const ul2 = (await screen.findByTestId('searchbox-autocomplete-paper')) as HTMLUListElement;
        expect(ul2).toBeTruthy();

        await Promise.all(defaultSearchRs().items.map(async (item, i) => assertOption(item, i, ul2)));
    });
});
