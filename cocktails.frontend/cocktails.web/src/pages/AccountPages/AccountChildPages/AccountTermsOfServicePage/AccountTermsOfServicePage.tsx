import { useMediaQuery } from '@mui/material';
import TermsOfServicePageContainer from '../../../TermsOfServicePage/TermsOfServicePageContainer';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';

interface AccountTermsOfServicePageProps {
    enableWidePadding?: boolean;
}

const AccountTermsOfServicePage = ({ enableWidePadding = false }: AccountTermsOfServicePageProps) => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {isSmOrXs && <BackArrowLinkItem />}

            <TermsOfServicePageContainer enableWidePadding={enableWidePadding} />
            <br />
        </>
    );
};

export default AccountTermsOfServicePage;
