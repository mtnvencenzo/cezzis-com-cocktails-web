import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth0 } from '@auth0/auth0-react';

interface LogoutProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Logout = ({ setAnchorEl, testId }: LogoutProps) => {
    const { logout } = useAuth0();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);
        await logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
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
