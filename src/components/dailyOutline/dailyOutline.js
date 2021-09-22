import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../../store/actions';
import NowLine from './nowLine';
import getUpcomingEvents from '../../lib/getUpcomingEvents';
import EventLocations from './events/eventLocations';

import './dailyOutline.scss';
/* global gapi */

function DailyOutline(props) {
  // console.log('dailyOutline', props.events); 
  let hourToRender = new Date().getHours() - 1;
  const [minutes, setCurrentMinutes] = useState(0);
  const [nowLineLocation, setNowLineLocation] = useState('130px');
  const [eventLocations, setEventLocations] = useState([]);

  useEffect(() => {
    getUpcomingEvents(props.calendars, props.config)
      .then(events => {
        console.log('todays events', { events })
        props.setEvents(events);;
        generateEventLocations(events);
      })

  }, [])

  const generateEventLocations = (events) => {
    const today = new Date().toLocaleString().split(',')[0];

    // get today's events
    const todaysEvents = events.filter(event => {
      const eventDate = new Date(event.startTime).toLocaleDateString();
      return eventDate === today;
    });

    // find the starting and ending position for each event
    const eventLocations = todaysEvents.map(event => {
      const localStartTimeHour = new Date(event.startTime).toLocaleTimeString().split(':')[0];
      const localStartTimeMinute = new Date(event.startTime).toLocaleTimeString().split(':')[1];
      const localEndTimeHour = new Date(event.endTime).toLocaleTimeString().split(':')[0];
      const localEndTimeMinute = new Date(event.endTime).toLocaleTimeString().split(':')[1];
      const startingPixels = `${228 + (60 * Number(localStartTimeHour)) + Number(localStartTimeMinute)}px`;
      const endingPixels = `${228 + (60 * Number(localEndTimeHour)) + Number(localEndTimeMinute)}px`;
      const height = `${(228 + (60 * Number(localEndTimeHour)) + Number(localEndTimeMinute)) - (228 + (60 * Number(localStartTimeHour)) + Number(localStartTimeMinute))}px`
      console.log({ startingPixels, endingPixels, localStartTimeHour, localStartTimeMinute, localEndTimeHour, localEndTimeMinute })
      return ({
        ...event,
        startingPixels,
        endingPixels,
        height
      }
      )
    })

    // console.log({ eventLocations, todaysEvents })
    setEventLocations(eventLocations);
  };

  useEffect(() => {
    setNowLineLocation(165 + 60 + minutes);
  }, [minutes]);



  const divStyle = {
    display: 'block',
    fontSize: '.8em',
    paddingTop: '5px',
    height: '60px',
    textAlign: 'right',
    borderBottom: '1px dotted black'
  };

  const dateStyle = {
    borderRadius: '15px',
    backgroundColor: 'darkCyan',
    color: 'white',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    lineHeight: '25px',
    position: 'fixed'
  }

  const dateContainer = {
    backgroundColor: 'white',
    position: 'fixed',
    top: '130px',
    borderBottom: '2px solid black',
    width: '100%',
    height: '39px',
    zIndex: '2'
  }

  return (
    <>
      <div style={dateContainer}>
        <div style={dateStyle} id="date">{new Date().getDate()}</div>
      </div>
      <div id='calendar-outline'>
        {new Array(26).fill(1).map((value, i) => {
          const hourBlock = new Date();
          hourBlock.setHours(hourToRender + i)
          hourBlock.setMinutes(0);
          hourBlock.setSeconds(0);
          const ampm = `${hourBlock.toLocaleString().split(' ')[2]}`;
          const hour = `${hourBlock.toLocaleString().split(' ')[1].split(':')[0]}`;
          const min = `${hourBlock.toLocaleString().split(' ')[1].split(':')[1]}`;
          const time = `${hour}:${min}${ampm}`;

          return (
            <div key={i} style={divStyle} className='fifteen-min'>{time}</div>
          )
        })

        }

      </div>
      <EventLocations
        eventLocation={eventLocations}
      />
      <NowLine
        setCurrentMinutes={setCurrentMinutes}
        nowLineLocation={nowLineLocation}
      />
    </>
  )
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  return {
    DailyHabits: state.reduxData.DailyHabits,
    loggedIn: state.reduxData.loggedIn,
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    myQCalendar: state.reduxData.myQCalendar,
    events: state.reduxData.events
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyOutline);