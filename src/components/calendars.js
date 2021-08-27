import { React, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../store/actions';
import updateCalendarList from '../lib/updateCalendarList';
import getUpcomingEvents from '../lib/getUpcomingEvents';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Calendars(props) {
  const classes = useStyles();
  const theme = useTheme();

  console.log('in Calendars', props)
  const [hiddenCalendars, setHiddenCalendars] = useState(props.config.hiddenCalendars);

  const updateCalendarsAndEvents = async (e) => {
    console.log('updateCalAndEvents', e.target.id);
    await updateCalendarList(e.target.id, props.setVisibleCalendars, setHiddenCalendars, hiddenCalendars, props, props.myQCalendar);
    getUpcomingEvents(props.calendars, props.config)
      .then(events => {
        console.log('got upcoming events: ', { events });
        props.setEvents(events);
      })
  }
  return (
    <div>
      {props.calendars && props.calendars.length &&
        <div>
          <h2>Calendars</h2>

          <FormControl>
            <InputLabel>Calendars</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              onChange={(e) => updateCalendarsAndEvents(e)}
              multiple
              value={props.calendars}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.calendars.map((calendar, i) => {

                const calendarColorStyle = {
                  backgroundColor: calendar.backgroundColor,
                  borderRadius: '4px',
                  padding: '1em'
                };

                const inputName = calendar.summary;

                return (
                  <div key={i}>
                    <MenuItem style={calendarColorStyle}>
                      <input type="checkbox" id={calendar.id} name={inputName} value={inputName} defaultChecked={props.config.hiddenCalendars.includes(calendar.id) ? false : true} />{calendar.summary}
                    </MenuItem>
                  </div>
                )
              }
              )}
            </Select>
          </FormControl>

          {/* <form onChange={(e) => updateCalendarsAndEvents(e)}>
            {props.calendars.map((calendar, i) => {

              const calendarColorStyle = {
                backgroundColor: calendar.backgroundColor,
                width: '12px',
                height: '12px',
                display: 'inline-block',
                borderRadius: '4px'
              };

              const inputName = calendar.summary;


              return (<div key={i}>
                <span className="box" style={calendarColorStyle}></span>
                <label>
                  <input type="checkbox" id={calendar.id} name={inputName} value={inputName} defaultChecked={props.config.hiddenCalendars.includes(calendar.id) ? false : true} />{calendar.summary}
                </label>
              </div>
              )
            }
            )}
          </form> */}
        </div>
      }
    </div >
  )
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  // console.log('CALENDARS: mapStateToProps', state)
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
)(Calendars);