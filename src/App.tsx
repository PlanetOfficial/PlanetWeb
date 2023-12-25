import { useEffect, useState } from 'react'
import './App.css'
import { getEvent } from './api/event'

function App() {  
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    const initializeEvent = async () => {
      setLoading(true);

      const urlParams = new URLSearchParams(window.location.search);
      const event_id = urlParams.get('event_id') ?? "";
      const event = await getEvent(event_id);

      setEvent(event);
      setLoading(false);
    }

    initializeEvent();
  }, []);

  return (
    <>
      {loading ? <p>Please wait...</p> : <p><b>{JSON.stringify(event)}</b></p>}
    </>
  )
}

export default App
