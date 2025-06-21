import { useEffect, useState } from 'react';
import './PrivacyPolicyPageContainer.css';
import { Box } from '@mui/material';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getPrivacyPolicy } from '../../services/LegalService';
import { LegalDocumentRs } from '../../api/cocktailsApi/cocktailsApiClient';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import { setMetaItemProp } from '../../utils/headUtil';

interface PrivacyPolicyPageContainerProps {
    enableWidePadding?: boolean;
}

const PrivacyPolicyPageContainer = ({ enableWidePadding = false }: PrivacyPolicyPageContainerProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [legalDocumentRs, setLegalDocumentRs] = useState<LegalDocumentRs | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await getPrivacyPolicy();
                setApiCallFailed(false);
                setLegalDocumentRs(rs);
            } catch {
                setApiCallFailed(true);
            }

            setLoading(false);
        };

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setMetaItemProp('Cezzis.com');
        fetchData();
    }, []);

    return (
        <>
            <title>Privacy Policy - Cezzis.com</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/privacy-policy`} />
            <meta name='description' content='Cezzis.com is your place for quick lookup cocktail recipes, spirits, and more. Expand your knowledge and become part of the  cocktail community.' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/privacy-policy' />
            <meta property='og:title' content='Privacy Policy - Cezzis.com' />
            <meta property='og:description' content='null' />
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
                        md: enableWidePadding ? '20px' : '5px',
                        lg: enableWidePadding ? '200px' : '5px'
                    },
                    width: {
                        xs: 'inherit',
                        md: 'inherit',
                        lg: '1000px'
                    }
                }}
            >
                <Box component='div' className='content-container'>
                    {loading && <LoadingSkeleton rowCount={5} />}
                    {!loading && !apiCallFailed && legalDocumentRs?.document && (
                        <div className='markdown-container'>
                            <Markdown rehypePlugins={[rehypeRaw]}>{legalDocumentRs.document}</Markdown>
                        </div>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default PrivacyPolicyPageContainer;
