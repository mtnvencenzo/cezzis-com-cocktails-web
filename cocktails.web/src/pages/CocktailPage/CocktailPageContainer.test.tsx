import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import CocktailPageContainer from './CocktailPageContainer';
import { CocktailRs } from '../../api/cocktailsApi';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';

describe('Cocktail Page Container', () => {
    test('renders cocktail page container and fetches cocktail data', async () => {
        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod,
                useParams: () => ({
                    id: 'adonis'
                })
            };
        });

        server.use(
            http.get(
                'http://localhost:0/api/v1/cocktails/adonis',
                () =>
                    HttpResponse.json<CocktailRs>(
                        {
                            item: {
                                id: 'adonis',
                                content: 'The Adonis',
                                title: '',
                                searchableTitles: [],
                                tags: [],
                                ingredients: [],
                                serves: 1,
                                glassware: [],
                                descriptiveTitle: '',
                                description: '',
                                isIba: true,
                                publishedOn: new Date(),
                                modifiedOn: new Date(),
                                searchTiles: [],
                                mainImages: [],
                                prepTimeMinutes: 10,
                                instructions: [],
                                rating: {
                                    oneStars: 1,
                                    twoStars: 2,
                                    threeStars: 3,
                                    fourStars: 5,
                                    fiveStars: 1,
                                    totalStars: 39,
                                    rating: 3,
                                    ratingCount: 12
                                }
                            }
                        },
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
                    <CocktailPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const content = await screen.findByText('The Adonis');
        expect(content).toBeTruthy();
    });
});
