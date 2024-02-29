import * as toDosAPI from '../../utilities/toDos-api';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import AddToDoPage from '../AddToDoPage/AddToDoPage';
import '../DayDetailPage/DayDetailPage.css';

export default function DayDetailPage() {
  const {date} = useParams();
  console.log(date);
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
  }, [])

  const schedule = []

  function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n.toString();
  }

  // const timeToDos = toDos.map((t) => typeof(t.time))
  for (let i = 0; i <= 24; i++) {
    const time = minTwoDigits(i);
    console.log(time);
    const timeToDos = toDos.filter((t) => time === t.time.substring(0, t.time.indexOf(':')))
    console.log(timeToDos);
    schedule.push(
      <div
        className='row'
        // style={{ gridColumnStart: i === 1 && date.getDay() + 1 }}
        key={i}
        // onClick={() => handleDayClick(date)}
      >
        <div>{`${i}:00`}</div>
        <div>
          { timeToDos.length > 0 && 
          timeToDos.map((t) => (
            <div className={t.category}>{t.description} at {t.time}</div>
          ))
        }
        </div>
        <div>
          { timeToDos.length > 0 && 
          timeToDos.map((t) => (
            <div className={t.category}>{t.duration}</div>
          ))
        }
        </div>
        <div>
          { timeToDos.length > 0 && 
          timeToDos.map((t) => (
            <div className={t.category}>{t.status ? 'Complete' : 'Incomplete'}</div>
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
          <div>Time</div>
          <div>To-Do</div>
          <div>Duration</div>
          <div>Status</div>
        </div>
        {schedule}
      </div>
      <AddToDoPage date={date} addToDo={addToDo}/>
    </div>
  );
}
