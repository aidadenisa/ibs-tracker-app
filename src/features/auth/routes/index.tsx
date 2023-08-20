import LoginPage from '@/features/auth/components/LoginPage';
import OTPPage from '@/features/auth/components/OTPPage';
import { Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [{
  path: '/login',
  element: <LoginPage />,
}, {
  path: '/validate-otp',
  element: <OTPPage />,
}, {
  path: '/',
  element: <Navigate to="/login"/>
}];

export default routes;