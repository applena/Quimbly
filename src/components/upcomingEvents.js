import React from 'react';
import './upcomingEvents.scss';
import { connect } from 'react-redux';
import getUpcomingEvents from '../lib/getUpcomingEvents';
import { setCalendars, setEvents } from '../store/actions';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { value, index, events, ...other } = props;
  console.log({ events })

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <ul id="upcoming-events">
            {events && events.map((event, idx) => (
              <li style={{ borderLeft: `10px solid ${event.color}`, listStyle: 'none' }} key={idx}>
                <div>Calendar: {event.calendar}</div>
                <div>Name: {event.event}</div>
                <div>Date: {new Date(event.startTime).toLocaleDateString()}</div>
                <div>Start Time: {new Date(event.startTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>End Time: {new Date(event.endTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  componentDidMount() {
    getUpcomingEvents(this.props.calendars, this.props.config)
      .then(events => {
        this.props.setEvents(events);
      })
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue })
  };


  render() {
    const today = new Date().toLocaleDateString();
    return (
      <>
        <div id="events-tabs">
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleChange}>
              <Tab label="All Events" {...a11yProps(0)} />
              <Tab label="Today's Events" {...a11yProps(1)} />
              <Tab label="This Week's Events" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} events={this.props.events} index={0}>

          </TabPanel>
          <TabPanel value={this.state.value} events={this.props.events.filter(event => {
            const eventDate = new Date(event.startTime).toLocaleDateString();
            return eventDate === today;
          })} index={1}>
          </TabPanel>
          <TabPanel value={this.state.value} events={this.props.events.filter(event => {
            const eventDate = new Date(event.startTime);
            const dateInOneWeek = new Date(eventDate.getTime() + 7 * 24 * 60 * 60 * 1000);

            console.log({ eventDate, today, dateInOneWeek });
            return today <= new Date(event).toLocaleDateString() <= dateInOneWeek
          })} index={2}>
          </TabPanel>
        </div>

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
