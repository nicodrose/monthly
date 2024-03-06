import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import DayDetailPage from '../DayDetailPage/DayDetailPage';
import CalendarPage from '../CalendarPage/CalendarPage';
import AddToDoPage from '../AddToDoPage/AddToDoPage';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<LandingPage />}  />
              <Route path="/calendar" element={<CalendarPage />}  />
              <Route path="/calendar/:date" element={<DayDetailPage />} />
              <Route path="/calendar/:date/addToDo" element={<AddToDoPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
     <footer className='page-footer'>
      <div className='right'>All Rights Reservered, &copy; 2024 monthly &nbsp;</div>
    </footer>
    </>
  );
}
