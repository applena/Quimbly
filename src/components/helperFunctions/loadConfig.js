import data from '../../store/data';
import saveConfig from './saveConfig';
import createConfig from './createConfig';

async function loadConfig(calendars) {
  // finding the Quimbly calendar if it exists
  let quimblyCalendar = calendars.find(calendar => {
    return calendar.summary === 'Quimbly';
  });

  console.log('found quimblyCal in loadConfig', { quimblyCalendar })

  if (!quimblyCalendar) {
    // if Quimbly calendar doesn't exist, create Quimbly calendar
    console.log('no quimbly calendar - creating one')
    quimblyCalendar = await createConfig();
  }

  let config;

  try {
    config = JSON.parse(quimblyCalendar.description);
  } catch (err) {
    console.error('ERROR', err);
  }

  if (!config) {
    config = data.config;
    await saveConfig(config, quimblyCalendar.id);
  }

  // console.log('hoping these exist: ', { config, quimblyCalendar })
  return { config, quimblyCalendar };

}

export default loadConfig;
