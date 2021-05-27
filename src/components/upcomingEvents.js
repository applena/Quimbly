import { render } from "react-dom";

import React from 'react';
import './upcomingEvents.scss';

function UpcomingEvents(events) {
  console.log('events', {events})
  return(
    <>
      <ul id="upcoming-events">
        {events.events.map((event, idx) => (
          <li style={{borderLeft: `10px solid ${event.color}`, listStyle: 'none'}} key={idx}>
            <div>Calendar: {event.calendar}</div>
            <div>Name: {event.event}</div>
            <div>Start Time: {event.startTime}</div>
            <div>End Time: {event.endTime}</div>
          </li>
        ))}
      </ul>

    </>
  )
}

export default UpcomingEvents;