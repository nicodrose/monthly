import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import DayDetailPage from '../DayDetailPage/DayDetailPage';
import CalendarPage from '../CalendarPage/CalendarPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  const toDos = [
    { date: new Date(2024, 1, 26, 12, 30), category: 'exercise' },
    { date: new Date(2024, 1, 12, 13, 45), category: 'study' },
    { date: new Date(2024, 1, 12, 20, 30), category: 'networking' },
    { date: new Date(2024, 2, 15, 17, 15), category: 'read' },
  ];

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/calendar/:date" element={<DayDetailPage />} />
              <Route path="/calendar" element={<CalendarPage toDos={toDos}/>} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
