import React, { useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, IconButton, useTheme, Card, Grid, Skeleton } from '@mui/material';
import { getCocktailsSearchFilters } from '../../services/CocktailsService';
import { CocktailIngredientFiltersRs } from '../../api/cocktailsApi/cocktailsApiClient';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';
import CocktailIngredientFilterChipGroup from '../../molecules/CocktailIngredientFilterChipGroup/CocktailIngredientFilterChipGroup';
import './CocktailFiltersDialog.css';
import { useCocktailSearch } from '../../components/CocktailSearchContext';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';
import CocktailFiltersResetButton from '../../atoms/CocktailFiltersResetButton/CocktailFiltersResetButton';

interface CocktailFiltersDialogProps {
    testId: string;
    onOpening?: () => void;
    onClosing?: () => void;
    enablePulsate?: boolean;
    iconFontSize?: 'small' | 'inherit' | 'medium' | 'large';
    iconColor?: 'action' | 'disabled' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const filtersStorageService = new CocktailFiltersLocalStorageService();

const CocktailFiltersDialog = ({ testId, enablePulsate = true, onOpening, onClosing, iconFontSize = 'small', iconColor = 'primary' }: CocktailFiltersDialogProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [force, setForce] = useState(false);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [cocktailsSearchFilters, setCocktailsSearchFilters] = useState<CocktailIngredientFiltersRs | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [hasChange, setHasChange] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { noItems } = useCocktailSearch();
    const { setFiltersRevision } = useCocktailFiltering();

    const handleFilterIconClick = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        if (onOpening) {
            onOpening();
        }

        setHasChange(false);
        setOpen(true);
    };

    const handleFilterChange = () => {
        setHasChange(true);
    };

    const handleClose = () => {
        if (onClosing) {
            onClosing();
        }

        setOpen(false);

        if (hasChange) {
            setFiltersRevision();
        }
    };

    const handleReset = () => {
        filtersStorageService.ClearAllSelections();
        setHasChange(true);
        setForce(!force);
    };

    useEffect(() => {
        if (open) {
            const fetchFilters = async () => {
                try {
                    const rs = await getCocktailsSearchFilters();

                    setApiCallFailed(false);
                    filtersStorageService.InitializeStorage(rs);
                    setCocktailsSearchFilters(rs);
                } catch {
                    setApiCallFailed(true);
                }

                setLoading(false);
            };

            fetchFilters();
        }
    }, [open]);

    return (
        <>
            <IconButton onMouseDownCapture={handleFilterIconClick} data-testid={`${testId}-icon`} sx={{ color: iconColor }}>
                <FilterListIcon fontSize={iconFontSize} className={enablePulsate && noItems ? 'pulse' : ''} color={iconColor} />
            </IconButton>
            <Dialog data-testid={`${testId}-dialog`} fullScreen={fullScreen} open={open} onClose={handleClose}>
                <DialogTitle id='responsive-dialog-title'>
                    <Grid
                        container
                        columns={{
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2
                        }}
                    >
                        <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1 }}>Cocktail Search filters</Grid>
                        <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1 }} alignContent='right' textAlign='right'>
                            <CocktailFiltersResetButton testId='dialog-filters-reset-btn' disabled={loading || apiCallFailed || cocktailsSearchFilters === undefined} onReset={handleReset} />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Card
                        key={force ? '1' : '2'}
                        data-testid={`${testId}-groups`}
                        sx={{
                            padding: '20px'
                        }}
                    >
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Spirits' filters={cocktailsSearchFilters.spirits ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Liqueurs' filters={cocktailsSearchFilters.liqueurs ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Fresh Fruits' filters={cocktailsSearchFilters.fruits ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Juices' filters={cocktailsSearchFilters.juices ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Herbs and Spices' filters={cocktailsSearchFilters.herbsAndFlowers ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Dilutions' filters={cocktailsSearchFilters.dilutions ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Syrups and Sauces' filters={cocktailsSearchFilters.syrupsAndSauces ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Bitters' filters={cocktailsSearchFilters.bitters ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Beers, Wines and Champagnes' filters={cocktailsSearchFilters.beerWineChampagne ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Vegetables' filters={cocktailsSearchFilters.vegetables ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Proteins' filters={cocktailsSearchFilters.proteins ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? (
                            <CocktailIngredientFilterChipGroup title='Recommended Glassware' filters={cocktailsSearchFilters.glassware ?? []} onFiltersUpdated={handleFilterChange} />
                        ) : (
                            <Skeleton />
                        )}
                        <br />
                        {cocktailsSearchFilters ? <CocktailIngredientFilterChipGroup title='Eras' filters={cocktailsSearchFilters.eras ?? []} onFiltersUpdated={handleFilterChange} /> : <Skeleton />}
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button data-testid='dialog-filters-close-btn' color='primary' onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CocktailFiltersDialog;
