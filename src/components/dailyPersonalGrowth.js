import React, { useState } from 'react'

const DailyPersonalGrowth = () => {
  const [DailyPersonalGrowth, setDailyPersonalGrowth] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const growth = e.target.dailyPersonalGrowth.value;
    setDailyPersonalGrowth([...DailyPersonalGrowth, growth]);
  }

  return(
    <>
      <h2>daily personal growth</h2>

      <ul>
        {DailyPersonalGrowth.map((habit, i) => (
          <li key={i}>{habit}</li>
        )
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="dailyPersonalGrowth"></input>
      </form>
    </>
  ) 
}

export default DailyPersonalGrowth;