/* global gapi */

const cleanUp = async (calendars)=>{
  const badCalendars = calendars.filter(calendar => calendar.summary === 'MyQ');
  const goodCalendars = calendars.filter(calendar => calendar.summary !== 'MyQ');

  for(let i=0; i<badCalendars.length; i++){
    await gapi.client.calendar.calendars.delete({
      'calendarId': calendars[i].id
    })
  }

  return goodCalendars;
}

export default cleanUp;