import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MainAppBar from '../../organisims/MainAppBar/MainAppBar';
import theme from '../../theme';
import ScrollToTop from '../../components/ScrollToTop';
import MainFooterBar from '../../organisims/MainFooterBar/MainFooterBar';
import './Layout.css';
import { getWindowEnv } from '../../utils/envConfig';
import { useScreenContext } from '../../components/ScreenContext';

const Layout = () => {
    const screenContext = useScreenContext();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    margin: 'auto',
                    background: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)), url(${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/backgrounds-stock-photo-fresh-blueberry-shake-with-ice-on-a-stone-background-478067812.webp) left fixed`,
                    backgroundSize: 'cover !important',
                    backgroundColor: 'gray'
                }}
                id='layout'
                component='div'
                data-testid='layout'
            >
                <Box id='header-bar'>
                    <MainAppBar testId='app-bar' isXs={isXs} />
                </Box>
                <Box id='layout-container' component='div'>
                    <ScrollToTop>
                        {!screenContext.isFullScreenMode && (
                            <Box id='footer-container' component='div'>
                                <MainFooterBar testId='footer-bar' />
                            </Box>
                        )}
                        <Outlet />
                    </ScrollToTop>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
