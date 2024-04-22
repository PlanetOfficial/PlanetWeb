import { useEffect, useState } from 'react'
import './App.css'
import { getEvent } from './api/event'
import EventComponent from './EventComponent';
import { DataProps } from './Interfaces';
import DownloadComponent from './DownloadComponent';

function App() {  
  const [event, setEvent] = useState<DataProps | {}>({});
  const [loading, setLoading] = useState(true);
  const [event_id, setEventId] = useState("");

  useEffect(() => {
    const initializeEvent = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const _event_id = urlParams.get('event_id') ?? "";
      if (_event_id === "") {
        setLoading(false);
        return;
      }

      setEventId(_event_id);
      const event = await getEvent(_event_id);

      setEvent(event);
    }

    initializeEvent();
  }, []);

  return (
    <>
      {'name' in event && 'datetime' in event && 'members' in event && 'destinations' in event ? (
        <div>
          <EventComponent event_id={event_id} name={event.name} datetime={event.datetime} members={event.members} destinations={event.destinations} />
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
