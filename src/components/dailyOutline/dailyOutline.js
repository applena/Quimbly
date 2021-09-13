import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../../store/actions';
/* global gapi */

function DailyOutline(props) {
  console.log('dailyOutline', props.events);
  let hourToRender = new Date().getHours() - 1;
  const [date, setDate] = useState(new Date().getDate());

  const divStyle = {
    display: 'block',
    fontSize: '.8em',
    paddingTop: '5px',
    height: '50px',
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
    lineHeight: '25px'
  }

  return (
    <>
      <div style={dateStyle} id="date">{date}</div>
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
          const date = new Date(hourBlock.toLocaleString()).getDate();

          return (
            <div key={i} style={divStyle} className='15-min'>{time}</div>
          )
        })

        }

      </div>
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