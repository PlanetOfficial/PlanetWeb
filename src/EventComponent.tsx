import React from 'react';
import { DataProps } from './Interfaces';

const repeatDollarSign = (num: number) => {
  let result = '';
  for (let i = 0; i < num; i++) {
    result += '$';
  }
  return result;
}

const EventComponent: React.FC<DataProps> = ({
  name,
  datetime,
  members,
  destinations,
}) => {
  return (
    <div>
      <div>
        <h2>{name}</h2>
        {datetime != 0 ? <p>{new Date(datetime).toLocaleString()}</p> : null}
      </div>

      <br></br>

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
  
      {destinations.map((destination, index) => (
        <div key={index}>
          <h3>{destination.name}</h3>
          {destination.suggestions.map((suggestion, index) => (
            <div key={index}>
              <img src={suggestion.poi.photo} />
              <p>{suggestion.poi.name}</p>
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
