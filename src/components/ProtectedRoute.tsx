import { RootState } from '@/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user)
  if (!user || !Object.keys(user).length) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;