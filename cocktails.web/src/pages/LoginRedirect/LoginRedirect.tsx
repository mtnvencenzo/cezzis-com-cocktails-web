import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionStorageService from '../../services/SessionStorageService';

const LoginRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionStorageService = new SessionStorageService();
        const redirectUrl = sessionStorageService.GetOwnedAccountPostLoginRedirectUrl();
        if (redirectUrl) {
            navigate(redirectUrl, { replace: true });
        }
    }, [navigate]);

    return <>Loading...</>;
};

export default LoginRedirect;
