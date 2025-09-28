import React from 'react';
import { Avatar, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOwnedAccount } from '../../../components/OwnedAccountContext';
import { getOwnedAccountName } from '../../../utils/accountOwnedProfileExtentions';
import { useAuth0 } from '@auth0/auth0-react';

interface LoggedInUserWithAvatarProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const LoggedInUserWithAvatar = ({ setAnchorEl, testId }: LoggedInUserWithAvatarProps) => {
    const navigate = useNavigate();
    const { ownedAccount } = useOwnedAccount();
    const { user } = useAuth0();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);
        navigate('/account');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <Avatar sx={{ width: 35, height: 35 }} src={ownedAccount?.avatarUri} />
            <Typography textAlign='left' paddingLeft='10px'>
                {`${getOwnedAccountName(ownedAccount, user)}`}
            </Typography>
        </MenuItem>
    );
};

export default LoggedInUserWithAvatar;
