import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'; 
import Register from './register';
import Chat from "./components/Chat";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          //socket testing are
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
