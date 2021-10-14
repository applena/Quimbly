
function findFirstAvailable(hourDuration, minuteDuration, events) {
  const totalTime = `${hourDuration}${minuteDuration}`;
  console.log('first available', { events, hourDuration, minuteDuration, totalTime })


}

export default findFirstAvailable;