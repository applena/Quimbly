import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../../store/actions';
import NowLine from './nowLine';
import getUpcomingEvents from '../../lib/getUpcomingEvents';

import './dailyOutline.scss';
/* global gapi */

function DailyOutline(props) {
  // console.log('dailyOutline', props.events); 
  let hourToRender = new Date().getHours() - 1;
  const [minutes, setCurrentMinutes] = useState(0);
  const [nowLineLocation, setNowLineLocation] = useState('130px');
  const [events, setEvents] = useState(props.events);

  useEffect(() => {
    getUpcomingEvents(props.calendars, props.config)
      .then(events => {
        console.log({ events })
        props.setEvents(events);
        setEvents(events);
        generateEventLocations(events);
      })

  }, [])

  const generateEventLocations = (events) => {
    const nowHour = new Date().getHours();
    const today = new Date().toLocaleString();

    // get today's events
    const todaysEvents = events.filter(event => {
      const eventDate = new Date(event.startTime).toLocaleDateString();
      return eventDate === today;
    });

    console.log({ todaysEvents })


    // find the starting position for each event
    todaysEvents.map(event => {
      const startingHour = new Date(event.StartTime).getHours();
      const startingMinute = new Date(event.StartTime).getMinutes();
      const startingPixels = 130 + (60 * startingHour) + startingMinute;
      console.log({ startingPixels })
    })
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