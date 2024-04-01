import { useEffect, useState } from 'react'
import './App.css'
import { getEvent } from './api/event'
import EventComponent from './EventComponent';
import { DataProps } from './Interfaces';
import DownloadComponent from './DownloadComponent';

function App() {  
  const [event, setEvent] = useState<DataProps | {}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeEvent = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const event_id = urlParams.get('event_id') ?? "";
      if (event_id === "") {
        setLoading(false);
        return;
      }

      const event = await getEvent(event_id);

      setEvent(event);
    }

    initializeEvent();
  }, []);

  return (
    <>
      {'name' in event && 'datetime' in event && 'members' in event && 'destinations' in event ? (
        <div>
          <EventComponent name={event.name} datetime={event.datetime} members={event.members} destinations={event.destinations} />
          <br></br>
          <DownloadComponent />
        </div>
      ) : loading ? (
        <p>Please wait...</p>
      ) : null}
    </>
  )
}

export default App
