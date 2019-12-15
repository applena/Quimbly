import React, { useState } from 'react'

const PersonalToDos = () => {
  const [PersonalToDos, setPersonalToDos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personalToDos = e.target.personalToDos.value;
    setPersonalToDos([...PersonalToDos, personalToDos]);
  }

  return(
    <>
      <h2>Personal ToDos</h2>

      <ul>
        {PersonalToDos.map((habit, i) => (
          <li key={i}>{habit}</li>
        )
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="personalToDos"></input>
      </form>
    </>
  ) 
}

export default PersonalToDos;