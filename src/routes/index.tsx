
import { createBrowserRouter } from 'react-router-dom';

import authRoutes from '@/features/auth/routes';
import dayReportRoutes from '@/features/dayReport/routes';

const router = createBrowserRouter([
  ... dayReportRoutes, 
  ... authRoutes
]);

export default router;