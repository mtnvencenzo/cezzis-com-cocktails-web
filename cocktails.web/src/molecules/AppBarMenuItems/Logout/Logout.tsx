import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth0 } from '../../../components/Auth0Provider';
import { clearOwnedAccountLoginSession, logoutParams } from '../../../utils/authConfig';

interface LogoutProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Logout = ({ setAnchorEl, testId }: LogoutProps) => {
    const { logout } = useAuth0();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);
        clearOwnedAccountLoginSession();
        await logout(logoutParams);
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <LogoutOutlinedIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                Logout
            </Typography>
        </MenuItem>
    );
};

export default Logout;
