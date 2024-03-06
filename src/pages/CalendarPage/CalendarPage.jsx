import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import * as toDosAPI from '../../utilities/todos-api';
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

  let allExercises = 0;
  let doneExercises = 0;
  let allStudy = 0;
  let doneStudy = 0;
  let allJobs = 0;
  let doneJobs = 0;
  let allRead = 0;
  let doneRead = 0;

  const progressCount = toDos.forEach((t) => {
    if (t.category === 'Exercise') {
      allExercises += 1
    }
    if (t.category === 'Exercise' && t.complete) {
      doneExercises += 1
    }
    if (t.category === 'Study') {
      allStudy += 1
    }
    if (t.category === 'Study' && t.complete) {
      doneStudy += 1
    }
    if (t.category === 'Jobs') {
      allJobs += 1
    }
    if (t.category === 'Jobs' && t.complete) {
      doneJobs += 1
    }
    if (t.category === 'Read') {
      allRead += 1
    }
    if (t.category === 'Read' && t.complete) {
      doneRead += 1
    }
  });
  console.log(allExercises);
  console.log(doneExercises);

  // const progressCount = toDos.reduce((acc, cur) => {
  //   if (cur['category'] in acc) {
  //     acc[cur['category']] = acc[cur['category']] + 1
  //   } else {
  //     acc[cur['category']] = 1
  //   }
  //   if (`done${cur['category']}` in acc && acc[cur['category']].completed) {
  //     acc[`done${cur['category']}`] = acc[`done${cur['category']}`] + 1
  //   } else {
  //     acc[`done${cur['category']}`] = 1
  //   }
  //   return (acc);
  // }, {});
  // console.log(progressCount);

  for (let i = 1; i <= numCalDays; i++) {
    const date = new Date(calYr, calMo, i);
    const isToday = today.valueOf() === date.valueOf();
    const dayToDos = toDos.filter((t) => new Date(t.date).getDate() === i);
    const exerciseSymbol = dayToDos.some((t) => t.category === 'Exercise' && !t.complete) ? 'X' : '✓';
    const exerciseSymbolCheck = dayToDos.some((t) => t.category === 'Exercise');
    const studySymbol = dayToDos.some((t) => t.category === 'Study' && !t.complete) ? 'X' : '✓';
    const studySymbolCheck = dayToDos.some((t) => t.category === 'Study');
    const jobsSymbol = dayToDos.some((t) => t.category === 'Jobs' && !t.complete) ? 'X' : '✓';
    const jobsSymbolCheck = dayToDos.some((t) => t.category === 'Jobs');
    const readSymbol = dayToDos.some((t) => t.category === 'Read' && !t.complete) ? 'X' : '✓';
    const readSymbolCheck = dayToDos.some((t) => t.category === 'Read');
    // console.log(dayToDos);

    calDays.push(
      <article
        className={`CalDay${isToday ? ' today' : ''}`}
        style={{ gridColumnStart: i === 1 && date.getDay() + 1 }}
        key={date}
        onClick={() => handleDayClick(date)}
      >
        {date.getDate()}
        <div className='toDoCategories'>
          <div className='exerciseCal'>{exerciseSymbolCheck && <div>🏃{exerciseSymbol}</div>}</div>
          <div className='studyCal'>{studySymbolCheck && <div>🤓{studySymbol}</div>}</div>
          <div className='jobsCal'>{jobsSymbolCheck && <div>💼{jobsSymbol}</div>}</div>
          <div className='readCal'>{readSymbolCheck && <div>📚{readSymbol}</div>}</div>
        </div>
      </article>
    );
  }

  return (
    <>
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
      <div>Good Progress!</div>
      <p>Exercise Progress: {doneExercises} / {allExercises}</p>
      <p>Study Progress: {doneStudy} / {allStudy}</p>
      <p>Jobs Progress: {doneJobs} / {allJobs}</p>
      <p>Read Progress: {doneRead} / {allRead}</p>
      </>
  );
}
