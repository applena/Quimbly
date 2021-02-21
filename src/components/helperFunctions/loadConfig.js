import data from '../../store/data';
import { connect } from 'react-redux';
/* global gapi */

function loadConfig(calendars, hiddenCalendars, cb){

  console.log('LOAD CONFIG', calendars)

    // finding the MyQ calendar if it exists
    let myQCalendar = calendars.filter(calendar => {
      return calendar.summary === 'MyQ';
    })[0];

    // if myQ calendar exists, run LoadEvents which gets all the enties in the calendar with that instance
    if(myQCalendar){

      let config = JSON.parse(myQCalendar.description);

      const okCalendars = calendars.filter(calendar => !hiddenCalendars.includes(calendar))
      console.log('LOAD CONFIG: okCalendars', config, okCalendars);

      return cb(okCalendars, myQCalendar);
    }

    // if myQ calendar doesn't exist, create MyQ calendar
    gapi.client.calendar.calendars.insert({
      summary: 'MyQ',
      description: JSON.stringify(data.config)
    }).then(function(response){
      // create a calendar config event
      
      myQCalendar = response.result;
      
      return cb(data.config, myQCalendar)
    });                

}


export default loadConfig;