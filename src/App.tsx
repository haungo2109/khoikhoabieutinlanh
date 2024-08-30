import { useEffect } from 'react';
import CCalendar from './components/CCalendar';
import data from './data.json';
import FormTask from './components/FormTask';
import './App.css';

const events: any = data.map(({ start, end, ...rest }) => ({
  start: new Date(Date.parse(start)),
  end: new Date(Date.parse(end)),
  ...rest,
}));


function App() {
  const fetchData = async () => {
    fetch("/api/notion")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div style={{ height: '90vh' }}>
        <CCalendar events={events} />
      </div>
      <FormTask />
    </>
  );
}

export default App;
