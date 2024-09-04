import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'; 
import Register from './register';
import Chat from "./components/Chat";
import UserProfile from './components/UserProfile';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          //socket testing are
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
