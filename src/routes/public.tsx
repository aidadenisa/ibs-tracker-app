import PublicRoute from '@/components/PublicRoute';
import authRoutes from '@/features/auth/routes';
import { Outlet } from 'react-router-dom';

const PublicRoutesLayout = () => {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  )
}

const publicRoutes = [{
  path: '/',
  element: <PublicRoutesLayout />,
  children: [
    ...authRoutes
  ],
}]

export default publicRoutes;