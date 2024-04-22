import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import icons from './assets/icons';
import { DataProps } from './Interfaces';
import { getEvent, vote } from './api/event';

const repeatDollarSign = (num: number) => {
  let result = '';
  for (let i = 0; i < num; i++) {
    result += '$';
  }
  return result;
}

const EventComponent: React.FC<DataProps> = ({
  event_id,
  name,
  datetime,
  members,
  destinations,
}) => {
  const [display_name, setDisplayName] = useState('');
  const [_destinations, setDestinations] = useState(destinations);

  const [loadingVote, setLoadingVote] = useState(-1);

  const onLikeClick = async (suggestion_id: number) => {
    setLoadingVote(suggestion_id);
    const response = await vote(suggestion_id, display_name);
    setLoadingVote(-1);

    if (!response) {
      alert('Failed to vote, make sure you have entered a display name');
    } else {
      const eventUpdated = await getEvent(event_id);
      setDestinations(eventUpdated.destinations);
    }
  }

  return (
    <div>
      <div>
        <h2>{name}</h2>
        {datetime != 0 ? <p>{new Date(datetime).toLocaleString()}</p> : null}
      </div>

      <br></br>
      
      <h3>Your Display Name</h3>
      <input type="text" value={display_name} onChange={(e) => setDisplayName(e.target.value)} />

      <br></br><br></br>

      <h3>Members:</h3>
      {members.map((member, index) => (
        <div key={index} id="member_div">
          {member.display_name}
          {member.icon !== null ? (
            <img className="circular-container" src={member.icon.url}/>
          ) : null}
        </div>
      ))}

      <br></br>
  
      {_destinations.map((destination, index) => (
        <div key={index}>
          <h2>{destination.name}</h2>
          {destination.suggestions.map((suggestion, index) => (
            <div key={index}>
              <p><b>{suggestion.poi.name}</b></p>
              <img src={suggestion.poi.photo} />
              <br></br>
              <div className='likes-container' onClick={() => onLikeClick(suggestion.id)}>
                <button>
                  <img className='like-icon' src={icons.like} />
                </button>
                <p>{suggestion.votes.length + suggestion.browser_votes.length}</p>
                <ClipLoader
                  color={"#f36f3f"}
                  loading={loadingVote === suggestion.id}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <div className='voters-container'>
                  {suggestion.votes.length > 0 || suggestion.browser_votes.length > 0 ? (
                    <p>(
                    {suggestion.votes.map((vote, index) => {
                      let voter = vote.display_name;
                      if (index < suggestion.votes.length - 1 || suggestion.browser_votes.length > 0) {
                        voter += ", ";
                      }

                      return (
                        <span key={index}>
                          {voter}
                        </span>
                      )
                    })}
                    {suggestion.browser_votes.map((vote, index) => {
                      let voter = vote.display_name;
                      if (index < suggestion.browser_votes.length - 1) {
                        voter += ", ";
                      }

                      return (
                        <span key={index}>
                          {voter}
                        </span>
                      )
                    })}
                    )</p>
                  ) : null}
                </div>
              </div>

              <p>Rating: {suggestion.poi.rating} ({suggestion.poi.rating_count})</p>
              <p>Price: {repeatDollarSign(suggestion.poi.price)}</p>
              <p>Address: <a href={`https://www.google.com/maps/search/?api=1&query=${suggestion.poi.vicinity}`} target="_blank">{suggestion.poi.vicinity}</a></p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
