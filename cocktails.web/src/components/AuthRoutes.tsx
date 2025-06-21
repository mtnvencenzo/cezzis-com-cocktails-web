import { InteractionStatus, InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AccessErrorComponent from '../molecules/AccessErrorComponent/AccessErrorComponent';
import CustomNavigationClient from './CustomNavigationClient';
import { msalInstance } from '../utils/authConfig';

const AuthRoutes = () => {
    const navigate = useNavigate();
    const navigationClient = new CustomNavigationClient(navigate);
    msalInstance.setNavigationClient(navigationClient);

    const { accounts, inProgress } = useMsal();
    const [loginComplete, setLoginComplete] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            if (accounts[0]?.idTokenClaims?.emails !== undefined) {
                const email = accounts[0].idTokenClaims.emails[0];
                if (email !== undefined) {
                    setUserEmail(email);
                }
            }

            setLoginComplete(true);
        }
    }, [inProgress, accounts]);

    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
            <div id='auth-routes'>
                {loginComplete && userEmail && <Outlet />}
                {loginComplete && !userEmail && <AccessErrorComponent />}
                {!loginComplete && <p>Loading...</p>}
            </div>
        </MsalAuthenticationTemplate>
    );
};

export default AuthRoutes;
