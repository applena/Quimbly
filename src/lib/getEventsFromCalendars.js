/* global gapi */

const getEventsFromCalendars = async (visibleCalendars) => {
  return visibleCalendars.map(calendar => async () => gapi.client.calendar.events.list({
    'calendarId': calendar.id,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }));
}

export default getEventsFromCalendars;