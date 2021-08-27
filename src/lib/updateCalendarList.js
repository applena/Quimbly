import saveConfig from '../components/helperFunctions/saveConfig';
import getUpcomingEvents from './getUpcomingEvents';

const updateCalendarList = (calendarId, setVisibleCalendars, setHiddenCalendars, hiddenCalendars, props, myQCalendar) => {
  console.log('update calendar list:', { calendarId }, { myQCalendar })
  let chosenCalendar = calendarId;
  let newHiddenCalendars = [];

  // don't let them remove myQ
  if (chosenCalendar === 'myQ') return;

  // put the calendar in the correct place and save it to newHiddenCalendars
  if (hiddenCalendars.includes(chosenCalendar)) {
    newHiddenCalendars = hiddenCalendars.filter(c => c !== chosenCalendar);
  } else {
    newHiddenCalendars = [...hiddenCalendars, chosenCalendar];
  }

  const newVisibleCalendars = props.calendars.filter(cal => !newHiddenCalendars.includes(cal.summary))
  setVisibleCalendars(newVisibleCalendars);
  console.log({ newVisibleCalendars, hiddenCalendars });

  // save it to the config
  saveConfig({ hiddenCalendars: newHiddenCalendars }, myQCalendar.id);

  // update state
  setHiddenCalendars(newHiddenCalendars);

  // update redux
  props.toggleHideCalendar(calendarId);


  // update the list of events
  getUpcomingEvents(props.calendars, props.config);
}

export default updateCalendarList;
