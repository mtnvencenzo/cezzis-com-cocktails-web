import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import { Span, SpanStatusCode } from '@opentelemetry/api';
import { getWindowEnv } from '../../../../utils/envConfig';
import trimWhack from '../../../../utils/trimWhack';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import { DEFAULT_TAKE, getCocktailFavorites } from '../../../../services/CocktailsService';
import { CocktailDataIncludeModel, CocktailFavoritingActionModel, CocktailsListModel } from '../../../../api/cocktailsApi/cocktailsApiClient';
import CocktailTile from '../../../../molecules/CocktailTile/CocktailTile';
import CocktailFavoritesNoResultsView from '../../../../molecules/CocktailFavoritesNoResultsView/CocktailFavoritesNoResultsView';
import { manageOwnedAccountFavoriteCocktails } from '../../../../services/AccountService';
import AlertDialog from '../../../../molecules/AlertDialog/AlertDialog';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import startPageViewSpan from '../../../../services/Tracer';

const AccountFavoriteCocktailsPageContainer = () => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [cocktailListModels, setCocktailListModels] = useState<CocktailsListModel[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
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
            setHasMore((rs?.items && rs?.items.length === DEFAULT_TAKE) ?? false);
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

    const confirmClearCocktailFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenConfirmation(true);
    };

    const handleCancelCocktailFavorites = async () => {
        setOpenConfirmation(false);
    };

    const handleClearCocktailFavorites = async () => {
        if (ownedAccount && ownedAccount.favoriteCocktails && ownedAccount.favoriteCocktails.length > 0) {
            await manageOwnedAccountFavoriteCocktails({
                cocktailActions: ownedAccount.favoriteCocktails.map((x) => ({
                    cocktailId: x,
                    action: CocktailFavoritingActionModel.Remove
                }))
            });

            setLoading(true);
            setIsFetching(false);
            setApiCallFailed(false);
            setCocktailListModels([]);
            setHasMore(true);
            setSkip(0);
            setOpenConfirmation(false);
        }
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        startPageViewSpan((span) => {
            fetchData(span);
        });
    }, [ownedAccount?.favoriteCocktails]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            <title>Account Favorite Cocktail Recipes</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/account/interactions/favorite-cocktails`} />
            <meta name='robots' content='noindex,follow' />

            {isSmOrXs && <BackArrowLinkItem />}

            <Grid
                container
                sx={{
                    pt: isSmOrXs ? '0px' : '40px',
                    pl: isSmOrXs ? '10px' : '0px',
                    pr: isSmOrXs ? '10px' : '0px',
                    pb: '40px',
                    mr: '0px'
                }}
            >
                <Grid size={12} sx={{ pt: '5px' }}>
                    <Stack direction='row' spacing={3}>
                        <Typography variant='h6' display='inline-block'>
                            Favorite Cocktail Recipes
                        </Typography>
                        <Button
                            data-testid='btnClearCocktailFavorites'
                            disabled={!cocktailListModels || cocktailListModels.length === 0}
                            variant='outlined'
                            color='primary'
                            onClick={confirmClearCocktailFavorites}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Grid>
                <Grid>
                    <Box
                        component='div'
                        sx={{
                            overflow: 'auto',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            paddingTop: '10px',
                            minHeight: '100vh',
                            height: '100%',
                            paddingRight: '5px',
                            paddingLeft: '5px',
                            width: '100%',
                            [theme.breakpoints.down('xs')]: {
                                paddingRight: '3px',
                                paddingLeft: '3px'
                            }
                        }}
                    >
                        {loading && <LoadingSkeleton rowCount={3} />}
                        {!loading && !apiCallFailed && cocktailListModels && (
                            <>
                                {cocktailListModels.length === 0 && (
                                    <Grid>
                                        <Grid size={12}>
                                            <CocktailFavoritesNoResultsView />
                                        </Grid>
                                    </Grid>
                                )}
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
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <AlertDialog
                open={openConfirmation}
                title='Clear your cocktail favorites?'
                content='Are you sure you would like to clear your cocktail favorites?  This cannot be undone.'
                cancelButtonText='Cancel'
                confirmButtonText='Clear'
                onCancel={handleCancelCocktailFavorites}
                onConfirm={handleClearCocktailFavorites}
            />
        </>
    );
};

export default AccountFavoriteCocktailsPageContainer;
