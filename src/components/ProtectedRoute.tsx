import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!loading && !isAuthenticated)
    return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
