import React from 'react';
import './upcomingEvents.scss';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../store/actions';

function UpcomingEvents(props) {
  console.log('events', { props })
  return (
    <>
      <ul id="upcoming-events">
        {props.events.map((event, idx) => (
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

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
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
)(UpcomingEvents);
