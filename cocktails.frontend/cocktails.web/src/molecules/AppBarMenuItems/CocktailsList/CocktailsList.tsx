import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';

interface CocktailsListProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const CocktailsList = ({ setAnchorEl, testId }: CocktailsListProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/cocktails/list');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <ListAltIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                Complete Cocktails List
            </Typography>
        </MenuItem>
    );
};

export default CocktailsList;
