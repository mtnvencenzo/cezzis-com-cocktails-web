import { useEffect } from 'react';
import startPageViewSpan from '../../services/Tracer';
import { useAuth0 } from '../../components/Auth0Provider';

const FrontChannelLogout = () => {
    const { logout, isAuthenticated } = useAuth0();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        startPageViewSpan((span) => {
            const handleLogout = async () => {
                if (isAuthenticated) {
                    await logout({
                        logoutParams: {
                            returnTo: window.location.origin
                        }
                    });
                }
            };

            span.end();
            handleLogout();
        });
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    return <div>Logging out...</div>;
};

export default FrontChannelLogout;
