/* global gapi */

import React, { useCallback, useEffect, useState } from 'react';
import Layout from './components/layout';
// import User from './components/user';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn } from './store/actions';
import loadConfig from './components/helperFunctions/loadConfig';
import DailyOutline from './components/dailyOutline/dailyOutline';

let scriptAdded;

function App(props) {
  const [show, setShow] = useState(false);

  console.log('APP', { props });

  // Init the Google API client
  const initClient = useCallback(() => {
    window.gapi.client.init({
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: '666346298716-glkmqvi7n7djp4a69757cnvjhga7skkp.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar'
    }).then(() => {
      const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

      const onLoggedIn = async () => {
        console.log('user is signed in');
        props.isLoggedIn(true);

        // get all the calendars
        const response = await gapi.client.calendar.calendarList.list();

        //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
        // TODO: loading annimation
        let calendars = response.result.items;
        const { config, quimblyCalendar } = await loadConfig(calendars);
        if (!calendars.find((calendar) => calendar.id === quimblyCalendar.id)) {
          calendars.push(quimblyCalendar);
        }

        props.setConfig(config);
        props.setCalendars(calendars);
        props.setQuimblyCalendar(quimblyCalendar);
        // console.log('config!!!', { config, calendars, quimblyCalendar })

        setShow(true);
      }

      // if the user is not logged in, log them into google and load their calendars with events
      if (!isLoggedIn) {
        // Listen for sign-in state changes.
        console.log('not logged in')
        gapi.auth2.getAuthInstance().isSignedIn.listen(onLoggedIn);
        return gapi.auth2.getAuthInstance().signIn();
      }

      // if they are already logged in, load their calendars with events
      onLoggedIn();

    })
      .catch(err => console.error('in catch for initClient', err))
  }, [props]);

  // Load the SDK asynchronously
  // Adds google API script tag and loads the SDK
  // Gives you a window event that you can bind to
  const loadGoogleSDK = useCallback(() => {
    scriptAdded = true;
    let js;
    let firstScriptTag = document.getElementsByTagName('script')[0];
    if (document.getElementById('google-jssdk')) {
      window.onGoogleLoad();
      return;
    }
    js = document.createElement('script');
    js.id = 'google-jssdk';
    js.src = "https://apis.google.com/js/api.js?onload=onGoogleLoad";
    js.onload = "onGoogleLoad";
    firstScriptTag.parentNode.insertBefore(js, firstScriptTag);
  }, []);

  useEffect(() => {
    // Load the Google API Client
    window.onGoogleLoad = () => {
      window.gapi.load('client', initClient);
    }
    if (!scriptAdded) {
      loadGoogleSDK();
    }
  }, [initClient, loadGoogleSDK]);

  return (
    <Layout>
      {show &&
        <div>
          {/* <User /> */}
          {/* <UpcomingEvents /> */}
          <DailyOutline />
        </div>
      }
    </Layout>
  );
};

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  // console.log('APP: mapStateToProps', state)
  return {
    DailyHabits: state.reduxData.DailyHabits,
    loggedIn: state.reduxData.loggedIn,
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    QuimblyCalendar: state.reduxData.QuimblyCalendar,
    events: state.reduxData.events
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);