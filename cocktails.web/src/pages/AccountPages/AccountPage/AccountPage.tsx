import { Grid, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AccountNavigationBar from '../../../organisims/AccountNavigationBar/AccountNavigationBar';
import theme from '../../../theme';
import trimWhack from '../../../utils/trimWhack';
import { getWindowEnv } from '../../../utils/envConfig';

const AccountPage = () => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <title>My Account</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account`} />
            <meta name='robots' content='noindex,follow' />

            <Grid
                container
                sx={{
                    margin: 'auto',
                    paddingTop: '0px',
                    minHeight: '100vh',
                    height: '100%',
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    backgroundColor: 'white'
                }}
            >
                {!isSmOrXs && (
                    <Grid size={{ xs: 2, md: 3.5, lg: 3.5 }} sx={{ pl: '0px', pr: '0px', mr: '0px', minWidth: '100px', maxWidth: '300px' }}>
                        <AccountNavigationBar testId='profile-settings-nav' fullScreen={false} />
                    </Grid>
                )}
                <Grid size={{ xs: 12, md: 8.5, lg: 8.5 }} sx={{ pl: isSmOrXs ? '0px' : '30px' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
};

export default AccountPage;
