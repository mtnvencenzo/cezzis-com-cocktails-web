import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';

const jsonld = (): string =>
    JSON.stringify(
        {
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            mainEntityOfPage: {
                '@type': 'Webpage',
                '@id': `${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}`
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.cezzis.com/cocktails/search?q={search_term_string}',
                'query-input': 'required maxlength=256 name=search_term_string'
            },
            headline: "Cezzi's Cocktail Receipes'",
            publisher: {
                '@type': 'Organization',
                name: 'Cezzis.com',
                url: `${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}`,
                brand: 'Cezzis.com',
                sameAs: []
            },
            description: 'Cezzis.com is your place for quick lookup cocktail recipes, spirits, and more. Expand your knowledge and become part of the  cocktail community.'
        },
        null,
        2
    );

export default jsonld;
