
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import useAuth from '@/features/auth/hooks/useAuth';

import protectedRoutes from '@/routes/protected';
import publicRoutes from '@/routes/public';

const AppRoutes = () => {

  const { loading, isLoggedIn, user } = useAuth();

  const commonRoutes = [] as RouteObject[];

  const routes = isLoggedIn && user && Object.keys(user).length
    ? protectedRoutes
    : publicRoutes;

  const router = createBrowserRouter([...routes, ...commonRoutes]);

  // TODO: EXTRACT LOADER SOMEWHERE 
  // TODO: CHECK OUT SUSPENSE + AWAIT FROM REACT ROUTER WEBSITE https://reactrouter.com/en/main/start/overview#skeleton-ui-with-suspense
  return (
    <>
      {loading && <h1>Loading....</h1>}
      {!loading && <RouterProvider router={router} />}
    </>
  )

}

export default AppRoutes;