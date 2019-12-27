import reduxData from './data'
export default (state = reduxData, action) => {
  let { type, payload } = action;
  console.log('in reducer with',type, payload)
  switch (type) {
    case 'ADDDAILYTASKS':
      state.DailyTasks.push(payload);
      console.log('adding a daily task', payload);
      return { DailyTasks: [...state.DailyTasks] };
    
    case 'SETDAILYTASKS':
        console.log('setting daily tasks', payload);
      return { DailyTasks: payload };

    case 'SETCALENDARS':
      console.log('setting calendars', payload);
      state.calendars = payload;
      return state;

    case 'SETUSER':
      console.log('setting the user', payload);
      state.User = payload;
      return state;
    
    case 'ISLOGGEDIN':
      // console.log('setting the logged in state', payload);
      state.loggedIn = payload;
      return state;

    default:
      return state;
  }
};
