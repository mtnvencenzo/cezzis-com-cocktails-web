import { Button, Divider, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CountrySelect from '../../../../atoms/CountrySelect/CountrySelect';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import { updateOwnedAccountProfile } from '../../../../services/AccountService';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import startPageViewSpan from '../../../../services/Tracer';
import logger from '../../../../services/Logger';

interface FieldValueState<T> {
    value: T;
    hasError: boolean;
}

const AccountPersonalDetailsPageContainer = () => {
    const { ownedAccount } = useOwnedAccount();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const [givenName, setGivenName] = useState<FieldValueState<string>>({ value: ownedAccount?.givenName ?? '', hasError: false });
    const [familyName, setFamilyName] = useState<FieldValueState<string>>({ value: ownedAccount?.familyName ?? '', hasError: false });
    const [displayName, setDisplayName] = useState<FieldValueState<string>>({ value: ownedAccount?.displayName ?? '', hasError: false });
    const [city, setCity] = useState<FieldValueState<string>>({ value: ownedAccount?.primaryAddress?.city ?? '', hasError: false });
    const [address, setAddress] = useState<FieldValueState<string>>({ value: ownedAccount?.primaryAddress?.addressLine1 ?? '', hasError: false });
    const [region, setRegion] = useState<FieldValueState<string>>({ value: ownedAccount?.primaryAddress?.region ?? '', hasError: false });
    const [postalCode, setPostalCode] = useState<FieldValueState<string>>({ value: ownedAccount?.primaryAddress?.postalCode ?? '', hasError: false });
    const [country, setCountry] = useState<FieldValueState<string | null>>({ value: ownedAccount?.primaryAddress?.country ?? '', hasError: false });

    const handleGivenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGivenName({
            value: event.target.value,
            hasError: event.target.value.length === 0
        });
    };

    const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFamilyName({
            value: event.target.value,
            hasError: event.target.value.length === 0
        });
    };

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName({
            value: event.target.value,
            hasError: false
        });
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            value: event.target.value,
            hasError: false
        });
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity({
            value: event.target.value,
            hasError: false
        });
    };

    const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion({
            value: event.target.value,
            hasError: false
        });
    };

    const handleCountryChange = (value: string | null) => {
        setCountry({
            value,
            hasError: false
        });
    };

    const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode({
            value: event.target.value,
            hasError: false
        });
    };

    const handlePersonalDetailsSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await updateOwnedAccountProfile({
                givenName: givenName.value,
                familyName: familyName.value,
                displayName: displayName.value,
                primaryAddress: {
                    addressLine1: address.value,
                    addressLine2: '',
                    city: city.value,
                    region: region.value,
                    subRegion: '',
                    country: country.value ?? '',
                    postalCode: postalCode.value ?? ''
                }
            });

            toast.success('Personal details saved!', { position: 'top-left' });
        } catch (error) {
            logger.logException('Failed to save personal details', error as Error);
            toast.error('Unable to save details. Please try again.', { position: 'top-left' });
        }
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Personal Details</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/personal-details`} />
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
                <Grid id='personal-details' size={12} sx={{ pb: '50px' }}>
                    <Grid
                        container
                        sx={{
                            pt: '20px'
                        }}
                    >
                        <Grid size={12} sx={{ pb: '10px', pt: '5px' }}>
                            <Typography variant='h6'>Personal Details</Typography>
                            <Divider />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtGivenName' } }}
                                data-testid='divGivenName'
                                autoComplete='given-name'
                                label='Given Name'
                                variant='standard'
                                error={givenName.hasError}
                                required
                                value={givenName.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleGivenNameChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtFamilyName' } }}
                                data-testid='divFamilyName'
                                label='Family Name'
                                autoComplete='family-name'
                                variant='standard'
                                error={familyName.hasError}
                                required
                                value={familyName.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFamilyNameChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtDisplayName' } }}
                                data-testid='divDisplayName'
                                label='Display Name'
                                autoComplete='nickname'
                                variant='standard'
                                error={displayName.hasError}
                                value={displayName.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDisplayNameChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtAddress' } }}
                                data-testid='divAddress'
                                label='Street Address'
                                autoComplete='street-address'
                                variant='standard'
                                error={address.hasError}
                                value={address.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtCity' } }}
                                data-testid='divCity'
                                autoComplete='address-level2'
                                label='City'
                                variant='standard'
                                error={city.hasError}
                                value={city.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCityChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtRegion' } }}
                                data-testid='divRegion'
                                autoComplete='address-level1'
                                label='State / Region'
                                variant='standard'
                                autoCapitalize='on'
                                error={region.hasError}
                                value={region.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRegionChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6 }}>
                            <TextField
                                slotProps={{ htmlInput: { 'data-testid': 'txtPostalCode' } }}
                                data-testid='divPostalCode'
                                autoComplete='postal-code'
                                label='Postal Code'
                                variant='standard'
                                error={postalCode.hasError}
                                value={postalCode.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePostalCodeChange(event)}
                                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
                            />
                        </Grid>
                        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                            <CountrySelect value={country.value} onChange={handleCountryChange} />
                        </Grid>
                        <Grid size={12} sx={{ backgroundColor: 'rgba(245,245,245,.5)' }}>
                            <Button data-testid='btnSubmitPersonalDetails' variant='outlined' color='primary' onClick={handlePersonalDetailsSave}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountPersonalDetailsPageContainer;
