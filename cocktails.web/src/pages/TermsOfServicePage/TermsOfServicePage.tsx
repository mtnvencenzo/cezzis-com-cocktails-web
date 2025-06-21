import TermsOfServicePageContainer from './TermsOfServicePageContainer';

interface TermsOfServicePageProps {
    enableWidePadding?: boolean;
}

const TermsOfServicePage = ({ enableWidePadding = false }: TermsOfServicePageProps) => (
    <>
        <TermsOfServicePageContainer enableWidePadding={enableWidePadding} />
        <br />
    </>
);

export default TermsOfServicePage;
