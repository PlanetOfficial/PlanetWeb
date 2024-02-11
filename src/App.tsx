import { useEffect, useState } from 'react'
import './App.css'
import { getEvent } from './api/event'
import Event from './ui/event/Event'
import { EventDetail } from './types'

function App() {  
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<EventDetail | null>();

  document.body.style.margin = "0";
  document.body.style.padding = "0";

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
      {loading || !event ? <p>Please wait...</p> : <Event event={event} />}
    </>
  )
}

export default App