import { Navigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import theme from '../../../theme';

const AccountIndexPageNavigator = () => {
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    return <Navigate to={isSmOrXs ? '/account/settings' : '/account/profile-center/personal-details'} replace />;
};

export default AccountIndexPageNavigator;
