import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './pages/login/LoginPage';
import DayReport from './pages/dailyReport/DayReport';

import authService from './services/auth';
import store from './store';
import OTPPage from './pages/login/OTPPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DayReport />,
    loader: authService.authRedirect
  }, {
    path: '/login',
    element: <LoginPage />,
  },{
    path: '/validate-otp',
    element: <OTPPage />,
  }
])

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
