import './App.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import eventsService from './services/events';
import recordsService from './services/records';
import { getWeekDaysByDate } from './services/utils';
import userService from './services/user';
import LoginPage from './pages/login/LoginPage';
import DayReport from './pages/dailyReport/DayReport';

const authRedirect = () => {
  const token = localStorage.getItem('token');
  if(!token || !token.length) {
    return redirect('/login');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DayReport/>,
    loader: authRedirect
  },{
    path: '/login',
    element: <LoginPage/>,
  }
])

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
