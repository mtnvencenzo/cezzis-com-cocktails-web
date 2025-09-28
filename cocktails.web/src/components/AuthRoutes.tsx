import { Outlet } from 'react-router-dom';
import { Auth0AuthenticationGuard } from './Auth0Provider';

const AuthRoutes = () => (
    <Auth0AuthenticationGuard
        component={() => (
            <div id='auth-routes'>
                <Outlet />
            </div>
        )}
    />
);

export default AuthRoutes;
