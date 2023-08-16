import DayReport from '@/features/dayReport/components/DayReport';
import ProtectedRoute from '@/components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <ProtectedRoute><DayReport /></ProtectedRoute>,
  }, 
];

export default routes;