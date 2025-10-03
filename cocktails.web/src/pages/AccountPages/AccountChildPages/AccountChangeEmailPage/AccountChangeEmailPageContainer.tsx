import { Button, Divider, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { changeOwnedAccountProfileEmail } from '../../../../services/AccountService';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import startPageViewSpan from '../../../../services/Tracer';
import AlertDialog from '../../../../molecules/AlertDialog/AlertDialog';
import logger from '../../../../services/Logger';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}
const AccountChangeEmailPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
    const [email, setEmail] = useState<FieldValueState<string | null>>({ value: ownedAccount?.email ?? '', hasError: false });
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            value: event.target.value,
            hasError: false
        });
    };

    const handleCancelChangeEmail = async () => {
        setOpenConfirmation(false);
    };

    const confirmChangeEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenConfirmation(true);
    };

    const handleChangeEmail = async () => {
        try {
            await changeOwnedAccountProfileEmail({
                email: email.value ?? ''
            });

            setOpenConfirmation(false);
            toast.success('Your email has been changed!', { position: 'top-left' });
        } catch (error) {
            logger.logException('Failed changing a user account email', error as Error);
            toast.error(`We were unable to change your email. Please try again.`, { position: 'top-left' });
        }
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Change Email</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/change-email`} />
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
                <Grid id='change-email' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px' }}>
                            <Typography variant='h6'>Change Email</Typography>
                            <Divider />
                            <Typography sx={{ pt: '10px', color: 'text.secondary' }}>
                                Enter your new email address below and click the Change Email button.
                                <br />
                                <br />
                            </Typography>
                            <Grid size={{ md: 4, sm: 6 }}>
                                <br />
                                <TextField
                                    slotProps={{ htmlInput: { 'data-testid': 'txtEmail' } }}
                                    data-testid='divEmail'
                                    autoComplete='email'
                                    label='New Email / Username'
                                    variant='standard'
                                    error={email.hasError}
                                    required
                                    value={email.value}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
                                    sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnChangeEmail' variant='outlined' color='primary' onClick={confirmChangeEmail}>
                                Change Email
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AlertDialog
                open={openConfirmation}
                title='Change your email?'
                content='Are you sure you would like to change your email?'
                cancelButtonText='Cancel'
                confirmButtonText='Change Email'
                onCancel={handleCancelChangeEmail}
                onConfirm={handleChangeEmail}
            />
        </>
    );
};

export default AccountChangeEmailPageContainer;
