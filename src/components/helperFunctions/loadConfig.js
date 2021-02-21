import data from '../../store/data';
import cleanUp from './cleanUp';

/* global gapi */

async function loadConfig(calendars){

  console.log('LOAD CONFIG', data)

  // finding the MyQ calendar if it exists
  let myQCalendar = calendars.filter(calendar => {
    return calendar.summary === 'MyQ';
  })[0];

  // if myQ calendar exists, run LoadEvents which gets all the enties in the calendar with that instance
  if(myQCalendar){

    let config = JSON.parse(myQCalendar.description);
    console.log('LOAD CONFIG _ HIDDEN CALENDARS:', config.hiddenCalendars);

    const badData = config.hiddenCalendars.length === undefined;
    if(badData){
      calendars = await cleanUp(calendars);
    } else {
      console.log('LOAD CONFIG:', config);
      return {config, myQCalendar};
    }

  }

  // if myQ calendar doesn't exist, create MyQ calendar
  const response = await gapi.client.calendar.calendars.insert({
    summary: 'MyQ',
    description: JSON.stringify(data.config)
  })

  // create a calendar config event
  
  myQCalendar = response.result;
  console.log('LOAD CONFIG: new myQ, calendars', calendars)
  
  return {config: data.config, myQCalendar};         

}

export default loadConfig;
