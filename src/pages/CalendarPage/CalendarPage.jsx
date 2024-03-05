import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import * as toDosAPI from '../../utilities/toDos-api';
import './CalendarPage.css';

const MO_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function CalendarPage() {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [calMo, setCalMo] = useState(today.getMonth());
  const [calYr, setCalYr] = useState(today.getFullYear());
  const [toDos, setToDos] = useState([]);
  const numCalDays = new Date(calYr, calMo + 1, 0).getDate();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToDos() {
      const toDos = await toDosAPI.getAllForYearMonth(calYr, calMo);
      setToDos(toDos);
    } 
    getToDos();
  }, [calYr, calMo]);

  function handlePrevMo() {
    if (calMo === 0) {
      setCalMo(11);
      setCalYr(calYr - 1);
    } else {
      setCalMo(calMo - 1);
    }
  }

  function handleNextMo() {
    if (calMo === 11) {
      setCalMo(0);
      setCalYr(calYr + 1);
    } else {
      setCalMo(calMo + 1);
    }
  }

  function handleDayClick(date) {
    navigate(`/calendar/${date}`);
  }

  const calDays = [];

  for (let i = 1; i <= numCalDays; i++) {
    const date = new Date(calYr, calMo, i);
    const isToday = today.valueOf() === date.valueOf();
    const dayToDos = toDos.filter((t) => new Date(t.date).getDate() === i);
    const exerciseSymbol = dayToDos.some((t) => t.category === 'Exercise' && !t.complete) ? 'X' : '✓';
    const studySymbol = dayToDos.some((t) => t.category === 'Study' && !t.complete) ? 'X' : '✓';
    const jobsSymbol = dayToDos.some((t) => t.category === 'Jobs' && !t.complete) ? 'X' : '✓';
    const readSymbol = dayToDos.some((t) => t.category === 'Read' && !t.complete) ? 'X' : '✓';
   
    calDays.push(
      <article
        className={`CalDay${isToday ? ' today' : ''}`}
        style={{ gridColumnStart: i === 1 && date.getDay() + 1 }}
        key={date}
        onClick={() => handleDayClick(date)}
      >
        {date.getDate()}
        <div>🏃{exerciseSymbol} 🤓{studySymbol}</div>
        <div>💼{jobsSymbol} 📚{readSymbol}</div>
      </article>
    );
  }

  return (
    <section className="CalendarPage">
      <header className="flex-ctr-ctr">
        <span onClick={handlePrevMo}>◅</span>
        <span>
          {MO_NAMES[calMo]}, {calYr}
        </span>
        <span onClick={handleNextMo}>▻</span>
      </header>
      <div className="flex-ctr-ctr">Su</div>
      <div className="flex-ctr-ctr">Mo</div>
      <div className="flex-ctr-ctr">Tu</div>
      <div className="flex-ctr-ctr">We</div>
      <div className="flex-ctr-ctr">Th</div>
      <div className="flex-ctr-ctr">Fr</div>
      <div className="flex-ctr-ctr">Sa</div>
      {calDays}
    </section>
  );
}
