import LoginPage from '@/features/auth/components/LoginPage';
import OTPPage from '@/features/auth/components/OTPPage';

export const routes = [{
  path: '/login',
  element: <LoginPage />,
},{
  path: '/validate-otp',
  element: <OTPPage />,
}];

export default routes;