/* global gapi */

// this will load all of the todo items (events) for a given calendar and config options
function LoadEvents(calendar, config={}){

  const listConfig = Object.assign({
    'calendarId': calendar.id,
    'timeMin': (new Date()).toISOString(), // when you want to start getting events - default is now
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }, config);

  return gapi.client.calendar.events.list(listConfig)
    .then(function(response) {
      // console.log('my respoonse', response.result.items);
      
      // list of events: response.result.items
        // map over this and sort into categories
        // render to different sections

      let allEvents = response.result.items;
      return allEvents;

      // app.events = app.events.concat(response.result.items.map(function(o){
      //   o.bgColor = calendar.backgroundColor;
      //   o.fgColor = calendar.foregroundColor;
      //   o.colorId = calendar.colorId;
      //   o.calendarId = calendar.id;
      //   return o;
      // }));
      // app.events = _.orderBy(app.events, (o)=>{
      //   return new Date(o.start.dateTime||o.start.date);
      // }, 'asc');
      // calendar.eventsLoaded = true;
    });
}

export default LoadEvents;


