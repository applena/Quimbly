import reduxData from './data';

export default (state = reduxData, action) => {
  let { type, payload } = action;
  console.log('in reducer with',type, state, payload)
  switch (type) {
    // case 'ADDDAILYTASKS':
    //   state.DailyTasks.push(payload);
    //   console.log('adding a daily task', payload);
    //   return { DailyTasks: [...state.DailyTasks] };
    
    // case 'SETDAILYTASKS':
    //     console.log('setting daily tasks', payload);
    //   return { DailyTasks: payload };

    case 'SETCONFIG':
      console.log('SETCONFIG:', payload)
      return {...state, config:payload};

    case 'SETCALENDARS':
      console.log('SETCALENDARS:', payload)
      return {...state, calendars:payload};

    case 'SETMYQCALENDAR':
      console.log('SETMYQCALENDAR:', payload)
      return {...state, myQCalendar:payload};

    case 'HIDECALENDAR':
      const hiddenCalendars = state.config.hiddenCalendars;
      if(hiddenCalendars.includes(payload)) return state;
      hiddenCalendars.push(payload);
      return {...state, config: {hiddenCalendars}};

    case 'SETUSER':
      console.log('setting the user', payload);
      state.User = payload;
      return state;
    
    case 'ISLOGGEDIN':
      state.loggedIn = payload;
      console.log('setting the logged in state', payload, state);
      return state;

    default:
      return state;
  }
};
