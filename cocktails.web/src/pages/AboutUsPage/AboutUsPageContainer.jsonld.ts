import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';

const jsonld = (): string =>
    JSON.stringify(
        {
            '@context': 'http://schema.org',
            '@type': ['AboutPage'],
            '@id': `${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/about-us`,
            headline: 'About Cezzis.com',
            datePublished: '2024-05-24T00:00:00.000-07:00',
            dateModified: '2024-11-03T00:00:00.000-07:00',
            author: [
                {
                    '@type': 'Person',
                    name: 'Cezzis.com'
                }
            ],
            publisher: {
                '@type': 'Organization',
                name: 'Cezzis.com',
                url: `${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}`,
                brand: 'Cezzis.com',
                sameAs: []
            },
            description: 'Learn what Cezzis.com is all about and what sets us apart.  Meet Cezzi and learn how to contribute a cocktail recipe to the community.'
        },
        null,
        2
    );

export default jsonld;
