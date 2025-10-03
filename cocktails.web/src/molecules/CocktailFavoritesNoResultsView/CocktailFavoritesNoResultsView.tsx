import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './CocktailFavoritesNoResultsView.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

const icon = (
    <IconButton aria-label='add to favorites' sx={{ color: 'default' }}>
        <FavoriteIcon />
    </IconButton>
);

const CocktailFavoritesNoResultsView = () => (
    <Grid size={12}>
        <Grid size={12} sx={{ paddingLeft: '20px', backgroundColor: '#efefef' }}>
            <Typography variant='h6'>Hmmm, you don&apos;t appear to have any selected cocktail favorites.</Typography>
            <Typography variant='body1'>To favorite a specific cocktail look for the {icon} icon and click on them.</Typography>
        </Grid>
        <Grid size={12} sx={{ paddingLeft: '20px', paddingBottom: '10px' }} />
        <Grid size={12} sx={{ paddingLeft: '20px' }}>
            <Grid size={12} sx={{}}>
                <Typography fontWeight='bold'>View Complete Cocktails List</Typography>
                <Typography sx={{ paddingTop: '5px' }}>Are you looking for a complete list of cocktails that you can scroll through?</Typography>
                <Link to='/cocktails/list' className='inpage-link'>
                    View the complete list of cocktails here
                </Link>
            </Grid>
        </Grid>
    </Grid>
);

export default CocktailFavoritesNoResultsView;
