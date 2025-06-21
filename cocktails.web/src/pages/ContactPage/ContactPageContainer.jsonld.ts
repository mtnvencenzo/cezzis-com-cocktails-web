import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';

const jsonld = (): string =>
    JSON.stringify(
        {
            '@context': 'http://schema.org',
            '@type': ['ContactPage'],
            '@id': `${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/contact`,
            headline: 'Contact Cezzis.com',
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
                url: `${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}`,
                brand: 'Cezzis.com',
                sameAs: []
            },
            description: 'Contact Cezzis.com for information related to marketing or advertising with us.  Or, just to contribute to the community a new cocktail recipe.'
        },
        null,
        2
    );

export default jsonld;
