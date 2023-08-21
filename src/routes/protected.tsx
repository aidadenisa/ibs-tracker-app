import ProtectedRoute from '@/components/ProtectedRoute';
import dayReportRoutes from '@/features/dayReport/routes';
import { Outlet } from 'react-router-dom';

const ProtectedRoutesLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}

const protectedRoutes = [{
  path: '/',
  element: <ProtectedRoutesLayout />,
  children: [
    ...dayReportRoutes
  ]
}]

export default protectedRoutes;