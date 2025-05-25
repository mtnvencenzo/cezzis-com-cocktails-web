import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './CocktailSearchNoResultsView.css';
import CocktailFiltersResetButton from '../../atoms/CocktailFiltersResetButton/CocktailFiltersResetButton';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';

interface CocktailSearchNoResultsViewProps {
    searchTerm?: string;
}

const CocktailSearchNoResultsView = ({ searchTerm = '' }: CocktailSearchNoResultsViewProps) => {
    const { setFiltersRevision } = useCocktailFiltering();

    const handleReset = () => {
        setFiltersRevision();
    };

    return (
        <Grid
            container
            columns={6}
            sx={{
                minHeight: '100vh',
                margin: 'auto'
            }}
        >
            <Grid size={6}>
                <Grid size={6} sx={{ backgroundColor: 'rgba(255, 255, 255, 1.0)', paddingLeft: '20px' }}>
                    <Typography variant='h6'>Hmmm, we didn&apos;t find anything for &apos;{searchTerm}&apos; using your selected cocktail filters.</Typography>
                </Grid>
                <Grid size={6} sx={{ backgroundColor: 'rgba(255, 255, 255, 1.0)', paddingLeft: '20px', paddingBottom: '10px' }}>
                    <Typography variant='body1'>Try a different search term, reduce your cocktail filters, or try some of the suggestions below.</Typography>
                </Grid>
                <Grid
                    size={{
                        lg: 3,
                        md: 6,
                        sm: 6,
                        xs: 6
                    }}
                    columnSpacing={5}
                    container
                    columns={{
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xs: 1
                    }}
                    sx={{
                        paddingTop: '30px',
                        paddingRight: {
                            xs: '0px',
                            sm: '30px'
                        },
                        paddingLeft: {
                            xs: '0px',
                            sm: '30px'
                        },
                        paddingBottom: '30px'
                    }}
                >
                    <Grid size={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 5.0)', p: '10px', mt: '15px' }}>
                        <Typography fontWeight='bold'>View Complete Cocktails List</Typography>
                        <Typography sx={{ paddingTop: '5px' }}>Are you looking for a complete list of cocktails that you can scroll through?</Typography>
                        <Link to='/cocktails/list' className='inpage-link'>
                            View the complete list of cocktails here
                        </Link>
                    </Grid>
                    <Grid size={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 5.0)', p: '10px', mt: '15px' }}>
                        <Typography fontWeight='bold'>Reset Your Cocktail Filters</Typography>
                        <Typography sx={{ paddingTop: '5px' }}>Perhaps your cocktail filters are too selective?</Typography>
                        <CocktailFiltersResetButton testId='noresults-filters-reset-btn' onReset={handleReset} sx={{ display: 'inline-block', marginTop: '10px' }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CocktailSearchNoResultsView;
