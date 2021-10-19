import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn } from '../../store/actions';
import NowLine from './nowLine';
import getUpcomingEvents from '../../lib/getUpcomingEvents';
import EventLocations from './events/eventLocations';
import config from '../../config';
import AddEvent from '../addEvent';
import generateSchedule from '../helperFunctions/generateSchedule';

import './dailyOutline.scss';
/* global gapi */

function DailyOutline(props) {
  // console.log('dailyOutline', props.events); 

  let hourToRender = new Date().getHours() + config.MINIMUM_EVENT_TIME / 1000 / 60 / 60;
  const [minutes, setCurrentMinutes] = useState(0);
  const [nowLineLocation, setNowLineLocation] = useState('135px');
  const [eventLocations, setEventLocations] = useState([]);

  useEffect(() => {
    getUpcomingEvents(props.calendars, props.config)
      .then(events => {
        props.setEvents(events);;
        generateEventLocations(events);
      })

  }, [])

  const generateEventLocations = (events) => {
    const maxTime = new Date().getTime() + config.MAMIMUM_EVENT_TIME;
    const minTime = new Date().getTime() + config.MINIMUM_EVENT_TIME;

    const allEventLocations = {};

    // STEP 1: find the starting and ending position for each event
    const eventLocations = events.map((event, idx) => {
      const newEvent = {
        ...event,
        startingPixels: 0,
        endingPixels: 0,
        height: 0,
        left: 0,
        width: '200px',
        position: 0
      }

      const todaysDate = new Date().getDate();
      const eventDate = new Date(event.startTime).getDate();

      const currentWindowHourStart = new Date(minTime).getHours();

      const startTimeHour = new Date(event.startTime).getHours() - currentWindowHourStart;
      const startTimeMinute = new Date(event.startTime).getMinutes();
      const endTimeHour = new Date(event.endTime).getHours() - currentWindowHourStart;
      const endTimeMinute = new Date(event.endTime).getMinutes();
      // console.log(event.event, { startTimeHour, startTimeMinute, endTimeMinute, endTimeMinute, currentWindowHourStart, minTime });

      newEvent.startingPixels = todaysDate === eventDate ? `${config.OUTLINE_OFFSET + (60 * startTimeHour) + startTimeMinute}px` : `${config.OUTLINE_OFFSET + (24 * 60) + (60 * startTimeHour) + startTimeMinute}px`;
      newEvent.endingPixels = todaysDate === eventDate ? `${config.OUTLINE_OFFSET + (60 * endTimeHour) + endTimeMinute}px` : `${config.OUTLINE_OFFSET + (24 * 60) + (60 * endTimeHour) + endTimeMinute}px`;
      newEvent.height = `${(config.OUTLINE_OFFSET + (60 * endTimeHour) + endTimeMinute) - (config.OUTLINE_OFFSET + (60 * startTimeHour) + startTimeMinute)}px`;

      allEventLocations[event.id] = newEvent;

      // STEP 2: move events that are at the same time over to the right so they don't overlap
      Object.values(allEventLocations).forEach((e, i) => {
        if ((e.startingPixels <= newEvent.startingPixels && newEvent.startingPixels < e.endingPixels) && i !== idx) {
          newEvent.position = e.position + 1;
          newEvent.left = `${newEvent.position * 130}px`;
        }
      })

      // check to see if it is an all day event
      if (!event.startTime.split('T')[1]) {

        newEvent.allDay = true;
        newEvent.startingPixels = '183px';
        newEvent.endingPixels = '233px';
        newEvent.left = '50px';
        newEvent.zIndex = 5;
        newEvent.height = '20px';
        // console.log('checking for an all day event', { event, newEvent })

      }

      return (newEvent)
    })

    // STEP 3: get just the events that are going to render on page for today
    const todaysEvents = eventLocations.filter(event => {
      if (!event) return false;

      // get the all day events for today
      const today = new Date().toISOString().split('T')[0];
      if (event.allDay) {
        return event.startTime === today;
      }

      const startTime = new Date(event.startTime).getTime();
      // const endTime = new Date(event.endTime).getTime();

      if (maxTime >= startTime && startTime >= minTime) {
        return true;
      }

    });

    // STEP 4: determine when the free-time blocks are
    generateSchedule(eventLocations);

    console.log({ eventLocations, todaysEvents })

    // save all events in REDUX
    props.setEvents(eventLocations);
    // save daily events in state
    setEventLocations(todaysEvents);
  };

  const updateEvents = (event) => {
    // console.log('new event from Quimbly:', { event }, props.events);

    generateEventLocations([...props.events, {
      calendar: 'Quimbly',
      event: event.summary,
      endTime: event.end.dateTime,
      startTime: event.start.dateTime,
      description: event.description,
      color: '#333'
    }])
  }

  useEffect(() => {
    setNowLineLocation(config.OUTLINE_OFFSET + 120 + minutes);
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
    top: '180px',
    borderBottom: '2px solid black',
    width: '100%',
    height: '39px',
    zIndex: '2'
  }

  return (
    <>
      <AddEvent
        updateEvents={updateEvents}
      />
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

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  return {
    DailyHabits: state.reduxData.DailyHabits,
    loggedIn: state.reduxData.loggedIn,
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    quimblyCalendar: state.reduxData.quimblyCalendar,
    events: state.reduxData.events
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyOutline);