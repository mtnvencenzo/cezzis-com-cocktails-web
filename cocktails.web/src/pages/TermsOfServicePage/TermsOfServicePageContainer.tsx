import { useEffect, useState } from 'react';
import './TermsOfServicePageContainer.css';
import { Box } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { LoadingSkeleton } from '@mtnvencenzo/kelso-component-library';
import { Span, SpanStatusCode } from '@opentelemetry/api';
import { getTermsOfService } from '../../services/LegalService';
import { LegalDocumentRs } from '../../api/cocktailsApi/cocktailsApiClient';
import { getWindowEnv } from '../../utils/envConfig';
import trimWhack from '../../utils/trimWhack';
import { setMetaItemProp } from '../../utils/headUtil';
import startPageViewSpan from '../../services/Tracer';

interface TermsOfServicePageContainerProps {
    enableWidePadding?: boolean;
}

const TermsOfServicePageContainer = ({ enableWidePadding = false }: TermsOfServicePageContainerProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
    const [legalDocumentRs, setLegalDocumentRs] = useState<LegalDocumentRs | undefined>();

    useEffect(() => {
        const fetchData = async (span?: Span) => {
            try {
                const rs = await getTermsOfService();
                setApiCallFailed(false);
                setLegalDocumentRs(rs);
            } catch (e: unknown) {
                setApiCallFailed(true);
                span?.recordException(e as Error);
                span?.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error).message });
            }

            setLoading(false);
            span?.end();
        };

        // setting dom directly due to react v19 & react-helmet-async breaking
        // and react not hoisting the script and cert meta tag to the top
        setMetaItemProp('Cezzis.com');

        startPageViewSpan((span) => {
            fetchData(span);
        });
    }, []);

    return (
        <>
            <title>Terms Of Service - Cezzis.com</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_REDIRECT_URI)}/terms-of-service`} />
            <meta name='description' content='null' />
            <meta property='article:section' content='Cezzis.com' />
            <meta property='og:type' content='article' />
            <meta property='og:site_name' content='Cezzis.com' />
            <meta property='og:url' content='https://www.cezzis.com/terms-of-service' />
            <meta property='og:title' content='Terms Of Service - Cezzis.com' />
            <meta property='og:description' content='Cezzis.com terms of service' />
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

export default TermsOfServicePageContainer;
