import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
/* global gapi */

class DailyOutline extends React.Component{

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     calendars: []
  //   };
  // }

  render(){
    const divStyle = {
      display: 'block',
      width: '50px',
      fontSize: '.8em',
      paddingTop: '5px',
      height: '15px',
      textAlign: 'right',
      borderBottom: '1px dotted black'
    };

    return(
      <>
        <h1>in the daily Outline</h1>
        <div id='calendar-outline'>
          <div style={divStyle} className='15-min 12am'>12:00am</div>
          <div style={divStyle} className='15-min 12am'>12:15am</div>
          <div style={divStyle} className='15-min 12am'>12:30am</div>
          <div style={divStyle} className='15-min 12am'>12:45am</div>
          <div style={divStyle} className='15-min 1am'>1:00am</div>
          <div style={divStyle} className='15-min 1am'>1:15am</div>
          <div style={divStyle} className='15-min 1am'>1:30am</div>
          <div style={divStyle} className='15-min 1am'>1:45am</div>
          <div style={divStyle} className='15-min 2am'>2:00am</div>
          <div style={divStyle} className='15-min 2am'>2:15am</div>
          <div style={divStyle} className='15-min 2am'>2:30am</div>
          <div style={divStyle} className='15-min 2am'>2:45am</div>
          <div style={divStyle} className='15-min 3am'>3:00am</div>
          <div style={divStyle} className='15-min 3am'>3:15am</div>
          <div style={divStyle} className='15-min 3am'>3:30am</div>
          <div style={divStyle} className='15-min 3am'>3:45am</div>
          <div style={divStyle} className='15-min 4am'>4:00am</div>
          <div style={divStyle} className='15-min 4am'>4:15am</div>
          <div style={divStyle} className='15-min 4am'>4:30am</div>
          <div style={divStyle} className='15-min 4am'>4:45am</div>
          <div style={divStyle} className='15-min 5am'>5:00am</div>
          <div style={divStyle} className='15-min 5am'>5:15am</div>
          <div style={divStyle} className='15-min 5am'>5:30am</div>
          <div style={divStyle} className='15-min 5am'>5:45am</div>
          <div style={divStyle} className='15-min 6am'>6:00am</div>
          <div style={divStyle} className='15-min 6am'>6:15am</div>
          <div style={divStyle} className='15-min 6am'>6:30am</div>
          <div style={divStyle} className='15-min 6am'>6:45am</div>
          <div style={divStyle} className='15-min 7am'>7:00am</div>
          <div style={divStyle} className='15-min 7am'>7:15am</div>
          <div style={divStyle} className='15-min 7am'>7:30am</div>
          <div style={divStyle} className='15-min 7am'>7:45am</div>
          <div style={divStyle} className='15-min 8am'>8:00am</div>
          <div style={divStyle} className='15-min 8am'>8:15am</div>
          <div style={divStyle} className='15-min 8am'>8:30am</div>
          <div style={divStyle} className='15-min 8am'>8:45am</div>
          <div style={divStyle} className='15-min 9am'>9:00am</div>
          <div style={divStyle} className='15-min 9am'>9:15am</div>
          <div style={divStyle} className='15-min 9am'>9:30am</div>
          <div style={divStyle} className='15-min 9am'>9:45am</div>
          <div style={divStyle} className='15-min 10am'>10:00am</div>
          <div style={divStyle} className='15-min 10am'>10:15am</div>
          <div style={divStyle} className='15-min 10am'>10:30am</div>
          <div style={divStyle} className='15-min 10am'>10:45am</div>
          <div style={divStyle} className='15-min 11am'>11:00am</div>
          <div style={divStyle} className='15-min 11am'>11:15am</div>
          <div style={divStyle} className='15-min 11am'>11:30am</div>
          <div style={divStyle} className='15-min 11am'>11:45am</div>
          <div style={divStyle} className='15-min 12pm'>12:00pm</div>
          <div style={divStyle} className='15-min 12pm'>12:15pm</div>
          <div style={divStyle} className='15-min 12pm'>12:30pm</div>
          <div style={divStyle} className='15-min 12pm'>12:45pm</div>
          <div style={divStyle} className='15-min 1pm'>1:00pm</div>
          <div style={divStyle} className='15-min 1pm'>1:15pm</div>
          <div style={divStyle} className='15-min 1pm'>1:30pm</div>
          <div style={divStyle} className='15-min 1pm'>1:45pm</div>
          <div style={divStyle} className='15-min 2pm'>2:00pm</div>
          <div style={divStyle} className='15-min 2pm'>2:15pm</div>
          <div style={divStyle} className='15-min 2pm'>2:30pm</div>
          <div style={divStyle} className='15-min 2pm'>2:45pm</div>
          <div style={divStyle} className='15-min 3pm'>3:00pm</div>
          <div style={divStyle} className='15-min 3pm'>3:15pm</div>
          <div style={divStyle} className='15-min 3pm'>3:30pm</div>
          <div style={divStyle} className='15-min 3pm'>3:45pm</div>
          <div style={divStyle} className='15-min 4pm'>4:00pm</div>
          <div style={divStyle} className='15-min 4pm'>4:15pm</div>
          <div style={divStyle} className='15-min 4pm'>4:30pm</div>
          <div style={divStyle} className='15-min 4pm'>4:45pm</div>
          <div style={divStyle} className='15-min 5pm'>5:00pm</div>
          <div style={divStyle} className='15-min 5pm'>5:15pm</div>
          <div style={divStyle} className='15-min 5pm'>5:30pm</div>
          <div style={divStyle} className='15-min 5pm'>5:45pm</div>
          <div style={divStyle} className='15-min 6pm'>6:00pm</div>
          <div style={divStyle} className='15-min 6pm'>6:15pm</div>
          <div style={divStyle} className='15-min 6pm'>6:30pm</div>
          <div style={divStyle} className='15-min 6pm'>6:45pm</div>
          <div style={divStyle} className='15-min 7pm'>7:00pm</div>
          <div style={divStyle} className='15-min 7pm'>7:15pm</div>
          <div style={divStyle} className='15-min 7pm'>7:30pm</div>
          <div style={divStyle} className='15-min 7pm'>7:45pm</div>
          <div style={divStyle} className='15-min 8pm'>8:00pm</div>
          <div style={divStyle} className='15-min 8pm'>8:15pm</div>
          <div style={divStyle} className='15-min 8pm'>8:30pm</div>
          <div style={divStyle} className='15-min 8pm'>8:45pm</div>
          <div style={divStyle} className='15-min 9pm'>9:00pm</div>
          <div style={divStyle} className='15-min 9pm'>9:15pm</div>
          <div style={divStyle} className='15-min 9pm'>9:30pm</div>
          <div style={divStyle} className='15-min 9pm'>9:45pm</div>
          <div style={divStyle} className='15-min 10pm'>10:00pm</div>
          <div style={divStyle} className='15-min 10pm'>10:15pm</div>
          <div style={divStyle} className='15-min 10pm'>10:30pm</div>
          <div style={divStyle} className='15-min 10pm'>10:45pm</div>
          <div style={divStyle} className='15-min 11pm'>11:00pm</div>
          <div style={divStyle} className='15-min 11pm'>11:15pm</div>
          <div style={divStyle} className='15-min 11pm'>11:30pm</div>
          <div style={divStyle} className='15-min 11pm'>11:45pm</div>
        </div>
      </>
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
)(DailyOutline);