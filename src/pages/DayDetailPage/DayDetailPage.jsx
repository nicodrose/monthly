import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as toDosAPI from '../../utilities/toDos-api';
import AddToDoPage from '../AddToDoPage/AddToDoPage';
import ToDoSummary from '../../components/ToDoSummary/ToDoSummary';
import '../DayDetailPage/DayDetailPage.css';

function aggregateToDosByCategory(toDos) {
  const categories = ['Exercise', 'Study', 'Jobs', 'Read'];
  const summary = categories.reduce(function(tot, category) {
    const filteredToDos = toDos.filter(function(toDo) {
      return toDo.category === category;
    });
    if (filteredToDos.length > 0) {
      const allComplete = filteredToDos.every(function(toDo) {
        return toDo.complete;
      });
      tot[category] = {exists: true, allComplete: allComplete};
    } else {
      tot[category] = {exists: false, allComplete: false};
    }
    return (tot);
  }, {});
  return (summary);
}


export default function DayDetailPage() {
  const {date} = useParams();
  const [toDos, setToDos] = useState([]);
  const [summary, setSummary] = useState({});
  
  async function addToDo(toDoData) {
    const toDo = await toDosAPI.add(toDoData);
    setToDos([...toDos, toDo]);
  }
  
  useEffect(() => {
    async function getAllToDos() {
      const fetchedToDos = await toDosAPI.getAll(date);
      setToDos(fetchedToDos);
      const summary = aggregateToDosByCategory(fetchedToDos);
      setSummary(summary);
    }
    getAllToDos();
  }, [date]);
  
  useEffect(() => {
    const newSummary = aggregateToDosByCategory(toDos);
    setSummary(newSummary);
  }, [toDos]);
  
  function toggleEdit(id) {
    setToDos(toDos.map((todo) => todo._id === id ? {...todo, edit: !todo.edit} : todo));
  }
  
  function handleEditChange(id, field, newValue) {
    setToDos(toDos.map((todo) => todo._id === id ? {...todo, [field]: newValue} : todo));
  }
  
  function handleEditCancel(todo) {
    delete todo.edit;
    setToDos([...toDos]);
  }

  async function handleEditConfirm(todo) {
    delete todo.edit;
    const updatedToDo = await toDosAPI.update(todo);
    const updatedToDos = toDos.map((t) => t._id === updatedToDo._id ? updatedToDo: t);
    setToDos(updatedToDos);
  }

    async function deleteToDo(id) {
      try {
        await toDosAPI.deleteToDo(id);
        setToDos(toDos.filter(todo => todo._id !== id));
      } catch (err) {
        console.err('Delete ToDo Failed', err)
      }
    }

  const schedule = []

  function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n.toString();
  }

  for (let i = 0; i <= 24; i++) {
    const time = minTwoDigits(i);
    const timeToDos = toDos.filter((t) => time === t.time.substring(0, t.time.indexOf(':')))
    
    schedule.push(
      <div
        className='row'
        key={i}
      >
        <div>{`${i}:00`}</div>
        <div>
          { timeToDos && 
            timeToDos.map((t) => (
              <div key={t._id} className={t.category}>
                {t.edit ? (
                  <>
                  <select name="category" value={t.category} required onChange={(e) => handleEditChange(t._id, 'category', e.target.value)}>
                    <option value="Exercise">Exercise</option>
                    <option value="Study">Study</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Read">Read</option>
                  </select>
                  <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                  <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                  </>
                ) : (
                  <div className='todo-btns'>
                    <p onClick={() => toggleEdit(t._id)}>{t.category}✏️</p>
                    <p onClick={() => deleteToDo(t._id)}>&nbsp;&nbsp;|&nbsp;&nbsp;🗑️</p>
                  </div>
                )}
              </div>
            ))
          }
        </div>
        <div>
          { timeToDos && 
            timeToDos.map((t) => (
              <div key={t._id} className={t.category}>
                {t.edit ? (
                  <>
                  <input
                    type='text'
                    value={t.description}
                    onChange={(e) => handleEditChange(t._id, 'description', e.target.value)}
                  />
                  <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                  <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                  </>
                ) : (
                    <p onClick={() => toggleEdit(t._id)}>{t.description}✏️</p>
                )}
              </div>
            ))
          }
        </div>
        <div>
          { timeToDos && 
            timeToDos.map((t) => (
              <div key={t._id} className={t.category}>
                {t.edit ? (
                  <>
                  <input
                    type='text'
                    value={t.time}
                    onChange={(e) => handleEditChange(t._id, 'time', e.target.value)}
                  />
                  <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                  <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                  </>
                ) : (
                    <p onClick={() => toggleEdit(t._id)}>{t.time}✏️</p>
                )}
              </div>
            ))
          }
        </div>
        <div>
          { timeToDos && 
          timeToDos.map((t) => (
            <div key={t._id} className={t.category}>
              {t.edit ? (
                <>
                <input
                  type='number'
                  value={t.duration}
                  onChange={(e) => handleEditChange(t._id, 'duration', e.target.value)}
                />
                <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                </>
              ) : (
                <p onClick={() => toggleEdit(t._id)}>{t.duration}✏️</p>
              )}
            </div>
          ))
        }
        </div>
        <div>
          { timeToDos && 
          timeToDos.map((t) => (
            <div key={t._id} className={t.category}>
              {t.edit ? (
                <>
                <input
                  type='text'
                  //could change type to checkbox and in row 113 change e.target.value to e.target.checked
                  value={t.complete}
                  onChange={(e) => handleEditChange(t._id, 'complete', e.target.value)}
                />
                <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                </>
              ) : (
                <p onClick={() => toggleEdit(t._id)}>{t.complete ? 'Complete' : 'Incomplete'}✏️</p>
              )}
            </div>
          ))
        }
        </div>
      </div>
    );
  }

  return (
    <div>
    <h1>DayDetailPage</h1>
    <ToDoSummary summary={summary} />
      <div>
        <div className='row'>
          <div>Schedule</div>
          <div>To-Do</div>
          <div>Description</div>
          <div>Time</div>
          <div>Duration(hrs)</div>
          <div>Status</div>
        </div>
        {schedule}
      </div>
      <AddToDoPage date={date} addToDo={addToDo}/>
    </div>
  );
}
