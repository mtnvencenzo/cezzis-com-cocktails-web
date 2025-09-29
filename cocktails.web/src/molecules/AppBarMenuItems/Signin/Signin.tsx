import React from 'react';
import { Avatar, MenuItem, Typography } from '@mui/material';
import { loginWithRedirectOptions } from '../../../utils/authConfig';
import { useAuth0 } from '../../../components/Auth0Provider';
import SessionStorageService from '../../../services/SessionStorageService';

interface SigninProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Signin = ({ setAnchorEl, testId }: SigninProps) => {
    const { loginWithRedirect } = useAuth0();
    const sessionStorageService = new SessionStorageService();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);
        sessionStorageService.SetOwnedAccountPostLoginRedirectUrl(window.location.pathname + window.location.search);

        await loginWithRedirect(loginWithRedirectOptions());
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
