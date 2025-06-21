import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface CocktailsSearchProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const CocktailsSearch = ({ setAnchorEl, testId }: CocktailsSearchProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <SearchIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                Search Cocktail Recipes
            </Typography>
        </MenuItem>
    );
};

export default CocktailsSearch;
