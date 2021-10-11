export const addDailyTasks = payload => {
  // console.log('in actions with', payload)
  return {
    type: 'ADDDAILYTASKS',
    payload,
  };
};

export const setDailyTasks = payload => {
  // console.log('in actions with', payload)
  return {
    type: 'SETDAILYTASKS',
    payload,
  };
};

export const setCalendars = payload => {
  // console.log('in setCalendars actions with', payload)
  return {
    type: 'SETCALENDARS',
    payload,
  };
};
export const setQuimblyCalendar = payload => {
  // console.log('in setQuimblyCalendar actions with', payload)
  return {
    type: 'SETQUIMBLYCALENDAR',
    payload,
  };
};

export const setConfig = payload => {
  // console.log('in setConfig actions with', payload)
  return {
    type: 'SETCONFIG',
    payload,
  };
};


export const toggleHideCalendar = payload => {
  // console.log('in actions with', payload)
  return {
    type: 'TOGGLEHIDECALENDAR',
    payload,
  };
}

export const setUser = payload => {
  // console.log('in actions with', payload)
  return {
    type: 'SETUSER',
    payload,
  };
};

export const setEvents = payload => {
  // console.log('in setEvents actions with', payload)
  return {
    type: 'SETEVENTS',
    payload,
  };
};

export const isLoggedIn = payload => {
  console.log('in ISLOGGEDIN actions with', payload)
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
