// src/components/Chat.js
//socket testing are
// backend msgs rendering is left
import React, { useEffect, useState } from "react";
import socket from "../socketService";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatId } = useParams();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const name = localStorage.getItem('username')
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    // Join the chat room when the component mounts
    socket.emit("joinRoom", chatId);

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Send a new message
      socket.emit("newMessage", { chatId, content: newMessage, id});
      setNewMessage("");
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '400px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f0f2f5', 
      borderRadius: '10px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        padding: '15px', 
        margin: '0', 
        backgroundColor: '#007bff', 
        color: 'white',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      }}>Chat Room</h2>
    
      <div style={{ 
        flex: '1', 
        padding: '15px', 
        overflowY: 'auto', 
        backgroundColor: 'white', 
        borderBottom: '1px solid #ddd',
        borderRadius: '0 0 10px 10px'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            marginBottom: '10px', 
            padding: '8px', 
            backgroundColor: '#f1f1f1', 
            borderRadius: '8px' 
          }}>
            <strong style={{ 
              color: '#007bff' 
            }}>{msg.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
    
      <div style={{ 
        display: 'flex', 
        padding: '10px', 
        backgroundColor: '#f0f2f5', 
        borderTop: '1px solid #ddd', 
        borderRadius: '0 0 10px 10px'
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          style={{ 
            flex: '3', 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            marginRight: '10px', 
            marginTop:'10px',
            fontSize: '16px',
            boxSizing: 'border-box' 
          }}
        />
        <button 
          onClick={sendMessage} 
          style={{ 
            padding: '0px 0px',
            marginBottom: '15px',
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px', 
            cursor: 'pointer',
            flex: '1',
            boxSizing: 'border-box' 
          }}
        >
          Send
        </button>
      </div>
    </div>
     
  );
};

export default Chat;
