import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import { Divider } from '@mui/material';
import LoggedInUserWithAvatar from '../../molecules/AppBarMenuItems/LoggedInUserWithAvatar/LoggedInUserWithAvatar';
import Logout from '../../molecules/AppBarMenuItems/Logout/Logout';
import Signin from '../../molecules/AppBarMenuItems/Signin/Signin';
import UserSettings from '../../molecules/AppBarMenuItems/UserSettings/UserSettings';
import CocktailsList from '../../molecules/AppBarMenuItems/CocktailsList/CocktailsList';
import CocktailsSearch from '../../molecules/AppBarMenuItems/CocktailsSearch/CocktailsSearch';
import MyFavoriteCocktails from '../../molecules/AppBarMenuItems/MyFavoriteCocktails/MyFavoriteCocktails';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import AccessibilitySettings from '../../molecules/AppBarMenuItems/AccessibilitySettings/AccessibilitySettings';
import MenuFooter from '../../molecules/AppBarMenuItems/MenuFooter/MenuFooter';
import { useAuth0 } from '../../components/Auth0Provider';

interface MainAppBarMenuProps {
    testId: string;
    isXs: boolean;
}

const MainAppBarMenu = ({ testId, isXs }: MainAppBarMenuProps) => {
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
        <Box data-testid={testId} sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} data-testid='menu-hamburger'>
                <AppsIcon color='secondary' fontSize='large' />
            </IconButton>
            <Menu
                id='menu-appbar'
                disableScrollLock
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{
                    zIndex: 2000
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'auto',
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
                <Box
                    sx={{
                        bgcolor: '#efefef',
                        pt: '5px',
                        pb: '10px',
                        pl: '20px'
                    }}
                >
                    <Typography variant='h6'>Menu</Typography>
                </Box>

                {isAuthenticated && isXs && <LoggedInUserWithAvatar setAnchorEl={setAnchorElUser} testId='m-menu-myaccount' />}
                {!isAuthenticated && isXs && <Signin setAnchorEl={setAnchorElUser} testId='m-menu-signin' />}
                {isXs && <Divider />}
                <CocktailsSearch setAnchorEl={setAnchorElUser} testId='m-menu-cocktailssearch' />
                <CocktailsList setAnchorEl={setAnchorElUser} testId='m-menu-cocktailslist' />
                {isAuthenticated && ownedAccount && <MyFavoriteCocktails setAnchorEl={setAnchorElUser} testId='l-menu-myfavorites' />}
                {isAuthenticated && isXs && ownedAccount && <Divider />}
                {isAuthenticated && isXs && ownedAccount && <UserSettings setAnchorEl={setAnchorElUser} testId='m-menu-usersettings' />}
                {isAuthenticated && isXs && ownedAccount && <AccessibilitySettings setAnchorEl={setAnchorElUser} testId='m-menu-accessibility' />}
                {isAuthenticated && isXs && ownedAccount && <Divider />}
                {isAuthenticated && isXs && ownedAccount && <Logout setAnchorEl={setAnchorElUser} testId='m-menu-logout' />}
                {isXs && <MenuFooter />}
            </Menu>
        </Box>
    );
};
export default MainAppBarMenu;
