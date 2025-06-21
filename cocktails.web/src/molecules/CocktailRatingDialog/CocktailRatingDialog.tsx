import { useMemo, useState } from 'react';
import { Box, Rating } from '@mui/material';
import AlertDialog from '../AlertDialog/AlertDialog';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import { CocktailModel, RateCocktailRs } from '../../api/cocktailsApi/cocktailsApiClient';
import { rateCocktail } from '../../services/AccountService';

interface CocktailRatingDialogProps {
    open: boolean;
    cocktail: CocktailModel;
    title: string;
    content: string;
    cancelButtonText: string;
    confirmButtonText: string;
    onCancel?: () => void;
    onConfirm?: (rateRs: RateCocktailRs | undefined) => void;
}

const CocktailRatingDialog = ({ open, cocktail, title, content, cancelButtonText, confirmButtonText, onCancel = undefined, onConfirm = undefined }: CocktailRatingDialogProps) => {
    const { ownedAccount, ownedAccountCocktailRatings } = useOwnedAccount();
    const [hover, setHover] = useState(0);
    const [stars, setStars] = useState<number>(ownedAccountCocktailRatings?.ratings?.filter((x) => x.cocktailId === cocktail.id)[0]?.stars ?? 0);

    const handleCancelCocktailRating = async () => {
        if (onCancel) {
            onCancel();
            setStars(ownedAccountCocktailRatings?.ratings?.filter((x) => x.cocktailId === cocktail.id)[0]?.stars ?? 0);
        }
    };

    const hasAlreadyRated: boolean = useMemo(() => {
        if (!ownedAccountCocktailRatings || !ownedAccountCocktailRatings.ratings || ownedAccountCocktailRatings.ratings.filter((x) => x.cocktailId === cocktail.id).length === 0) {
            return false;
        }

        return true;
    }, [ownedAccountCocktailRatings, cocktail]);

    const dialogContent = useMemo(
        () => (hasAlreadyRated ? 'Hmm, it looks like you have already rated this cocktail. Thank you for being an active contributor!' : content),
        [hasAlreadyRated, content]
    );

    const handleConfirmCocktailRating = async () => {
        let rateRs: RateCocktailRs | undefined;

        if (ownedAccount) {
            rateRs = await rateCocktail({
                cocktailId: cocktail.id,
                stars
            });

            setStars(ownedAccountCocktailRatings?.ratings?.filter((x) => x.cocktailId === cocktail.id)[0]?.stars ?? 0);
        }

        if (onConfirm) {
            onConfirm(rateRs);
        }
    };

    const handleRatingChange = async (_: React.SyntheticEvent, value: number | null) => {
        if (!ownedAccount || !value || !cocktail?.id) {
            return;
        }

        setStars(value);
    };

    const labels: { [index: string]: string } = {
        0: '',
        1: "I wouldn't serve this to my worst enemy!",
        2: "I guess it wasn't horrible.",
        3: "Meh, It's five oclock somewhere.",
        4: "Yes bartender, I'll have another round.",
        5: 'One of my favorites!'
    };

    const getLabelText = (value: number) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;

    return (
        <AlertDialog
            open={open}
            title={title}
            content={dialogContent}
            cancelButtonText={!hasAlreadyRated ? cancelButtonText : 'Close'}
            confirmButtonText={confirmButtonText}
            showConfirm={!hasAlreadyRated}
            onCancel={handleCancelCocktailRating}
            onConfirm={handleConfirmCocktailRating}
        >
            <Rating
                value={stars}
                readOnly={!ownedAccount || hasAlreadyRated}
                precision={1.0}
                max={5}
                getLabelText={getLabelText}
                size='large'
                onChange={handleRatingChange}
                onChangeActive={(_, newHover) => {
                    setHover(newHover);
                }}
                sx={{ pt: '20px' }}
            />
            {hover > 0 && !hasAlreadyRated && <Box sx={{ ml: 1, minHeight: '60px' }}>{labels[hover > 0 ? hover : 0]}</Box>}
            {hover <= 0 && !hasAlreadyRated && <Box sx={{ ml: 1, minHeight: '60px' }}>&nbsp;</Box>}
        </AlertDialog>
    );
};

export default CocktailRatingDialog;
