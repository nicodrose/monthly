import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as toDosAPI from '../../utilities/toDos-api';
import AddToDoPage from '../AddToDoPage/AddToDoPage';
import ToDoSummaryPage from '../ToDoSummaryPage/ToDoSummaryPage';
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
  const [toDoBeingEdited, setToDoBeingEdited] = useState(null);
  const [editData, setEditData] = useState({});

  // const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 480);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);
  
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
  
  function toggleEdit(toDo) {
    setEditData({...toDo});
    setToDoBeingEdited(toDo);
  }
  
  function handleEditChange(e) {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEditData({...editData, [e.target.name]: val});
  }
  
  function handleEditCancel() {
    setToDoBeingEdited(null);
  }

  async function handleEditConfirm() {
    const updatedToDo = await toDosAPI.update(editData);
    const updatedToDos = toDos.map((t) => t._id === updatedToDo._id ? updatedToDo: t);
    setToDos(updatedToDos);
    setEditData({});
  }

    async function deleteToDo(id) {
      try {
        await toDosAPI.deleteToDo(id);
        setToDos(toDos.filter(toDo => toDo._id !== id));
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
    
    // if (timeToDos.length > 0 || !isMobile) {
    schedule.push(
      <div
        className='row'
        key={i}
      >
        <div className='schedule-time'>{`${i}:00`}</div>
        <div>
          { timeToDos && 
            timeToDos.map((t) => (
              <div key={t._id} className={t.category}>
                {t === toDoBeingEdited ? (
                  <>
                    <button className='cancel-edit' onClick={handleEditCancel}>X</button>
                    <button className='confirm-edit' onClick={handleEditConfirm}>✓</button>
                    <select name="category" value={editData.category} required onChange={handleEditChange}>
                      <option value="Exercise">Exercise</option>
                      <option value="Study">Study</option>
                      <option value="Jobs">Jobs</option>
                      <option value="Read">Read</option>
                    </select>
                  </>
                ) : (
                  <div className='toDo-btns'>
                    <p onClick={() => toggleEdit(t)}>{t.category}✏️</p>
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
                {t === toDoBeingEdited ? (
                  <input
                    type='text'
                    value={editData.description}
                    name="description"
                    onChange={handleEditChange}
                  />
                ) : (
                  <div className='toDo-btns'>
                    <p onClick={() => toggleEdit(t)}>{t.description}✏️</p>
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
                {t === toDoBeingEdited ? (
                  <input
                    type='text'
                    value={editData.time}
                    name="time"
                    onChange={handleEditChange}
                  />
                ) : (
                  <div className='toDo-btns'>
                    <p onClick={() => toggleEdit(t)}>{t.time}✏️</p>
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
              {t === toDoBeingEdited ? (
                <input
                  type='number'
                  value={editData.duration}
                  name="duration"
                  onChange={handleEditChange}
                />
              ) : (
                <div className='toDo-btns'>
                  <p onClick={() => toggleEdit(t)}>{t.duration}✏️</p>
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
              {t === toDoBeingEdited ? (
                <input
                  type='checkbox'
                  //could change type to checkbox and in row 113 change e.target.value to e.target.checked
                  checked={editData.complete}
                  name="complete"
                  onChange={handleEditChange}
                />
              ) : (
                <div className='toDo-btns'>
                  <p onClick={() => toggleEdit(t)}>{t.complete ? 'Complete' : 'Incomplete'}✏️</p>
                </div>
              )}
            </div>
          ))
        }
        </div>
      </div>
    );
    // }
  }

  return (
    <div>
    <h1>Daily Schedule</h1>
    {/* <div className='dayDetailHeader'> */}
    <ToDoSummaryPage summary={summary} />
    {/* </div> */}
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
