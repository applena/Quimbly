import config from '../../config';

function generateFreeTime(events) {
  console.log('generate Free Time:', { events });
  const availablePixels = [[config.OUTLINE_OFFSET, config.OUTLINE_OFFSET + (26 * 60)]]
  events.forEach(e => {
    availablePixels.forEach(pixelSet => {
      // determine if the event begins in the range of the empty block
      // if it does, change the empty block so that it ends with the event's starting pixels
      if (pixelSet[0] <= e.startingPixels && e.startingPixels <= pixelSet[1]) {
        console.log('event was in an empty pixel set', { e, pixelSet });
        pixelSet[1] = e.startingPixels - 1;
      }
    })
  })
}

export default generateFreeTime;