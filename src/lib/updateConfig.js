import loadConfig from '../components/helperFunctions/loadConfig';

const updateConfig = async ({ calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props }) => {
  console.log('updateConfig', { calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props })
  // alphabetize and store in app data
  calendars.sort((a, b) => {
    return a.summary > b.summary ? 1 : -1;
  });

  // ensures the myQ calendar exists
  const { config, myQCalendar } = await loadConfig(calendars);

  // put the hidden calendars in state
  const hiddenCalendars = JSON.parse(myQCalendar.description);
  setHiddenCalendars(hiddenCalendars.hiddenCalendars);

  const visCal = calendars.filter(cal => !hiddenCalendars.hiddenCalendars.includes(cal.summary));
  setVisibleCalendars(visCal);

  // set the config in redux to the config
  props.setConfig(config);
  props.setMyQCalendar(myQCalendar);
  if (!calendars.find(c => c.summary === 'MyQ')) {
    props.setCalendars([...calendars, myQCalendar]);
  } else {
    props.setCalendars(calendars);
  }
}

export default updateConfig;