import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import tokenService from '@/services/token';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import userService from '@/services/user';

type ProtectedRouteProps = {
  children: ReactNode
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  const token = tokenService.getToken();
  if (!token || !token.length) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {

    if (!user || !Object.keys(user).length) {
      setLoading(true);
      userService.updateCurrentUserInfo();
    } else {
      setLoading(false);
    }
  }, [user])

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && children}
    </>
  );
};

export default ProtectedRoute;