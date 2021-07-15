import saveConfig from '../components/helperFunctions/saveConfig';
import listUpcomingEvents from './listUpcomingEvents';

const updateCalendarList = (calendar, setVisibleCalendars, setHiddenCalendars, hiddenCalendars, props) => {
  console.log('update calendar list:', { props })
  let chosenCalendar = calendar;
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
  // console.log({ newVisibleCalendars, hiddenCalendars}, props.calendars );

  // save it to the config
  saveConfig({ hiddenCalendars: newHiddenCalendars }, props.myQCalendar.id);

  // update state
  setHiddenCalendars(newHiddenCalendars);

  // update redux
  props.toggleHideCalendar(chosenCalendar);


  // update the list of events
  listUpcomingEvents(newVisibleCalendars, props);
}

export default updateCalendarList;