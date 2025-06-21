import React from 'react';
import { Avatar, MenuItem, Typography } from '@mui/material';
import { login } from '../../../utils/authConfig';

interface SigninProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Signin = ({ setAnchorEl, testId }: SigninProps) => {
    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        await login();
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <Avatar sx={{ width: 35, height: 35 }} />
            <Typography textAlign='left' paddingLeft='10px'>
                Signin
            </Typography>
        </MenuItem>
    );
};

export default Signin;
