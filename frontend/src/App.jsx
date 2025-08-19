import React from 'react'
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Home/Dashboard';
import LandingPage from './pages/LandingPage';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import UserProvider from './context/userContext';


const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />  
        </Routes>
      </Router>

      <Toaster 
      toastOptions={{
        className:"",
        style: {
          background: '#363636',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
        },
      }}/>
      
    </div>
    </UserProvider>
  )
}

export default App
