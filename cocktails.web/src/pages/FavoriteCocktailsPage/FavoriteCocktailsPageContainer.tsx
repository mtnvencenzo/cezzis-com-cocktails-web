import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import './FavoriteCocktailsPageContainer.css';
import { Box, Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Span, SpanStatusCode } from '@opentelemetry/api';
import { DEFAULT_TAKE } from '../../services/CocktailsService';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import CocktailTile from '../../molecules/CocktailTile/CocktailTile';
import theme from '../../theme';
import { setMetaItemProp } from '../../utils/headUtil';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import startPageViewSpan from '../../services/Tracer';
import { getCocktailFavorites } from '../../services/CocktailsAISearchService';
import { CocktailModelOutput, CocktailDataIncludeModel } from '../../api/aisearchApi';

const FavoriteCocktailsPageContainer = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [cocktailListModels, setCocktailListModels] = useState<CocktailModelOutput[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const { ownedAccount, ownedAccountCocktailRatings } = useOwnedAccount();

    const fetchData = async (span?: Span) => {
        if (isFetching) {
            return;
        }

        try {
            setIsFetching(true);

            const rs = await getCocktailFavorites(skip, DEFAULT_TAKE, [CocktailDataIncludeModel.SearchTiles, CocktailDataIncludeModel.DescriptiveTitle], ownedAccount?.favoriteCocktails ?? [], true);
            const items = rs?.items?.filter((x) => x.searchTiles && x.searchTiles.length > 0);

            setSkip((s) => s + DEFAULT_TAKE);
            setApiCallFailed(false);
            setCocktailListModels((prevModels) => {
                const models = [...prevModels, ...(items?.filter((x) => prevModels.find((p) => p.id === x.id) === undefined) ?? [])];

                // Might seem redundant, but making sure item is in owned account favorites list.
                // This fixes the issue when the user is already on the page and un-favoriting them
                return models.filter((x) => ownedAccount && ownedAccount.favoriteCocktails.includes(x.id));
            });
            setHasMore(rs?.items?.length === DEFAULT_TAKE);
        } catch (e: unknown) {
            setApiCallFailed(true);
            setHasMore(false);
            span?.recordException(e as Error);
            span?.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error).message });
        }

        setLoading(false);
        setIsFetching(false);
        span?.end();
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        startPageViewSpan((span) => {
            fetchData(span);
        });

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setMetaItemProp('My Favorite Cocktails');
    }, [ownedAccount?.favoriteCocktails]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            <title>My Favorite Cocktails</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/my/favorite-cocktails`} />
            <meta name='description' content='View your favorite cocktails.  Complete listing of cocktails that you have favorited on Cezzis.com.' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/my/favorite-cocktails' />
            <meta property='og:title' content='My Favorite Cocktails' />
            <meta property='og:description' content='View your favorite cocktails.  Complete listing of cocktails that you have favorited on Cezzis.com.' />
            <Box
                component='div'
                sx={{
                    overflow: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    paddingTop: '10px',
                    minHeight: '100vh',
                    height: '100%',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    width: '100%',
                    [theme.breakpoints.down('xs')]: {
                        paddingRight: '3px',
                        paddingLeft: '3px'
                    }
                }}
            >
                {loading && <LoadingSkeleton rowCount={3} />}
                {!loading && !apiCallFailed && cocktailListModels && (
                    <InfiniteScroll dataLength={cocktailListModels.length} next={fetchData} hasMore={hasMore && !isFetching} loader={<h4>Loading...</h4>} scrollThreshold={0.8}>
                        <Grid
                            container
                            spacing={{
                                xs: 2,
                                md: 3
                            }}
                            columns={{
                                xs: 4,
                                sm: 8,
                                md: 12,
                                lg: 12
                            }}
                            sx={{
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            {cocktailListModels.map((x) => (
                                <CocktailTile
                                    key={`tile-${x.id}`}
                                    cocktail={x}
                                    testId={`cocktailtile-${x.id}`}
                                    isFavorite={ownedAccount?.favoriteCocktails?.includes(x.id) ?? false}
                                    indicatorValue={ownedAccountCocktailRatings?.ratings?.find((y) => y.cocktailId === x.id)?.stars ?? 0}
                                    indicatorPosition='Top'
                                />
                            ))}
                        </Grid>
                    </InfiniteScroll>
                )}
                <br />
            </Box>
        </>
    );
};

export default FavoriteCocktailsPageContainer;
