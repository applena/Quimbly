
function findFirstAvailable(hourDuration, minuteDuration, events) {
  const totalTime = `${hourDuration}${minuteDuration}`;
  const pixelTime = (hourDuration * 60) + (Math.ceil(minuteDuration * 60));
  console.log('first available', { events, hourDuration, minuteDuration, totalTime });

  events.forEach((e, i) => {
    if (e.allDay) return;
    if (i !== events.length - 1) {
      const nextEventStartingPixels = Number(events[i + 1].startingPixels.slice(0, events[i + 1].startingPixels.length - 2));
      const endingPixels = Number(e.endingPixels.slice(0, e.endingPixels.length - 2));
      const pixelsBetweenEvents = nextEventStartingPixels - endingPixels;
      console.log({ pixelsBetweenEvents, nextEventStartingPixels, endingPixels })

    }

  })

}

export default findFirstAvailable;