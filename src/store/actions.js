export const addDailyTasks = payload => {
  console.log('in actions with', payload)
  return {
    type: 'ADDDAILYTASKS',
    payload,
  };
};

export const setDailyTasks = payload => {
  console.log('in actions with', payload)
  return {
    type: 'SETDAILYTASKS',
    payload,
  };
};

export const setCalendars = payload => {
  console.log('in actions with', payload)
  return {
    type: 'SETCALENDARS',
    payload,
  };
};

export const hideCalendar = payload => {
  console.log('in actions with', payload)
  return{
    type: 'HIDECALENDAR',
    payload,
  };
}

export const setUser = payload => {
  console.log('in actions with', payload)
  return {
    type: 'SETUSER',
    payload,
  };
};

export const isLoggedIn = payload => {
  console.log('in actions with', payload)
  return {
    type: 'ISLOGGEDIN',
    payload,
  };
};

// export const stop = payload => {
//   return {
//     type: 'STOP',
//     payload,
//   };
// };
