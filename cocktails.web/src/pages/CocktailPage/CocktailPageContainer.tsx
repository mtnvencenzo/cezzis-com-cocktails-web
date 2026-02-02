import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import './CocktailPageContainer.css';
import { Box } from '@mui/material';
import { SpanStatusCode } from '@opentelemetry/api';
import { getCocktail } from '../../services/CocktailsService';
import { CocktailRs } from '../../api/cocktailsApi';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import jsonld from './CocktailPageContainer.jsonld';
import { setJsonLd, setMetaItemProp } from '../../utils/headUtil';
import FavoriteCocktailButton from '../../atoms/FavoriteCocktailButton/FavoriteCocktailButton';
import ShareCocktailButton from '../../atoms/ShareCocktailButton/ShareCocktailButton';
import { useOwnedAccount } from '../../components/OwnedAccountContext';
import CocktailRater from '../../organisims/CocktailRater/CocktailRater';
import startPageViewSpan from '../../services/Tracer';
import { RateCocktailRs } from '../../api/accountsApi';

const CocktailPageContainer = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [cocktailRs, setCocktailRs] = useState<CocktailRs | undefined>();
    const { ownedAccount } = useOwnedAccount();

    const onCocktailRated = async (rs: RateCocktailRs | undefined) => {
        if (!ownedAccount || !cocktailRs?.item.id) {
            return;
        }

        if (rs?.cocktailRating) {
            setCocktailRs({
                ...cocktailRs,
                item: {
                    ...cocktailRs.item,
                    rating: {
                        ...cocktailRs.item.rating,
                        ...rs.cocktailRating
                    }
                }
            });
        }
    };

    useEffect(() => {
        startPageViewSpan((span) => {
            const fetchData = async () => {
                try {
                    const rs = await getCocktail(id ?? 'unavailable');
                    setApiCallFailed(false);
                    setCocktailRs(rs);

                    if (rs?.item) {
                        // setting dom directly due to react v19 & react-helmet-async breaking
                        // and react not hoisting the script and cert meta tag to the top
                        setJsonLd(jsonld(rs.item));
                        setMetaItemProp(`${rs.item.title} Cocktail Recipe`);
                    }
                } catch (e: unknown) {
                    setApiCallFailed(true);
                    setLoading(false);
                    span.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error).message });
                }

                setLoading(false);
                span.end();
            };

            fetchData();
        });
    }, [id]);

    return (
        <>
            {!loading && !apiCallFailed && cocktailRs?.item && (
                <>
                    <title>{`${cocktailRs?.item?.title} Cocktail Recipe`}</title>
                    <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/cocktails/${cocktailRs?.item?.id}`} />
                    <meta name='description' content={cocktailRs?.item?.description} />
                    <meta property='article:section' content='Cezzis.com' />
                    <meta property='og:type' content='article' />
                    <meta property='og:site_name' content='Cezzis.com' />
                    <meta property='og:url' content={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/cocktails/${cocktailRs?.item?.id}`} />
                    <meta property='og:title' content={`${cocktailRs?.item?.title} Cocktail Recipe`} />
                    <meta property='og:image' content={cocktailRs?.item?.mainImages && cocktailRs?.item?.mainImages?.length > 0 ? cocktailRs.item.mainImages[0].uri : ''} />
                    <meta property='og:description' content={cocktailRs?.item?.description} />
                </>
            )}
            <Box
                component='div'
                sx={{
                    paddingTop: {
                        xs: '5px',
                        md: '20px',
                        lg: '40px'
                    },
                    minHeight: '100vh',
                    height: '100%',
                    paddingRight: {
                        xs: '5px',
                        md: '20px',
                        lg: '20px'
                    },
                    paddingLeft: {
                        xs: '5px',
                        md: '20px',
                        lg: '200px'
                    },
                    width: {
                        xs: 'inherit',
                        md: 'inherit',
                        lg: '1000px'
                    }
                }}
            >
                {loading && <LoadingSkeleton rowCount={1} />}
                {!loading && !apiCallFailed && cocktailRs?.item && (
                    <>
                        <div className='action-container'>
                            <FavoriteCocktailButton
                                cocktailId={cocktailRs.item.id}
                                isFav={ownedAccount?.favoriteCocktails?.includes(cocktailRs.item.id) ?? false}
                                testId={`fav-${cocktailRs.item.id}`}
                            />
                            <ShareCocktailButton cocktailId={cocktailRs.item.id} testId={`shr-${cocktailRs.item.id}`} />
                        </div>
                        <div className='markdown-container'>
                            <h1 style={{ marginBottom: '4px' }}>{cocktailRs.item.descriptiveTitle}</h1>
                            <CocktailRater cocktail={cocktailRs.item} onCocktailRated={onCocktailRated} />
                            <Markdown rehypePlugins={[rehypeRaw]}>{cocktailRs.item.content}</Markdown>
                        </div>
                    </>
                )}
            </Box>
        </>
    );
};

export default CocktailPageContainer;
