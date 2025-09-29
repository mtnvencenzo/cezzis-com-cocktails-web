import { ComponentType } from 'react';
import PageLoader from '../PageLoader';
import { withAuthenticationRequired } from '.';

interface Auth0AuthenticationGuardProps {
    component: ComponentType<any>;
}

const Auth0AuthenticationGuard = ({ component }: Auth0AuthenticationGuardProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className='page-layout'>
                <PageLoader />
            </div>
        ),
    });

    return <Component />;
};

export default Auth0AuthenticationGuard;
