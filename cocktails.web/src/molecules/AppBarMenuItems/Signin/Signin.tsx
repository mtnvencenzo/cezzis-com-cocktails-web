import React from 'react';
import { Avatar, MenuItem, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { loginWithRedirectOptions } from '../../../utils/authConfig';

interface SigninProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Signin = ({ setAnchorEl, testId }: SigninProps) => {
    const { loginWithRedirect } = useAuth0();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        await loginWithRedirect(loginWithRedirectOptions);
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
