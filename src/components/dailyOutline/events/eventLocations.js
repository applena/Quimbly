import React from 'react';

function EventLocations(props) {
  console.log({ props })
  return (
    <div id="event-locations">
      {props.eventLocation && props.eventLocation.map((event, i) => {
        const eventStyle = {
          backgroundColor: event.color,
          position: 'absolute',
          top: event.startingPixels,
          height: event.height
        }
        console.log({ eventStyle })
        return (
          <div key={i} style={eventStyle}>
            {event.event}
          </div>
        )
      })}
    </div>
  )
}

export default EventLocations;