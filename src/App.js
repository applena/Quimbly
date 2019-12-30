/* global gapi */

import React from 'react';
import Layout from './components/layout';
import Calendars from './components/calendars';
import User from './components/user';
import When from './components/when';
import { connect } from 'react-redux';
import * as actions from './store/actions.js';
import DailyOutline from './components/dailyOutline';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      show: false,
      showCalendars: false
    }
  }

  componentDidMount = () => {
    const self = this;
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
          clientId: '666346298716-sla03uo3osduktv9j72epqrji83i7kt4.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar'
        }).then(function () {

          const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

          const onLoggedIn =() => {
            console.log('user is signed in');
            self.props.isLoggedIn(true);
            self.setState({show: true});
          }
          
          // if the user is not logged in, log them into google and load their calendars with events
          if(!isLoggedIn){
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(onLoggedIn);
            return gapi.auth2.getAuthInstance().signIn();
          } 

          // if they are already logged in, load their calendars with events
          onLoggedIn();          
        });
      });
    };
  }

  updateCalendars = () => {
    this.setState({showCalendars:true});
  }

  render() {
    console.log('All of the props in the app',this.props);
    return (
      <Layout>
        <When condition={this.state.show}>
          <div>
            <User />
            <Calendars showCalendars={this.updateCalendars} />
            <When condition={this.state.showCalendars}>
              <h1>calendars are ready</h1>
              <DailyOutline />
            </When>
          </div>
        </When>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setDailyTasks: (tasks) => dispatch(actions.setDailyTasks(tasks)),
    isLoggedIn: (boo) => dispatch(actions.isLoggedIn(boo))
  }
};

const mapStateToProps = state => ({
  DailyHabits: state.DailyHabits,
  loggedIn: state.loggedIn,
  calendars: state.calendars
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);