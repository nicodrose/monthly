import * as toDosAPI from '../../utilities/toDos-api';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import AddToDoPage from '../AddToDoPage/AddToDoPage';
import '../DayDetailPage/DayDetailPage.css';

export default function DayDetailPage() {
  const {date} = useParams();
  
  const [toDos, setToDos] = useState([]);

  async function addToDo(toDoData) {
    const toDo = await toDosAPI.add(toDoData);
    setToDos([...toDos, toDo]);
  }

  useEffect(() => {
    async function getAllToDos() {
      const todos = await toDosAPI.getAll(date);
      setToDos(todos);
    }
    getAllToDos();
  }, [date]);

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
                  <input
                    type='text'
                    value={t.description}
                    onChange={(e) => handleEditChange(t._id, 'description', e.target.value)}
                  />
                  <button className='cancel-edit' onClick={() => handleEditCancel(t)}>X</button>
                  <button className='confirm-edit' onClick={() => handleEditConfirm(t)}>✓</button>
                  </>
                ) : (
                    <p onClick={() => toggleEdit(t._id)}>{t.description} at {t.time}</p>
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
                    <p onClick={() => toggleEdit(t._id)}>{t.time}</p>
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
                <p onClick={() => toggleEdit(t._id)}>{t.duration}</p>
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
                <p onClick={() => toggleEdit(t._id)}>{t.complete ? 'Complete' : 'Incomplete'}</p>
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
      <div>
        <div className='row'>
          <div>Schedule</div>
          <div>To-Do</div>
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
