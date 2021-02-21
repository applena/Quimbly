import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import loadConfig from './helperFunctions/loadConfig';
import data from '../store/data';
/* global gapi */

class Calendars extends React.Component{

  // need to wait until a user is signed in to call this function
  componentDidMount(){
    console.log('calendar:componentDidMount');
    let self = this;
    gapi.client.calendar.calendarList.list()
      .then(function(response) {
        //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
        let calendars = response.result.items;

        self.updateConfig(calendars);

        
    })
  }

  updateConfig = (calendars) => {
    // alphabetize and store in app data
    calendars.sort((a, b) => {
      return a.summary > b.summary ? 1 : -1;
    });

    // set the calendars in redux
    // this.props.setCalendars(calendars);

    // ensures the myQ calendar exists
    loadConfig(calendars, this.props.config.hiddenCalendars, (okCalendars, myQCalendar) => {
      // set the config in redux to the config
      console.log('1. CALENDARS: the config after loadConfig:', data.calendars);
      this.props.setCalendars(okCalendars);
      console.log('2. CALENDARS: the config after loadConfig:', data.calendars);
      // store myQ cal as this calendar instance    
    })
    // ensure the config event exitsts
    // set the config state in redux


    // show the main calendar todo space
    this.props.showCalendars();

    // // set the calendars in state to render to the page
    // self.setState({calendars: calendars})
  }

  updateCalendarList = (e) => {
    let excludedCalendar = e.target.name;
    this.props.hideCalendar(excludedCalendar);

    data.config.hiddenCalendars.push(excludedCalendar);
    // ** uppdate configs **
    this.updateConfig(data.calendars)

  }

  render(){
    
    console.log('CALENDARS:', this.props)
    return(
      <div>
        { this.props.calendars.length &&
          <div>
            <h2>Calendars</h2>
        
            <form onChange={this.updateCalendarList}>
              {this.props.calendars.map((calendar, i) => {
                
                const calendarColorStyle = {
                  backgroundColor: calendar.backgroundColor,
                  width: '12px',
                  height: '12px',
                  display: 'inline-block',
                  borderRadius: '4px'
                };

                const inputName = calendar.summary;

                return (<div key={i}>
                  <span className="box" style={calendarColorStyle}></span>
                  <label>
                    <input type="checkbox" name={inputName} value={inputName} defaultChecked />{calendar.summary}
                  </label>
                </div>
              )}
              )}
            </form>
          </div>
        }
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, getState) => {
  return {
    setCalendars: calendars => {
      return dispatch(actions.setCalendars(calendars))
    },
    hideCalendar: calendar => {
      return dispatch(actions.hideCalendar(calendar));
    }
  }
};

const mapStateToProps = state => ({
  calendars: state.reduxData.calendars,
  config: state.reduxData.config
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendars);