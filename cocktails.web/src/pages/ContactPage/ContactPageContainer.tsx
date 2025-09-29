import './ContactPageContainer.css';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import CocktailRecommendationForm from '../../molecules/CocktailRecommendationForm/CocktailRecommendationForm';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import jsonld from './ContactPageContainer.jsonld';
import { setJsonLd, setMetaItemProp } from '../../utils/headUtil';
import startPageViewSpan from '../../services/Tracer';

const ContactPageContainer = () => {
    useEffect(() => {
        startPageViewSpan((span) => span.end());

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setJsonLd(jsonld());
        setMetaItemProp('Contact Cezzis.com');
    }, []);

    return (
        <>
            <title>Contact Cezzis.com</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/contact`} />
            <meta name='description' content='Contact Cezzis.com for information related to marketing or advertising with us.  Or, just to contribute to the community a new cocktail recipe.' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/' />
            <meta property='og:title' content='Contact Cezzis.com' />
            <meta property='og:description' content='Contact Cezzis.com for information related to marketing or advertising with us.  Or, just to contribute to the community a new cocktail recipe.' />
            <Box
                component='div'
                sx={{
                    paddingTop: '0px',
                    minHeight: '100vh',
                    height: '100%',
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: '100%'
                }}
            >
                <Box component='div' className='bold-contact-content-container'>
                    <Typography variant='h4'>Contact.</Typography>
                    <Typography variant='body1' style={{ paddingTop: '10px' }}>
                        <i>We would love to hear from you!</i>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        margin: 'auto',
                        background: `url(${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/backgrounds-traditional-zombie-cocktail-main.webp) no-repeat center right 50% !important`,
                        backgroundSize: 'cover !important'
                    }}
                    component='div'
                    style={{
                        display: 'flex',
                        width: '100%',
                        minHeight: '350px'
                    }}
                >
                    <Box
                        component='div'
                        sx={{
                            backgroundColor: 'rgb(255, 255, 255, 1.0)',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            color: '#202020',
                            minHeight: '350px',
                            minWidth: {
                                xs: '100%',
                                sm: '500px',
                                md: '500px',
                                lg: '500px'
                            }
                        }}
                    >
                        <Typography variant='h6'>Send us your cocktail recipe!</Typography>
                        <CocktailRecommendationForm />
                    </Box>
                </Box>
                <Box
                    component='div'
                    sx={{
                        paddingTop: '0px',
                        height: '100%',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: '100%'
                    }}
                >
                    <Grid
                        container
                        columns={{
                            xs: 4,
                            sm: 8,
                            md: 12,
                            lg: 12
                        }}
                        style={{
                            alignContent: 'center',
                            justifyContent: 'left',
                            backgroundColor: '#ffffff',
                            paddingTop: '40px',
                            paddingBottom: '40px'
                        }}
                    >
                        <Grid
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            className='email-content-container'
                            sx={{
                                backgroundColor: '#dfdfdf !important',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                paddingTop: '10px !important',
                                paddingBottom: '20px !important'
                            }}
                        >
                            <Typography variant='body1'>
                                <b>Advertising</b> If you would like to advertise on Cezzi&apos;s.Com please contact us. We would love to discuss how to best bring your products and services onto
                                Cezzis.com.
                                <br />
                                <a href='mailto:advertising@cezzis.com'>advertising@cezzis.com</a>
                            </Typography>
                        </Grid>
                        <Grid
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            className='email-content-container'
                            sx={{
                                backgroundColor: '#f9f9f4 !important',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                paddingTop: '10px !important',
                                paddingBottom: '20px !important'
                            }}
                        >
                            <Typography variant='body1'>
                                <b>Contribute</b> If you have a cocktail recipe or a variation of one that isn&apos;t listed. Use the form above to send it to us and well get it listed on the site.
                                Please provide as much information as possible and we&apos;ll fill in the rest. <br />
                                <br />
                                Alternatively, you can also email us using the email address below.
                                <br />
                                <a href='mailto:contribute@cezzis.com'>contribute@cezzis.com</a>
                            </Typography>
                        </Grid>
                        <Grid
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            className='email-content-container'
                            sx={{
                                backgroundColor: '#dfdfdf !important',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                paddingTop: '10px !important',
                                paddingBottom: '20px !important'
                            }}
                        >
                            <Typography variant='body1'>
                                <b>Marketing</b> If you want to use Cezzi&apos;s.Com as a marketing platform, please contact us. We would love to work with you.
                                <br />
                                <a href='mailto:marketing@cezzis.com'>marketing@cezzis.com</a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box component='div' className='bold-contact-content-container' style={{ backgroundColor: 'rgba(255, 255, 255, .8)' }}>
                        <Typography variant='h4' />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ContactPageContainer;
