import { Button, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { changeOwnedAccountProfilePassword } from '../../../../services/AccountService';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import startPageViewSpan from '../../../../services/Tracer';
import AlertDialog from '../../../../molecules/AlertDialog/AlertDialog';
import logger from '../../../../services/Logger';

const ChangeAccountPasswordPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleCancelChangePassword = async () => {
        setOpenConfirmation(false);
    };

    const confirmChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenConfirmation(true);
    };

    const handleChangePassword = async () => {
        try {
            await changeOwnedAccountProfilePassword({
                email: ownedAccount?.email ?? ''
            });

            setOpenConfirmation(false);
            toast.success('An email to change your password has been sent!', { position: 'top-left' });
        } catch (error) {
            logger.logException('Failed changing a user account password', error as Error);
            toast.error(`We were unable to initiate the password reset. Please try again.`, { position: 'top-left' });
        }
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Change Password</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/change-password`} />
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
                <Grid id='change-password' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px' }}>
                            <Typography variant='h6'>Change Password</Typography>
                            <Divider />
                            <Typography sx={{ pt: '10px', color: 'text.secondary' }}>
                                Click the button below to change your password. An email will be sent to you with instructions to enter your new password and confirm the change.
                                <br />
                                <br />
                            </Typography>
                        </Grid>

                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnChangePassword' variant='outlined' color='primary' onClick={confirmChangePassword}>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AlertDialog
                open={openConfirmation}
                title='Change your password?'
                content='Are you sure you would like to change your password?  An email will be sent to you with instructions to enter your new password and confirm the change.'
                cancelButtonText='Cancel'
                confirmButtonText='Change Password'
                onCancel={handleCancelChangePassword}
                onConfirm={handleChangePassword}
            />
        </>
    );
};

export default ChangeAccountPasswordPageContainer;
