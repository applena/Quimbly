import getEventsFromCalendars from './getEventsFromCalendars';
import * as parallel from 'async-parallel';

const getUpcomingEvents = async (calendars, config) => {
  // return [];
  console.log({ calendars, config })
  const visibleCalendars = calendars.filter(cal => !config.hiddenCalendars.includes(cal.id));
  console.log({ visibleCalendars })

  const promiseArray = await getEventsFromCalendars(visibleCalendars);


  let allEvents = await parallel.map(promiseArray, async apiCall => {
    const response = await apiCall();
    return response.result.items;
  });

  allEvents = allEvents.map((eventArray, idx) => {
    return eventArray.map(event => ({
      calendar: visibleCalendars[idx].summary,
      color: visibleCalendars[idx].backgroundColor,
      event: event.summary,
      startTime: event.start.dateTime ? event.start.dateTime : event.start.date,
      endTime: event.end.dateTime ? event.end.dateTime : event.end.date
    }))
  })

  allEvents = allEvents.flat()
  console.log({ allEvents })

  allEvents = allEvents.sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  }).slice(0, 10);


  return allEvents;
}

export default getUpcomingEvents;
