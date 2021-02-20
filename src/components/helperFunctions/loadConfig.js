import data from '../../store/data';

/* global gapi */

function loadConfig(calendars, excludedCalendars, cb){

    // finding the MyQ calendar if it exists
    let myQCalendar = calendars.filter(calendar => {
      return calendar.summary === 'MyQ';
    })[0];

    // if myQ calendar exists, run LoadEvents which gets all the enties in the calendar with that instance
    if(myQCalendar){

      let config = JSON.parse(myQCalendar.description);

      console.log('my parssed calendar', config);
      return cb(config, myQCalendar);
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