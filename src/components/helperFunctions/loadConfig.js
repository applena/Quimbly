import data from '../../store/data';
import cleanUp from './cleanUp';

/* global gapi */

async function loadConfig(calendars) {
  // finding the MyQ calendar if it exists
  let myQCalendar = calendars.filter(calendar => {
    return calendar.summary === 'MyQ';
  })[0];

  // console.log({myQCalendar})

  // if myQ calendar exists, run LoadEvents which gets all the enties in the calendar with that instance
  if (myQCalendar) {

    var config = JSON.parse(myQCalendar.description);

    const badData = config.hiddenCalendars.length === 0;
    console.log('badData', badData)
    if (badData) {
      calendars = await cleanUp(calendars);
    } else {
      // console.log('load config:', { config })
      return { config, myQCalendar };
    }

  }

  // if myQ calendar doesn't exist, create MyQ calendar
  const response = await gapi.client.calendar.calendars.insert({
    summary: 'MyQ',
    description: JSON.stringify(data.config)
  })

  // create a calendar config event

  myQCalendar = response.result;

  return { config: data.config, myQCalendar };

}

export default loadConfig;
