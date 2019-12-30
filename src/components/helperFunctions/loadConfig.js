import LoadEvents from './loadEvents';
import excludeCalenders from './excludeCalenders';
import data from '../../store/data';

/* global gapi */

function loadConfig(calendars, excludedCalendars, cb){

    // finding the MyQ calendar if it exists
    let myQCalendar = calendars.filter(calendar => {
      return calendar.summary === 'MyQ';
    })[0];

    // if myQ calendar exists, run LoadEvents which gets all the enties in the calendar with that instance
    if(myQCalendar){
      console.log('found a myQ calendar, loading the events');
      return LoadEvents(myQCalendar, {timeMin: '2018-01-01T00:00:00-00:00'})
        .then(cb);
    }

    // if myQ calendar doesn't exist, create MyQ calendar
    gapi.client.calendar.calendars.insert({
      summary: 'MyQ',
      description: JSON.stringify(data.config)
    }).then(function(response){
      // create a calendar config event
      
      myQCalendar = response.result;
      
      return LoadEvents(myQCalendar, {timeMin: '2018-01-01T00:00:00-00:00'})
        .then(events => cb(events));
    });                
// grab the myQ cal
// or create it if it doesn't exist
// then: list the events for that calendar
// see if there is a configuration event in that list of events ??????????
// if not, create that config event ???????????
// store that config event in memory as the preferences for the user
}

// const mapDispatchToProps = (dispatch, getState) => {
//   return {
//     setCalendars: (calendar) => dispatch(actions.setCalendars(calendar))
//   }
// };

// const mapStateToProps = state => ({
//   Calendars: state.Calendars
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(loadConfig);

export default loadConfig;