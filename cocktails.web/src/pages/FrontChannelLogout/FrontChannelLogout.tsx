import { useEffect } from 'react';
import startPageViewSpan from '../../services/Tracer';
import { useAuth0 } from '../../components/Auth0Provider';
import { clearOwnedAccountLoginSession, logoutParams } from '../../utils/authConfig';

const FrontChannelLogout = () => {
    const { logout, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        startPageViewSpan(async (span) => {
            const handleLogout = async () => {
                clearOwnedAccountLoginSession();
                await logout(logoutParams);
            };

            span.end();
            await handleLogout();
        });
    }, [isAuthenticated, logout]);

    return <div>Logging out...</div>;
};

export default FrontChannelLogout;
