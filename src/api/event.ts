const EventAPIURL = "https://xvwn-ch2s-yzi8.n7c.xano.io/api:zQ01rdgp"

export const getEvent = async (event_id: string) => {
    const response = await fetch(EventAPIURL + `/event-web/${event_id}`, {
      method: 'GET',
    });
  
    const myJson = await response.json();
  
    return myJson;
};

export const vote = async (suggestion_id: number, display_name: string) => {
    const response = await fetch(EventAPIURL + `/event-web/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ display_name: display_name, suggestion_id: suggestion_id })
    });

    return response.ok;
}
