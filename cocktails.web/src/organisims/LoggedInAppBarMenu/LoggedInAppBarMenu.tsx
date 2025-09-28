import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Avatar, Divider } from '@mui/material';
import LoggedInUserWithAvatar from '../../molecules/AppBarMenuItems/LoggedInUserWithAvatar/LoggedInUserWithAvatar';
import Logout from '../../molecules/AppBarMenuItems/Logout/Logout';
import Signin from '../../molecules/AppBarMenuItems/Signin/Signin';
import UserSettings from '../../molecules/AppBarMenuItems/UserSettings/UserSettings';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import AccessibilitySettings from '../../molecules/AppBarMenuItems/AccessibilitySettings/AccessibilitySettings';
import MenuFooter from '../../molecules/AppBarMenuItems/MenuFooter/MenuFooter';
import { useAuth0 } from '../../components/Auth0Provider';

interface LoggedInAppBarMenuProps {
    testId: string;
}

const LoggedInAppBarMenu = ({ testId }: LoggedInAppBarMenuProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { isAuthenticated } = useAuth0();
    const { ownedAccount } = useOwnedAccount();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = async () => {
        setAnchorElUser(null);
    };

    useEffect(() => {}, [ownedAccount]);

    return (
        <Box data-testid={testId} sx={{ flexGrow: 0, marginLeft: '5px' }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} data-testid='menu-avatar'>
                <Avatar sx={{ width: 35, height: 35 }} src={ownedAccount?.avatarUri} />
            </IconButton>
            <Menu
                id='loggedin-menu-appbar'
                disableScrollLock
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
                sx={{
                    zIndex: 2000
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.0,
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 16,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isAuthenticated && <LoggedInUserWithAvatar setAnchorEl={setAnchorElUser} testId='l-menu-myaccount' />}
                {!isAuthenticated && <Signin setAnchorEl={setAnchorElUser} testId='l-menu-signin' />}
                {isAuthenticated && <Divider />}
                {isAuthenticated && ownedAccount && <UserSettings setAnchorEl={setAnchorElUser} testId='l-menu-usersettings' />}
                {isAuthenticated && ownedAccount && <AccessibilitySettings setAnchorEl={setAnchorElUser} testId='l-menu-accessibility' />}
                {isAuthenticated && ownedAccount && <Divider />}
                {isAuthenticated && ownedAccount && <Logout setAnchorEl={setAnchorElUser} testId='l-menu-logout' />}

                <MenuFooter />
            </Menu>
        </Box>
    );
};
export default LoggedInAppBarMenu;
