import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import './CocktailTile.css';
import { Link } from 'react-router-dom';
import React from 'react';
import FavoriteCocktailButton from '../../atoms/FavoriteCocktailButton/FavoriteCocktailButton';
import ShareCocktailButton from '../../atoms/ShareCocktailButton/ShareCocktailButton';
import RatingExtended from '../../atoms/RatingExtended/RatingExtended';
import { CocktailModelOutput, IngredientApplicationTypeModel } from '../../api/aisearchApi';

interface CocktailTileProps {
    cocktail: CocktailModelOutput;
    isFavorite: boolean;
    indicatorValue?: number;
    testId: string;
    indicatorPosition: 'Top' | 'Bottom';
}

const CocktailTile = React.memo(({ cocktail, isFavorite, testId, indicatorValue, indicatorPosition }: CocktailTileProps) => (
    <Card sx={{ width: '350px', maxWidth: '350px', textAlign: 'left' }} data-testid={testId}>
        <CardActionArea component={Link} to={`/cocktails/${cocktail.id}`}>
            {cocktail?.searchTiles && cocktail.searchTiles.length > 0 && (
                <CardMedia component='img' width='100%' image={cocktail.searchTiles[0]} alt={cocktail.descriptiveTitle ?? ''} style={{ maxWidth: '350px', maxHeight: '350px' }} loading='lazy' />
            )}
            <CardContent sx={{ pt: '5px', pb: '0px' }}>
                <Typography color='text.primary' noWrap className='cocktailLink'>
                    {cocktail.title}
                </Typography>
                <RatingExtended
                    testId={`rating-${cocktail.id}-${cocktail.rating}`}
                    value={cocktail.rating}
                    indicatorValue={indicatorValue ?? 0}
                    indicatorPosition={indicatorPosition}
                    precision={1.0}
                    max={5}
                    readOnly
                    size='small'
                />
                <Typography noWrap gutterBottom className='baseIngredientLink'>
                    BASE:{' '}
                    {cocktail.ingredients
                        .filter((i) => i.applications.includes(IngredientApplicationTypeModel.Base))
                        .map((i) => i.name)
                        .join(', ')}
                </Typography>
                {cocktail.ingredients &&
                    cocktail.ingredients.map((i, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Typography key={`${cocktail.id}-${index}-${(i.types ?? []).map((x) => x[0]).join('')}-${i.name}`} noWrap gutterBottom>
                            <li>{i.display}</li>
                        </Typography>
                    ))}
            </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
            <FavoriteCocktailButton cocktailId={cocktail.id} isFav={isFavorite} testId={`fav-${cocktail.id}`} />
            <ShareCocktailButton cocktailId={cocktail.id} testId={`shr-${cocktail.id}`} />
        </CardActions>
    </Card>
));

CocktailTile.displayName = 'CocktailTile';
export default CocktailTile;
