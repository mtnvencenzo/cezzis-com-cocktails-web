import { ComponentType } from 'react';
import { withAuthenticationRequired } from '.';
import SessionStorageService from '../../services/SessionStorageService';

interface Auth0AuthenticationGuardProps {
    component: ComponentType<any>;
}

const Auth0AuthenticationGuard = ({ component }: Auth0AuthenticationGuardProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => {
            if (!window.location.pathname.startsWith('/iam/auth/redirect')) {
                const sessionStorageService = new SessionStorageService();
                sessionStorageService.SetOwnedAccountPostLoginRedirectUrl(window.location.pathname + window.location.search);
            }

            return (<>Loading...</>);
        }
    });

    return <Component />;
};

export default Auth0AuthenticationGuard;
