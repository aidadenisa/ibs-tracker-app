import './App.css';
import { useState, useEffect } from 'react';

import eventsService from './services/events';
import recordsService from './services/records';
import { getWeekDaysByDate } from './services/utils';

import LoginPage from './pages/login/LoginPage';

const App = () => {




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
      <LoginPage/>
    </div>
  );
}

export default App;
