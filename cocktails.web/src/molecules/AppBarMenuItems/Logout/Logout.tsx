import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { logout } from '../../../utils/authConfig';

interface LogoutProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Logout = ({ setAnchorEl, testId }: LogoutProps) => {
    const { inProgress } = useMsal();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        if (inProgress === InteractionStatus.None) {
            await logout();
        }
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
