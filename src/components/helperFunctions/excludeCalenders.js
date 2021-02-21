// import { config } from '../../store/data';

function excludeCalendars(calendars, myQCalendar){
  let stringDescription = JSON.stringify(calendars);

  myQCalendar.description = stringDescription;

  console.log('config updated with excluded calendar', myQCalendar);
}

const mapStateToProps = state => ({
  chosenCalendars: state.calendars
})


export default excludeCalendars;