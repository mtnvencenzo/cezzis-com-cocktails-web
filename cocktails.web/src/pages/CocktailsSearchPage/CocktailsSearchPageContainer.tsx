import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import './CocktailsSearchPageContainer.css';
import { Box, Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { Span, SpanStatusCode } from '@opentelemetry/api';
import { DEFAULT_TAKE, searchCocktails } from '../../services/CocktailsService';
import { CocktailsListModel, CocktailDataIncludeModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import CocktailTile from '../../molecules/CocktailTile/CocktailTile';
import theme from '../../theme';
import { useCocktailSearch } from '../../components/CocktailSearchContext';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';
import CocktailSearchNoResultsView from '../../molecules/CocktailSearchNoResultsView/CocktailSearchNoResultsView';
import jsonld from './CocktailsSearchPageContainer.jsonld';
import { setJsonLd, setMetaItemProp } from '../../utils/headUtil';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import startPageViewSpan from '../../services/Tracer';

interface CocktailsSearchPageContainerState {
    loading: boolean;
    isFetching: boolean;
    apiCallFailed: boolean;
    cocktailSearchModels: CocktailsListModel[];
    hasMore: boolean;
    skip: number;
}

const CocktailsSearchPageContainer = () => {
    const [state, setState] = useState<CocktailsSearchPageContainerState>({
        loading: true,
        isFetching: false,
        apiCallFailed: false,
        cocktailSearchModels: [],
        hasMore: true,
        skip: 0
    });
    const [searchParams] = useSearchParams();
    const { setNoItems } = useCocktailSearch();
    const { filtersRevision } = useCocktailFiltering();
    const { ownedAccount, ownedAccountCocktailRatings } = useOwnedAccount();

    const fetchData = async (skip: number | undefined = undefined, span: Span | undefined = undefined) => {
        const useSkip = skip ?? state.skip;
        const currentItems = useSkip === 0 ? [] : state.cocktailSearchModels;

        if (state.isFetching) {
            return;
        }

        try {
            setState({
                ...state,
                apiCallFailed: false,
                isFetching: true
            });

            const rs = await searchCocktails(searchParams.get('q') ?? '', useSkip, DEFAULT_TAKE, [CocktailDataIncludeModel.SearchTiles, CocktailDataIncludeModel.DescriptiveTitle]);
            const items = rs?.items?.filter((x) => x.searchTiles && x.searchTiles.length > 0) ?? [];

            setNoItems(useSkip === 0 && items.length === 0);

            setState({
                ...state,
                isFetching: false,
                loading: false,
                apiCallFailed: false,
                skip: useSkip + DEFAULT_TAKE,
                hasMore: (rs?.items && rs?.items.length === DEFAULT_TAKE) ?? false,
                cocktailSearchModels: [...currentItems, ...(items.filter((x) => currentItems.find((p) => p.id === x.id) === undefined) ?? [])]
            });
        } catch (e: unknown) {
            setState({
                ...state,
                apiCallFailed: true,
                hasMore: false,
                isFetching: false,
                loading: false,
                skip: useSkip
            });
            span?.recordException(e as Error);
            span?.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error).message });
        }

        span?.end();
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        startPageViewSpan((span) => {
            fetchData(0, span);
        });

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setJsonLd(jsonld());
        setMetaItemProp('Cocktail Search');
    }, [filtersRevision, searchParams, ownedAccountCocktailRatings]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            <title>Cocktail Search</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/cocktails/search`} />
            <meta
                name='description'
                content='Search through the complete listing of cocktails including the classics, prohibition era cocktailsand the traditional and the more modern cocktail recipes.'
            />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/cocktails/search' />
            <meta property='og:title' content='Cocktail Search' />
            <meta
                property='og:description'
                content='Search through the complete listing of cocktails including the classics, prohibition era cocktailsand the traditional and the more modern cocktail recipes.'
            />
            <Box
                component='div'
                sx={{
                    overflow: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    paddingTop: '10px',
                    minHeight: '100vh',
                    height: '100%',
                    paddingRight: (state.cocktailSearchModels?.length ?? 0) > 0 ? '10px' : '0px',
                    paddingLeft: (state.cocktailSearchModels?.length ?? 0) > 0 ? '10px' : '0px',
                    width: '100%',
                    paddingBottom: '50px',
                    [theme.breakpoints.down('xs')]: {
                        paddingRight: (state.cocktailSearchModels?.length ?? 0) > 0 ? '3px' : '0px',
                        paddingLeft: (state.cocktailSearchModels?.length ?? 0) > 0 ? '3px' : '0px'
                    }
                }}
            >
                {state.loading && <LoadingSkeleton rowCount={3} />}
                {!state.loading && !state.apiCallFailed && state.cocktailSearchModels && state.cocktailSearchModels.length === 0 && (
                    <CocktailSearchNoResultsView searchTerm={searchParams.get('q') ?? ''} />
                )}
                {!state.loading && !state.apiCallFailed && state.cocktailSearchModels && state.cocktailSearchModels.length > 0 && (
                    <InfiniteScroll dataLength={state.cocktailSearchModels.length} next={fetchData} hasMore={state.hasMore && !state.isFetching} loader={<h4>Loading...</h4>} scrollThreshold={0.8}>
                        <Grid
                            alignContent='top'
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
                            {state.cocktailSearchModels.map((x) => (
                                <CocktailTile
                                    key={`tile-${x.id}`}
                                    cocktail={x}
                                    testId={`cocktailsearchtile-${x.id}`}
                                    isFavorite={ownedAccount?.favoriteCocktails?.includes(x.id) ?? false}
                                    indicatorValue={ownedAccountCocktailRatings?.ratings?.find((y) => y.cocktailId === x.id)?.stars ?? 0}
                                    indicatorPosition='Top'
                                />
                            ))}
                        </Grid>
                    </InfiniteScroll>
                )}
            </Box>
            {state.cocktailSearchModels && state.cocktailSearchModels.length > 0 && <br />}
        </>
    );
};

export default CocktailsSearchPageContainer;
