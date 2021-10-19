// import config from '../../config';

const getDurationMinutes = (end, start) => (new Date(end) - new Date(start)) / 1000 / 60;
// generates a flat view of the schedule where overlapping events are joined into busy time
function generateSchedule(events) {
  // console.log('generateSchedule:', { events });
  // availabilty = [{type: 'busy', time: 30, startTime: 1634671604568}, {type: 'free', duration: 90, startTime: 1634671604568}, {type: 'tentative', duration: 15, startTime: 1634671604568}]
  const schedule = [];
  const currentDate = new Date()
  const currentTime = currentDate.getTime();
  const currentISO = currentDate.toISOString();

  events.forEach((e, i) => {
    if (e.allDay) return;
    // if the first event is after our current time, add free time buffer
    const lastItem = schedule.length ? schedule[schedule.length - 1] : false;

    console.log({ lastItem, e, currentTime });

    if (!lastItem && new Date(e.startTime).getTime() > currentTime) {
      schedule.push({
        type: "free",
        startTime: currentISO,
        endTime: e.startTime,
        duration: getDurationMinutes(e.startTime, currentTime)
      });
    }

    if (lastItem && lastItem.type === 'busy') {

      if (new Date(e.startTime).getTime() < new Date(lastItem.endTime).getTime()) {
        // overlaps inside of last busy block
        // now does it extend, or get consumed by that block
        if (new Date(e.endTime).getTime() >= new Date(lastItem.endTime).getTime()) {
          // extend it
          lastItem.endTime = e.endTime;
          lastItem.duration = getDurationMinutes(e.endTime, lastItem.startTime);
        } // otherwise, it was just consumed within the block
        lastItem.titles.push(e.event); // debugging
        return; // don't push a new busy block
      }
      if (new Date(e.startTime).getTime() > new Date(lastItem.endTime).getTime()) {
        // add free time block
        schedule.push({
          type: "free",
          startTime: lastItem.endTime,
          endTime: e.startTime,
          duration: getDurationMinutes(e.startTime, lastItem.endTime)
        });
      }
    }
    // create a new busy block
    schedule.push({
      type: 'busy',  // TODO: other types? busy|tentative|free|blocked
      duration: getDurationMinutes(e.endTime, e.startTime),
      startTime: e.startTime,
      endTime: e.endTime,
      titles: [e.event]
    });
  });
  console.log({ schedule })
  return schedule;
}

export default generateSchedule;