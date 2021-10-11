/* global gapi */

const cleanUp = async (calendars) => {
  const badCalendars = calendars.filter(calendar => calendar.summary === 'Quimbly');
  const goodCalendars = calendars.filter(calendar => calendar.summary !== 'Quimbly');

  for (let i = 0; i < badCalendars.length; i++) {
    await gapi.client.calendar.calendars.delete({
      'calendarId': badCalendars[i].id
    })
  }

  return goodCalendars;
}

export default cleanUp;