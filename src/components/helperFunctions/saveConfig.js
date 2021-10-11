/* global gapi */

const saveConfig = async (config, id) => {
  console.log('saveconfig:', config, id)
  await gapi.client.calendar.calendars.update({
    summary: 'Quimbly',
    description: JSON.stringify(config),
    calendarId: id
  });
  // console.log('save config', { res })
}

export default saveConfig;