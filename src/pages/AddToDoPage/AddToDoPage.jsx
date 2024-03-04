import {useState} from 'react';

export default function AddToDoForm({date, addToDo}) {
  const[toDoData, setToDoData] = useState({
    description: '',
    date: date,
    time: '',
    duration: 0,
    category: 'Exercise'
  });

  function handleChange(evt) {
    const toDo = {...toDoData, [evt.target.name]: evt.target.value}
    setToDoData(toDo);
  }

  async function handleSubmit(evt) {
    addToDo(toDoData);
  }

  // console.log(toDoData.time);
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Time: <input type="time" name="time" value={toDoData.time} onChange={handleChange}/></label>
      <label>Description: <input type="text" name="description" value={toDoData.description} onChange={handleChange}/></label>
      <label>Duration(hrs): <input type="number" name="duration" value={toDoData.duration} onChange={handleChange}/></label>
      <label>Category: <select name="category" onChange={handleChange}>
          <option value="Exercise">Exercise</option>
          <option value="Study">Study</option>
          <option value="Jobs">Jobs</option>
          <option value="Read">Read</option>
        </select></label>
        <button type='submit'>Add To-Do</button>
      </form>
    </div>
  );
}