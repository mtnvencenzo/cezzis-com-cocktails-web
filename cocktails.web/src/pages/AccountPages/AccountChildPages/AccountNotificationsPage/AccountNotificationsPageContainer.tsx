import { Button, Divider, FormControlLabel, Grid, Switch, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { updateOwnedAccountNotificationsSettings } from '../../../../services/AccountService';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import startPageViewSpan from '../../../../services/Tracer';
import { CocktailUpdatedNotificationModel } from '../../../../api/accountsApi';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}

const AccountNotificationsPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
    const [onNewCocktailAdditions, setOnNewCocktailAdditions] = useState<FieldValueState<CocktailUpdatedNotificationModel>>({
        value: ownedAccount?.notifications?.onNewCocktailAdditions ?? CocktailUpdatedNotificationModel.Always,
        hasError: false
    });

    const handleOnNewCocktailAdditionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnNewCocktailAdditions({
            value: event.target.checked ? CocktailUpdatedNotificationModel.Always : CocktailUpdatedNotificationModel.Never,
            hasError: false
        });
    };

    const handleNotificationsSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await updateOwnedAccountNotificationsSettings({
            onNewCocktailAdditions: onNewCocktailAdditions.value as CocktailUpdatedNotificationModel
        });
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Account Notification Settings</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/notifications`} />
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
                <Grid id='notification-settings' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '5px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px', pt: '5px' }}>
                            <Typography variant='h6'>Notification Settings</Typography>
                            <Divider />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }} sx={{ pb: '15px' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        data-testid='chkNotifyNewCocktails'
                                        checked={onNewCocktailAdditions.value === CocktailUpdatedNotificationModel.Always}
                                        onChange={handleOnNewCocktailAdditionsChange}
                                    />
                                }
                                label='Notify me when new cocktails are added'
                                labelPlacement='start'
                                sx={{ pl: '0px', pr: '10px' }}
                            />
                        </Grid>
                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnSubmitNotifications' variant='outlined' color='primary' onClick={handleNotificationsSave}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountNotificationsPageContainer;
