import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.js';  // Ensure the path is correct
import Register from './register.js';  // Ensure the path is correct
import UserProfile from './components/UserProfile.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

