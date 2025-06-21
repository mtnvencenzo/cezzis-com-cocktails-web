import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { TooltipRefProps } from 'react-tooltip';
import logger from '../../services/Logger';
import { useOwnedAccount } from '../../components/OwnedAccountContext';

const Tooltip = React.lazy(() => import('react-tooltip').then((module) => ({ default: module.Tooltip })));

interface ShareCocktailButtonProps {
    cocktailId: string;
    testId: string;
}

const ShareCocktailButton = ({ cocktailId, testId }: ShareCocktailButtonProps) => {
    const tooltipRef = useRef<TooltipRefProps>(null);
    const { ownedAccount } = useOwnedAccount();

    const handleShareClick = async () => {
        if (ownedAccount) {
            if (cocktailId === '') {
                logger.logInformation({ message: 'cocktailid is empty' });
            }
            // manageOwnedAccountFavoriteCocktails({
            //     cocktailActions: [
            //         {
            //             cocktailId: cocktailId,
            //             action: fav ? CocktailFavoritingAction.Remove : CocktailFavoritingAction.Add
            //         }
            //     ]
            // });

            // setFav(!fav);
        } else if (tooltipRef.current?.isOpen) {
            tooltipRef.current?.close();
        } else {
            tooltipRef.current?.open({
                anchorSelect: `.shatip-${testId}`,
                content: 'aww snap, login required',
                place: 'top'
            });
        }
    };

    return (
        <>
            <Tooltip ref={tooltipRef} />
            <IconButton className={`shatip-${testId}`} data-testid={testId} aria-label='share' onClick={handleShareClick}>
                <ShareIcon />
            </IconButton>
        </>
    );
};

export default ShareCocktailButton;
