import React from 'react';
import './upcomingEvents.scss';

function UpcomingEvents(events) {
  console.log('events', { events })
  return (
    <>
      <ul id="upcoming-events">
        {events.events.map((event, idx) => (
          <li style={{ borderLeft: `10px solid ${event.color}`, listStyle: 'none' }} key={idx}>
            <div>Calendar: {event.calendar}</div>
            <div>Name: {event.event}</div>
            <div>Date: {new Date(event.startTime).toLocaleDateString()}</div>
            <div>Start Time: {new Date(event.startTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>End Time: {new Date(event.endTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </li>
        ))}
      </ul>

    </>
  )
}

export default UpcomingEvents;