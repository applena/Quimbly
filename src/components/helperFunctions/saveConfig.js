/* global gapi */

export default async (config, id) => {
  console.log('saveconfig:', config)
  const response = await gapi.client.calendar.calendars.update({
    summary: 'MyQ',
    description: JSON.stringify(config),
    calendarId: id
  })
}