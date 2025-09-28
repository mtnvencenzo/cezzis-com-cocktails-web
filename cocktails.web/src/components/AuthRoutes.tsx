import { Outlet } from 'react-router-dom';
import { AuthenticationGuard } from './AuthenticationGuard';

const AuthRoutes = () => {
    return (
        <AuthenticationGuard component={() => (
            <div id='auth-routes'>
                <Outlet />
            </div>
        )}>
                
        </AuthenticationGuard>
    );
};

export default AuthRoutes;
