import { Grid } from '@mui/material';
import { useEffect } from 'react';
import SearchBox from '../../molecules/SearchBox/SearchBox';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import jsonld from './WelcomePageContainer.jsonld';
import { setJsonLd, setMetaItemProp } from '../../utils/headUtil';

const WelcomePageContainer = () => {
    useEffect(() => {
        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setJsonLd(jsonld());
        setMetaItemProp('Cezzis.com');
    }, []);

    return (
        <>
            <title>Cezzi&apos;s Cocktail Recipes</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}`} />
            <meta name='description' content='Cezzis.com is your place for quick lookup cocktail recipes, spirits, and more. Expand your knowledge and become part of the  cocktail community.' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/' />
            <meta property='og:title' content="Cezzi's Cocktail Recipes" />
            <meta
                property='og:description'
                content='Cezzis.com is your place for quick lookup cocktail recipes, spirits, and more. Expand your knowledge and become part of the  cocktail community.'
            />
            <Grid
                container
                columns={4}
                direction='column'
                alignItems='center'
                margin='auto'
                width='100%'
                alignContent='center'
                justifyContent='center'
                paddingTop={{
                    lg: '40px',
                    md: '40px',
                    sm: '0px',
                    xs: '0px'
                }}
            >
                <SearchBox enableFiltering testId='search-box' replaceBreadcrumbOnSearch={false} filterOptions={false} />
            </Grid>
        </>
    );
};

export default WelcomePageContainer;
