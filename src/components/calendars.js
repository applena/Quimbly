import { React, useState } from 'react';
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn } from '../store/actions';
import updateCalendarList from '../lib/updateCalendarList';

function Calendars(props) {
  console.log('in Calendars', props)
  const [hiddenCalendars, setHiddenCalendars] = useState(props.config.hiddenCalendars);

  return (
    <div>
      {props.calendars && props.calendars.length &&
        <div>
          <h2>Calendars</h2>

          <form onChange={(e) => updateCalendarList(e.target.id, props.setVisibleCalendars, setHiddenCalendars, hiddenCalendars, props)}>
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
                  <input type="checkbox" id={calendar.id} name={inputName} value={inputName} defaultChecked={props.config.hiddenCalendars.includes(calendar.summary) ? false : true} />{calendar.summary}
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

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar, setEvents, isLoggedIn };

const mapStateToProps = state => {
  console.log('CALENDARS: mapStateToProps', state)
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
)(Calendars);