
function findFirstAvailable(duration, schedule) {
  // console.log('find first available:', { duration, schedule });
  const availableBlock = schedule.find(e => {
    // TODO: handle no matches
    return e.duration >= duration && e.type === 'free';
  });
  return availableBlock;
}

export default findFirstAvailable;