import { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate



const Dashboard = () => {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  if (!token) {
    window.location.href = 'http://localhost:3000/login'; // Redirect if token is missing
    return; // Stop further execution
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chats', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        setChats(response.data.ChatList);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    console.log(chats);


    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    window.location.href = `http://localhost:3000/chat/${chatId}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');

    window.location.href = 'http://localhost:3000/login';
  }


  return (
    <div style={{
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
      minHeight: "100vh",
      backgroundImage: "url('/path/to/your/image.png')", // Ensure the correct path to the background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
    }}>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 0px',
          backgroundColor: 'red',
          width: "10%",
          marginLeft: "80%",
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '30px',
          cursor: 'pointer',
          flex: '1',
          boxSizing: 'border-box'
        }}
      >
        Logout
      </button>


      <h2 style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#fff",
        fontSize: "3.5em",
        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
      }}>
        Messages
      </h2>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}>
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleChatClick(chat._id)}
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent background
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              color: "#333",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {/* <strong style={{ fontSize: "1.2em", color: "#1a73e8" }}>{chat.participants[1]}</strong> */}
              <strong style={{ fontSize: "1.2em", color: "#1a73e8" }}>
                {chat.participants
                  .filter((participant) => participant._id !== id)
                  .map((participant) => participant.name)
                  .join(', ')}
              </strong>
              <span style={{ fontSize: "0.9em", color: "#666" }}>{chat.lastMessageTime}</span>
            </div>
            <p style={{ marginTop: "8px", color: "#444" }}>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
