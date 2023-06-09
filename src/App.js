import './App.css';
import { useState, useEffect } from 'react';

import eventsService from './services/events';
import recordsService from './services/records';
import { getWeekDaysByDate } from './services/utils';
import userService from './services/user';
import LoginPage from './pages/login/LoginPage';
import DayReport from './pages/dailyReport/DayReport';

const App = () => {

  const [user, setUser ] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( () => {
    const fetchUser = async () => {
      const userData = await userService.getCurrentUserInfo();
      setUser(userData);
    }

    fetchUser()
      .catch(console.error);
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const fetchEvents = () => {
    console.log('effect');
    const fetchData = async () => {
      const events = await eventsService.getEvents();
      setEvents(events);
      console.log(events);
    }
  
    fetchData()
      .catch(console.error);
  }

  const fetchRecords = () => {
    console.log('records');
    recordsService
      .getRecords('63c056c5c3b3e5612cfc62fb')
      .then(records => {
        setRecords(records);
        console.log(records);
      })
      .catch(console.error);
  }
  

  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const newRecord = {
    userId: '63c056c5c3b3e5612cfc62fb',
    eventId: '63b74c2cfe015ec88961f9a3',
  };

  // more info on effects https://devtrium.com/posts/async-functions-useeffect
  useEffect(fetchEvents, []);
  useEffect(fetchRecords, [])

  const createRecord = async () => {
    const newRecordData = await recordsService.createRecord(newRecord);
    setRecords([...records, newRecordData]);
  }

  const login = false;

  return (
    <div className="App">
      {!user && <LoginPage onLogin={handleLogin}/>} 
      {user && <DayReport/>}
    </div>
  );
}

export default App;
