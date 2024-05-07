import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import tokenService from '@/services/token';
import useAuth from '@/features/auth/hooks/useAuth';
import RouteErrorFallback from '@/components/RouteErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

type ProtectedRouteProps = {
  children: ReactNode
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { loading } = useAuth();
  const location = useLocation();

  const token = tokenService.getToken();
  if (!token || !token.length) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ErrorBoundary FallbackComponent={RouteErrorFallback} key={location.pathname}>
      {loading && <h1>Loading...</h1>}
      {!loading && children}
    </ErrorBoundary>
  );
};

export default ProtectedRoute;