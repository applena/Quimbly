import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../../store/actions';
import NowLine from './nowLine';
import getUpcomingEvents from '../../lib/getUpcomingEvents';
import EventLocations from './events/eventLocations';
import config from '../../config';

import './dailyOutline.scss';
/* global gapi */

function DailyOutline(props) {
  // console.log('dailyOutline', props.events); 

  let hourToRender = new Date().getHours() + config.MINIMUM_EVENT_TIME / 1000 / 60 / 60;
  const [minutes, setCurrentMinutes] = useState(0);
  const [nowLineLocation, setNowLineLocation] = useState('130px');
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

    // get today's events
    const todaysEvents = events.filter(event => {
      // check to see if it is an all day event
      // google cal returns all day events as the previous day so we need to add one to get the correct day
      if (!event.startTime.split('T')[1]) {
        if (new Date(event.startTime).getDate() + 1 === new Date().getDate()) {
          event.allDay = true;
          return true;
        } else {
          return false;
        }
      }

      const startTime = new Date(event.startTime).getTime();
      // const endTime = new Date(event.endTime).getTime();

      if (maxTime >= startTime && startTime >= minTime) {
        return true;
      }

    });

    // console.log({ todaysEvents })

    const allEventLocations = [];

    // find the starting and ending position for each event
    const eventLocations = todaysEvents.map((event, idx) => {
      const newEvent = {
        ...event,
        startingPixels: 0,
        endingPixels: 0,
        height: 0,
        left: 0,
        width: '200px',
        numOfEvents: 0
      }

      const currentWindowHourStart = new Date(minTime).getHours();

      const startTimeHour = new Date(event.startTime).getHours() - currentWindowHourStart;
      const startTimeMinute = new Date(event.startTime).getMinutes();
      const endTimeHour = new Date(event.endTime).getHours() - currentWindowHourStart;
      const endTimeMinute = new Date(event.endTime).getMinutes();
      console.log(event.event, { startTimeHour, startTimeMinute, endTimeMinute, endTimeMinute, currentWindowHourStart, minTime });


      newEvent.startingPixels = `${171 + (60 * startTimeHour) + startTimeMinute}px`;
      newEvent.endingPixels = `${171 + (60 * endTimeHour) + endTimeMinute}px`;
      newEvent.height = `${(171 + (60 * endTimeHour) + endTimeMinute) - (171 + (60 * startTimeHour) + startTimeMinute)}px`;

      allEventLocations.push(newEvent)

      allEventLocations.forEach((e, i) => {
        if (e.startingPixels >= newEvent.startingPixels && e.endingPixels <= newEvent.endingPixels && i !== idx) {
          newEvent.numOfEvents++;
          newEvent.left = `${newEvent.numOfEvents * 180}px`;
        }
      });

      if (event.allDay) {
        newEvent.startingPixels = '139px';
        newEvent.left = '50px';
        newEvent.zIndex = 5;
        console.log('checking for an all day event', { event, newEvent })
      }

      return (newEvent)
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
    top: '140px',
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