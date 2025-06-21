const jsonld = (): string =>
    JSON.stringify(
        {
            '@context': 'http://schema.org',
            '@type': 'SearchResultsPage',
            headline: 'Search Results from cezzis.com',
            url: 'https://www.cezzis.com/cocktails/search',
            publisher: {
                '@type': 'Organization',
                name: 'Cezzis.com',
                url: 'https://www.cezzis.com',
                brand: 'Cezzis.com'
            },
            description: 'Search through the complete listing of cocktails including the classics, prohibition era cocktailsand the traditional and the more modern cocktail recipes.',
            articleBody: ''
        },
        null,
        2
    );

export default jsonld;
