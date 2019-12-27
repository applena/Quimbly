import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';

const DailyHabits = (props) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const habit = e.target.dailyHabit.value;
    console.log('my daily habit', habit);
    props.addDailyTasks(habit);
    console.log('my new daily habits', props.DailyHabits);
  }
  
  
  return(
      
    <>
      <h2>daily habits</h2>

      <ul>
        {props.DailyHabits.map((habit, i) => (
          <li key={i}>{habit}</li>
        )
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="dailyHabit"></input>
      </form>
    </>
  )
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    addDailyTasks: (newTask) => dispatch(actions.addDailyTasks(newTask))
  }
};

const mapStateToProps = state => ({
  DailyHabits: state.DailyTasks,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyHabits);