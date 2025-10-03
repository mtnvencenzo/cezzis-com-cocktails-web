import { useEffect, useState, useCallback, useRef } from 'react';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import './CocktailsListPageContainer.css';
import { Box, Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Span, SpanStatusCode } from '@opentelemetry/api';
import { getCocktailsList } from '../../services/CocktailsService';
import { CocktailsListModel, CocktailDataIncludeModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import CocktailTile from '../../molecules/CocktailTile/CocktailTile';
import theme from '../../theme';
import { setMetaItemProp } from '../../utils/headUtil';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import startPageViewSpan from '../../services/Tracer';

const CocktailsListPageContainer = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [cocktailListModels, setCocktailListModels] = useState<CocktailsListModel[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const { ownedAccount, ownedAccountCocktailRatings } = useOwnedAccount();
    const TAKE = 20;

    // Use a ref to track if a fetch is in progress to prevent race conditions
    const fetchingRef = useRef<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastFetchTimeRef = useRef<number>(0);
    const lastSkipFetchedRef = useRef<number>(-1);
    const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const minFetchIntervalMs = 800; // Minimum 800ms between fetches

    const fetchData = useCallback(
        async (span?: Span) => {
            const now = Date.now();

            // Use ref for immediate check and state for UI
            if (fetchingRef.current || isFetching) {
                return;
            }

            // Prevent fetches that are too close together
            if (now - lastFetchTimeRef.current < minFetchIntervalMs) {
                return;
            }

            // Prevent duplicate fetches for the same skip value
            if (lastSkipFetchedRef.current === skip) {
                return;
            }

            try {
                // Set both ref and state immediately to prevent race conditions
                fetchingRef.current = true;
                setIsFetching(true);
                lastFetchTimeRef.current = now;
                lastSkipFetchedRef.current = skip;

                const rs = await getCocktailsList(skip, TAKE, [CocktailDataIncludeModel.SearchTiles, CocktailDataIncludeModel.DescriptiveTitle]);
                const items = rs?.items?.filter((x) => x.searchTiles && x.searchTiles.length > 0);

                setSkip((prev) => prev + TAKE);
                setApiCallFailed(false);
                setCocktailListModels((prevModels) => [...prevModels, ...(items?.filter((x) => prevModels.find((p) => p.id === x.id) === undefined) ?? [])]);
                setHasMore((rs?.items && rs?.items.length === TAKE) ?? false);
            } catch (e: unknown) {
                setApiCallFailed(true);
                setHasMore(false);
                span?.recordException(e as Error);
                span?.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error).message });
            }

            setLoading(false);
            fetchingRef.current = false;
            setIsFetching(false);
            span?.end();
        },
        [skip, isFetching]
    );

    // Throttled wrapper for infinite scroll that enforces timing
    const throttledFetchData = useCallback(() => {
        if (fetchingRef.current) {
            return;
        }

        if (!hasMore) {
            return;
        }

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to throttle API calls
        timeoutRef.current = setTimeout(() => fetchData(), 800); // 800ms delay to prevent rapid calls
    }, [fetchData, hasMore]);

    useEffect(
        () => () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        },
        []
    );

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        // Fetch data on initial load
        startPageViewSpan((span) => fetchData(span));

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setMetaItemProp('Complete Cocktail List');

        // Cleanup timeout on unmount
        return () => {
            if (fetchTimeoutRef.current) {
                clearTimeout(fetchTimeoutRef.current);
                fetchTimeoutRef.current = null;
            }
        };
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            <title>Complete Cocktail List</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/cocktails/list`} />
            <meta
                name='description'
                content='Browse through the complete listing of cocktails including the classics and prohibition era cocktails. As well as the traditional and the more modern cocktail recipes.'
            />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/cocktails' />
            <meta property='og:title' content='Complete Cocktail List' />
            <meta
                property='og:description'
                content='Browse through the complete listing of cocktails including the classics and prohibition era cocktails. As well as the traditional and the more modern cocktail recipes.'
            />
            <Box
                component='div'
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    paddingTop: '10px',
                    minHeight: '100vh',
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
                    <InfiniteScroll
                        dataLength={cocktailListModels.length}
                        next={throttledFetchData}
                        hasMore={hasMore && !isFetching && !fetchingRef.current}
                        loader={<h4>Loading...</h4>}
                        scrollThreshold={0.5}
                        endMessage={
                            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                                <b>You&apos;ve seen all cocktails!</b>
                            </p>
                        }
                    >
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

export default CocktailsListPageContainer;
