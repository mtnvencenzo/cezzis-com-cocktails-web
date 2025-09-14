import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useEffect } from 'react';
import { logout } from '../../utils/authConfig';
import startPageViewSpan from '../../services/Tracer';

const FrontChannelLogout = () => {
    const { inProgress } = useMsal();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        startPageViewSpan((span) => {
            const handleLogout = async () => {
                if (inProgress === InteractionStatus.None || inProgress === InteractionStatus.Startup) {
                    await logout();
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
