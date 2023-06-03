import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Hello = ({name, counter}) => {
  return (
    <p>Hello, {name}! x{counter}</p>
  );
}

const App = () => {

  const name = 'Aida';
  const [counter, setCounter] = useState(0);
  const [arr, setArr] = useState([0]);
  const [newCounter, setNewCounter] = useState(0);



  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const newRecord = {
    userId: "63c056c5c3b3e5612cfc62fb",
    eventId: "63b74c2cfe015ec88961f9a3",
  };

  // more info on effects https://devtrium.com/posts/async-functions-useeffect
  const getEvents = () => {
    console.log('effect');
    const fetchData = async () => {
      const resultEvents = await axios.get('http://localhost:3030/events');
      setEvents(resultEvents.data);
      console.log(resultEvents.data);
    }

    fetchData()
      .catch(console.error);
  };
  useEffect(getEvents, [records]);

  const getRecords = () => {
    console.log('records');
    const fetchData = async () => {
      const resultRecords = await axios.get('http://localhost:3030/records/63c056c5c3b3e5612cfc62fb');
      setRecords(resultRecords.data);
      console.log(resultRecords.data);
    }

    fetchData()
      .catch(console.error);
  }
  useEffect(getRecords, [])

  const createRecord = async () => {
    const result = await axios.post('http://localhost:3030/records', newRecord)
    setRecords([...records, result.data]);
  }

  const clickHandler = () => {
    setCounter(counter + 2);
    setArr([...arr, counter + 2]);
  }

  const addCounter = (event) => {
    event.preventDefault();
    setCounter(newCounter);
    setArr([...arr, newCounter]);
  }

  const handleInputChange = (event) => {
    setNewCounter(parseInt(event.target.value));
  }

  return (
    <div className="App">
      <button onClick={clickHandler}>Plus 2</button>
     <Hello name={name} counter={counter}/>
     <p>{counter}</p>
     {counter % 4 === 0 && <div>{arr.join(' ')}</div>}
     {arr.map( (num, index) => (<div key={index}>{num}</div>))}

     <form onSubmit={addCounter}>
      <input 
        value={newCounter}
        onChange={handleInputChange}
      />
      <button type="submit">Add counter value</button>
     </form>
     <button onClick={createRecord}>Create Record</button>
     {records.map(rec => <div> {rec.date} </div>)}
    </div>
  );
}

export default App;
