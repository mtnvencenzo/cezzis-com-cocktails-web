import { Button, Divider, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { changeOwnedAccountProfileUsername } from '../../../../services/AccountService';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import startPageViewSpan from '../../../../services/Tracer';
import AlertDialog from '../../../../molecules/AlertDialog/AlertDialog';
import { useAuth0 } from '../../../../components/Auth0Provider';
import logger from '../../../../services/Logger';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}

const AccountChangeUsernamePageContainer = () => {
    const { user } = useAuth0();
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
    const [username, setUsername] = useState<FieldValueState<string | null>>({ value: user?.username ?? '', hasError: false });
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername({
            value: event.target.value,
            hasError: false
        });
    };

    const handleCancelChangeUsername = async () => {
        setOpenConfirmation(false);
    };

    const confirmChangeUsername = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenConfirmation(true);
    };

    const handleChangeUsername = async () => {
        try {
            await changeOwnedAccountProfileUsername({
                username: username.value ?? ''
            });

            setOpenConfirmation(false);
            toast.success('Your username has been changed!', { position: 'top-left' });
        } catch (error) {
            logger.logException('Failed changing a user account username', error as Error);
            toast.error(`We were unable to change your username. Please try again.`, { position: 'top-left' });
        }
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Change Username</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/change-username`} />
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
                <Grid id='change-username' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px' }}>
                            <Typography variant='h6'>Change Username</Typography>
                            <Divider />
                            <Typography sx={{ pt: '10px', color: 'text.secondary' }}>
                                Enter your new username below and click the Change Username button.
                                <br />
                                <br />
                            </Typography>
                            <Grid size={{ md: 4, sm: 6 }}>
                                <br />
                                <TextField
                                    slotProps={{ htmlInput: { 'data-testid': 'txtUsername' } }}
                                    data-testid='divUsername'
                                    autoComplete='username'
                                    label='New username'
                                    variant='standard'
                                    error={username.hasError}
                                    required
                                    value={username.value}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsernameChange(event)}
                                    sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnChangeUsername' variant='outlined' color='primary' onClick={confirmChangeUsername}>
                                Change Username
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AlertDialog
                open={openConfirmation}
                title='Change your username?'
                content='Are you sure you would like to change your username?'
                cancelButtonText='Cancel'
                confirmButtonText='Change Username'
                onCancel={handleCancelChangeUsername}
                onConfirm={handleChangeUsername}
            />
        </>
    );
};

export default AccountChangeUsernamePageContainer;
