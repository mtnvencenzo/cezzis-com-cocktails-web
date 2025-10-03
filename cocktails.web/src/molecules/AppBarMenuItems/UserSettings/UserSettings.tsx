import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

interface UserSettingsProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const UserSettings = ({ setAnchorEl, testId }: UserSettingsProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/account');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <SettingsIcon />
            <Typography textAlign='left' paddingLeft='10px'>
                Profile &amp; settings
            </Typography>
        </MenuItem>
    );
};

export default UserSettings;
