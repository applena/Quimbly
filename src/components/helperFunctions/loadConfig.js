import data from '../../store/data';
import saveConfig from './saveConfig';
import createConfig from './createConfig';

async function loadConfig(calendars) {
  // finding the MyQ calendar if it exists
  let myQCalendar = calendars.find(calendar => {
    return calendar.summary === 'MyQ';
  });

  console.log('found myQCal in loadConfig', { myQCalendar })

  // console.log({myQCalendar})

  if (!myQCalendar) {

    // if myQ calendar doesn't exist, create MyQ calendar
    console.log('no myQ calendar - creating one')
    myQCalendar = await createConfig();
  }

  let config;

  try {
    config = JSON.parse(myQCalendar.description);
  } catch (err) {
    console.error('ERROR', err);
  }

  if (!config) {
    config = data.config;
    await saveConfig(config, myQCalendar.id);
  }

  return { config, myQCalendar };

}

export default loadConfig;
