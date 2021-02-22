import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import loadConfig from './helperFunctions/loadConfig';
import data from '../store/data';
import {setCalendars, hideCalendar, setConfig, setMyQCalendar} from '../store/actions';
import saveConfig from './helperFunctions/saveConfig';
/* global gapi */

function Calendars(props){
  const [hiddenCalendars, setHiddenCalendars] = useState([]);

  // need to wait until a user is signed in to call this function
  useEffect(() => {
    console.log('calendar:useEffect');
    gapi.client.calendar.calendarList.list()
      .then(function(response) {
        //returns an array of calendar objects and all of their prefrences (id, url, color, ...)
        let calendars = response.result.items;
        console.log('CALENDAR: ComponentdidMount, calendars', calendars )
        updateConfig(calendars);
    })
  }, [])

  const updateConfig = async (calendars) => {
    // alphabetize and store in app data
    calendars.sort((a, b) => {
      return a.summary > b.summary ? 1 : -1;
    });

    // set the calendars in redux
    // this.props.setCalendars(calendars);

    // ensures the myQ calendar exists
    const {config, myQCalendar} = await loadConfig(calendars);

    // put the hidden calendars in state
    const hiddenCalendars = JSON.parse(myQCalendar.description);
    setHiddenCalendars(hiddenCalendars.hiddenCalendars);

    // set the config in redux to the config
    props.setConfig(config);
    props.setMyQCalendar(myQCalendar);
    if(!calendars.find(c=>c.summary==='MyQ')){
      props.setCalendars([...calendars, myQCalendar]);
    }else{
      props.setCalendars(calendars);
    }
    // ensure the config event exitsts
    // set the config state in redux

    props.showCalendars();
    // show the main calendar todo space

    // // set the calendars in state to render to the page
    // self.setState({calendars: calendars})
  }

  const updateCalendarList = (e) => {
    let excludedCalendar = e.target.name;
    props.hideCalendar(excludedCalendar);

    data.config.hiddenCalendars.push(excludedCalendar);

    saveConfig(data.config, props.myQCalendar.id);

  }

  // console.log('CALENDARS:', props)
  return(
    <div>
      { props.calendars.length &&
        <div>
          <h2>Calendars</h2>
      
          <form onChange={updateCalendarList}>
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
                  <input type="checkbox" name={inputName} value={inputName} defaultChecked={hiddenCalendars.includes(calendar.summary) ? false : true} />{calendar.summary}
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


const mapDispatchToProps = {setCalendars, hideCalendar, setConfig, setMyQCalendar};

const mapStateToProps = state => ({
  calendars: state.reduxData.calendars,
  config: state.reduxData.config,
  myQCalendar: state.reduxData.myQCalendar
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendars);