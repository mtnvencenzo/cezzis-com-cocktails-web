import { CocktailModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';

const jsonld = (model: CocktailModel | undefined): string => {
    const mainImage = model?.mainImages && model.mainImages.length > 0 ? model.mainImages[0] : null;

    return JSON.stringify(
        {
            '@context': 'http://schema.org',
            '@type': ['Recipe'],
            headline: `${model?.title} Cocktail Recipe`,
            datePublished: `${model?.publishedOn}`,
            dateModified: `${model?.modifiedOn}`,
            author: [
                {
                    '@type': 'Person',
                    name: 'Cezzis.com'
                }
            ],
            description: `${model?.description}`,
            image: mainImage && {
                '@type': 'ImageObject',
                url: `${mainImage.uri}`,
                contentUrl: `${mainImage.uri}`,
                height: mainImage.height,
                width: mainImage.width
            },
            publisher: {
                '@type': 'Organization',
                name: 'Cezzis.com',
                url: `${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}`,
                brand: 'Cezzis.com'
            },
            name: `${model?.title}`,
            cookTime: 'PT0M',
            prepTime: `PT${model?.prepTimeMinutes}M`,
            recipeCategory: 'Cocktail',
            aggregateRating:
                model?.rating && (model.rating.ratingCount ?? 0) > 0
                    ? {
                          '@type': 'AggregateRating',
                          ratingValue: Math.trunc(model.rating.rating * 10) / 10,
                          ratingCount: model.rating.ratingCount,
                          bestRating: 5,
                          worstRating: 1
                      }
                    : null,
            recipeIngredient: (model?.ingredients && model.ingredients.map((x) => x.display)) ?? [],
            recipeInstructions:
                (model?.instructions &&
                    model.instructions.map((x) => ({
                        '@type': 'HowToStep',
                        text: `${x.display}`
                    }))) ??
                [],
            recipeYield: [`${model?.serves}`, `${model?.serves}`],
            totalTime: `PT${model?.prepTimeMinutes}M`,
            mainEntityOfPage: {
                '@type': ['WebPage'],
                '@id': `${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/cocktails/${model?.id}`,
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            item: {
                                '@id': `${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/cocktails/list`,
                                name: 'Complete Cocktail List'
                            }
                        }
                    ]
                }
            }
        },
        null,
        2
    );
};

export default jsonld;
