import { Button, Divider, FormControlLabel, Grid, Switch, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { updateOwnedAccountAccessibilitySettings } from '../../../../services/AccountService';
import { DisplayThemeModel, DisplayThemeModel2 } from '../../../../api/cocktailsApi/cocktailsApiClient';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import { startPageViewSpan } from '../../../../utils/otelConfig';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}

const AccountAccessibilityPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
    const [displayTheme, setDisplayTheme] = useState<FieldValueState<DisplayThemeModel | DisplayThemeModel2>>({
        value: ownedAccount?.accessibility?.theme ?? DisplayThemeModel.Light,
        hasError: false
    });

    const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayTheme({
            value: event.target.checked ? DisplayThemeModel.Dark : DisplayThemeModel.Light,
            hasError: false
        });
    };

    const handleAccessibilitySave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await updateOwnedAccountAccessibilitySettings({
            theme: displayTheme.value as DisplayThemeModel2
        });
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Accessibility Settings</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/account/profile-center/accessibility`} />
            <meta name='robots' content='noindex,follow' />

            {isSmOrXs && <BackArrowLinkItem />}

            <Grid
                container
                sx={{
                    pt: isSmOrXs ? '0px' : '40px',
                    pl: isSmOrXs ? '10px' : '0px',
                    pr: isSmOrXs ? '10px' : '0px',
                    pb: '40px',
                    mr: '0px'
                }}
            >
                <Grid size={12} sx={{ pt: '5px' }}>
                    <Typography variant='h6'>Profile Center</Typography>
                </Grid>
                <Grid id='accessibility-settings' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px', pt: '5px' }}>
                            <Typography variant='h6'>Accessibility Settings</Typography>
                            <Divider />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }} sx={{ pb: '15px' }}>
                            <FormControlLabel
                                control={<Switch data-testid='chkTheme' checked={displayTheme.value === DisplayThemeModel.Dark} onChange={handleDarkModeChange} />}
                                label='Dark Mode'
                                labelPlacement='start'
                                sx={{ pl: '0px', pr: '10px' }}
                            />
                        </Grid>
                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnSubmitAccessibility' variant='outlined' color='primary' onClick={handleAccessibilitySave}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountAccessibilityPageContainer;
