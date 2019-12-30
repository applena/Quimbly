function excludeCalendars(calendars, myQCalendar){
  let stringDescription = JSON.stringify(calendars);

  myQCalendar.description = stringDescription;

  console.log('config updated with excluded calendar', myQCalendar);
}

export default excludeCalendars;