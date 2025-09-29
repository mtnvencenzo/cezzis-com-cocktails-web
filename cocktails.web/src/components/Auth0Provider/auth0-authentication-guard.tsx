import { ComponentType } from 'react';
import { withAuthenticationRequired } from '.';

interface Auth0AuthenticationGuardProps {
    component: ComponentType<any>;
}

const Auth0AuthenticationGuard = ({ component }: Auth0AuthenticationGuardProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <>Loading...</>
        ),
    });

    return <Component />;
};

export default Auth0AuthenticationGuard;
