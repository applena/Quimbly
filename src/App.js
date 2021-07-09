/* global gapi */

import React, { useEffect, useState, useCallback } from 'react';
import Layout from './components/layout';
import Calendars from './components/calendars';
import User from './components/user';
import When from './components/when';
import { connect } from 'react-redux';
import saveConfig from './components/helperFunctions/saveConfig';
import loadConfig from './components/helperFunctions/loadConfig';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from './store/actions';
import * as parallel from 'async-parallel';
import UpcomingEvents from './components/upcomingEvents';
import AddEvent from './components/addEvent';


function App(props) {
  const [events, setEvents] = useState([]);
  const [hiddenCalendars, setHiddenCalendars] = useState(props.config.hiddenCalendars);
  const [show, setShow] = useState(false);
  const [showCalendars, setShowCalendars] = useState(false);
  const [visibleCalendars, setVisibleCalendars] = useState([]);

  console.log('APP', { events, props, visibleCalendars })
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    // once the google library is loaded...
    script.onload = () => {
      gapi.load('client:auth2', function initClient() {
        gapi.client.init({
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          clientId: '666346298716-glkmqvi7n7djp4a69757cnvjhga7skkp.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar'
        }).then(function () {

          const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

          const onLoggedIn = () => {
            console.log('user is signed in');
            props.isLoggedIn(true);
            setShow(true);
          }

          // if the user is not logged in, log them into google and load their calendars with events
          if (!isLoggedIn) {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(onLoggedIn);
            return gapi.auth2.getAuthInstance().signIn();
          }

          // if they are already logged in, load their calendars with events
          onLoggedIn();

          // get all the calendars
          gapi.client.calendar.calendarList.list()
            .then(function (response) {
              //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
              let calendars = response.result.items;
              updateConfig(calendars);
            });
        });
      });
    };
  }, [props, updateConfig])

  const updateConfig = useCallback(async (calendars) => {
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
    listUpcomingEvents(visCal);
    // console.log({visCal},calendars, hiddenCalendars.hiddenCalendars);

    // set the config in redux to the config
    props.setConfig(config);
    props.setMyQCalendar(myQCalendar);
    if (!calendars.find(c => c.summary === 'MyQ')) {
      props.setCalendars([...calendars, myQCalendar]);
    } else {
      props.setCalendars(calendars);
    }

    setShowCalendars(true);
  }, [])

  const updateCalendarList = (calendar) => {
    let chosenCalendar = calendar;
    let newHiddenCalendars = [];

    // don't let them remove myQ
    if (chosenCalendar === 'myQ') return;

    // put the calendar in the correct place and save it to newHiddenCalendars
    if (hiddenCalendars.includes(chosenCalendar)) {
      newHiddenCalendars = hiddenCalendars.filter(c => c !== chosenCalendar);
    } else {
      newHiddenCalendars = [...hiddenCalendars, chosenCalendar];
    }

    const newVisibleCalendars = props.calendars.filter(cal => !newHiddenCalendars.includes(cal.summary))
    setVisibleCalendars(newVisibleCalendars);
    // console.log({ newVisibleCalendars, hiddenCalendars}, props.calendars );

    // save it to the config
    saveConfig({ hiddenCalendars: newHiddenCalendars }, props.myQCalendar.id);

    // update state
    setHiddenCalendars(newHiddenCalendars);

    // update redux
    props.toggleHideCalendar(chosenCalendar);


    // update the list of events
    listUpcomingEvents(newVisibleCalendars);
  }

  const listUpcomingEvents = async (visibleCalendars) => {
    console.log('listUpcomingEvents', visibleCalendars);

    const promiseArray = await generatePromiseArray(visibleCalendars);


    let allEvents = await parallel.map(promiseArray, async apiCall => {
      const response = await apiCall();
      return response.result.items;
    });

    allEvents = allEvents.map((eventArray, idx) => {
      return eventArray.map(event => ({
        calendar: visibleCalendars[idx].summary,
        color: visibleCalendars[idx].backgroundColor,
        event: event.summary,
        startTime: event.start.dateTime ? event.start.dateTime : event.start.date,
        endTime: event.end.dateTime ? event.end.dateTime : event.end.date
      }))
    })

    allEvents = allEvents.flat()
    console.log({ allEvents })

    allEvents = allEvents.sort((a, b) => {
      return a.startTime > b.startTime ? 1 : -1;
    }).slice(0, 10);

    setEvents(allEvents);
    props.setEvents(allEvents);
  }

  const generatePromiseArray = async (visibleCalendars) => {
    return visibleCalendars.map(calendar => async () => gapi.client.calendar.events.list({
      'calendarId': calendar.id,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }));
  }

  const updateCalendars = () => setShowCalendars(true);

  return (
    <Layout>
      <When condition={show}>
        <div>
          <User />
          <Calendars
            showCalendars={updateCalendars}
            updateCalendarList={updateCalendarList}
          />
          <When condition={showCalendars}>
            <h1>calendars are ready</h1>

            {events.length &&
              <UpcomingEvents events={events} />
            }
            <AddEvent />
          </When>
        </div>
      </When>
    </Layout>
  );
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
    DailyHabits: state.reduxData.DailyHabits,
    loggedIn: state.reduxData.loggedIn,
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    myQCalendar: state.reduxData.myQCalendar,
    events: state.reduxData.events
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);