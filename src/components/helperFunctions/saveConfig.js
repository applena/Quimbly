/* global gapi */

const saveConfig = async (config, id) => {
  console.log('saveconfig:', config)
  await gapi.client.calendar.calendars.update({
    summary: 'MyQ',
    description: JSON.stringify(config),
    calendarId: id
  })
}

export default saveConfig;