import DayReport from '@/features/dayReport/components/DayReport';
import ProtectedRoute from '@/components/ProtectedRoute';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DayReport />,
  }, 
];

export default routes;