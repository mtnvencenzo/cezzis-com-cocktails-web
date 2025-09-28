import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { sendRecommendation } from '../../services/AccountService';
import { getWindowEnv } from '../../utils/envConfig';
import { resetRecaptcha, executeRecaptcha } from '../../services/RecaptchaService';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import { useAuth0 } from '@auth0/auth0-react';
import { loginWithRedirectOptions } from '../../utils/authConfig';

interface CocktailRecommendationFormState {
    sendingRecommendation: boolean;
    recommendationName: string;
    recommendationIngredients: string;
    recommendationDirections: string;
    recommendationNameHasError: boolean;
    recommendationIngredientsHasError: boolean;
    recommendationDirectionsHasError: boolean;
}

const CocktailRecommendationForm = () => {
    const recaptchaRef = React.createRef<ReCAPTCHA>();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { ownedAccount } = useOwnedAccount();

    const [formState, setFormState] = useState<CocktailRecommendationFormState>({
        sendingRecommendation: false,
        recommendationName: '',
        recommendationIngredients: '',
        recommendationDirections: '',
        recommendationNameHasError: false,
        recommendationIngredientsHasError: false,
        recommendationDirectionsHasError: false
    });

    const handleRecommendationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            recommendationNameHasError: event.target.value.length === 0,
            recommendationName: event.target.value
        }));
    };

    const handleRecommendationIngredientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            recommendationIngredientsHasError: event.target.value.length === 0,
            recommendationIngredients: event.target.value
        }));
    };

    const handleRecommendationDirectionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            recommendationDirectionsHasError: event.target.value.length === 0,
            recommendationDirections: event.target.value
        }));
    };

    const isRecommendationFormComplete = () => formState.recommendationName !== '' && formState.recommendationIngredients !== '' && formState.recommendationDirections !== '';

    const handleToken = async (token: string | null): Promise<void> => {
        const hasTokenError = !(token && token.length > 0);
        let setRecommendationNameError = false;
        let setRecommendationIngredientsError = false;
        let setRecommendationDirectionsError = false;
        let { recommendationName } = formState;
        let { recommendationIngredients } = formState;
        let { recommendationDirections } = formState;

        if (!hasTokenError) {
            try {
                resetRecaptcha(recaptchaRef);

                setFormState((prevState) => ({
                    ...prevState,
                    recommendationNameHasError: false,
                    recommendationIngredientsHasError: false,
                    recommendationDirectionsHasError: false
                }));

                await sendRecommendation(recommendationName, recommendationIngredients, recommendationDirections, token);

                recommendationName = '';
                recommendationIngredients = '';
                recommendationDirections = '';

                toast.success('Cocktail recommendation sent!', { position: 'top-left' });
            } catch (e: unknown) {
                const error = e as Error;

                if (error?.message !== '') {
                    if (error.message === 'Cocktail name is required') {
                        setRecommendationNameError = true;
                    } else if (error.message === 'Ingredients are required') {
                        setRecommendationIngredientsError = true;
                    } else if (error.message === 'Directions are required') {
                        setRecommendationDirectionsError = true;
                    }
                }

                toast.error(error.message ?? 'Opps, something went wrong :(', { position: 'top-left' });
            }
        } else {
            toast.error('Token is invalid', { position: 'top-left' });
        }

        resetRecaptcha(recaptchaRef);

        setFormState((prevState) => ({
            ...prevState,
            recommendationNameHasError: setRecommendationNameError,
            recommendationIngredientsHasError: setRecommendationIngredientsError,
            recommendationDirectionsHasError: setRecommendationDirectionsError,
            recommendationName,
            recommendationIngredients,
            recommendationDirections,
            sendingRecommendation: false
        }));
    };

    const sendRecommendationClick = async () => {
        setFormState((prevState) => ({
            ...prevState,
            sendingRecommendation: !!recaptchaRef.current
        }));

        // initiate token retreive.  handleToken() will be called back to with the results of a token
        await executeRecaptcha(recaptchaRef, handleToken);
    };

    const handleExpire = () => {
        resetRecaptcha(recaptchaRef);
    };

    const handleLoginClick = async () => {
        await loginWithRedirect(loginWithRedirectOptions);
    };

    return (
        <>
            {(isAuthenticated && !ownedAccount) || (
                <Typography component='span' sx={{ fontStyle: 'italic', textDecoration: 'none', marginTop: '0px', paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }}>
                    Please&nbsp;
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to='#' onClick={handleLoginClick} style={{ textDecoration: 'none', color: '#0000EE' }}>
                        login
                    </Link>
                    &nbsp;to use this form.
                    <br />
                </Typography>
            )}
            <TextField
                slotProps={{ htmlInput: { 'data-testid': 'txtCocktailName' } }}
                data-testid='divCocktailName'
                disabled={!isAuthenticated || !ownedAccount}
                label='Name of cocktail'
                variant='standard'
                error={formState.recommendationNameHasError}
                required
                value={formState.recommendationName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRecommendationNameChange(event)}
                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '30px', paddingBottom: '0px' }}
            />
            <br />
            <TextField
                slotProps={{ htmlInput: { 'data-testid': 'txtCocktailIngredients' } }}
                data-testid='divCocktailIngredients'
                disabled={!isAuthenticated || !ownedAccount}
                label='Ingredients'
                variant='outlined'
                error={formState.recommendationIngredientsHasError}
                required
                multiline
                value={formState.recommendationIngredients}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRecommendationIngredientsChange(event)}
                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }}
            />
            <br />
            <br />
            <TextField
                slotProps={{ htmlInput: { 'data-testid': 'txtCocktailDirections' } }}
                data-testid='divCocktailDirections'
                disabled={!isAuthenticated || !ownedAccount}
                label='Directions'
                variant='outlined'
                error={formState.recommendationDirectionsHasError}
                required
                multiline
                value={formState.recommendationDirections}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRecommendationDirectionsChange(event)}
                sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }}
            />
            <ReCAPTCHA ref={recaptchaRef} sitekey={getWindowEnv().VITE_RECAPTCHA_SITE_KEY} size='invisible' onChange={handleToken} onExpired={handleExpire} />
            <Button
                data-testid='btnSubmitRecommendation'
                disabled={!isAuthenticated || !ownedAccount || formState.sendingRecommendation || !isRecommendationFormComplete()}
                color='primary'
                variant='outlined'
                onClick={() => sendRecommendationClick()}
                sx={{ marginTop: '25px' }}
            >
                {formState.sendingRecommendation && (
                    <CircularProgress
                        data-testid='submitProgress'
                        size={20}
                        sx={{
                            marginRight: '15px'
                        }}
                    />
                )}
                Submit
            </Button>
        </>
    );
};

export default CocktailRecommendationForm;
