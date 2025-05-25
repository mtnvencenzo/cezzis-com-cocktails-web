import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useNavigate } from 'react-router-dom';

interface MyRatingsProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MyRatings = ({ setAnchorEl, testId }: MyRatingsProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/account');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <StarRateIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                My Ratings
            </Typography>
        </MenuItem>
    );
};

export default MyRatings;
