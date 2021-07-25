/* global gapi */

import { connect } from 'react-redux';
import { isLoggedIn } from '../store/actions';

function LogoutButton(props) {
  const signOut = () => {
    gapi.auth2.getAuthInstance().disconnect();
    props.isLoggedIn(false);
  }

  return (
    <button onClick={signOut}>Log Out</button>
  )
}

const mapDispatchToProps = { isLoggedIn };

const mapStateToProps = state => {
  // console.log('APP: mapStateToProps', state)
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
)(LogoutButton);
