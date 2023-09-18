import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RouteErrorFallback from '@/components/RouteErrorFallback';
import { useLocation } from 'react-router-dom';

type PublicRouteProps = {
  children: ReactNode
}
const PublicRoute = ({ children }: PublicRouteProps) => {

  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={RouteErrorFallback} key={location.pathname}>
      {children}
    </ErrorBoundary>
  );
};

export default PublicRoute;