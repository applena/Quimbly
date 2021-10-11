import loadConfig from '../components/helperFunctions/loadConfig';

const updateConfig = async ({ calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props }) => {
  console.log('updateConfig', { calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props })
  // alphabetize and store in app data
  calendars.sort((a, b) => {
    return a.summary > b.summary ? 1 : -1;
  });

  // ensures the quimbly calendar exists
  const { config, quimblyCalendar } = await loadConfig(calendars);

  // put the hidden calendars in state
  const hiddenCalendars = JSON.parse(quimblyCalendar.description);
  setHiddenCalendars(hiddenCalendars.hiddenCalendars);

  const visCal = calendars.filter(cal => !hiddenCalendars.hiddenCalendars.includes(cal.summary));
  setVisibleCalendars(visCal);

  // set the config in redux to the config
  props.setConfig(config);
  props.setQuimblyCalendar(quimblyCalendar);
  if (!calendars.find(c => c.summary === 'Quimbly')) {
    props.setCalendars([...calendars, quimblyCalendar]);
  } else {
    props.setCalendars(calendars);
  }
}

export default updateConfig;