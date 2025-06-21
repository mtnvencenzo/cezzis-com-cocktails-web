import { useRef, useState } from 'react';
import { IconButton, Rating, Typography } from '@mui/material';
import { Tooltip, TooltipRefProps } from 'react-tooltip';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import { CocktailModel, RateCocktailRs } from '../../api/cocktailsApi/cocktailsApiClient';
import CocktailRatingDialog from '../../molecules/CocktailRatingDialog/CocktailRatingDialog';

interface CocktailRaterProps {
    cocktail: CocktailModel;
    onCocktailRated: (rs: RateCocktailRs | undefined) => void;
}

const CocktailRater = ({ cocktail, onCocktailRated }: CocktailRaterProps) => {
    const [openRatingDialog, setOpenRatingDialog] = useState<boolean>(false);
    const { ownedAccount } = useOwnedAccount();
    const tooltipRef = useRef<TooltipRefProps>(null);

    const handleRatingClick = async () => {
        if (ownedAccount && cocktail?.id) {
            setOpenRatingDialog(true);
        } else if (tooltipRef.current?.isOpen ?? false) {
            tooltipRef.current?.close();
        } else {
            tooltipRef.current?.open({
                anchorSelect: `.tip-cocktail-rating-${cocktail?.id}`,
                content: 'aww snap, login required',
                place: 'top'
            });
        }
    };

    const onConfirmCocktailRating = async (rs: RateCocktailRs | undefined) => {
        if (onCocktailRated) {
            onCocktailRated(rs);
        }

        setOpenRatingDialog(false);
    };

    return (
        <>
            <Tooltip ref={tooltipRef} />
            <IconButton
                className={`tip-cocktail-rating-${cocktail?.id}`}
                data-testid={`cocktail-rating-${cocktail?.id}`}
                aria-label='rate this cocktail'
                onClick={handleRatingClick}
                disableRipple
                sx={{ pt: '0px', pb: '20px' }}
            >
                <Rating value={cocktail.rating.rating ?? 0} readOnly precision={0.5} max={5} size='medium' />
                <Typography sx={{ pl: '15px', fontWeight: 'bold' }}>{cocktail.rating?.ratingCount} Ratings</Typography>
            </IconButton>
            <CocktailRatingDialog
                open={openRatingDialog}
                cocktail={cocktail}
                title={`Rate the ${cocktail.title} Cocktail Recipe`}
                content="Help us spread the word about this cocktail recipe.  Select your rating below and click the 'Rate Cocktail' button."
                cancelButtonText='Cancel'
                confirmButtonText='Rate Cocktail'
                onCancel={() => setOpenRatingDialog(false)}
                onConfirm={onConfirmCocktailRating}
            />
        </>
    );
};

export default CocktailRater;
