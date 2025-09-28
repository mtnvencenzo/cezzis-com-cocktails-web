import { Grid, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWindowEnv } from '../../../../utils/envConfig';
import trimWhack from '../../../../utils/trimWhack';
import AccountNavigationBar from '../../../../organisims/AccountNavigationBar/AccountNavigationBar';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';

const AccountNavigationPageContainer = () => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSmOrXs) {
            // we don't want the navigation to show both on the left nav and
            // in the main viewing area when entering larger screen sies
            navigate('/account/profile-center');
        }
    }, [isSmOrXs, navigate]);

    return (
        <>
            <title>Account Settings</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account`} />
            <meta name='robots' content='noindex,follow' />

            {isSmOrXs && <BackArrowLinkItem navigateTo='/' text='Close Account Settings' icon={<CloseIcon color='secondary' fontSize='small' />} />}

            <Grid
                size={12}
                sx={{
                    pt: isSmOrXs ? '0px' : '40px',
                    pl: isSmOrXs ? '10px' : '0px',
                    pr: isSmOrXs ? '10px' : '0px',
                    pb: '40px',
                    mr: '0px'
                }}
            >
                <AccountNavigationBar testId='profile-settings-nav' fullScreen />
            </Grid>
        </>
    );
};

export default AccountNavigationPageContainer;
