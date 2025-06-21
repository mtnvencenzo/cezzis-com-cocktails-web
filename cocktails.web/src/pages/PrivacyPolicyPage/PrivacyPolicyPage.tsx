import PrivacyPolicyPageContainer from './PrivacyPolicyPageContainer';

interface PrivacyPolicyPageProps {
    enableWidePadding?: boolean;
}

const PrivacyPolicyPage = ({ enableWidePadding = false }: PrivacyPolicyPageProps) => (
    <>
        <PrivacyPolicyPageContainer enableWidePadding={enableWidePadding} />
        <br />
    </>
);

export default PrivacyPolicyPage;
