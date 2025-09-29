import { Outlet } from 'react-router-dom';
import { Auth0AuthenticationGuard } from './Auth0Provider';

const AuthRoutesContent = () => (
    <div id='auth-routes'>
        <Outlet />
    </div>
);

const AuthRoutes = () => <Auth0AuthenticationGuard component={AuthRoutesContent} />;

export default AuthRoutes;
