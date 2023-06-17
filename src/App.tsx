import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './pages/login/LoginPage';
import DayReport from './pages/dailyReport/DayReport';

import authService from './services/auth';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DayReport />,
    loader: authService.authRedirect
  }, {
    path: '/login',
    element: <LoginPage />,
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
