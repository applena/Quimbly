/* global gapi */

import { connect } from 'react-redux';
import { isLoggedIn } from '../store/actions';

import Button from '@material-ui/core/Button';

function LogoutButton(props) {
  const signOut = () => {
    gapi.auth2.getAuthInstance().disconnect();
    props.isLoggedIn(false);
  }

  return (
    <Button variant="outlined" onClick={signOut}>Log Out</Button>
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
