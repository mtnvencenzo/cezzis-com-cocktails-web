import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useRef, useState } from 'react';
import { TooltipRefProps } from 'react-tooltip';
import { CocktailFavoritingActionModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { manageOwnedAccountFavoriteCocktails } from '../../services/AccountService';
import { useOwnedAccount } from '../../components/OwnedAccountContext';

const Tooltip = React.lazy(() => import('react-tooltip').then((module) => ({ default: module.Tooltip })));

interface FavoriteCocktailButtonProps {
    cocktailId: string;
    isFav: boolean;
    testId: string;
}

const FavoriteCocktailButton = ({ cocktailId, isFav, testId }: FavoriteCocktailButtonProps) => {
    const [fav, setFav] = useState<boolean>(isFav);
    const tooltipRef = useRef<TooltipRefProps>(null);
    const { ownedAccount } = useOwnedAccount();

    const handleFavoriteClick = async () => {
        if (ownedAccount) {
            manageOwnedAccountFavoriteCocktails({
                cocktailActions: [
                    {
                        cocktailId,
                        action: fav ? CocktailFavoritingActionModel.Remove : CocktailFavoritingActionModel.Add
                    }
                ]
            });

            setFav(!fav);
        } else if (tooltipRef.current?.isOpen ?? false) {
            tooltipRef.current?.close();
        } else {
            tooltipRef.current?.open({
                anchorSelect: `.favtip-${testId}`,
                content: 'aww snap, login required',
                place: 'top'
            });
        }
    };

    return (
        <>
            <Tooltip ref={tooltipRef} />
            <IconButton className={`favtip-${testId}`} data-testid={testId} aria-label='add to favorites' sx={{ color: fav ? '#bf2e2e' : 'default' }} onClick={handleFavoriteClick}>
                <FavoriteIcon />
            </IconButton>
        </>
    );
};

export default FavoriteCocktailButton;
