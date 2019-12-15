import LoadEvents from './loadEvents';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';

function loadToDos(){


    // finding the MyQ calendar if it exists
    let myQCalendar = calendars.filter(calendar => {
      return calendar.summary === 'MyQ';
    })[0];

    // if myQ calendar exists, run LoadEvents with that instance
    if(myQCalendar){
      return LoadEvents(myQCalendar, {timeMin: '2018-01-01T00:00:00-00:00'})
        .then(events => cb(events));
    }

    // if myQ calendar doesn't exist, create MyQ calendar
    gapi.client.calendar.calendars.insert({
      summary: 'MyQ',
      description: 'The MyQ Calendar holds ToDo items created in MyQ and it stores preferences for MyQ in a single (ancient) event.'
    }).then(function(response){
      myQCalendar = response.result;
      console.log('MyQ calendar created', response);
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

export default loadToDos;