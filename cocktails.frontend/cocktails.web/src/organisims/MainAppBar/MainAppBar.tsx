import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Slide, useScrollTrigger } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo-42x42.png';
import SearchBox from '../../molecules/SearchBox/SearchBox';
import './MainAppBar.css';
import MainAppBarMenu from '../MainAppBarMenu/MainAppBarMenu';
import LoggedInAppBarMenu from '../LoggedInAppBarMenu/LoggedInAppBarMenu';

interface MainAppBarProps {
    testId: string;
    isXs: boolean;
}

const MainAppBar = ({ testId, isXs }: MainAppBarProps) => {
    const trigger = useScrollTrigger();
    const location = useLocation();
    const isSearchPage = () => location.pathname.toLowerCase() === '/cocktails/search';

    return (
        <>
            <Slide appear={false} direction='down' in={!trigger}>
                <AppBar position='fixed' data-testid={testId} sx={{ marginTop: '0px' }}>
                    <Container maxWidth={false} sx={{ pl: '0px !important', pr: '0px !important' }}>
                        <Toolbar
                            disableGutters
                            sx={{
                                pl: {
                                    lg: '24px',
                                    md: '24px',
                                    sm: '24px',
                                    xs: '10px'
                                },
                                pr: {
                                    lg: '24px',
                                    md: '24px',
                                    sm: '24px',
                                    xs: '5px'
                                }
                            }}
                        >
                            <Link to='/'>
                                <Box
                                    component='img'
                                    data-testid='logo-icon-link'
                                    sx={{
                                        display: 'flex',
                                        mr: 1,
                                        cursor: 'pointer',
                                        paddingBottom: '6px',
                                        height: '42px',
                                        width: '42px'
                                    }}
                                    alt="Cezzi's.com"
                                    src={logo}
                                />
                            </Link>
                            {(!isSearchPage() || !isXs) && (
                                <Typography
                                    variant='h5'
                                    data-testid='logo-text-link'
                                    noWrap
                                    component={Link}
                                    to='/'
                                    className='logoText'
                                    sx={{
                                        mr: 2,
                                        display: 'flex',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cezzi&apos;s
                                </Typography>
                            )}

                            {!isSearchPage() && <Box sx={{ flexGrow: 1, display: 'flex' }} />}

                            {isSearchPage() && (
                                <Box sx={{ flexGrow: 1, display: 'ruby', alignItems: 'center !important', alignContent: 'center !important', textAlign: 'center !important' }}>
                                    <SearchBox enableFiltering bannerEmbeded testId='search-box' replaceBreadcrumbOnSearch filterOptions />
                                </Box>
                            )}

                            <MainAppBarMenu testId='main-app-bar-menu' isXs={isXs} />
                            {!isXs && <LoggedInAppBarMenu testId='loggedin-app-bar-menu' />}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Slide>
            <ToastContainer
                className={!trigger ? 'custom-toast-container-w-appbar-offset' : 'custom-toast-container-wo-appbar-offset'}
                position='top-right'
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme='light'
                transition={Bounce}
            />
            <Toolbar />
        </>
    );
};
export default MainAppBar;
