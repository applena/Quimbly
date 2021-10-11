import data from '../../store/data';

/* global gapi */

async function createConfig() {
  const response = await gapi.client.calendar.calendars.insert({
    summary: 'Quimbly',
    description: JSON.stringify(data.config)
  })

  console.log(response.result);
  return response.result;
}

export default createConfig;