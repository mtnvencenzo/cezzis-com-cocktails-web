import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

interface MyFavoriteCocktailsProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MyFavoriteCocktails = ({ setAnchorEl, testId }: MyFavoriteCocktailsProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/my/favorite-cocktails');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <FavoriteIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                My Favorite Cocktails
            </Typography>
        </MenuItem>
    );
};

export default MyFavoriteCocktails;
