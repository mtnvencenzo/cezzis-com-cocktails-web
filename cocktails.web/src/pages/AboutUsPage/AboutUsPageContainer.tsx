import './AboutUsPageContainer.css';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import jsonld from './AboutUsPageContainer.jsonld';
import { setJsonLd, setMetaItemProp } from '../../utils/headUtil';

const AboutUsPageContainer = () => {
    useEffect(() => {
        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setJsonLd(jsonld());
        setMetaItemProp('About Cezzis.com');
    }, []);

    return (
        <>
            <title>About Cezzis.com</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/about-us`} />
            <meta name='description' content='Learn what Cezzis.com is all about and what sets us apart.  Meet Cezzi and learn how to contribute a cocktail recipe to the community.' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/' />
            <meta property='og:title' content='About Cezzis.com' />
            <meta property='og:description' content='Learn what Cezzis.com is all about and what sets us apart.  Meet Cezzi and learn how to contribute a cocktail recipe to the community.' />
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
                <Box component='div' className='bold-content-container'>
                    <Typography variant='h4'>
                        Cocktails.
                        <br />
                        Ingredients.
                        <br />
                        Recipes.
                        <br />
                    </Typography>
                    <Typography variant='body1' style={{ paddingTop: '10px' }}>
                        <i>Quick access to recipe ingredients and fun information</i>
                    </Typography>
                </Box>
                <Box
                    component='div'
                    style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'top'
                    }}
                >
                    <Box
                        sx={{
                            background: `url(${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/backgrounds-traditional-zombie-cocktail-main.webp) no-repeat center left 50% !important`,
                            width: '100%',
                            display: 'flex'
                        }}
                        component='div'
                    >
                        <Box
                            component='div'
                            sx={{
                                minHeight: '350px',
                                maxHeight: '350px',
                                margin: 'auto',
                                display: 'block',
                                width: '100%',
                                alignContent: 'right'
                            }}
                        >
                            <Box
                                component='div'
                                sx={{
                                    backgroundColor: 'rgb(200,200,200, .6)',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    color: '#202020',
                                    minHeight: '350px',
                                    maxWidth: '350px',
                                    float: 'right'
                                }}
                            >
                                <Typography variant='h6'>Who are we?</Typography>
                                <p>
                                    <i>Just my dog (Cezzi) and I sitting around stirring up some cocktails.</i>
                                </p>
                                <p>
                                    <i>No real professionalism here...</i>
                                </p>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component='div' className='bold-content-container' style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
                    <Typography variant='h4'>
                        Quick access to ingredients and recipes.
                        <br />
                    </Typography>
                    <Typography variant='body1' style={{ paddingTop: '10px' }}>
                        Ever notice all these cocktail sites force you to sift through endless article information and ads about a cocktail.
                    </Typography>
                    <Typography variant='body1' style={{ paddingTop: '15px' }}>
                        If all you want is to make a quick drink and learn a little along the way. We aim to make it quick to find a cocktail recipe and it&apos;s ingredients. If you want to dig
                        deeper we provide in depth details and historical information as well.
                    </Typography>
                </Box>
                <Box
                    component='div'
                    style={{
                        display: 'grid',
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                        alignContent: 'top',
                        verticalAlign: 'top',
                        justifyContent: 'center'
                    }}
                >
                    <Grid
                        container
                        spacing={{
                            xs: 2,
                            md: 3
                        }}
                        columns={{
                            xs: 4,
                            sm: 8,
                            md: 6,
                            lg: 6
                        }}
                        style={{
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Grid
                            className='bold-content-container'
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            sx={{
                                maxWidth: '450px',
                                textAlign: 'left',
                                backgroundColor: '#d5eaee !important'
                            }}
                        >
                            <Link to='/contact' style={{ textDecoration: 'none', color: '#000000' }}>
                                <Typography variant='h4'>
                                    Contribute.
                                    <br />
                                </Typography>
                                <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                    Send us your favorite cocktail or variation and we&apos;ll add it to our site.
                                    <br />
                                    <br />
                                    Just provide its name, ingredients and some quick instructions. Not the actual cocktail!
                                    <br />
                                    <br />
                                </Typography>
                                <img
                                    src={`${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/common-contribute-recipe.webp`}
                                    alt='Create and contributing a cocktail recipe here'
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                    Have a cocktail recipe? Contrbute{' '}
                                    <Typography component='span' variant='body1' style={{ color: 'blue' }}>
                                        here!
                                    </Typography>
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid
                            className='bold-content-container'
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            sx={{
                                maxWidth: '450px',
                                textAlign: 'left',
                                backgroundColor: '#ffffff !important',
                                paddingTop: '10px !important'
                            }}
                        >
                            <Typography variant='h4'>
                                Cocktail Recipes.
                                <br />
                                Insightful History.
                                <br />
                            </Typography>
                            <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                Our aim is to provide quick access to cocktail recipes and ingredients, but we also like to provide fun insights and historical roots for cocktails and variations.
                            </Typography>
                            <br />
                            <img src={`${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/backgrounds-traditional-charles-dickens-punch-main.webp`} alt='cezzi' style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid
                            className='bold-content-container'
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            sx={{
                                maxWidth: '450px',
                                textAlign: 'left',
                                backgroundColor: '#d5eaee !important'
                            }}
                        >
                            <Link to='/contact' style={{ textDecoration: 'none', color: '#000000' }}>
                                <Typography variant='h4'>
                                    The Management Team
                                    <br />
                                </Typography>
                                <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                    <b>Caesar &quot;Cezzi&quot;</b> Chief Squeaky Toy Officer
                                    <br />
                                    <br />
                                </Typography>
                                <img src={`${getWindowEnv().VITE_COCKTAILS_IMAGE_URL}/cezzi.png`} alt='Cezzi: the chief biscuit and squeaky toy officer' style={{ width: '100%', height: 'auto' }} />
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    component='div'
                    style={{
                        display: 'grid',
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                        alignContent: 'top',
                        verticalAlign: 'top',
                        justifyContent: 'center'
                    }}
                >
                    <Grid
                        container
                        columns={{
                            xs: 4,
                            sm: 4,
                            md: 4,
                            lg: 4
                        }}
                        style={{
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Grid
                            className='bold-content-container'
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            sx={{
                                textAlign: 'center',
                                backgroundColor: '#ffffff !important'
                            }}
                        >
                            <Typography variant='h4'>
                                Artificial Intelligence Policy
                                <br />
                            </Typography>
                            <Typography variant='body1' style={{ paddingTop: '10px', fontStyle: 'italic' }}>
                                Yep, we use it.
                            </Typography>
                            <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                Gen AI is extensively used to aggregate public open content and provide rich and concise historically information for each cocktail.
                                <br />
                                <br />
                                Caesar and I are definitely not writers, in fact Caesar doesn&apos;t even have mandible thumbs. But we do our best to ensure the information is accurate and use several
                                authoritative sources, experience and research to do so.
                            </Typography>
                        </Grid>
                        <Grid
                            className='bold-content-container'
                            size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                            sx={{
                                textAlign: 'center',
                                backgroundColor: '#ffffff !important'
                            }}
                        >
                            <Typography variant='h4'>
                                Editorial Guidelines
                                <br />
                            </Typography>
                            <Typography variant='body1' style={{ paddingTop: '10px' }}>
                                While we attempt to provide a light hearted atmosphere we take the recipes, content, articles seriously. We do not accept any form of payment or any other means of
                                benefit or gain from our partners, contributors or advertisers for being featured within any articles.
                                <br />
                                <br />
                                None of our cocktail recipes or their ingredients are sponsored by any 3rd party and are strickly sourced by us to provide the best and most authentic version
                                regardless of brand or company that might be listed in the ingredients list. Basically, noone pays us to list a cocktail or an ingredient within a cocktail recipe.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AboutUsPageContainer;
