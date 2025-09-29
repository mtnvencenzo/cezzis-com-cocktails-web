import { Box, Grid, Typography, Container, IconButton } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../../assets/logo-32x32.png';
import FooterLink from '../../atoms/FooterLink/FooterLink';
import showCookieBot from '../../utils/cookiebot';
import { clearOwnedAccountLoginSession, loginWithRedirectOptions, logoutParams } from '../../utils/authConfig';
import { useAuth0 } from '../../components/Auth0Provider';
import SessionStorageService from '../../services/SessionStorageService';

interface MainFooterBarProps {
    testId: string;
}

const MainFooterBar = ({ testId }: MainFooterBarProps) => {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const sessionStorageService = new SessionStorageService();

    const handleLogout = async () => {
        clearOwnedAccountLoginSession();
        await logout(logoutParams);
    };

    const handleLoginRedirect = async () => {
        sessionStorageService.SetOwnedAccountPostLoginRedirectUrl(window.location.pathname);
        await loginWithRedirect(loginWithRedirectOptions());
    };

    return (
        <Box
            data-testid={testId}
            sx={{
                py: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#efefef'
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={2}
                    columns={{
                        xs: 4,
                        sm: 6,
                        md: 10,
                        lg: 10
                    }}
                    justifyContent='space-between'
                >
                    <Grid size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
                        <Grid container>
                            <Box component='div'>
                                <img
                                    src={logo}
                                    alt="Cezzi's.com"
                                    style={{
                                        height: '32px',
                                        width: '32px'
                                    }}
                                />
                            </Box>
                            <Typography variant='h6' color='text.primary' className='logoText' gutterBottom>
                                Cezzi&apos;s
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
                        <FooterLink text='Cocktail Search' testId='footer-cocktail-search' navigatePath='/' />
                        <br />
                        <FooterLink text='Cocktail List' testId='footer-cocktail-list' navigatePath='/cocktails/list' />
                    </Grid>
                    <Grid
                        size={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                        sx={{
                            paddingLeft: {
                                xs: '35px',
                                sm: '35px',
                                md: '0px',
                                lg: '0px'
                            }
                        }}
                    >
                        <FooterLink text='About Us' testId='footer-about-us' navigatePath='/about-us' />
                        <br />
                        <FooterLink text='Contact' testId='footer-contact' navigatePath='/contact' />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
                        <FooterLink text='Terms of Service' testId='footer-terms' navigatePath='/terms-of-service' />
                        <br />
                        <FooterLink text='Privacy Policy' testId='footer-privacy' navigatePath='/privacy-policy' />
                        <br />
                        <FooterLink text='Cookie Preferences' testId='footer-cookies' navigatePath='#' onClick={(e) => showCookieBot(e)} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2, md: 2, lg: 2 }} sx={{ paddingLeft: '0px' }}>
                        {!isAuthenticated && (
                            <IconButton size='small' onClick={() => handleLoginRedirect()} data-testid='ft-button-myaccount' sx={{ paddingLeft: '0px', paddingTop: '0px' }}>
                                <AccountCircleOutlinedIcon color='primary' />
                                <Typography data-testid='footer-myaccount' color='text.primary' noWrap gutterBottom className='footerLink' sx={{ paddingLeft: '5px', paddingTop: '5px' }}>
                                    Signin
                                </Typography>
                            </IconButton>
                        )}
                        {isAuthenticated && (
                            <IconButton size='small' disableRipple onClick={() => handleLogout()} data-testid='ft-button-logout' sx={{ paddingLeft: '0px', paddingTop: '0px' }}>
                                <LogoutOutlinedIcon color='primary' />
                                <Typography data-testid='footer-logout' color='text.primary' noWrap gutterBottom className='footerLink' sx={{ paddingLeft: '5px', paddingTop: '5px' }}>
                                    Logout
                                </Typography>
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
                <Typography variant='body2' color='text.secondary' align='center' sx={{ pt: 4 }}>
                    {`© ${new Date().getFullYear()} Cezzis.com | All rights reserved.`}
                </Typography>
            </Container>
        </Box>
    );
};

export default MainFooterBar;
