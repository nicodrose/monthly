import { useState } from 'react';
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

export default function CalendarPage({ tasks }) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [calMo, setCalMo] = useState(today.getMonth());
  const [calYr, setCalYr] = useState(today.getFullYear());
  const numCalDays = new Date(calYr, calMo + 1, 0).getDate();

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
    alert(date);
  }

  const calDays = [];

  for (let i = 1; i <= numCalDays; i++) {
    const date = new Date(calYr, calMo, i);
    const isToday = today.valueOf() === date.valueOf();

    const manana = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const tasksToday = tasks.filter(
      (task) =>
        task.date.valueOf() >= date.valueOf() &&
        task.date.valueOf() < manana.valueOf()
    );

    const taskItems = tasksToday.map((task) => task.category.slice(0, 3) + '<br/>');

    calDays.push(
      <article
        className={`CalDay${isToday ? ' today' : ''}`}
        style={{ gridColumnStart: i === 1 && date.getDay() + 1 }}
        key={date}
        onClick={() => handleDayClick(date)}
        dangerouslySetInnerHTML={{ __html: taskItems }}
      ></article>
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