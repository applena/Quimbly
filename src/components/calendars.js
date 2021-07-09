

import React from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar } from '../store/actions';

function Calendars(props) {
  console.log('in Calendars', props)

  return (
    <div>
      {props.calendars.length &&
        <div>
          <h2>Calendars</h2>

          <form onChange={(e) => props.updateCalendarList(e.target.name)}>
            {props.calendars.map((calendar, i) => {

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
                  <input type="checkbox" name={inputName} value={inputName} defaultChecked={props.config.hiddenCalendars.includes(calendar.summary) ? false : true} />{calendar.summary}
                </label>
              </div>
              )
            }
            )}
          </form>
        </div>
      }
    </div>
  )
}


const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar };

const mapStateToProps = state => {
  // console.log('calendar: mapStateToProps:', state);
  return ({
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    myQCalendar: state.reduxData.myQCalendar
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendars);