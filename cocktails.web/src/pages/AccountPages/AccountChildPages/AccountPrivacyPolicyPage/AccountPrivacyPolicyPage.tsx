import { useMediaQuery } from '@mui/material';
import AccountPrivacyPolicyPageContainer from '../../../PrivacyPolicyPage/PrivacyPolicyPageContainer';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';

interface AccountPrivacyPolicyPageProps {
    enableWidePadding?: boolean;
}

const AccountPrivacyPolicyPage = ({ enableWidePadding = false }: AccountPrivacyPolicyPageProps) => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {isSmOrXs && <BackArrowLinkItem />}

            <AccountPrivacyPolicyPageContainer enableWidePadding={enableWidePadding} />
            <br />
        </>
    );
};

export default AccountPrivacyPolicyPage;
