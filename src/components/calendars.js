import { React, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn } from '../store/actions';
import saveConfig from './helperFunctions/saveConfig';
import getUpcomingEvents from '../lib/getUpcomingEvents';

import './calendars.scss';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Calendars(props) {

  const [selectedCalendars, setSelectedCalendars] = useState(props.calendars.filter(c => !props.config.hiddenCalendars.includes(c)).map(c => c.id));

  const toggleCalendar = async (e) => {
    setSelectedCalendars([...selectedCalendars, e.target.value]);
    // don't let them remove Quimbly

    let chosenCalendar = e.target.value;
    if (chosenCalendar === 'Quimbly') return;

    let newHiddenCalendars = [];


    // put the calendar in the correct place and save it to newHiddenCalendars
    if (props.config.hiddenCalendars.includes(chosenCalendar)) {
      newHiddenCalendars = props.config.hiddenCalendars.filter(c => c !== chosenCalendar);
      console.log('removing', { newHiddenCalendars })
    } else {
      newHiddenCalendars = [...props.config.hiddenCalendars, chosenCalendar];
      console.log('adding', { newHiddenCalendars })
    }

    const config = { hiddenCalendars: newHiddenCalendars.filter(i => i) };

    props.setConfig(config);
    // save it to the config
    saveConfig(config, props.quimblyCalendar.id);

    getUpcomingEvents(props.calendars, config)
      .then(events => {
        props.setEvents(events);
      })
  }

  return (
    <div id="calendars">
      <div>
        <FormControl>
          <Select
            multiple
            value={selectedCalendars}
            input={<Input />}
          // MenuProps={MenuProps}
          >
            {props.calendars.map((calendar, i) => (

              <MenuItem key={i} onChange={toggleCalendar} style={
                {
                  backgroundColor: calendar.backgroundColor,
                  borderRadius: '4px',
                  padding: '1em'
                }} >
                <input type="checkbox" value={calendar.id} defaultChecked={props.config.hiddenCalendars.includes(calendar.id) ? false : true} />
                {calendar.summary}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
    </div >
  )
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  // console.log('CALENDARS: mapStateToProps', state)
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
)(Calendars);