import './App.css';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './pages/login/LoginPage';
import DayReport from './pages/dailyReport/DayReport';

import store from './store';

const authRedirect = () => {
  const token = localStorage.getItem('token');
  if (!token || !token.length) {
    return redirect('/login');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DayReport />,
    loader: authRedirect
  }, {
    path: '/login',
    element: <LoginPage />,
  }
])

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
