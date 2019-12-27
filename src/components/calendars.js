import React from 'react';
import { connect } from 'react-redux';
// import store from '../store';
// import reduxData from '../store/data';
import * as actions from '../store/actions';
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

        // set the calendars in redux
        self.props.setCalendars(calendars);
        
        // show the main calendar todo space
        self.props.showCalendars();

        // set the calendars in state to render to the page
        self.setState({calendars: calendars})
    })
  }

  render(){
    
    
    return(
      <div>
        { this.state.calendars.length &&
          <div>
            <h2>Calendars</h2>
        
            <form>
              {this.state.calendars.map((calendar, i) => {
                
                const calendarColorStyle = {
                  backgroundColor: calendar.backgroundColor,
                  width: '12px',
                  height: '12px',
                  display: 'inline-block',
                  borderRadius: '4px'
                };

                console.log(calendarColorStyle);

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
    }
  }
};

const mapStateToProps = state => ({
  calendars: state.calendars
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendars);