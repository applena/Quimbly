import React from 'react';
import './upcomingEvents.scss';
import { connect } from 'react-redux';
import getUpcomingEvents from '../lib/getUpcomingEvents';
import { setCalendars, setEvents } from '../store/actions';

class UpcomingEvents extends React.Component {

  componentDidMount() {
    getUpcomingEvents(this.props.calendars, this.props.config)
      .then(events => {
        console.log('got upcoming events: ', { events });
        this.props.setEvents(events);
      })
  };

  render() {
    return (
      <>
        <ul id="upcoming-events">
          {this.props.events && this.props.events.map((event, idx) => (
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setCalendars: (calendars) => dispatch(setCalendars(calendars)),
    setEvents: (events) => dispatch(setEvents(events))
  }
}

const mapStateToProps = state => {
  console.log('UPCOMINGEVENTS: mapStateToProps', state)
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
