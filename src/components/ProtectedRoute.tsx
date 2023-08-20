import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import tokenService from '@/services/token';
import useAuth from '@/features/auth/hooks/useAuth';

type ProtectedRouteProps = {
  children: ReactNode
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { loading } = useAuth();

  const token = tokenService.getToken();
  if (!token || !token.length) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && children}
    </>
  );
};

export default ProtectedRoute;