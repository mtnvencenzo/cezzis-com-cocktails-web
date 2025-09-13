import { Button, Divider, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { updateOwnedAccountProfileEmail } from '../../../../services/AccountService';
import theme from '../../../../theme';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import { startPageViewSpan } from '../../../../utils/otelConfig';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}

const AccountChangeEmailPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const [email, setEmail] = useState<FieldValueState<string | null>>({ value: ownedAccount?.email ?? '', hasError: false });
    const [loginEmail] = useState<FieldValueState<string | null>>({ value: ownedAccount?.loginEmail ?? '', hasError: false });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            value: event.target.value,
            hasError: false
        });
    };

    const handleEmailSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await updateOwnedAccountProfileEmail({
            email: email.value ?? ''
        });
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Change Email</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/account/profile-center/change-email`} />
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
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtLoginEmail' } }}
                                data-testid='divLoginEmail'
                                autoComplete='none'
                                label='Login Email'
                                variant='standard'
                                disabled
                                aria-readonly
                                value={loginEmail.value}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                            <br />
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtEmail' } }}
                                data-testid='divEmail'
                                autoComplete='email'
                                label='Primary Contact Email'
                                variant='standard'
                                error={email.hasError}
                                required
                                value={email.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnSubmitEmail' variant='outlined' color='primary' onClick={handleEmailSave}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountChangeEmailPageContainer;
