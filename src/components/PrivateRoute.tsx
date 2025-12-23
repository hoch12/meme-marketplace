import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = () => {
    const { user } = useAuth();
    return user?.loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};