
function findFirstAvailable(hourDuration, minuteDuration, events) {
  const totalTime = `${hourDuration}${minuteDuration}`;
  console.log('first available', { events, hourDuration, minuteDuration, totalTime })
  events.forEach(e => {
    if (e.allDay) return;
  })

}

export default findFirstAvailable;