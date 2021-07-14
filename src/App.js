/* global gapi */

import React, { useCallback, useEffect, useState } from 'react';
import Layout from './components/layout';
import Calendars from './components/calendars';
import User from './components/user';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from './store/actions';
import UpcomingEvents from './components/upcomingEvents';

import listUpcomingEvents from './lib/listUpcomingEvents';
import updateConfig from './lib/updateConfig';
let calApiLoaded;
let calApiLoading;


function App(props) {
  const [events, setEvents] = useState([]);
  const [hiddenCalendars, setHiddenCalendars] = useState(props.config.hiddenCalendars);
  const [show, setShow] = useState(false);
  const [visibleCalendars, setVisibleCalendars] = useState([]);

  // updateConfig({ calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props });

  console.log('APP', { events, props, visibleCalendars, hiddenCalendars });

  // Init the Google API client
  const initClient = useCallback(() => {
    window.gapi.client.init({
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: '666346298716-glkmqvi7n7djp4a69757cnvjhga7skkp.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar'
    }).then(() => {
      calApiLoaded = true;
      console.log(calApiLoaded);
      console.log('got info back from init')
      const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

      const onLoggedIn = () => {
        console.log('user is signed in');
        props.isLoggedIn(true);
        console.log('setShow is now true');
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

      // get all the calendars
      gapi.client.calendar.calendarList.list()
        .then(async (response) => {
          //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
          let calendars = response.result.items;
          await updateConfig({ calendars, setHiddenCalendars, setVisibleCalendars, setEvents, props });
          listUpcomingEvents(visibleCalendars, props, setEvents);
        });
    });
  }, [props, visibleCalendars]);

  // Load the SDK asynchronously
  // Adds google API script tag and loads the SDK
  // Gives you a window event that you can bind to
  const loadGoogleSDK = useCallback(() => {
    calApiLoading = true;
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
    if (!calApiLoading) {
      loadGoogleSDK();
    }
  }, [initClient, loadGoogleSDK]);



  // useEffect(() => {
  //   console.log('entering useEffect');
  //   if (window.loaded) return;
  //   window.loaded = true;
  //   console.log('loading google');

  //   // script.onload = () => {
  //   gapi.load('client:auth2', function initClient() {
  //     console.log('gapi load')
  //     gapi.client.init({
  //       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //       clientId: '666346298716-glkmqvi7n7djp4a69757cnvjhga7skkp.apps.googleusercontent.com',
  //       scope: 'https://www.googleapis.com/auth/calendar'
  //     }).then(function () {

  //     }).catch(err => console.error('gapi init error', err));
  //   });
  //   // };
  // }, [props, visibleCalendars])


  return (
    <Layout>
      {show &&
        <div>
          <User />
          <Calendars
            showCalendars={() => setShow(true)}
            setVisibleCalendars={setVisibleCalendars}
          />
          {events.length > 1 &&
            <UpcomingEvents events={events} />
          }
        </div>
      }
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