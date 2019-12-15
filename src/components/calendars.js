import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';
/* global gapi */

class Calendars extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      calendars: []
    };
  }

  // need to wait until a user is signed in to call this function
  componentDidMount(){
    console.log('calendar:componentDidMount');
    let self = this;
    gapi.client.calendar.calendarList.list()
      .then(function(response) {
        //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
        let calendars = response.result.items;
        // alphabetize and store in app data
        calendars.sort((a, b) => {
          return a.summary > b.summary ? 1 : -1;
        });
        console.log('!!!!!!!!!!!!!!!!!', {calendars})
        self.setState({calendars: calendars})
        self.props.setCalendars(calendars);
    })
  }

  
  render(){
    return(
      <div>
        { this.state.calendars.length &&
          <div>
            <h2>Calendars</h2>
        
            <ul>
              {this.state.calendars.map((calendar, i) => (
                <li key={i}>{calendar.summary}</li>
              )
              )}
            </ul>
          </div>
        }
      </div>
    )
  }

}


const mapDispatchToProps = (dispatch, getState) => {
  return {
    setCalendars: (calendar) => dispatch(actions.setCalendars(calendar))
  }
};

const mapStateToProps = state => ({
  Calendars: state.someData.Calendars
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendars);
