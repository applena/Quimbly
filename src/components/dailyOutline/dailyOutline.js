import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../../store/actions';
/* global gapi */

function DailyOutline(props) {
  console.log('dailyOutline', props.events);
  let hourToRender = new Date().getHours() - 1;

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
      <div style={dateStyle} id="date">{new Date().getDate()}</div>
      <div id='calendar-outline'>
        {new Array(26).fill(1).map((value, i) => (
          <div style={divStyle} className='15-min'>{hourToRender + i > 24 ? `${hourToRender + i - 24}am` : hourToRender + i > 12 ? `${hourToRender + i - 12}pm` : `${hourToRender + i}am`}</div>
        ))

        }
        {/* 
        <div style={divStyle} className='15-min 1am'>1:00am</div>

        <div style={divStyle} className='15-min 2am'>2:00am</div>

        <div style={divStyle} className='15-min 3am'>3:00am</div>

        <div style={divStyle} className='15-min 4am'>4:00am</div>

        <div style={divStyle} className='15-min 5am'>5:00am</div>

        <div style={divStyle} className='15-min 6am'>6:00am</div>

        <div style={divStyle} className='15-min 7am'>7:00am</div>

        <div style={divStyle} className='15-min 8am'>8:00am</div>

        <div style={divStyle} className='15-min 9am'>9:00am</div>

        <div style={divStyle} className='15-min 10am'>10:00am</div>

        <div style={divStyle} className='15-min 11am'>11:00am</div>

        <div style={divStyle} className='15-min 12pm'>12:00pm</div>

        <div style={divStyle} className='15-min 1pm'>1:00pm</div>

        <div style={divStyle} className='15-min 2pm'>2:00pm</div>

        <div style={divStyle} className='15-min 3pm'>3:00pm</div>

        <div style={divStyle} className='15-min 4pm'>4:00pm</div>

        <div style={divStyle} className='15-min 5pm'>5:00pm</div>

        <div style={divStyle} className='15-min 6pm'>6:00pm</div>

        <div style={divStyle} className='15-min 7pm'>7:00pm</div>

        <div style={divStyle} className='15-min 8pm'>8:00pm</div>

        <div style={divStyle} className='15-min 9pm'>9:00pm</div>

        <div style={divStyle} className='15-min 10pm'>10:00pm</div>

        <div style={divStyle} className='15-min 11pm'>11:00pm</div> */}

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