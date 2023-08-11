import DayReport from '@/features/dayReport/components/DayReport';
import authService from '@/features/auth/services/auth';

const routes = [
  {
    path: '/',
    element: <DayReport />,
    loader: authService.authRedirect
  }, 
];

export default routes;