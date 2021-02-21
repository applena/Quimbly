/* global gapi */

export default async (config, id) => {
  const response = await gapi.client.calendar.calendars.update({
    summary: 'MyQ',
    description: JSON.stringify(config),
    calendarId: id
  })
}